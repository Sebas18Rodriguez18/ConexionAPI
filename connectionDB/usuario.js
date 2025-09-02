let mostrar = document.getElementById('ltsUsuarios')

let btnMostrar = document.getElementById('mostrar')

btnMostrar.addEventListener('click', function(){
    let datos = new FormData();
    datos.append('action', 'mostrar');

    fetch('usuarios.fetch.php', {
        method: 'POST',
        body: datos
    })
    .then(res => res.json())
    .then(data => {
        console.log(data);
    })
})