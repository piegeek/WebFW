# How to setup database on a mac

1. Install MySQL(mariadb in our case) on machine and run 'sudo /usr/local/bin/mysql_secure_installation' to secure installation --> [reference](https://getgrav.org/blog/macos-bigsur-apache-mysql-vhost-apc)

2. Change the value of NODE_ENV to 'development'/'test'/'production' depending on the situation

3. Create new user and grant access to this user, then change the values of config setup in database/config/config.json according to the value of NODE_ENV  

4. Create models by using './node_modules/.bin/sequelize model:create --name XXXX.XXX --attributes XXX:XXXX,XXX:XXXX'

5. Edit model file and migrate file to be the same --> [reference](https://medium.com/@prajramesh93/getting-started-with-node-express-and-mysql-using-sequelize-ed1225afc3e0)

6. Run './node_modules/.bin/sequelize db:migrate' (Use 'db:migrate:undo' to rollback)

7. Check if all tables are created correctly