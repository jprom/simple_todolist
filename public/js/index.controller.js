'use strict';

const boton_foto = document.querySelector("#btn-foto");
const imagen = document.querySelector("#img-foto");
const input_fecha = document.querySelector('#input-fecha');
const input_nombre = document.querySelector('#input-nombre');
const input_encargado = document.querySelector('#input-encargado');
const input_descripcion = document.querySelector('#input-descripcion');
const input_imagen = document.querySelector('#img-foto');


var myWidget = cloudinary.createUploadWidget({
    cloudName: 'cenfotex',
    uploadPreset: 'examen_proyecto_1'
}, (error, result) => {
    if (!error && result && result.event === "success") {
        console.log('Done! Here is the image info: ', result.info);
    }
})


const obtenerDatos = () => {
    let ele = document.getElementsByName('prioridad');
    let prioridadValue = "";
    for (let i = 0; i < ele.length; i++) {
        if (ele[i].checked) {
            prioridadValue = ele[i].value;
        }
    }
    console.log("prioridad " + prioridadValue);
    registrar_tarea(input_fecha.value, input_nombre.value, input_encargado.value, input_descripcion.value, input_imagen.src, prioridadValue);
};


const validar = () => {
    let error = false;


    //Solo acepte letras    
    let expReg_soloLetras = new RegExp('[a-zA-Z0-9]+$');

    if (input_fecha.value == '') {
        error = true;
        input_fecha.classList.add('error-input');
    } else {
        input_fecha.classList.remove('error-input');
    }

    //Validar si el nombre es vacio
    if (input_nombre.value == '' || !expReg_soloLetras.test(input_nombre.value)) {
        error = true;
        input_nombre.classList.add('error-input');
    } else {
        input_nombre.classList.remove('error-input');
    }

    if (input_encargado.value == '' || !expReg_soloLetras.test(input_encargado.value)) {
        error = true;
        input_encargado.classList.add('error-input');
    } else {
        input_encargado.classList.remove('error-input');
    }


    if (input_descripcion.value == '' || !expReg_soloLetras.test(input_descripcion.value)) {
        error = true;
        input_descripcion.classList.add('error-input');
    } else {
        input_descripcion.classList.remove('error-input');
    }

    const chk_prioridad = document.querySelector('input[name="prioridad"]:checked');
    if (chk_prioridad == null) {
        document.querySelector('.toggle_radio').classList.add('error-input');
    } else {
        document.querySelector('.toggle_radio').classList.remove('error-input');
    }


    //si existe un error, no siga y alerte al usuario
    if (error) {
        Swal.fire({
            'icon': 'warning',
            'title': 'No se pudo crear su tarea',
            "text": "Por favor revise los campos resaltados en rojo"
        });
    } else {
        //si no hubo error. continue el proceso
        obtenerDatos()
    }
}




var widget_cloud = cloudinary.createUploadWidget({
    cloudName: 'nennys',
    uploadPreset: 'preset_nenys'
}, (error, result) => {
    if (!error && result && result.event === "success") {
        console.log('Imagen subida exitosamente', result.info);
        imagen.src = result.info.secure_url;
    }
});

boton_foto.addEventListener("click", function() {
    widget_cloud.open();
}, false);


const botonEnviar = document.querySelector('.submit-btn');
botonEnviar.addEventListener('click', validar);

listar_tarea();