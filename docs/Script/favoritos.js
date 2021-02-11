const logo = document.querySelector('.logo')
const body = document.querySelector('body')
const btnCrear = document.querySelector('#btn-crear')


if(persistFavs !== null){
    favs = persistFavs
}

if(localStorage.getItem('nocturno')) {
    body.classList.add('nocturno');
    logo.src = 'Recursos/logo-mobile-modo-noct.svg'
    btnCrear.src = 'Recursos/CTA-crear-gifo-modo-noc.svg'
    btnNextImg.src = 'Recursos/button-slider-right-md-noct.svg'
    btnPrevImg.src = 'Recursos/button-slider-left-md-noct.svg'
}

if(favs.length < 1){
    document.querySelector('.no-resultado').style.display = 'flex'
}

favs.forEach (gif =>{ 
    const contFavs = document.querySelector('.favs')
    const divGif = document.createElement('div')
    divGif.classList.add('resultado-gif')

    const imgGif = document.createElement('img')
    imgGif.classList.add('gif')
    imgGif.setAttribute('src', gif.img)
    contFavs.appendChild(imgGif)

    elementosHover(gif, divGif, contFavs, imgGif)    
})

modoNocturno.addEventListener('click', () => {
    document.body.classList.toggle('nocturno')
    logo.src = 'Recursos/logo-mobile-modo-noct.svg'
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