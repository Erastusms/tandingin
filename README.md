# tandingin


FOOTNOTE:
(only in server)
- npm init --y
- npm i pg pg-hstore sequelize sequelize-cli
- npx sequelize-cli init
- npx sequelize-cli model:generate --name User --attributes id:number,first_name:string,last_name:string
- npx sequelize-cli db:migrate
