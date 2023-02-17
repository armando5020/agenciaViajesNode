/**************CONTROLADOR***********************/

//las rutas que teniamos definidas en el router/index.js las pasamos a este fichero y las exportamos, En el fichero de router/index.js importamos las variables para que quede mas organizado
//request= son las peticiones o envios que realizamos desde la  apliccion
//response => son las respuestas por el lado del servidor nodejs
//get no verbos que entiende expres como por ejemplo post,put, delete y patch
//render muestra las vista qu tengamos

import { Viaje } from '../models/Viaje.js';
import { Testimonial } from '../models/Testimoniales.js'

//Inicio
const paginaInicio = async (req, res) => {// req- lo que enviamos : res - loe que espress nos responde

  //Consultar 3 viajes del modelo de viaje
  //creamos un array para las consultas
  const promiseDB = [];
    promiseDB.push(Viaje.findAll({ limit: 3 }));
    promiseDB.push(Testimonial.findAll({ limit: 3 }));

  try {
    //cuando tenemos muchas variable o consultas a la bases de dato relizamos esta accion
      //metemos  la dos consulta de la bases de datos en un arrar y despues con un promise.all lo asignamos al resultado, la ejecuacion sera al a par e independientes.

    // const viajes = await Viaje.findAll({ limit: 3 });//realizamos la consulat con sequelize de tres filas
    // const testimoniales = await Testimonial.findAll({ limit: 3 });
    const resultado = await Promise.all(promiseDB)

    res.render('inicio', {
      pagina: 'Inicio',
      clase: 'home',//pasa un nombre de clase en este caso home, a la variable clase
      viajes: resultado[0], //indicamo el resultado obtenido en la posicion[0] donde se encuentra viajes
      resultadoTestimoniales: resultado[1] //indicamo el resultado obtenido en la posicion[1] donde se encuentra testimoniales
    })

  } catch (error) {

    console.log(error);

  }


}

//Nosotros
const paginaNosotros = (req, res) => {
  res.render('nosotros', {
    pagina: 'Nosotros'

  })
}

//Viajes
const paginaViajes = async (req, res) => {

  //consultar bases de datos
  const viajes = await Viaje.findAll();//realizamos una query sobre todo lo que haya en esa tabla
  //console.log(viajes);

  res.render('viajes', {
    pagina: 'Próximos viajes',//titulo de la pagina
    viajes: viajes

  });

}

//Testimoniales
const PaginaTestimoniales = async (req, res) => {

  try {

    const testimoniales = await Testimonial.findAll();
    console.log(testimoniales);

    res.render('testimoniales', {
      pagina: 'testimoniales',
      resultadoTestimoniales: testimoniales

    });

  } catch (error) {
    console.log(error)
  }



}

//Muestra un viaje por su slug
const paginaDetalleViaje = async (req, res) => {
  //console.log(req.params.viaje); req.params obtenemos los valores de le los parametros enviados

  const { slug } = req.params;//recogemos los datos enviados en los parametros

  try {

    const viajeSlug = await Viaje.findOne({ where: { slug: slug } });// filtramos el slug de la base de datos con el viaje seleccionado 

    res.render('viaje', {
      pagina: 'Informacion Viaje',
      viajeSlug: viajeSlug

    })

  } catch (error) {
    console.log(error);

  }

}

export {
  paginaInicio,
  paginaNosotros,
  paginaViajes,
  PaginaTestimoniales,
  paginaDetalleViaje
}