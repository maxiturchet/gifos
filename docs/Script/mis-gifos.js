const logo = document.querySelector('.logo')
const body = document.querySelector('body')
const btnCrear = document.querySelector('#btn-crear')
const iconFav = document.querySelector('.action-fav img')
let ids =[]



if(localStorage.getItem('nocturno')) {
    body.classList.add('nocturno');
    logo.src = 'Recursos/logo-mobile-modo-noct.svg'
    btnCrear.src = 'Recursos/CTA-crear-gifo-modo-noc.svg'
    btnNextImg.src = 'Recursos/button-slider-right-md-noct.svg'
    btnPrevImg.src = 'Recursos/button-slider-left-md-noct.svg'
}

if(persistGifos !== null){
    gifos = persistGifos
}

if(gifos.length < 1){
    document.querySelector('.no-resultado').style.display = 'flex'
}

const elementosHoverGifos = (gifo, div, contenedor, img) => {     
    //Crea div usuario y titulo de cada Gif
        const divPar = document.createElement('div')
        divPar.classList.add('divPar')
        
        const usuario = document.createElement('p')
        usuario.classList.add('gif-usuario')
        usuario.textContent = gifo.username || gifo.usuario
        
        const titulo = document.createElement('p')
        titulo.classList.add('gif-titulo')
        titulo.textContent = gifo.title || gifo.titulo 

    //Crear divAction
        const divActions = document.createElement('div')
        divActions.classList.add('action')

    //Boton e imagen Fav
        const btnFav = document.createElement('button')
        btnFav.classList.add('btnFav')
        const iconFav = document.createElement('img') 
        iconFav.classList.add('action-fav')
        iconFav.src = 'Recursos/icon-fav.svg'

    //Boton e imagen Trash
        const btnTrash = document.createElement('button')
        btnTrash.classList.add('btnFav')
        const iconTrash = document.createElement('img') 
        iconTrash.classList.add('action-fav')
        iconTrash.src = 'Recursos/icon-trash-normal.svg'

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
        const isExist = favs.filter(fav => fav.id === gifo.id)
        if(isExist.length > 0){
            iconFav.setAttribute ('src', 'Recursos/icon-fav-active.jpg')
        }else{
            iconFav.setAttribute ('src', 'Recursos/icon-fav.svg')
        }

        div.appendChild(divActions)
        btnTrash.appendChild(iconTrash)
        divActions.appendChild(btnTrash) 
        divActions.appendChild(btnDescarga)            
        btnDescarga.appendChild(iconDescarga)
        divActions.appendChild(btnAmpliar)
        btnAmpliar.appendChild(iconAmpliar)
    
    //Div Titulo y Usuario de Gif Hover
        div.appendChild(divPar)
        divPar.appendChild(usuario)
        divPar.appendChild(titulo)
        div.appendChild(img)

    //Fav active Mobile
        const activeFavMobile = () =>{
            if(spanFav.src == 'Recursos/icon-fav.svg'){
                spanFav.setAttribute('src', 'Recursos/icon-fav-active.jpg')
                addFav(gifo)
                addGif(gifo)
                return
            }if(spanFav.src == 'Recursos/icon-fav-active.jpg'){
                removeFav(gifo)
                removeGif(gifo)
                spanFav.setAttribute('src', 'Recursos/icon-fav.svg')
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
            captionUser.textContent = gifo.username || gifo.usuario
            captionTitulo.textContent = gifo.title || gifo.titulo

            if(iconFav.src == 'Recursos/icon-fav-active.jpg'){
                spanFav.src = 'Recursos/icon-fav-active.svg'
            }
            
            spanClose.addEventListener('click', () =>{
                modal.style.display = 'none'
            })
    
            spanFavoritos.addEventListener('click', () =>{
                activeFavMobile()
            })
        
        //Descarga Gif Mobile       
            const descargaMobile = (async gifo => {
                let a = document.createElement('a');
                let response = await fetch(gif.images.original.url);
                let file = await response.blob();
                a.download = gifo.title;
                a.href = window.URL.createObjectURL(file);
                a.dataset.downloadurl = ['application/octet-stream', a.download, a.href].join(':');
                a.click();
            });          
     
            spanDescarga.addEventListener('click', () =>{
                descargaMobile(gif)
            })
        }
        
        img.addEventListener('click', modalFuncion)

    //Trash Gifos
    const eliminarGifoDiv = gifo =>{ 
        const gifosDiv = document.querySelector('.gifos')
        const hijosGifos = gifosDiv.childNodes
        hijosGifos.forEach( hijo => { 
            if(hijo.lastChild.src == (gifo.img || gifo.images.original.url)){
                hijo.parentNode.removeChild(hijo)
            }
        })
    }

    const eliminarGifoLocal = gif =>{
        for(let i = 0; i < gifos.length; i++){ 
            if (gifos[i].id === gifo.id){        
               gifos.splice(i, 1)
            }
        }
        window.localStorage.setItem('misgifos', JSON.stringify(gifos))
    }

    //Eventos boton Trash
        btnTrash.addEventListener('mouseover', () => {
                iconTrash.src = 'Recursos/icon-trash-hover.svg'
        })
        btnTrash.addEventListener('mouseout', () =>{
                iconTrash.src = 'Recursos/icon-trash-normal.svg'
        })
        btnTrash.addEventListener('click', () =>{
            eliminarGifoDiv(gifo)
            eliminarGifoLocal(gifo)
        })  

    //Descarga Gif Desktop
        const descargaDesktop = (async gifo => {
            let a = document.createElement('a');
            let response = await fetch(gifo.images.original.url);
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
            descargaDesktop(gifo)
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

const mostrarMisGifos = misGifos => {    
    misGifos.data.forEach( miGifo =>{  
        const contGifos = document.querySelector('.gifos')
        const divGifos = document.createElement('div')
        divGifos.classList.add('resultado-gif')

        const imgGifos = document.createElement('img')
        imgGifos.classList.add('gif')
        imgGifos.setAttribute('src', miGifo.images.original.url)
        contGifos.appendChild(imgGifos)

        elementosHoverGifos(miGifo, divGifos, contGifos, imgGifos)
    })
}

const traerGifos = (async ids=>{
    const misGifos = await getGifosAPI(ids)
    mostrarMisGifos(misGifos)
})

gifos.forEach (gifo =>{
    ids.push(gifo.id)
})
traerGifos(ids)


modoNocturno.addEventListener('click', () => {
    document.body.classList.toggle('nocturno')
    logo.src = 'Recursos/logo-mobile-modo-noct.svg'
    btnCrear.src = 'Recursos/CTA-crear-gifo-modo-noc.svg' 
    if(body.classList != 'nocturno'){
        logo.src='Recursos/logo-mobile.svg'
        btnNextImg.src = 'Recursos/Button-Slider-right.svg'
        btnPrevImg.src = 'Recursos/button-slider-left.svg'
        btnNextImg.addEventListener ('mouseover', () =>{
            btnNextImg.src = 'Recursos/Button-Slider-right-hover.svg'
        })
        btnNextImg.addEventListener ('mouseout', () =>{
            btnNextImg.src = 'Recursos/Button-Slider-right.svg'
        })
        btnPrevImg.addEventListener ('mouseover', () => {
            btnPrevImg.src = 'Recursos/button-slider-left-hover.svg'
        })
        
        btnPrevImg.addEventListener ('mouseout', () => {
            btnPrevImg.src = 'Recursos/button-slider-left.svg'
        })
    }
})

//Gifs Trendign Carousel
gifsTrending()