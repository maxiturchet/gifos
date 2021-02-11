

const srcFav = new URL('Recursos/icon-fav.svg', document.baseURI).href
const srcFavActiveSvg = new URL('Recursos/icon-fav-active.svg', document.baseURI).href
const srcFavActive = new URL('Recursos/icon-fav-active.jpg', document.baseURI).href
const srcFavHover = new URL('Recursos/icon-fav-hover.svg', document.baseURI).href
const modoNocturno = document.querySelector('.nocturno')
const contenedorMenu = document.querySelector('.menu-contenedor')
const aMenu = document.querySelectorAll('.menu-contenedor a')
const facebook = document.querySelector('#facebook')
const twitter = document.querySelector('#twitter')
const instagram = document.querySelector('#instagram')
const btnCrearActive = document.querySelector('#btn-crear')
let persistFavs = JSON.parse(window.localStorage.getItem('favoritos'))
let persistGifos = JSON.parse(window.localStorage.getItem('misgifos'))
let favs = []
let gifos = []

for (let i = 0; i < aMenu.length; i++) {
    if (aMenu[i].href == document.URL) {
        aMenu[i].style.color = '#9CAFC3';
    }if(aMenu[3].href == document.URL){
        btnCrearActive.src = 'Recursos/CTA-crear-gifo-active-modo-noc.svg'
    }
}

modoNocturno.addEventListener( 'click', () => {
    if(body.classList != 'nocturno'){
        window.localStorage.setItem('nocturno', true)
    }else{
        window.localStorage.removeItem('nocturno')
    };
})

// Add y Remove GIFOS
if(persistGifos !== null){
    gifos = persistGifos
}

const addGifoDiv = gif =>{
    const contNewGifo = document.querySelector('.gifos')
    const divNewGifo = document.createElement('div')
    divNewGifo.classList.add('resultado-gif')
    const imgNewGifo = document.createElement ('img')
    imgNewGifo.classList.add('gif')
    imgNewGifo.setAttribute('src', gif.images.original.url)
    contNewGifo.appendChild(imgNewFav)    
    elementosHover(gif, divNewGifo, contNewGifo, imgNewGifo)
}

const removeGifoDiv = gif =>{ 
    const gifosDiv = document.querySelector('.gifos')
    const hijosGifos = gifosDiv.childNodes
    hijosGifos.forEach( hijo => { 
        if(hijo.lastChild.src == (gif.img || gif.images.original.url)){
            hijo.parentNode.removeChild(hijo)
        }
    })
}

const removeGifo = gif =>{
    for(let i = 0; i < gifos.length; i++){ 
        if (gifos[i].id === gif.id){        
           gifos.splice(i, 1)
        }
    }
    window.localStorage.setItem('misgifos', JSON.stringify(gifos))
}

//Add y Remove FAV y GIF de Favoritos
if(persistFavs !== null){
    if (persistFavs.length > 0){
    favs = persistFavs
    }
}

const addGif = gif =>{
    const contNewFav = document.querySelector('.favs')
    const divNewFav = document.createElement('div')
    divNewFav.classList.add('resultado-gif')
    const imgNewFav = document.createElement ('img')
    imgNewFav.classList.add('gif')
    imgNewFav.setAttribute('src', gif.images.original.url)
    contNewFav.appendChild(imgNewFav)
    document.querySelector('.no-resultado').style.display = 'none'
    elementosHover(gif, divNewFav, contNewFav, imgNewFav)
}
const addFav = gif =>{
    const newFav = {
        usuario: gif.username,
        titulo: gif.title,
        img: gif.images.original.url,
        id: gif.id
    }
    favs.push(newFav)
    window.localStorage.setItem('favoritos', JSON.stringify(favs))
}
const removeGif = gif =>{ 
    const favsDiv = document.querySelector('.favs')
    const hijosFavs = favsDiv.childNodes
    hijosFavs.forEach( hijo => { 
        if(hijo.lastChild.src == (gif.img || gif.images.original.url)){
            hijo.parentNode.removeChild(hijo)
        }
    })
}

const removeFav = gif =>{
    for(let i = 0; i < favs.length; i++){ 
        if (favs[i].id === gif.id){        
           favs.splice(i, 1)
        }
    }
    window.localStorage.setItem('favoritos', JSON.stringify(favs))
}

const elementosHover = (gif, div, contenedor, img) => {     
    //Crea div usuario y titulo de cada Gif
        const divPar = document.createElement('div')
        divPar.classList.add('divPar')
        
        const usuario = document.createElement('p')
        usuario.classList.add('gif-usuario')
        usuario.textContent = gif.username || gif.usuario
        
        const titulo = document.createElement('p')
        titulo.classList.add('gif-titulo')
        titulo.textContent = gif.title || gif.titulo 

    //Crear divAction
        const divActions = document.createElement('div')
        divActions.classList.add('action')

    //Boton e imagen Fav
        const btnFav = document.createElement('button')
        btnFav.classList.add('btnFav')
        const iconFav = document.createElement('img') 
        iconFav.classList.add('action-fav')
        iconFav.src = 'Recursos/icon-fav.svg'

    //Boton e imagen Descargar
        const btnDescarga = document.createElement('button')
        btnDescarga.classList.add('btnDescarga')
        const iconDescarga = document.createElement('img')
        iconDescarga.classList.add('action-descarga')
        iconDescarga.src = 'Recursos/icon-download.svg'
    
    //Boton e imagen Ampliar
        const btnAmpliar = document.createElement('button')
        btnAmpliar.classList.add('btnAmpliar') 
        const iconAmpliar = document.createElement('img')
        iconAmpliar.classList.add('action-ampliar')
        iconAmpliar.src = 'Recursos/icon-max-normal.svg' 

    //Saber si el Gif esta en Favoritos   
        const isExist = favs.filter(fav => fav.id === gif.id)
        if(isExist.length > 0){
            iconFav.setAttribute ('src', 'Recursos/icon-fav-active.jpg')
        }else{
            iconFav.setAttribute ('src', 'Recursos/icon-fav.svg')
        }

        div.appendChild(divActions)
        btnFav.appendChild(iconFav)
        divActions.appendChild(btnFav) 
        divActions.appendChild(btnDescarga)            
        btnDescarga.appendChild(iconDescarga)
        divActions.appendChild(btnAmpliar)
        btnAmpliar.appendChild(iconAmpliar)
    
    //Div Titulo y Usuario de Gif Hover
        div.appendChild(divPar)
        divPar.appendChild(usuario)
        divPar.appendChild(titulo)
        div.appendChild(img)

    //Agregar y eliminar Gif - Activar y desactivar icono Fav
        const activeFav = () =>{
            if(iconFav.src == srcFavHover){
                
                iconFav.setAttribute('src', srcFavActive)
                addFav(gif)
                addGif(gif)
                return
            }if(iconFav.src == srcFavActive){
                removeFav(gif)
                removeGif(gif)
                iconFav.setAttribute('src', srcFav)
            }
        }

    //Fav active Mobile
        const activeFavMobile = () =>{
            if(spanFav.src == srcFav){
                spanFav.setAttribute('src', srcFavActive)
                addFav(gif)
                addGif(gif)
                return
            }if(spanFav.src == srcFavActive){
                removeFav(gif)
                removeGif(gif)
                spanFav.setAttribute('src', srcFav)
            }
        }
    
    //Evento click de Fav mobile (imagen ampliada)
        const modal = document.querySelector ('.modal')
        const modalImg = document.querySelector ('.modal-img')
        const captionUser = document.querySelector ('.user-modal')
        const captionTitulo = document.querySelector ('.titulo-modal')
        const spanClose = document.querySelector ('.close-modal')
        const spanFavoritos = document.querySelector('.fav-modal')
        const spanFav = document.querySelector ('.fav-modal img')
        const spanDescarga = document.querySelector ('.descarga-modal')

        const modalFuncion = () => {     
            modal.style.display = 'block'
            modalImg.src = img.src
            captionUser.textContent = gif.username || gif.usuario
            captionTitulo.textContent = gif.title || gif.titulo

            if(iconFav.src == srcFavActive){
                spanFav.src = srcFavActiveSvg
            }
            
            spanClose.addEventListener('click', () =>{
                modal.style.display = 'none'
            })
    
            spanFavoritos.addEventListener('click', () =>{
                activeFavMobile()
            })
    
    //Descarga Gif Mobile       
            const descargaMobile = (async gif => {
                let a = document.createElement('a');
                let response = await fetch(gif.img || gif.images.original.url);
                let file = await response.blob();
                a.download = gif.title;
                a.href = window.URL.createObjectURL(file);
                a.dataset.downloadurl = ['application/octet-stream', a.download, a.href].join(':');
                a.click();
            });          
     
            spanDescarga.addEventListener('click', () =>{
                descargaMobile(gif)
            })
        }
        
        img.addEventListener('click', modalFuncion)
    
    //Eventos boton Fav
        btnFav.addEventListener('mouseover', () => {
            if(iconFav.src == srcFav){
                iconFav.src = 'Recursos/icon-fav-hover.svg'
            }
        })
        btnFav.addEventListener('mouseout', () =>{
            if(iconFav.src == srcFavHover){
                iconFav.src = 'Recursos/icon-fav.svg'
            }
        })

        btnFav.addEventListener('click', () =>{
            activeFav()
        })  

    //Descarga Gif Desktop
        const descargaDesktop = (async gif => {
            let a = document.createElement('a');
            let response = await fetch(gif.images.original.url);
            let file = await response.blob();
            a.download = gif.title;
            a.href = window.URL.createObjectURL(file);
            a.dataset.downloadurl = ['application/octet-stream', a.download, a.href].join(':');
            a.click();
          });   

    //Eventos boton Descarga
        btnDescarga.addEventListener('mouseover', () =>{
            iconDescarga.src = 'Recursos/icon-download-hover.svg'
        })

        btnDescarga.addEventListener('mouseout', () =>{
            iconDescarga.src = 'Recursos/icon-download.svg'
        })

        btnDescarga.addEventListener('click', () =>{
            descargaDesktop(gif)
        })

    //Eventos boton Ampliar imagen
        btnAmpliar.addEventListener('mouseover', () => {
            iconAmpliar.src = 'Recursos/icon-max-hover.svg'
        })

        btnAmpliar.addEventListener('mouseout', () => {
            iconAmpliar.src = 'Recursos/icon-max-normal.svg'
        })

        btnAmpliar.addEventListener('click', modalFuncion)

        contenedor.appendChild(div)
}

// Hover Redes sociales 
    facebook.addEventListener('mouseover', () =>{
        facebook.src = 'Recursos/icon_facebook_hover.svg'
    })
    facebook.addEventListener('mouseout', () =>{
        facebook.src = 'Recursos/icon_facebook.svg'
    })
    twitter.addEventListener('mouseover', () =>{
        twitter.src = 'Recursos/icon-twitter-hover.svg'
    })
    twitter.addEventListener('mouseout', () =>{
        twitter.src = 'Recursos/icon-twitter.svg'
    })
    instagram.addEventListener('mouseover', () =>{
        instagram.src = 'Recursos/icon_instagram-hover.svg'
    })
    instagram.addEventListener('mouseout', () =>{
        instagram.src = 'Recursos/icon_instagram.svg'
    })

//Gifs Trendign Carousel
const gifsTrending = () =>{ 
trendingsGifsAPI() 
    .then(gifs =>{
        gifs.data.forEach(gif => {
            const carousel = document.querySelector('.carousel-interno')
        //Crea div Action
            const divGif = document.createElement ('div')
            divGif.classList.add('carousel-gif') 

            const imgGif = document.createElement('img')
            imgGif.classList.add('carousel-img')
            imgGif.setAttribute('src', gif.images.original.url)

            elementosHover(gif, divGif, carousel, imgGif)
        })
    })

// Carousel gifs

    let posicionCarousel = 0
    const carouselGifWidth = 1131

    const carouselNext = e => {
        e.preventDefault()
        if(posicionCarousel < -2260) return;
        const carouselGif = document.querySelectorAll('.carousel-gif')
        const newTranslateX = posicionCarousel - carouselGifWidth
        for(let i = 0; i < carouselGif.length; i++){ 
            carouselGif[i].style.transform = `translateX(${newTranslateX}px)`
        }
        posicionCarousel = newTranslateX
    }
    
    const carouselPrev = e => {
        e.preventDefault()
        if(posicionCarousel == 0) return;
        const carouselGif = document.querySelectorAll('.carousel-gif')
        const newTranslateX = posicionCarousel + carouselGifWidth
        for(let i = 0; i < carouselGif.length; i++){ 
            carouselGif[i].style.transform = `translateX(${newTranslateX}px)`
        }
        posicionCarousel = newTranslateX
    }

    btnNext.addEventListener ('click', carouselNext)
    btnPrev.addEventListener ('click', carouselPrev)
}
    const btnPrev = document.querySelector('.flecha-atras')
    const btnNext = document.querySelector('.flecha-adelante')
    const btnPrevImg = document.querySelector('.flecha-atras img')
    const btnNextImg = document.querySelector('.flecha-adelante img')
    
    

    