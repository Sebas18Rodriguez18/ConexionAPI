let = formulario = document.getElementById('formulario')
let = respuestaDiv = document.getElementById('respuesta')

formulario.addEventListener('submit', function(e){
    e.preventDefault()

    let datos = new FormData(formulario)
    console.log(datos.get('nombre'))
    console.log(datos.get('password'))

    fetch('recibir.fetch.php', {
        method: 'POST',
        body: datos
    })
    .then(res => res.json())
    .then(data => {

        if(data === 'error'){
            //alert('Rellene todos los campos')
            respuestaDiv.innerHTML = `<div class="alert alert-danger" role="alert">
                     Todos los campos deben ser registrados </div>`;
        }else{
            respuestaDiv.innerHTML = `<div class="alert alert-success" role="alert">
                    ${data}</div>`;
        }
    })
    .catch(err => {
        console.log(err);
    })
})