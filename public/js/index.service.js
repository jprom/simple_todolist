'use strict';

const tabla = document.querySelector("#tbl-tareas tbody");

const limpiar = () => {

    const imagen = document.querySelector("#img-foto");
    const input_fecha = document.querySelector('#input-fecha');
    const input_nombre = document.querySelector('#input-nombre');
    const input_encargado = document.querySelector('#input-encargado');
    const input_descripcion = document.querySelector('#input-descripcion');
    const input_imagen = document.querySelector('#img-foto');

    imagen.src = "";
    input_fecha.value = "";
    input_nombre.value = "";
    input_encargado.value = "";
    input_descripcion.value = "";
    input_imagen.src = "";
}

const registrar_tarea = async(input_fecha, input_nombre, input_encargado, input_descripcion, input_imagen, prioridadValue) => {
    await axios({
        method: 'post',
        url: 'http://localhost:3000/api/registrar-tarea',
        responseType: 'json',
        data: {
            fecha: input_fecha,
            nombre: input_nombre,
            descripcion: input_descripcion,
            prioridad: prioridadValue,
            encargado: input_encargado,
            imagen: input_imagen

        }
    }).then((response) => {
        Swal.fire({
            'icon': 'success',
            'title': 'Su tarea ha sido registrada',
            'text': response.msj
        }).then(() => {
            limpiar();
            listar_tarea();
        });
    }).catch((response) => {
        Swal.fire({
            'icon': 'error',
            'text': response.msj,
            'title': 'Ocurrió un error inesperado',
        }).then(() => {});
    });
};


const listar_tarea = async() => {
    let lista_tareas = [];
    await axios({
        method: 'get',
        url: 'http://localhost:3000/api/listar-tareas',
        responseType: 'json'
    }).then((response) => {

        lista_tareas = response.data.lista_tareas;
        console.log(lista_tareas);

        tabla.innerHTML = "";
        lista_tareas.forEach((tarea, i) => {
            let fila = tabla.insertRow();
            fila.insertCell().innerHTML = i + 1;
            fila.insertCell().innerHTML = tarea.nombre;
            fila.insertCell().innerHTML = tarea.encargado;
            fila.insertCell().innerHTML = tarea.descripcion;
            let cellPrioridad = fila.insertCell();
            if (tarea.prioridad == "Alta") {
                cellPrioridad.classList.add('prioridad-alta');
                cellPrioridad.innerHTML = tarea.prioridad
            } else if (tarea.prioridad == "Media") {
                cellPrioridad.classList.add('prioridad-media');
                cellPrioridad.innerHTML = tarea.prioridad
            } else if (tarea.prioridad == "Baja") {
                cellPrioridad.classList.add('prioridad-baja');
                cellPrioridad.innerHTML = tarea.prioridad
            }

            fila.insertCell().innerHTML = '<img src="' + tarea.imagen + '" class="list-img">';
            fila.insertCell().innerHTML = tarea.fecha;


        });

    }).catch((response) => {
        console.log(response.data.msj + " " + response.data.err);
    });
    return lista_tareas;
}

const modificar_tarea = async(_id, fecha_reserva, salon, cant_personas, direccion, telefono) => {
    await axios({
        method: 'put',
        url: 'http://localhost:3000/api/modificar-reserva',
        responseType: 'json',
        data: {
            _id: _id,
            fecha_reserva: fecha_reserva,
            salon: salon,
            cant_personas: cant_personas,
            direccion: direccion,
            telefono: telefono
        }
    }).then((response) => {
        Swal.fire({
            'icon': 'success',
            'title': 'Su reserva ha sido modificada',
            'text': response.msj
        }).then(() => {
            //deberia volver a cargar toda la lsita de tareas
            mostrar_tareas();
        });
    }).catch((response) => {
        Swal.fire({
            'icon': 'error',
            'title': 'Ocurrio un error inesperado',
            'text': response.msj
        })
    })
}