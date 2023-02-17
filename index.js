
//importamos express y lo asignamos a la variable express
//const express = require('express');//version de comon js
import express from 'express';//version de imports
import router  from './routes/index.js';
import db from './config/db.js';

//importamos nuestra variable de entorno con dotenv
//import dotenv from 'dotenv/config';//otra forma de indicar el fichero 

//import dotenv from 'dotenv';
//dotenv.config();//Automaticamente detect el fichero  de configuracion, no hace falta que le pasemos el nombre del fichero
//console.log(process.env.DB_HOST);//Leemos la variable de entorno con procces.env.#nombreVariable


const app = express();//funcion de express para asiganar app

//Conexion con la bases de datos
db.authenticate()
    .then(()=>console.log('Bases de datos conectada'))
    .catch(error=> console.log(error));

//Definimos un puerto
const port = process.env.PORT || 4000

//Habilitar PUG
app.set('view engine', 'pug');

//Obtener el añlo actual

app.use((req,res,next)=>{
    //-res tiene variables llamadas locals, podemos utilizar esas variables para pasar valores entre vistas
    
    const year  = new Date();
    res.locals.anioActual = year.getFullYear();
    res.locals.nombresitio = 'Agencia de Viajes';

    return next();//-next simpre se ejecuta al siguiente middleware

});

//Agregrar body parser para leer los datos del formulario (request.body)
app.use(express.urlencoded({extend: true}));

//Definir la carpeta publica donde dentro de ellas se encuentran los css e imagenes
app.use(express.static('public'));

//Agregar Router
//use => es generico y soporta get, put, post, delete y patch
app.use('/',router);


//abrimos el puerto de nuestra aplicacion
app.listen(port,()=>{
    console.log(`El servidor esta corriendo en el puerto ${port}`)
});


