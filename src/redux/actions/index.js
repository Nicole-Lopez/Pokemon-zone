import axios from 'axios'

const urlApi = 'https://pokemon-api-crud.herokuapp.com/'

export function getPokemon () {
    return async function (dispatch) {
        try{
        let info= await axios.get(`${urlApi}pokemons`)
            return dispatch({        
                type: 'GET_POKEMONS',
                payload: info.data
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

export function getDetail (id) {
    return async function (dispatch) {
        try{
        let info= await axios.get('https://pokemon-api-crud.herokuapp.com/pokemons?name=saur'+id)
            return dispatch({        
                type: 'POKEMON_ID',
                payload: info.data
            })
        } catch(err){
            console.log(err)
        }
    }
}


export function getPokeName (name){
    return async function (dispatch){
            try{
                let info= await axios.get(`${urlApi}pokemons?name=${name}`)   
                return dispatch ({
                    type: 'GET_NAME_POKEMON',
                    payload: info.data
                })  

            }catch(err){
                return dispatch ({
                    type: 'ERROR',
                })  
            }
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

    
export function pokemonCreate (payload){
    return async function (dispatch){
        const response = axios.post('/pokemons', payload)
        return response;
    }
}

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