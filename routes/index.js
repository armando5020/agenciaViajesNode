//importamos express
import express from 'express';

//importamos la pagina de inicio
import {  
    paginaInicio, 
    paginaNosotros, 
    paginaViajes, 
    PaginaTestimoniales, 
    paginaDetalleViaje
} from '../controllers/paginasController.js';

//importamos los datos recogidos por post
import { guardarTestimonial } from '../controllers/testimonialController.js';

//creamos nuestro router
const router = express.Router();//lo que haces es utlizar express pero extendiendo su router


//Asignamos las rutas
router.get('/',paginaInicio);
router.get('/nosotros',paginaNosotros);
router.get('/viajes',paginaViajes);
router.get('/viajes/:slug',paginaDetalleViaje);//añadismo un comodir despues de los dos punto, puede ser cualquier nombre, slug viaje, var, parametro etc..
router.get('/testimoniales',PaginaTestimoniales);
router.post('/testimoniales',guardarTestimonial)



//exportamos las rutas

export default router;