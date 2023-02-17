/***********DEFINICION DEL MODELO************************* */

import { Sequelize } from "sequelize";

import db from '../config/db.js';

//definimos las columnas y tipos de datos de la tabla viajes 
export const Testimonial = db.define('testimoniales', {//nombre de la tabla testimoniales
    nombre: {
        type: Sequelize.STRING
    },
    correo: {
        type: Sequelize.STRING
    },
    mensaje: {
        type: Sequelize.STRING
    }
}
);