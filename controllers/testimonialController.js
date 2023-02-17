//importamos el modelo en le controlador

import { Testimonial} from '../models/Testimoniales.js'

const guardarTestimonial = async(req, res) => {
    //console.log(req.body);
    const { nombre, correo, mensaje } = req.body;//realiza un destructuring de lo qu ebtenemos del formulario
    const errores =[];

    if (nombre.trim() === '') {
        errores.push({mensaje: 'El nombre esta vacio'});

    }
    if (correo.trim() === '') {
        errores.push({mensaje: 'El correo esta vacio'});

    }
    if (mensaje.trim() === '') {
        errores.push({mensaje: 'El mensaje esta vacio'});

    }

    //console.log(errores);

    if(errores.length > 0){
       //consultar testimoniales Existentes
       const testimoniales = await Testimonial.findAll();

        //Mostramos la misma vista pero con los errores
        res.render('testimoniales',{
            pagina: 'Testimoniales',
            errores: errores,
            nombre: nombre,
            correo: correo,
            mensaje: mensaje,
            resultadoTestimoniales: testimoniales

        })
    }else{
        //Alamcenarlo en la bases de datos

        try {

            //usamos el model de Testimonia e insertamos oe valoresa recogidos del formulario en bases de datos, no realizamos accion de insert, directameten con Testimonial.create lo realiza
            await Testimonial.create({
                nombre:nombre,
                correo:correo,
                mensaje:mensaje

            })

            // despues de la insercion de datos, redirigimos nuevamente la pagina a testimoniales para que no se quede pensando
            res.redirect('/testimoniales');
            
            
        } catch (error) {
            console.log(error)
        }
    }

}

export {
    guardarTestimonial
}