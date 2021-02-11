const videoHover = document.querySelector('.hover-video')
const videoCont = document.querySelector('.video')
const video = document.querySelector('video')
const crearParrafo = document.querySelector('.p-crear')
const accesoParrafo = document.querySelector('.p-acceso')
const cargaParrafo = document.querySelector('.p-carga')
const subidoParrafo = document.querySelector('.subido')
const btnComenzar = document.querySelector(".btn-comenzar")
const btnGrabar = document.querySelector(".btn-grabar")
const btnFinalizar = document.querySelector(".btn-finalizar")
const btnSubir = document.querySelector(".btn-subir")
const circulo1 = document.querySelector('#circulo-paso-1')
const circulo2 = document.querySelector('#circulo-paso-2')
const circulo3 = document.querySelector('#circulo-paso-3')
const parrafo1 = document.querySelector('.p-paso-1')
const parrafo2 = document.querySelector('.p-paso-2')
const parrafo3 = document.querySelector('.p-paso-3')
const tiempoGrabacion = document.querySelector('.tiempo-grabacion')
const repetirGrabacion = document.querySelector('.repetir')
const descargaGifo = document.querySelector('.descarga-gifo')
const linkGifo = document.querySelector('.link-gifo')
const logo = document.querySelector('.logo')
const body = document.querySelector('body')
const btnCrear = document.querySelector('#btn-crear')
const rollo = document.querySelector('#rollo')
const camara = document.querySelector('#camara')
const iconDescarga = document.querySelector('#descarga-crear-gifo')
const iconLink = document.querySelector('#link-crear-gifo')
const contLink = document.querySelector('.contLink')


if(localStorage.getItem('nocturno')) {
    body.classList.add('nocturno');
    logo.src = 'Recursos/logo-mobile-modo-noct.svg'
    btnCrear.src = 'Recursos/CTA-crear-gifo-modo-noc.svg' 
    rollo.src = 'Recursos/pelicula-modo-noc.svg'
    camara.src = 'Recursos/camara-modo-noc.svg'
}

modoNocturno.addEventListener('click', () => {
    document.body.classList.toggle('nocturno')
    logo.src = 'Recursos/logo-mobile-modo-noct.svg'
    rollo.src = 'Recursos/pelicula-modo-noc.svg'
    camara.src = 'Recursos/camara-modo-noc.svg'
    btnCrear.src = 'Recursos/CTA-crear-gifo-modo-noc.svg' 
    if(body.classList != 'nocturno'){
        logo.src='Recursos/logo-mobile.svg'
        rollo.src = 'Recursos/pelicula.svg'
        camara.src = 'Recursos/camara.svg'
        btnCrear.src = 'Recursos/CTA-crear-gifo.svg' 
        btnCrearActive.src = 'Recursos/CTA-crear-gifo-active-modo-noc.svg'
    }
})

btnComenzar.addEventListener('click', () =>{
    crearParrafo.style.display = 'none'
    accesoParrafo.style.display = 'block'
    btnComenzar.style.display = 'none'
    parrafo1.style.color = '#FFF'
    circulo1.style.backgroundColor = '#572EE5'
    getVideo()
})

const getVideo = () => { 
    navigator.mediaDevices.getUserMedia({
    audio: false,
    video:{
       height: { max: 480 }
    }
    })
 .then(stream => {
    video.srcObject = stream;
    video.play()

    const recorder = RecordRTC(stream, {
        type: 'gif',
        frameRate: 1,
        quality: 10,
        width: 360,
        hidden: 240,
        onGifRecordingStarted: () => {
         console.log('Grabando')
       }
    })
    btnGrabar.addEventListener('click', () =>{
        parrafo2.style.color = '#572EE5'
        circulo2.style.backgroundColor = '#FFF'
        parrafo2.style.color = '#FFF'
        circulo2.style.backgroundColor = '#572EE5'
        btnGrabar.style.display = 'none'
        btnFinalizar.style.display = 'inline-flex'
        comenzarReloj()
        recorder.startRecording()
    })
    
    btnFinalizar.addEventListener('click', () => {
        btnFinalizar.style.display = 'none'
        btnSubir.style.display = 'inline-flex'
        repetirGrabacion.style.display = 'block'
        tiempoGrabacion.style.display= 'none'
        comenzarReloj()
        recorder.stopRecording(async () =>{
            let blob = recorder.getBlob()
            const data = new FormData()
            data.append('file', blob, 'myGif.gif')
            const response = await fetch('https://upload.giphy.com/v1/gifs?api_key=6PV2N10vETG1bgBD09emUXTw0q0fJkGQ',{
            method: 'POST',
            body: data
            })
        const response_json = await response.json()
        const gifo = response_json

        const addGifo = gifo =>{
            const newGifo = {
                id: gifo.data.id
            }
            gifos.push(newGifo)
            window.localStorage.setItem('misgifos', JSON.stringify(gifos))

        const descargarGifo = (async gifo => {
            let a = document.createElement('a');
            let file = blob;
            a.download = gifo.title;
            a.href = window.URL.createObjectURL(file);
            a.dataset.downloadurl = ['application/octet-stream', a.download, a.href].join(':');
            a.click();
            
        });  
        
        
        const linkear = () => {
            contLink.innerText;
            const link = document.createElement('textarea');
            link.value = `https://giphy.com/gifs/${gifo.data.id}`
            contLink.appendChild(link)
            link.setAttribute('readonly', '')
            link.style.position = 'absolute'
            link.style.left = '-9999px'
            document.body.appendChild (link)
            link.select()
            document.execCommand('copy')
            alert('Gif copiado a portapapeles')
            document.body.removeChild(link)
        }
            
        //Eventos boton Descarga
            iconDescarga.addEventListener('mouseover', () =>{
                iconDescarga.src = 'Recursos/icon-download-hover.svg'
            })
            
            iconDescarga.addEventListener('mouseout', () =>{
                iconDescarga.src = 'Recursos/icon-download.svg'
            })
            
            iconDescarga.addEventListener('click', () =>{
                descargarGifo(gifo)
            })
        
        //Eventos boton Link
            iconLink.addEventListener('mouseover', () =>{
                iconLink.src = 'Recursos/icon-link-hover.svg'
            })
            
            iconLink.addEventListener('mouseout', () =>{
                iconLink.src = 'Recursos/icon-link-normal.svg'
            })
            
            iconLink.addEventListener('click', e =>{
                e.preventDefault();
                linkear()
            })
        }

        addGifo(gifo)     
        })  
    })
    
btnSubir.addEventListener('click', () =>{
    btnSubir.style.display = 'none'
    parrafo2.style.color = '#572EE5'
    circulo2.style.backgroundColor = '#FFF'
    parrafo3.style.color = '#FFF'
    circulo3.style.backgroundColor = '#572EE5'
    repetirGrabacion.style.display='none'
    videoHover.style.display = 'inline-flex'
    cargaParrafo.style.display = 'inline-flex'
    setTimeout(gifoExitoso, 3000)
})

    repetirGrabacion.addEventListener('click', () =>{
        parrafo2.style.color = '#572EE5'
        circulo2.style.backgroundColor = '#FFF'
        parrafo2.style.color = '#FFF'
        circulo2.style.backgroundColor = '#572EE5'
        btnGrabar.style.display = 'none'
        btnSubir.style.display = 'none'
        btnFinalizar.style.display = 'inline-flex'
        repetirGrabacion.style.display = 'none'
        tiempoGrabacion.style.display= 'inline-flex'
        btnFinalizar.style.display = 'none'
        btnGrabar.style.display = 'inline-flex'
        resetearReloj()
        recorder.startRecording()
    })
 })
} 

video.addEventListener('playing',() =>{
    parrafo1.style.color = '#572EE5'
    circulo1.style.backgroundColor = '#FFF'
    parrafo2.style.color = '#FFF'
    circulo2.style.backgroundColor = '#572EE5'
    btnGrabar.style.display = 'inline-flex'
    accesoParrafo.style.display = 'none'
    videoCont.style.display = 'inline-flex'
})

const grabarVideo = () =>{
    getVideo()
}

// Timer de Grabacion de Gif
let tiempo = 0;
let running = 0;

const comenzarReloj = () => {
    if (running == 0) {
        running = 1;
        incremento();
    }else{
        running = 0;
    }
}

const resetearReloj = () => {
    running = 0;
    tiempo = 0;
    tiempoGrabacion.innerHTML = "00:00:00";
}

const incremento = () => {
    if (running == 1) {
        setTimeout(() => {
            tiempo++;
            let mins = Math.floor(tiempo/10/60);
            let secs = Math.floor(tiempo/10 % 60);
            let tenths = tiempo % 10;
            if (mins < 10) {
              mins = "0" + mins;
            } 
            if (secs < 10) {
              secs = "0" + secs;
            }
            tiempoGrabacion.innerHTML = mins + ":" + secs + ":" + "0" + tenths;
            incremento();
        },100);
    }
}



const gifoExitoso = () =>{
    cargaParrafo.style.display = 'none'
    subidoParrafo.style.display = 'inline-flex'    
}