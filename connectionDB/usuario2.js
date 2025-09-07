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
        alert('Error al eliminar');
      }
    }
  });
});

$(document).on("click", ".editar", function () {
  $("#id").val($(this).attr('data-id'));
  $("#nombre").val($(this).attr('nombre'));
  $("#email").val($(this).attr('email'));
});

$(document).on('click', '#guardar', function (e) {
  e.preventDefault();

  let id = $("#id").val();
  let nombre = $("#nombre").val();
  let email = $("#email").val();
  let password = $("#password").val();

  let datos = new FormData();

  if (id === "") {
    datos.append('action', 'crear');
    datos.append('password', password);
  } else {
    datos.append('action', 'actualizar');
    datos.append('id', id);
  }

  datos.append('nombre', nombre);
  datos.append('email', email);

  $.ajax({
    url: 'usuarios.ajax.php',
    type: 'POST',
    data: datos,
    processData: false,
    contentType: false,
    dataType: 'json',
    success: function (data) {
      if (data == 'ok') {
        alert('Operación exitosa');
        $("#formulario")[0].reset();
        $("#mostrar").click();
      } else {
        alert('Error en la operación');
      }
    }
  });
});

$(document).on('click', '#actualizar', function () {
  let id = $("#id").val();
  let nombre = $("#nombre").val();
  let email = $("#email").val();

  let datos = new FormData();
  datos.append('action', 'actualizar');
  datos.append('id', id);
  datos.append('nombre', nombre);
  datos.append('email', email);

  $.ajax({
    url: 'usuarios.ajax.php',
    type: 'POST',
    data: datos,
    processData: false,
    contentType: false,
    dataType: 'json',
    success: function (data) {
      if (data == 'ok') {
        alert('Registro actualizado');
        $("#mostrar").click();
      } else {
        alert('Error al actualizar');
      }
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
        <td>${item.fullname || ''}</td>
        <td>${item.email || ''}</td>
        <td>
          <button class="btn btn-warning btn-sm editar" 
                  data-id="${item.id}" 
                  nombre="${item.fullname}" 
                  email="${item.email}">
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