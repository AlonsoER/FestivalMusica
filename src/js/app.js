document.addEventListener('DOMContentLoaded', function(){ // Inicializo la funcion de iniciarApp
    iniciarApp();
});

function iniciarApp(){ // Esta funcion inicializa la funcion de crearGaleria
    crearGaleria();
    scrollNav();
    navegacionFija();
}

// Esta funcion hace que el cuando precione un boton de la barra de nav haga una animacion mas buena
function scrollNav(){
    const enlaces = document.querySelectorAll('.navegacion-principal a');
    enlaces.forEach( enlace => {
        enlace.addEventListener('click', function(e){
            e.preventDefault();
            const seccion = document.querySelector(e.target.attributes.href.value);
            seccion.scrollIntoView( {behavior: "smooth"});
        });
    });
}

function navegacionFija(){
    const barra = document.querySelector('.header');
    const sobreFestival = document.querySelector('.sobre-festival');
    const body = document.querySelector('body');

    window.addEventListener('scroll', function(){
        if(sobreFestival.getBoundingClientRect().top < 0){
            barra.classList.add('fijo');
            body.classList.add('body-scroll');
        }else{
            barra.classList.remove('fijo');
            body.classList.remove('body-scroll');
        }
    });
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
        
        imagen.onclick = function(){ // Creo un evento que llama a una funcion que cuando haga click en una imagen esta se haga grande
            mostrarImagen(i);
        }
        galeria.appendChild(imagen); // La constante de galeria almacena los datos de la constante imagen y este los muestra en la pagina
    }
}

function mostrarImagen( id ){ // Este metodo sirve para llamar a una imagen en especifico
    const imagen = document.createElement('picture') // Creo para cada imagen una etiqueta picture
        imagen.innerHTML = `
        <source srcset="build/img/grande/${id}.avif" type="image/avif">
        <source srcset="build/img/grande/${id}.webp" type="image/webp">
        <img loading="lazy" width="200" height="300" src="build/img/grande/${id}.jpg" alt="Imagen galeria">
        `; // Este codigo HTML accede a la ruta donde se encuentra la imagen y selecciona la mejor opcion ya sea .AVIF, .WEBP o JPG

        // Crea el overlay con la imagen
        const overlay = document.createElement('DIV'); // Creo div
        overlay.appendChild(imagen); // El overlay se guarda la imagen y la presenta en la pagina
        overlay.classList.add('overlay'); // Le hago una clase al overlay para modificarla luego
        overlay.onclick = function(){ // Elimino la clase de fijar body si preciono cualquier parte del body
            const body = document.querySelector('body'); // En la consto body selecciono todo el body del index.html
            body.classList.remove('fijar-body'); // Elimino esta clase cuando cierre la imagen para poder dar scroll al body
            overlay.remove();
        }

        // Boton para cerrar la imagen selecionada
        const cerrarFoto = document.createElement('P');
        cerrarFoto.textContent = "X";
        cerrarFoto.classList.add('btn-cerrar');

        cerrarFoto.onclick = function(){ // Esta funcion cierra el overlay, es decir la imagen seleccionada
            const body = document.querySelector('body'); // En la consto body selecciono todo el body del index.html
            body.classList.remove('fijar-body'); // Elimino esta clase cuando cierre la imagen para poder dar scroll al body
            overlay.remove();
        };
        overlay.appendChild(cerrarFoto);

        // Añade el overlay al HTML
        const body = document.querySelector('body'); // En la consto body selecciono todo el body del index.html
        body.appendChild(overlay); // En el body muestro el overlay, que vendria siendo la imagen que seleccioné
        body.classList.add('fijar-body'); // Esta clase es para fijar el body mientras haya una imagen abierta
}