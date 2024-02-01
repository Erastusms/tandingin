# tandingin
http://tandingin-production.up.railway.app

FOOTNOTE:
(only in server)
- npm init --y
- npm i pg pg-hstore sequelize sequelize-cli
- npx sequelize-cli init
- npx sequelize-cli model:generate --name User --attributes first_name:string,last_name:string
- npx sequelize-cli db:migrate
- see cache-redis: powershell -> memurai-cli
