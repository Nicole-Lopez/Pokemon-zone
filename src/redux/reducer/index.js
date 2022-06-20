const initialState = {
    pokesPerPage: [],
    pokemons: [],
    allPokemons: [],
    randomPokemon:[],
    page:0,
    detail:[],
    typePokemon:[],
    load: true,
    filterANDorder:false
}

export default function rootReducer (state= initialState, action){
    switch (action.type){
        case 'GET_POKEMONS':
            return {
                ...state,
                pokemons: action.payload,
                allPokemons: action.payload,
                load: false,
                filterANDorder:false
            }


        case 'POKEMONS_PER_PAGE':

            let currentpage=state.page+1

            let indexOfLastPoke = currentpage * 16
            return {
                ...state,
                pokesPerPage: state.pokemons.slice(0,indexOfLastPoke),
                page:state.page+1
            }



        case  'SET_PAGE':
            return{
                ...state,
                page:0
            }












        case  'GET_TYPES':
            return{
                ...state,
                typePokemon: action.payload,
                detail:[]
            }
        case 'GET_NAME_POKEMON':
            return {
                ...state,
                pokemons:action.payload,
                load:false
            }
        case 'GET_NULL':
            return {
                ...state,
                pokemons:action.payload
            }
        case 'CLEAR':
            return {
                ...state,
                load:true
            } 

        case 'FILTER_FALSE':
            return {
                ...state,
                filterANDorder:false
            } 

        case 'ERROR':
            return {
                ...state,
                pokemons:[],
                load:false
            }    
        case 'POKEMON_ID':
            return {
                ...state,
                detail:action.payload
            }
        
        case 'POST_POKEMON':
            return {
                ...state
            }


        case 'RANDOM_POKEMON':
            let allPoke = state.allPokemons;
            let rand = Math.floor(Math.random()*allPoke.length);
            let rValue = allPoke[rand];

            return {
                ...state,
                randomPokemon:[rValue],
                filterANDorder:'random pokemon'
            }    


        case 'CLEAN_RANDOM':
            return {
                ...state,
                randomPokemon:[],
            }  

        case 'FILTER_BY_TYPE':
            let allFilterPoke = state.allPokemons
            let typesFilt = allFilterPoke.filter(poke=> poke.types.some(e=>e.name === action.payload))

            return {
                ...state,
                filterANDorder:action.payload,
                pokemons: typesFilt
            }
      
        case 'FILTER_BY_ORDER':
            // let all = state.allPokemons
            let ordAsc = state.allPokemons.sort((a,b)=>(a.name < b.name) ? -1: (a.name > b.name)? 1: 0)

            if (action.payload==='ASC') {
                return {
                    ...state,
                    filterANDorder:'A-Z',
                    pokemons:ordAsc
                }
            }

            if (action.payload==='DESC') {
                return {
                    ...state,
                    filterANDorder:'Z-A',
                    pokemons:ordAsc.reverse()
                }
            }  


        case 'FILTER_BY_EXP':
            let ord = state.pokemons.sort((a,b)=>a.experience - b.experience)
            

            if (action.payload==='highest to lowest') {
                return {
                    ...state,
                    filterANDorder:'highest to lowest',
                    pokemons:ord
                }            
            }

            if (action.payload==='lowest to highest') {
                return {
                    ...state,
                    filterANDorder:'lowest to highest',
                    pokemons:ord.reverse()
                }            
            }


        case 'FILTER_CREATED': 
            let allPoks=state.allPokemons
            state.pokemons = allPoks

            if (action.payload === 'api') {
                return {
                    ...state,
                    pokemons:state.pokemons.filter((e)=>e.original)  
                }      
            }
            if (action.payload === 'fan') {
                return {
                    ...state,
                    pokemons:state.pokemons.filter((e)=>!e.original) 
                }       
            }


            
        default :
        return {
            ...state,
        }
    }
}