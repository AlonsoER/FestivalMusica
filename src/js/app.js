document.addEventListener('DOMContentLoaded', function(){ // Inicializo la funcion de iniciarApp
    iniciarApp();
});

function iniciarApp(){ // Esta funcion inicializa la funcion de crearGaleria
    crearGaleria();
}

function crearGaleria(){ // Creo la funcion que va a crear la galeria
    const galeria = document.querySelector('.galeria-imagenes'); // Selecciono la clase en donde voy a insertar las imagenes

    for(let i = 1; i <= 12; i++){ // Hago un recorrido con respecto a la cantidad de fotos que voy a agregar
        const imagen = document.createElement('picture') // Creo para cada imagen una etiqueta picture
        imagen.innerHTML = `
        <source srcset="build/img/thumb/${i}.avif" type="image/avif">
        <source srcset="build/img/thumb/${i}.webp" type="image/webp">
        <img loading="lazy" width="200" height="300" src="build/img/thumb/${i}.jpg" alt="Imagen galeria">
        `; // Este codigo HTML accede a la ruta donde se encuentra la imagen y selecciona la mejor opcion ya sea .AVIF, .WEBP o JPG
        galeria.appendChild(imagen); // la constante de galeria almacena los datos de la constante imagen y este los muestra en la pagina
    }
}