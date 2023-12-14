const { User } = require("../models");
const { decrypter, encrypter } = require("../helpers/bcrypt");
const { tokenGenerator } = require("../helpers/jwt");
const { convertObjectToSnakeCase, convertObjectToCamelCase } = require("../helpers/ResponseHelpers");
const { successResponse } = require("../response");
const { google } = require("googleapis");
// const fs = require("fs-extra");
// const path = require("path");
// const randomstring = require("randomstring");


const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    'http://localhost:5000/api/v1/auth/google/callback'
);

const scopes = [
    'https://www.googleapis.com/auth/userinfo.email',
    'https://www.googleapis.com/auth/userinfo.profile'
]

const authorizationUrl = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: scopes,
    include_granted_scopes: true,
})


class UserController {
    static async register(req, res) {
        try {
            // let file = req.file;
            // const { username, teamName, shortName, role, email, password, reTypePassword } = req.body;
            const { fullname, username, email, password, role } = req.body;
            // shortName max 3 karakter
            // if (!reTypePassword) {
            //     return res.status(500).json({
            //         message: "Retype Password is required!",
            //     });
            // }
            const findEmail = await User.findOne({
                where: { email: email.toLowerCase() },
            });

            if (findEmail) {
                return res.status(403).json({
                    message: "Email already exist!",
                });
            }

            let user = await User.create({
                fullname, username, email, password, role
            });
            res.status(201).json(successResponse('user successfully created'));
        } catch (err) {
            console.log(err)
            res.status(500).json(err);
        }
    }
    static async getUser(req, res) {
        try {
            const data = await User.findAll({})
            res.status(200).json(data);
        } catch (err) {
            res.status(500).json(err);
        }
    }

    static async login(req, res) {
        try {
            const { email, password } = req.body;
            let user = await User.findOne({
                where: { email },
            });

            if (user) {
                if (decrypter(password, user.password)) {
                    let access_token = tokenGenerator(user);
                    // return res.status(200).json({
                    //     status: 200,
                    //     message: "You are successfully logged in",
                    //     user,
                    //     access_token,
                    // });
                    return res.status(200).json(successResponse('You are successfully logged in', { access_token }));
                }
                return res.status(403).json({
                    message: "Password is Invalid!",
                });
            }

            return res.status(404).json({
                message: "User not found!",
            });
        } catch (err) {
            res.status(500).json(err);
        }
    }


    static async loginWithGoogle(req, res) {
        return res.status(200).json({ url: authorizationUrl });
    }

    static async loginSyncWithGoogle(req, res) {
        const { code } = req.query
        // console.log(req.query)

        const { tokens } = await oauth2Client.getToken(code);

        oauth2Client.setCredentials(tokens);

        const oauth2 = google.oauth2({
            auth: oauth2Client,
            version: 'v2'
        })

        const { data } = await oauth2.userinfo.get();
        const { email, name, given_name } = data

        const isEmailAlreadyExist = await User.findOne({
            where: { email: email.toLowerCase() },
        });

        if (!isEmailAlreadyExist) {
            await User.create({
                fullname: name, username: given_name, email, password: 'not set', role: 'MEMBER'
            });
        }

        let user = await User.findOne({
            where: { email },
        });

        let access_token = tokenGenerator(user);
        // if (!data.email || !data.name) {
        //     return res.json({
        //         data: data,
        //     })
        // }

        // let user = await prisma.users.findUnique({
        //     where: {
        //         email: data.email
        //     }
        // })

        // if (!user) {
        //     user = await prisma.users.create({
        //         data: {
        //             name: data.name,
        //             email: data.email,
        //             address: "-"
        //         }
        //     })
        // }

        // const payload = {
        //     id: user?.id,
        //     name: user?.name,
        //     address: user?.address
        // }

        // const secret = process.env.JWT_SECRET!;

        // const expiresIn = 60 * 60 * 1;

        // const token = jwt.sign(payload, secret, { expiresIn: expiresIn })

        // return res.redirect(`http://localhost:3000/auth-success?token=${token}`)

        // return res.json({
        //     data: {
        //         id: user.id,
        //         name: user.name,
        //         address: user.address
        //     },
        //     token: token
        // })
        return res.status(200).json({
            message: "Successfully login!",
            access_token
        });
    }


    static async profilePage(req, res, next) {
        try {
            const id = req.userData.id;
            let users = await User.findByPk(id);
            return res.status(200).json(users);
        } catch (err) {
            // res.status(500).json(err);
            next(err)
        }
    }

    static async updateProfile(req, res) {
        const id = req.userData.id;
        const file = req.file;
        const { fullname, username, email, password } = req.body;

        // if (file) {
        //   file = file.filename;
        //   await fs.unlink(path.join(`public/images/avatars/${user.avatar}`));
        // } else {
        //   file = user.avatar;
        // }

        try {
            await User.update(
                {
                    fullname, username, email, password
                    // avatar: file ? file.filename : "blank.png",
                },
                { where: { id }, individualHooks: true, }
            );

            const userAfterUpdate = await User.findByPk(id);

            return res.status(200).json({
                status: 200,
                message: "User data has been updated!",
                user: userAfterUpdate,
            });
        } catch (err) {
            next(err)
        }
    }
}

module.exports = UserController;
