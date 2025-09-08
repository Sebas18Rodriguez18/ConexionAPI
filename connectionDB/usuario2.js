// Mostrar registros
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
            llenarTabla(data);
        },
        error: function (err) {
            console.error("Error en la petición AJAX", err);
        }
    });
});

// Eliminar registro
$(document).on('click', '.eliminar', function () {
    let id = $(this).attr('data-id');
    let datos = new FormData();
    datos.append('action', 'eliminar');
    datos.append('id', id);

    $.ajax({
        url: 'usuarios.ajax.php',
        type: 'POST',
        data: datos,
        processData: false,
        contentType: false,
        dataType: 'json',
        success: function (data) {
            if (data == 'ok') {
                alert('Registro eliminado');
                $("#mostrar").click();
            } else {
                alert('Error al eliminar el registro');
                console.log("Respuesta servidor:", data);
            }
        },
        error: function (err) {
            console.error("Error en la petición AJAX", err);
        }
    });
});

// Editar: cargar datos en el formulario
$(document).on("click", ".editar", function () {
    $("#id").val($(this).attr('data-id'));
    $("#nombre").val($(this).attr('data-nombre'));
    $("#email").val($(this).attr('data-email'));
    $("#document").val($(this).attr('data-document'));
    $("#status").val($(this).attr('data-status'));
    $("#role_id").val($(this).attr('data-role'));
    $("#password").val('');
    $("#password").attr('placeholder', 'Dejar vacío para no cambiar contraseña');
});

// Guardar (crear o actualizar)
$(document).on('click', '#save', function () {
    let id = $("#id").val().trim();
    let nombre = $("#nombre").val().trim();
    let email = $("#email").val().trim();
    let password = $("#password").val().trim();
    let document = $("#document").val().trim();
    let status = $("#status").val();
    let role_id = $("#role_id").val();

    let datos = new FormData();

    if (id === "") {
        // CREAR
        datos.append('action', 'crear');
    } else {
        // ACTUALIZAR
        datos.append('action', 'actualizar');
        datos.append('id', id);
    }

    datos.append('nombre', nombre);
    datos.append('email', email);
    datos.append('document', document);
    datos.append('status', status);
    datos.append('role_id', role_id);

    if (password !== "") {
        datos.append('password', password);
    }

    $.ajax({
        url: 'usuarios.ajax.php',
        type: 'POST',
        data: datos,
        processData: false,
        contentType: false,
        dataType: 'json',
        success: function (data) {
            if (data == 'ok') {
                alert(id === "" ? 'Registro creado' : 'Registro actualizado');
                $("#formulario")[0].reset();
                $("#mostrar").click();
            } else {
                alert('Error en la operación');
                console.log("Respuesta servidor:", data);
            }
        },
        error: function (err) {
            console.error("Error en la petición AJAX", err);
        }
    });
});

// Llenar tabla con los datos
function llenarTabla(datos) {
  if ($.fn.DataTable.isDataTable('#tablaUsuarios')) {
        $('#tablaUsuarios').DataTable().destroy();
    }
    let tbody = document.querySelector("#tablaUsuarios tbody");
    let html = "";

    datos.forEach((item, index) => {
        html += `
            <tr>
                <td>${index + 1}</td>
                <td>${item.fullname || ''}</td>
                <td>${item.email || ''}</td>
                <td>${item.document || ''}</td>
                <td>${item.status || ''}</td>
                <td>${item.role_id || ''}</td>
                <td>
                    <button class="btn btn-warning btn-sm editar" 
                        data-id="${item.id}" 
                        data-nombre="${item.fullname}" 
                        data-email="${item.email}"
                        data-document="${item.document}"
                        data-status="${item.status}"
                        data-role="${item.role_id}">
                        Editar <i class="bi bi-pencil-square"></i>
                    </button>
                    <button class="btn btn-danger btn-sm eliminar" 
                        data-id="${item.id}">
                        Eliminar <i class="bi bi-trash3-fill"></i>
                    </button>
                </td>
            </tr>
        `;
    });

    tbody.innerHTML = html;
    $(document).ready(function () {
      $('#tablaUsuarios').DataTable({
        "paging": true,
        "serverside": true
      });
    });
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