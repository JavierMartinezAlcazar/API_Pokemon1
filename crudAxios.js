export const url = "https://pokeapi.co/api/v2/pokemon";

export const guardarDatos = async (url, tabla, dato) => {
    try{
        await axios.post(`${url}/${tabla}`, dato);
    } catch(e){
        console.log(e);
    }
}

export const obtenerDatos = async(url, tabla, campo, datos) => {
    try{
        const response = await axios.get(`${url}/${tabla}?${campo}=${valor}`);
        return response.data;
    } catch(error){
        console.log(error);
    }
}