$(document).on("click", "#mostrar", function () {
    let datos = new FormData();
    datos.append('action', 'mostrar');

    $.ajax({
        url: 'usuarios.ajax.php',
        type: 'POST',
        data: datos,
        processData: false,
        contentType: false,
        dataType: 'json',
        success: function (data) {
            // console.log("Datos recibidos:", data);
            llenarTabla(data);
        },
        error: function (err) {
            console.error("Error en la petición AJAX", err);
        }
    });
});
//funciones editar y eliminar
$(document).on('click', '.eliminar', function(){
    let id = $(this).attr('data-id');
    // console.log(id);
    let datos = new FormData();
    datos.append('action', 'eliminar');
    datos.append('id', id);

    $.ajax({
        url: 'usuarios.ajax.php',
        type: 'POST',
        data: datos,
        processData: false,
        contentType: false,
        dataType:'json',
        success: function(data){
            console.log(data)
            if(data == 'error'){
                alert('Error al eliminar el registro');
            } else {
                alert('Registro eliminado');
                $("#mostrar").click();
            }
        }
    });
});


$(document).on("click", ".editar", function () {
  let id = $(this).attr('data-id');
  let nombre = $(this).attr('nombre');
  let correo = $(this).attr('email');
    $("#id").val(id)
    $("#nombre").val(nombre)
    $("#email").val(correo)

//   let datos = new FormData();
//   datos.append('action', 'editar');
//   datos.append('id', id);
//   $.ajax({
//     url: 'usuarios.ajax.php',
//     type: 'POST',
//     data: datos,
//     processData: false,
//     contentType: false,
//     dataType:'json',
//     success: function(data){
//       $("#id").val(data.id)
//       $("#nombre").val(data.fullname)
//       $("#email").val(data.email)
//     }
//   });
});

$(document).on('click', '#guardar', function(){
    let id = $("#id").val();
    let nombre = $("#nombre").val();
    let email = $("#email").val();
    // console.log(id, nombre, email);
    let datos = new FormData();
    datos.append('action', 'guardar');
    datos.append('id', id);
    datos.append('nombre', nombre);
    datos.append('email', email);

    $.ajax({
    url: 'usuarios.ajax.php',
    type: 'POST',
    data: datos,
    processData: false,
    contentType: false,
    dataType:'json',
    success: function(data){
        // console.log(data)
        if(data == 'ok'){
            alert('Registro actualizado');
        } else {
            alert('Error al actualizar el registro');
        }
        $("#mostrar").click();
    }
    });
});

function llenarTabla(datos) {
    let tbody = document.querySelector("#tablaUsuarios tbody");
    let html = "";

    datos.forEach((item, index) => {
        html += `
            <tr>
                <td>${index + 1}</td>
                <td>${item.fullname || item.nombre || ''}</td>
                <td>${item.email || ''}</td>
                <td>
                    <button class="btn btn-warning btn-sm editar" data-id="${item.id}" nombre="${item.fullname}" email="${item.email}">
                        Editar
                        <i class="bi bi-pencil-square"></i>
                    </button>
                    <button class="btn btn-danger btn-sm eliminar" data-id="${item.id}">
                        Eliminar
                        <i class="bi bi-trash3-fill"></i>
                    </button>
                </td>
            </tr>
        `;
    });

    tbody.innerHTML = html;
}



// btnMostrar.addEventListener('click', function(){
//     let datos = new FormData();
//     datos.append('action', 'mostrar');

//     fetch('usuarios.fetch.php', {
//         method: 'POST',
//         body: datos
//     })
//     .then(res => res.json())
//     .then(data => {
//         console.log(data);
//     })
// })