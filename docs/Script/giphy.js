const API_KEY = '6PV2N10vETG1bgBD09emUXTw0q0fJkGQ'


//Buscar Gifs
const traerGifsAPI = async (query, offset) => {
    const url = `https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q=${query}&limit=12&offset=${offset}`;
    const response = await fetch(url);
    const json = await response.json();
    
    return json;
};

//Trending Gifs
const trendingsGifsAPI = async (query) => {
    const url = `https://api.giphy.com/v1/gifs/trending?api_key=${API_KEY}&limit=9`;
    const response = await fetch(url);
    const json = await response.json();
    return json;
};

//Sugerencias de busqueda
const sugerenciasBusquedasAPI = async (query) =>{
    const url = `https://api.giphy.com/v1/gifs/search/tags?api_key=${API_KEY}&q=${query}`
    const response = await fetch(url);
    const json = await response.json();
    
    return json;
}

//Busquedas Trendings
const busquedasTrendingAPI = async () =>{
    const url = `https://api.giphy.com/v1/trending/searches?api_key=${API_KEY}`;
    const response = await fetch(url);
    const json = await response.json();
    
    return json;
}


//Traer Gifo
const getGifosAPI = async (ids) =>{
    const url = `https://api.giphy.com/v1/gifs?api_key=${API_KEY}&ids=${ids}`
    const response = await fetch (url)
    const json = await response.json()

    return json
}