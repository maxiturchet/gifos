//Elementos Seleccionados
const inputBusqueda = document.querySelector('#busqueda')
const formBusqueda = document.querySelector('.form-busqueda')
const contResultado = document.querySelector('.resultados')
const verMas = document.querySelector('.verMas')
const sugerenciasLi = document.querySelector('.sugerenciasLi')
const lupaIzq = document.querySelector('.lupa-izquierda')
const lupaDer = document.querySelector('.busqueda-lupa')
const lineaBusqueda = document.querySelector('.hr-sugerencias')
const lineaTrending = document.querySelector('.linea')
const botonCerrar = document.querySelector ('.btn-cerrar')
const pBusquedasTrending = document.querySelector('.contenedor-trendingBusquedas .p2')
const pTrending = document.querySelector('.p2')
const tituloBusqueda = document.querySelector('.tituloBusqueda')
const iconFav = document.querySelector('.action-fav img')
const noResultadoDiv = document.querySelector('.no-resultado')
const body = document.querySelector('body')
const logo = document.querySelector('.logo')
const btnCrear = document.querySelector('#btn-crear')

let offsetSearch = 0

if(localStorage.getItem('nocturno')) {
    body.classList.add('nocturno');
    logo.src = 'Recursos/logo-mobile-modo-noct.svg'
    lupaDer.src = 'Recursos/icon-search-modo-noct.svg'
    verMas.src = 'Recursos/CTA-ver+-modo-noc.svg'
    btnCrear.src = 'Recursos/CTA-crear-gifo-modo-noc.svg'
    btnNextImg.src = 'Recursos/button-slider-right-md-noct.svg'
    btnPrevImg.src = 'Recursos/button-slider-left-md-noct.svg'
}

modoNocturno.addEventListener('click', () => {
    document.body.classList.toggle('nocturno')
    lupaDer.src = 'Recursos/icon-search-modo-noct.svg'
    logo.src = 'Recursos/logo-mobile-modo-noct.svg'
    btnNextImg.src = 'Recursos/button-slider-right-md-noct.svg'
    btnPrevImg.src = 'Recursos/button-slider-left-md-noct.svg'
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
    verMas.src = 'Recursos/CTA-ver+-modo-noc.svg'
    btnCrear.src = 'Recursos/CTA-crear-gifo-modo-noc.svg' 
})

//Mostrar los Gifs buscados
    const mostrarGifs = gifs => {
        if (gifs.data.length < 1){
            document.querySelector('.no-resultado').style.display = 'inline-flex'
            tituloBusqueda.textContent = inputBusqueda.value
            verMas.style.display = 'none'
            return;
        }           
            verMas.style.display = 'flex' 
            tituloBusqueda.textContent = inputBusqueda.value

            gifs.data.forEach( gif => {
                const divGif = document.createElement ('div')
                divGif.classList.add('resultado-gif') 
                
                const imgGif = document.createElement('img')
                imgGif.classList.add('gif')
                imgGif.setAttribute('src', gif.images.original.url)

            elementosHover(gif, divGif, contResultado, imgGif)
        })
    }

//Buscar Gifs traidos desde la API
    const buscarGifs = async query =>{
        sugerenciasLi.innerHTML = ''
        const gifs = await traerGifsAPI(query, offsetSearch)
        contResultado.innerHTML = ""
        mostrarGifs(gifs)
        
        sugerenciasLi.style.display = 'none'
        lineaBusqueda.style.display = 'none'
        offsetSearch = gifs.pagination.count
    }

//Evento de la busqueda
    formBusqueda.addEventListener('submit', async (e) => {
        e.preventDefault()
        buscarGifs(inputBusqueda.value)
    })

//Crear sugerencias de busqueda
    const mostrarSugerencias = sugerencias => {
        sugerenciasLi.innerHTML = ""
        sugerencias.forEach(sugerencia => {
            const item = document.createElement('li')
            item.textContent = sugerencia.name
            sugerenciasLi.appendChild(item)
            sugerenciasLi.focus()

            item.addEventListener('click', () =>{
                inputBusqueda.value = sugerencia.name
                buscarGifs(sugerencia.name)
                sugerenciasLi.style.display='none'
            })            
        })
    } 

//Mostrar y quitar sugerencias de Busqueda
    inputBusqueda.addEventListener('keyup', async () => {
        if (inputBusqueda.value == ""){
            lupaIzq.style.display = 'none';
            sugerenciasLi.style.display = 'none'
            if(body.classList == 'nocturno'){
                lupaDer.src = "Recursos/icon-search-modo-noct.svg"
                }else{
                    lupaDer.src = "Recursos/icon-search.svg"
                }
            lineaBusqueda.style.display = 'none'
            verMas.style.display = 'none'
            const items = document.querySelectorAll('sugerenciasLi li')
            if(items){
                for(let i = 0; i < items.length; i++){
                    items[i].remove()
                }
            }
            return;
        }
        lupaIzq.style.display = 'flex'
        lupaDer.src = "Recursos/close.svg"
        if(body.classList == 'nocturno'){
            lupaDer.src = "Recursos/close-modo-noct.svg"
        }
        sugerenciasLi.style.display = 'inline-block'
        lineaTrending.style.display = 'flex'
        lineaBusqueda.style.display = 'flex'
        const sugerencias = await sugerenciasBusquedasAPI(inputBusqueda.value)
            mostrarSugerencias(sugerencias.data)
    })

//Buscar la sugerencia al hacer click
    botonCerrar.addEventListener('click', () => {
        if(inputBusqueda.value !== ""){
            inputBusqueda.value = ""
            lupaIzq.style.display = 'none'
            lineaBusqueda.style.display = 'none'
            if(body.classList == 'nocturno'){
                lupaDer.src = "Recursos/icon-search-modo-noct.svg"
            }else{
                lupaDer.src = "Recursos/icon-search.svg"
            }
            sugerenciasLi.style.display = 'none'
            }else{
                buscarGifs(inputBusqueda.value)
            }        
    })

//Seleccionar con flechas las sugerencias

//Traer 12 Gifs nuevos con 'Ver Mas'
    verMas.addEventListener('click',  async () => {
        const gifs = await traerGifsAPI(inputBusqueda.value, offsetSearch)
        mostrarGifs(gifs)
        offsetSearch += gifs.pagination.count
    })

    verMas.addEventListener('mouseover', () =>{
        if(body.classList != 'nocturno'){
            verMas.src = 'Recursos/CTA-ver-mas-hover.svg'
        }else{
            verMas.src = 'Recursos/CTA-ver+hover-modo-noc.svg'
        }
        
    })

    verMas.addEventListener('mouseout', () =>{
        if(body.classList != 'nocturno'){
            verMas.src = 'Recursos/CTA-ver-mas.svg'
        }else{
            verMas.src = 'Recursos/CTA-ver+-modo-noc.svg'
        }
        
    })

//Traer palabras Trending
    const traerParrafoTrending = async () =>{
        pBusquedasTrending.innerHTML = ''
        const resultado = await busquedasTrendingAPI()
        mostrarTrendingSearch(resultado)
    }

//Mostrar palabras Trending
    const mostrarTrendingSearch = resultado => {
        for(let i = 0; i < 5; i++){
            let resultadoArray = resultado.data[i].charAt(0).toUpperCase() + resultado.data[i].substr(1);
            const coma = ','
            const palabrasTrending = resultadoArray
            let textResultado = palabrasTrending + coma
            if(palabrasTrending[i] == palabrasTrending[4]){
                textResultado = palabrasTrending
            }
            const a = document.createElement('a')
            a.classList.add('a-trending')
            a.setAttribute('href', '#')
            a.textContent = textResultado
            pBusquedasTrending.appendChild(a)
        
            pTrending.addEventListener('click', (event) =>{
                if(inputBusqueda.value !== ""){
                    inputBusqueda.value = ""
                    }
                const trending = (event.target.textContent)
                if(trending.charAt(trending.length -1) == ','){
                    inputBusqueda.value = trending.slice(0,-1)
                }else(inputBusqueda.value = trending)
                buscarGifs(inputBusqueda.value)
                lineaTrending.style.display = 'flex'
            })
        }
    }
    traerParrafoTrending()

//Gifs Trendign Carousel
gifsTrending()