import {
    GET_TYPES,
    GET_POKEMONS,
    GET_POKEMON_DETAIL,
    POST_POKEMON,
    EDIT_POKEMON,
    DELETE_POKEMON,
    GET_RANDOM_POKEMON,
    CLEAN_DETAIL_POKEMON,
    CLEAN_RANDOM,
    CLEAN_ALERT,
    CLEAN_STATUS,
    POST_ITEM_HALL,
    DELETE_ITEM_HALL,
    PAGINATION_HOME,
    SET_PAGE,
    CUSTOM_ALERT,
    UPLOAD_IMAGE,
    SET_FILTERS_POKEMON,
    REMOVE_FILTERS
} from '../types';

const initialState = {
    typePokemon:[],
    pokesPerPage: [],
    hasMorePokemon: false,
    pokemons: [],
    allPokemons: [],
    randomPokemon:[],
    page:0,
    detail:[],
    load: true,
    status: '',
    filters:{
        alph:'ALPHABETICALLY', 
        exp: 'EXP',
        origin: 'ORIGIN', 
        type: {name: 'TYPE', icon: false}
    },
    search:'',
    alert:false
}

export default function rootReducer (state= initialState, action){
    switch (action.type){
        case GET_TYPES:
            return{
                ...state,
                typePokemon: action.payload
            }

        case GET_POKEMONS:
            return {
                ...state,
                pokemons: action.payload,
                allPokemons: action.payload,
                load: false
            }

        case GET_POKEMON_DETAIL:
            return {
                ...state,
                detail:action.payload
            }

        case POST_POKEMON:
            return {
                ...state,
                load: true,   
                pokesPerPage:[],             
                status: action.payload,
                alert:{ pokemon: { create:'success' } }
            }

        case EDIT_POKEMON:
            return {
                ...state,
                status: 'Edit pokémon SUCCESS',
                alert:{ pokemon: { edit:'success' } }
            }
       
        case DELETE_POKEMON:
            return {
                ...state,
                status: action.payload,
                load:true,
                filters: {alph:'ALPHABETICALLY', exp: 'EXP',origin: 'ORIGIN', type: {name: 'TYPE', icon: false}},                
                alert: { pokemon: { delete:'success' } }
            }

        case GET_RANDOM_POKEMON:
            return {
                ...state,
                randomPokemon: state.allPokemons[Math.floor(Math.random()*state.allPokemons.length)],
            }    

        case CLEAN_RANDOM:
            return {
                ...state,
                randomPokemon: [],
            }  
            
 
        case PAGINATION_HOME:
            let currentpage = state.page + 1
            let indexOfLastPoke = currentpage * 12

            return {
                ...state,
                pokesPerPage: state.pokemons.slice(0,indexOfLastPoke),
                page: state.page + 1,
                hasMorePokemon: indexOfLastPoke < state.pokemons.length
            }

        case SET_PAGE:
            return{
                ...state,
                page:0
            }


        case CUSTOM_ALERT:
            let name = action.payload[0]
            let act = action.payload[1]
            let typeAlert = action.payload[2]

            return {
                ...state,
                alert: {
                    [name]: {
                        [act]:typeAlert                        
                    }
                },
                status: action.payload[3]
            };

        case CLEAN_ALERT:
            return {
                ...state,
                alert:false        
            };

        case CLEAN_STATUS:
            return {
                ...state,
                status: '',
            };
 
        case CLEAN_DETAIL_POKEMON:
            return {
                ...state,
                detail:[]
            }     
    
        case UPLOAD_IMAGE:
            return {
                ...state,
                status: action.payload,
            };                  


        case POST_ITEM_HALL:
            return {
                ...state,
                status: action.payload,
                alert:{ itemHall: { create:'success' } }
            }

        case DELETE_ITEM_HALL:
            return {
                ...state,
                status: 'Item hall delete SUCCESS',
                alert:{ itemHall: { delete:'success' } }
            };

        
        case SET_FILTERS_POKEMON:
            let filterPokemon
            let searchNow = !Array.isArray(action.payload) ? action.payload : state.search || state.search !== 'Remove filters'? state.search : '' 

            filterPokemon = state.allPokemons.filter(val=> val.name.toLowerCase().includes(searchNow.toLowerCase()))
            

            let filtersNow = {
                alph: action.payload[0] === 'exp' ? 'ALPHABETICALLY' : action.payload[0] === 'alph' ? action.payload[1] : state.filters.alph,
                exp: action.payload[0] === 'alph' ?  'EXP' : action.payload[0] === 'exp' ? action.payload[1] : state.filters.exp,
                origin: action.payload[0] === 'type' ? 'ORIGIN' : action.payload[0] === 'origin' ? action.payload[1] : state.filters.origin, 
                type: action.payload[0] === 'origin' ? {name: 'TYPE', icon: false} : action.payload[0] === 'type' ? state.typePokemon.find(e=>e.name===action.payload[1]) : state.filters.type
            }

            let firstPoks = searchNow?filterPokemon:state.allPokemons

            if (filtersNow.origin !== 'ORIGIN') filterPokemon = firstPoks.filter(e => filtersNow.origin==='EXISTING' ? e.original : !e.original)            
            else if (filtersNow.type.name !== 'TYPE') filterPokemon = firstPoks.filter(poke => poke.types.some(e=>e.name === filtersNow.type.name))            
            

            if (filtersNow.exp !== 'EXP') {
                let ordAsc =  [...filterPokemon].sort((a,b)=>a.experience - b.experience)
                filterPokemon = filtersNow.exp === 'WEAK TO STRONG' ? ordAsc : ordAsc.reverse()

            } else if (filtersNow.alph !== 'ALPHABETICALLY') {
                let ordAsc = [...filterPokemon].sort((a,b)=>(a.name.toLowerCase() < b.name.toLowerCase()) ? -1: (a.name.toLowerCase() > b.name.toLowerCase())? 1: 0)
                filterPokemon = filtersNow.alph === 'A-Z' ? ordAsc : ordAsc.reverse()
            }     
            
        
            return { 
                ...state, 
                pokemons: filterPokemon,
                filters: filtersNow,
                hasMorePokemon: false,
                search: searchNow
            }    


        case REMOVE_FILTERS:
            return {
                ...state,
                page:1,
                search:'Remove filters',
                pokemons: state.allPokemons,                
                filters: {alph:'ALPHABETICALLY', exp: 'EXP',origin: 'ORIGIN', type: {name: 'TYPE', icon: false}}                
            }
            
            
        default :
        return {
            ...state,
        }
    }
}