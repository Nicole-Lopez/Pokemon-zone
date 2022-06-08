const initialState = {
    pokemons: [],
    allPokemons: [],
    detail:[],
    typePokemon:[],
    load: true
}

export default function rootReducer (state= initialState, action){
    switch (action.type){
        case 'GET_POKEMONS':
            return {
                ...state,
                pokemons: action.payload,
                allPokemons: action.payload,
                load: false
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
     

        case 'FILTER_BY_TYPE':
            let allFilterPoke = state.allPokemons
            let typesFilt = []
            if (action.payload == 'allTypes') {
                typesFilt= allFilterPoke
            } else {
                typesFilt= allFilterPoke.filter((e)=> e.types.includes(action.payload))
            }
            

            return {
                ...state,
                pokemons: typesFilt
            }
      
        case 'FILTER_BY_ORDER':
            let all = state.allPokemons
            let ordAsc = state.pokemons.sort((a,b)=>(a.name < b.name) ? -1: (a.name > b.name)? 1: 0)

            if (action.payload==='asc') {
                return {
                    ...state,
                    pokemons:ordAsc
                }
            }

            if (action.payload==='des') {
                return {
                    ...state,
                    pokemons:ordAsc.reverse()
                }
            }  

            if (action.payload==='all') {
                let ordIde = state.pokemons.sort((a,b)=>a.ide - b.ide)
                return {
                    ...state,
                    pokemons:ordIde
                }
            }  


        case 'FILTER_BY_ATTACK':
            let ord = state.pokemons.sort((a,b)=>a.attack - b.attack)
            

            if (action.payload==='major') {
                return {
                    ...state,
                    pokemons:ord
                }            
            }

            if (action.payload==='minor') {
                return {
                    ...state,
                    pokemons:ord.reverse()
                }            
            }
            if (action.payload==='all') {
                let ordIde = state.pokemons.sort((a,b)=>a.ide - b.ide)
                return {
                    ...state,
                    pokemons:ordIde
                }
            }  


        case 'FILTER_CREATED': 
            let allPoks=state.allPokemons
            state.pokemons = allPoks
            if (action.payload === 'all') {
                return {
                    ...state,
                    pokemons:allPoks
                }      
            }
            if (action.payload === 'api') {
                return {
                    ...state,
                    pokemons:state.pokemons.filter((e)=>e.fromApi)  
                }      
            }
            if (action.payload === 'db') {
                return {
                    ...state,
                    pokemons:state.pokemons.filter((e)=>!e.fromApi) 
                }       
            }


            
        default :
        return {
            ...state,
        }
    }
}