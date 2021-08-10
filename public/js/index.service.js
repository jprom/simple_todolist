'use strict';

const registrar_tarea = async(input_fecha, input_nombre, input_encargado, input_nombre, input_descripcion, input_imagen, prioridadValue) => {
    await axios({
        method: 'post',
        url: 'http://localhost:3000/api/registrar-reservacion',
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
            'title': 'Su reserva ha sido enviada',
            'text': response.msj
        }).then(() => {
            limpiar();
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
    let lista_reservaciones = [];
    await axios({
        method: 'get',
        url: 'http://localhost:3000/api/listar-tareas',
        responseType: 'json'
    }).then((response) => {
        lista_reservaciones = response.data.lista_reservaciones;
    }).catch((response) => {
        console.log(response.data.msj + " " + response.data.err);
    });
    return lista_reservaciones;
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
            //deberia volver a cargar toda la lsita de reservaciones
            mostrar_reservaciones();
        });
    }).catch((response) => {
        Swal.fire({
            'icon': 'error',
            'title': 'Ocurrio un error inesperado',
            'text': response.msj
        })
    })
}