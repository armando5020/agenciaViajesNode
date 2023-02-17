import Sequelize from 'sequelize';

//importamos el config
import dotenv from 'dotenv/config';
 console.log(process.env.DB_HOST);

//creamos una instancias de Sequelize, le pasamos el nombre de la bases de datos, el usuario y el password
const db = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
    host: process.env.DB_HOST,
    port: '3306',
    dialect: 'mysql',
    define: {
        timestamps: false
    },
    pool: {
        max: 5,
        min: 0,
        acquire: 3000,
        idle: 10000

    },
    operatorAliases: false

});

export default db;