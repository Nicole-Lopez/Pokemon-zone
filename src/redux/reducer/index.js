const initialState = {
    pokesPerPage: [],
    pokemons: [],
    allPokemons: [],
    randomPokemon:[],
    page:0,
    detail:[],
    typePokemon:[],
    load: true,
    hasMore:true,
    load:true,
    notFound:false,
    type:[],
    status: null,
    filters:{
        alph:'ALPHABETICALLY', 
        exp: 'EXP',
        origin: 'ORIGIN', 
        types: 'TYPE'
    },

    mobile:true,



}

export default function rootReducer (state= initialState, action){
    switch (action.type){
        case 'GET_POKEMONS':
            return {
                ...state,
                pokemons: action.payload,
                allPokemons: action.payload,
                load: false,
                notFound:false,
            }


        case 'POKEMONS_PER_PAGE':

            let currentpage=state.page+1

            let indexOfLastPoke = currentpage * 12
            return {
                ...state,
                hasMore: state.pokemons.length === state.pokesPerPage.length?false:true,
                pokesPerPage: state.pokemons.slice(0,indexOfLastPoke),
                page:state.page+1
            }



        case  'SET_PAGE':
            return{
                ...state,
                page:0,
                pokesPerPage:[]
            }

        case  'MOBILE':
            return{
                ...state,
                mobile:action.payload
            }




        case 'ERROR':
            return {
                ...state,
                pokemons:[],
                load:false,
                notFound:true
            }    





    case "CleanStatus":
      return {
        ...state,
        status: null,
      };
    


        case  'GET_TYPES':
            return{
                ...state,
                typePokemon: action.payload,
                detail:[]
            }

        case 'GET_NAME_POKEMON':
            let pokeFind = state.allPokemons.filter(val=>{
                        if (action.payload === '') {
                            return state.allPokemons
                        } else if(val.name.toLowerCase().includes(action.payload.toLowerCase())){
                            return val
                        }
                        })

            return {
                ...state,
                pokemons:pokeFind,
                load:false,
                notFound:pokeFind[0]!==undefined?false:true
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
            } 

        case 'POKEMON_DETAIL':
            return {
                ...state,
                detail:action.payload
            }
        
        case 'POST_POKEMON':
            return {
                ...state,
                status: action.payload
            }

        case 'RANDOM_POKEMON':
            let allPoke = state.allPokemons;
            let rand = Math.floor(Math.random()*allPoke.length);
            let rValue = allPoke[rand];

            return {
                ...state,
                randomPokemon:[rValue],
            }    


        case 'CLEAN_RANDOM':
            return {
                ...state,
                randomPokemon:[],
            }  

        // case 'FILTER_BY_TYPE':
        //     let allFilterPoke = state.allPokemons
        //     let typesFilt = allFilterPoke.filter(poke=> poke.types.some(e=>e.name === action.payload))

        //     return {
        //         ...state,
        //         filterANDorder:action.payload,
        //         pokemons: typesFilt
        //     }
      

        case 'FILTER_BY_TYPE':
            return {
                ...state,
                load:false,
                notFound:false,
                type:[action.payload],
                filters: {...state.filters, origin:'ORIGIN', types:action.payload.toUpperCase()},                
                pokemons: state.allPokemons.filter(poke=> poke.types.some(e=>e.name === action.payload))
            }
            
        case 'FILTER_BY_ORDER':
            let ordAsc = [...state.pokemons].sort((a,b)=>(a.name.toLowerCase() < b.name.toLowerCase()) ? -1: (a.name.toLowerCase() > b.name.toLowerCase())? 1: 0)

            return {
                ...state,
                filters: {...state.filters, alph: action.payload, exp:'EXP'},
                load:false,
                pokemons:action.payload==='A-Z'?ordAsc:ordAsc.reverse(),
            }

        case 'FILTER_BY_EXP':
            let ord = [...state.pokemons].sort((a,b)=>a.experience - b.experience)

            return {
                ...state,
                filters: {...state.filters, alph:'ALPHABETICALLY', exp: action.payload},                    
                load:false,
                pokemons:action.payload==='WEAK TO STRONG'?ord:ord.reverse()
            }  

        case 'FILTER_CREATED': 
            return {
                ...state,
                filters: {...state.filters, origin:action.payload, types:'TYPE'},                    
                load:false,
                pokemons:action.payload==='EXISTING'?state.allPokemons.filter((e)=>e.original) :state.allPokemons.filter((e)=>!e.original) 
            }    
   
        case 'REMOVE_FILTERS':
            return {
                ...state,
                page:0,
                load:false,
                notFound:false,
                pokemons: state.allPokemons,                
                filters: {alph:'ALPHABETICALLY', exp: 'EXP',origin: 'ORIGIN', types: 'TYPE'}                
            }
            


            

            
        default :
        return {
            ...state,
        }
    }
}