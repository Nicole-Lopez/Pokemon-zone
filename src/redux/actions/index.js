import axios from 'axios'

const urlApi = 'https://pokemon-api-crud.herokuapp.com/'

export function getPokemon () {
    return async function (dispatch) {
        try{
        let info= await axios.get(`${urlApi}pokemons`)

            return dispatch({        
                type: 'GET_POKEMONS',
                payload: info.data.sort(()=> Math.random() - 0.5)
            })

        } catch(err){
            console.log(err)
        }}
}

export function getType () {
    return async function (dispatch) {
        try{
        let info= await axios.get(`${urlApi}types`)
        return dispatch({        
            type: 'GET_TYPES',
            payload: info.data
            })
        } catch(err){
            console.log(err)
        }
    }
}

export function clear (){
    return {
        type: 'CLEAR'
    }
}


export function handleMobile (payload){
    return {
        type: 'MOBILE',
        payload
    }
}


export function getDetail (name) {
    return async function (dispatch) {
        try{
        let info= await axios.get(`${urlApi}pokemons?name=${name}`)
            return dispatch({        
                type: 'POKEMON_DETAIL',
                payload: info.data
            })
        } catch(err){
            return dispatch ({
                type: 'ERROR',
            })  
        }
    }
}

export function getPokeName (payload){
    return {
        type: 'GET_NAME_POKEMON',
        payload
    }
}

export const setPage = () => {
  return {
    type: "SET_PAGE",
  };
};


export const pagination = () => ({
    type: 'POKEMONS_PER_PAGE',
})

    
export const pokemonCreate = (payload) => {
    return async function (dispatch){
        await axios.post(`${urlApi}pokemons`, payload).then((res)=>{
            dispatch({
                type: "POST_POKEMON",
                payload: res.data,
            })
        }).catch((error)=>{
            dispatch({
                type: "POST_POKEMON",
                payload: error.response.data,
            })            
        })
    }
}
export const CleanStatus = () => {
  return {
    type: "CleanStatus",
  };
};


export function filterByOrder (payload){
    return {
        type: 'FILTER_BY_ORDER',
        payload
    }
}

export function orderByExp(payload){
    return {
        type: 'FILTER_BY_EXP',
        payload
    }
}

export function filterByType(payload){
    return {
        type:'FILTER_BY_TYPE',
        payload
    }
}
export function filterByOrigin(payload){
    return {
        type: 'FILTER_CREATED',
        payload
    };
}


export function filterFalse(){
    return {
        type: 'FILTER_FALSE',
    };
}

export function removeFilters(){
    return {
        type: 'REMOVE_FILTERS',
    };
}


export function randomPokemon(){
    return {
        type: 'RANDOM_POKEMON',
    };
}

export function cleanRandom(){
    return {
        type: 'CLEAN_RANDOM',
    };
}


// export function tipoPrueba(payload){

//     return {
//         type: 'FILTER_BY_TYPE',
//         payload
//     };
// }
