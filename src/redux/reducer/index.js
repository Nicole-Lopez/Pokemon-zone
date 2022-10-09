const initialState = {
    pokesPerPage: [],
    pokemons: [],
    allPokemons: [],
    randomPokemon:[],
    page:0,
    detail:[],
    typePokemon:[],
    load: true,
    filterANDorder:false,
    hasMore:true,
    load:true,
    notFound:false,
    type:[],
    status: null,

    irene: false
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
                filterANDorder:false
            }


        case 'POKEMONS_PER_PAGE':

            let currentpage=state.page+1

            let indexOfLastPoke = currentpage * 16
            return {
                ...state,
                pokesPerPage: state.pokemons.slice(0,indexOfLastPoke),
                hasMore: state.pokemons.length === state.pokesPerPage.length || state.pokemons.length === 0?false:true,
                page:state.page+1
            }



        case  'SET_PAGE':
            return{
                ...state,
                page:0
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
                filterANDorder:action.payload === ''?false:true,
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


        case 'IRENE':
            if (action.payload ==='t') {
                return {
                    ...state,
                    irene:true
                }   
            } else {
                return {
                    ...state,
                    irene:false
                }                 
            }



        case 'FILTER_FALSE':
            return {
                ...state,
                filterANDorder:false
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
                filterANDorder:'random pokemon'
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
            let allFilterPoke = state.allPokemons
            let typesFilt = allFilterPoke.filter(poke=> poke.types.some(e=>e.name === action.payload))

            // console.log(action.payload)
            // console.log(typesFilt)
            return {
                ...state,
                page:0,
                load:false,
                notFound:false,
                type:[action.payload],
                filterANDorder:action.payload,
                pokemons: typesFilt
            }
            








        case 'FILTER_BY_ORDER':
            let all = state.allPokemons
            let ordAsc = state.pokemons.sort((a,b)=>(a.name < b.name) ? -1: (a.name > b.name)? 1: 0)

            if (action.payload==='ASC') {
                return {
                    ...state,
                    filterANDorder:'A-Z',
                    load:false,
                    pokemons:ordAsc
                }
            }

            if (action.payload==='DESC') {
                return {
                    ...state,
                    filterANDorder:'Z-A',
                    load:false,
                    pokemons:ordAsc.reverse()
                }
            }  


        case 'FILTER_BY_EXP':
            let ord = state.pokemons.sort((a,b)=>a.experience - b.experience)
            

            if (action.payload==='highest to lowest') {
                return {
                    ...state,
                    filterANDorder:'highest to lowest',
                    load:false,
                    pokemons:ord
                }            
            }

            if (action.payload==='lowest to highest') {
                return {
                    ...state,
                    filterANDorder:'lowest to highest',
                    load:false,
                    pokemons:ord.reverse()
                }            
            }


        case 'FILTER_CREATED': 
            // let allPoks=state.allPokemons
            // state.pokemons = allPoks

            if (action.payload === 'api') {
                return {
                    ...state,
                    page:0,
                    filterANDorder:'api',
                    load:false,
                    pokemons:state.allPokemons.filter((e)=>e.original)  
                }      
            }
            if (action.payload === 'fan') {
                return {
                    ...state,
                    page:0,
                    filterANDorder:'fan',
                    load:false,
                    pokemons:state.allPokemons.filter((e)=>!e.original) 
                }       
            }


            
        default :
        return {
            ...state,
        }
    }
}