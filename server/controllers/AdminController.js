const robin = require("roundrobin");
// const _ = require('lodash');
const fs = require("fs");
const path = require("path");
const { League, User, Team, Match, TeamMatch, Standing } = require("../models");
const {
  convertObjectToSnakeCase,
  convertObjectToCamelCase,
  getUniqueList,
} = require("../helpers/ResponseHelpers");
const { successResponse } = require("../response");
const {
  generateFixture,
  generateMatchDay,
} = require("../helpers/fixtureGenerator");
const { where } = require("sequelize");
const { v4: uuidv4 } = require("uuid");

// const redisClient = require("../middlewares/redis");

class AdminController {
  static async viewDashboard(req, res, next) {
    try {
      const leagueData = await League.findOne({
        where: { UserId: req.userData.id },
        include: [Fixture, Team],
      });

      return successResponse(res, "View Dashboard", 200, {
        participants: `${leagueData.Teams.length} Teams`,
        fixtures: `${leagueData.Fixtures.length} Match`,
        leagueData,
      });
    } catch (err) {
      return next(err);
    }
  }

  static async createLeague(req, res, next) {
    try {
      const { file } = req;
      const { id } = req.userData;
      const users = await User.findByPk(id);

      const { name, quota } = req.body;

      const isLeagueExist = await League.findOne({
        where: { name },
      });

      if (isLeagueExist) {
        return res.status(403).json({
          message: "League already exist!",
        });
      }

      const dataConvert = convertObjectToSnakeCase(req.body);
      await League.create({
        ...dataConvert,
        quota_available: quota,
        logo: file
          ? `images/league/${file.filename}`
          : "images/ImageNotSet.png",
        status: "open",
        createdBy: users.username,
        updatedBy: users.username,
        UserId: users.id,
      });

      return successResponse(res, "League successfully created", 201);
    } catch (err) {
      return next(err);
    }
  }

  static async update(req, res, next) {
    const LeagueId = req.params.leagueId;
    try {
      const dataConvert = convertObjectToSnakeCase(req.body);
      await League.update(
        {
          ...dataConvert,
          // logo: file ? file.filename : "blank.png",
        },
        { where: { id: LeagueId } }
      );

      return successResponse(res, "League successfully updated");
    } catch (err) {
      return next(err);
    }
  }

  static async updateLogo(req, res, next) {
    const id = req.params.leagueId;
    const { file } = req;

    try {
      if (file) {
        const liga = await League.findByPk(id);
        const { logo } = liga;
        const isDefaultPhoto = logo.toLowerCase().includes("imagenotset");
        if (!isDefaultPhoto) {
          fs.unlink(path.join(`public/${logo}`));
        }
        await League.update(
          {
            logo: file
              ? `images/league/${file.filename}`
              : "images/ImageNotSet.png",
          },
          { where: { id } }
        );
      }

      return successResponse(res, "Logo successfully updated");
    } catch (err) {
      fs.unlink(path.join(`public/images/league/${file.filename}`));
      return next(err);
    }
  }

  static async viewListTeamInLeague(req, res, next) {
    try {
      const { LeagueId, status } = req.query;
      const leaguesData = await League.findOne(
        {
          include: [
            {
              model: Team,
              where: {
                status,
              },
            },
          ],
        },
        {
          where: { id: LeagueId },
        }
      );

      const resData = leaguesData
        ? convertObjectToCamelCase(leaguesData.dataValues)
        : [];

      return successResponse(res, "League list success", 200, resData);
    } catch (err) {
      return next(err);
    }
  }

  static async viewListAdminLeague(req, res, next) {
    const { page = 1, pageSize = 4 } = req.query;
    try {
      const leagues = await League.findAll({
        where: {
          UserId: req.userData.id,
        },
        offset: (page - 1) * pageSize,
        limit: pageSize,
        order: [["createdAt", "DESC"]],
      });
      const leaguesData = leagues.map((liga) =>
        convertObjectToCamelCase(liga.dataValues)
      );

      return successResponse(res, "League list success", 200, {
        page,
        pageSize,
        totalData: leaguesData.length,
        leaguesData,
      });
    } catch (err) {
      return next(err);
    }
  }

  static async viewDetailLeague(req, res, next) {
    try {
      const leagues = await League.findOne({
        where: {
          id: req.params.LeagueId,
        },
        include: [Team],
      });
      return successResponse(
        res,
        "View Detail League",
        200,
        convertObjectToCamelCase(leagues.dataValues)
      );
    } catch (err) {
      return next(err);
    }
  }

  static async updateStatus(req, res, next) {
    try {
      const { status, TeamId, LeagueId } = req.body;
      const isLeagueExist = await League.findOne({ where: { id: LeagueId } });
      if (!isLeagueExist) {
        return res.status(404).json({
          message: "League does not exist",
        });
      }

      const isTeamExist = await Team.findOne({ where: { id: TeamId } });
      if (!isTeamExist) {
        return res.status(404).json({
          message: "Team does not exist",
        });
      }
      await Team.update(
        {
          status,
        },
        { where: { id: TeamId } }
      );

      switch (status) {
        case "Approved":
          await League.decrement(
            {
              quota_available: 1,
            },
            { where: { id: LeagueId } }
          );
          break;
        case "Rejected":
          await Team.update(
            {
              LeagueId: null,
            },
            { where: { id: TeamId } }
          );
          break;
        default:
          break;
      }

      const leagueAfterDecrement = await League.findOne({
        where: { id: LeagueId },
      });
      if (leagueAfterDecrement.quota_available === 0) {
        await League.update(
          {
            status: "closed",
          },
          { where: { id: LeagueId } }
        );
      }

      return successResponse(res, `${status} by ADMIN League`);
    } catch (err) {
      return next(err);
    }
  }

  static async generateMatch(req, res, next) {
    try {
      const id = req.params.leagueId;
      const { quota_available: isFull } = await League.findOne({
        attributes: ["quota_available"],
        where: { id },
      });

      if (isFull > 0) {
        return res.status(500).json({
          message:
            "Cannot generate match because there is still available quota",
        });
      }

      // const isMatchExist = await Fixture.findAll({ where: { LeagueId: id } });
      // if (isMatchExist.length > 0) {
      //   await Fixture.destroy({
      //     where: { LeagueId: id },
      //   });
      // }

      const allTeams = await Team.findAll({ where: { LeagueId: id } });
      // const teamsID = allTeams.map((team) => team.id);
      // const shuffleTeams = teamsID.sort(() => Math.random() - 0.5);
      // const turnament = robin(shuffleTeams.length, shuffleTeams);
      // const genFixture = generateFixture(turnament, id);
      // const fixtureData = getUniqueList(genFixture, "name");
      // const fixtures = await Fixture.bulkCreate(fixtureData);
      // const genMatch = generateMatchDay(genFixture, fixtures);
      // await Match.bulkCreate(genMatch);
      const matches = [];
      const teamIds = allTeams.map((team) => team.id);

      for (const idTeam in teamIds) {
        await Standing.create({ TeamId: teamIds[idTeam], LeagueId: id });
      }

      // Generate round-robin schedule
      for (let i = 0; i < teamIds.length; i++) {
        for (let j = i + 1; j < teamIds.length; j++) {
          // Home match
          matches.push({
            homeTeamId: teamIds[i],
            awayTeamId: teamIds[j],
            LeagueId: id,
            matchDate: new Date(),
          });
          // Away match
          matches.push({
            homeTeamId: teamIds[j],
            awayTeamId: teamIds[i],
            LeagueId: id,
            matchDate: new Date(),
          });
        }
      }

      // Save matches to database
      for (const match of matches) {
        const createdMatch = await Match.create({
          LeagueId: match.LeagueId,
          match_date: match.matchDate,
        });

        await TeamMatch.create({
          MatchId: createdMatch.id,
          TeamId: match.homeTeamId,
          score: 0,
          category: "Home",
        });
        await TeamMatch.create({
          MatchId: createdMatch.id,
          TeamId: match.awayTeamId,
          score: 0,
          category: "Away",
        });
      }

      return successResponse(res, "Generate Match Success", 200, matches);
    } catch (err) {
      return next(err);
    }
  }

  static async viewMatchInLeague(req, res, next) {
    try {
      // const fixturesData = await Fixture.findAll({
      //   where: { LeagueId: req.params.leagueId },
      //   attributes: ["name", "status", "LeagueId"],
      //   include: [
      //     {
      //       model: Match,
      //       attributes: ["score", "category"],
      //       include: [Team],
      //     },
      //   ],
      // });
      const matches = await Match.findAll({
        where: { LeagueId: req.params.leagueId },
        include: [
          {
            model: Team,
            // through: { attributes: ["category"] },
          },
        ],
      });

      const matchData = matches.map((match) => ({
        matchDate: match.matchDate,
        teams: match.Teams.map((team) => ({
          teamName: team.name,
          score: team.TeamMatch.score,
          category: team.TeamMatch.category,
          logo: team.logo,
        })),
      }));
      return successResponse(res, "Show all Match", 200, matchData);
    } catch (err) {
      return next(err);
    }
  }

  static async updateScore(req, res, next) {
    let teamAStatus = "draw";
    let teamBStatus = "draw";
    const UserId = req.userData.id;
    const { fixturesId, teamAId, teamBId, teamAScore, teamBScore } = req.body;
    try {
      const isUserIdAuthorized = await League.findOne({ where: { UserId } });
      if (!isUserIdAuthorized) {
        return res.status(401).json({ message: "You are not authorized!" });
      }

      if (teamAScore > teamBScore) {
        teamAStatus = "win";
        teamBStatus = "lose";
      }
      if (teamAScore < teamBScore) {
        teamAStatus = "lose";
        teamBStatus = "win";
      }

      await Promise.all([
        Fixture.update(
          {
            status: "FullTime",
          },
          { where: { id: fixturesId } }
        ),
        Match.update(
          {
            score: teamAScore,
            status: teamAStatus,
          },
          { where: { FixtureId: fixturesId, TeamId: teamAId } }
        ),
        Match.update(
          {
            score: teamBScore,
            status: teamBStatus,
          },
          { where: { FixtureId: fixturesId, TeamId: teamBId } }
        ),
      ]);

      return successResponse(res, "Score has been updated");
    } catch (err) {
      return next(err);
    }
  }

  static async deleteLeague(req, res, next) {
    const { id } = req.params;
    try {
      const { UserId, logo } = await League.findByPk(id);
      if (UserId === req.userData.id) {
        const destroyLeague = await League.destroy({ where: { id, UserId } });
        if (destroyLeague === 0) {
          return res.status(404).json({
            message: "League is not found",
          });
        }

        const fixturesDatta = await Fixture.findAll({
          where: { LeagueId: id },
        });
        const fixturesID = fixturesDatta.map((fix) => fix.id);
        const isDefaultPhoto = logo.toLowerCase().includes("imagenotset");
        if (!isDefaultPhoto) {
          fs.unlink(path.join(`public/${logo}`));
        }

        await Promise.all([
          Fixture.destroy({ where: { LeagueId: id } }),
          Match.destroy({ where: { FixtureId: fixturesID } }),
          Team.update({ LeagueId: null }, { where: { LeagueId: id } }),
        ]);
        return successResponse(res, "League has been deleted");
      }

      return res.status(403).json({
        message: "Your forbidden",
      });
    } catch (err) {
      return next(err);
    }
  }
}

module.exports = AdminController;
