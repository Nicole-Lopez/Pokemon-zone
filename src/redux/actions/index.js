import axios from 'axios'
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

const urlApi = 'https://crud-pokemon.onrender.com/'


export const getType = () => {
    return async function (dispatch) {
        await axios.get(`${urlApi}types`).then(res => {
            dispatch({        
                type: GET_TYPES,
                payload: res.data
            })
        }).catch(err => { 
            dispatch({
                type: CUSTOM_ALERT,
                payload: ['types', 'other', ['danger', 'There was an error loading the data, please refresh the page'], 'There was an error loading the data, please refresh the page']
            })      
        })
    }
};


export const getPokemon = () => {
    return async function (dispatch) {
        await axios.get(`${urlApi}pokemons`).then(res => {
            dispatch({        
                type: GET_POKEMONS,
                payload: res.data.sort(()=> Math.random() - 0.5)
            })            
        }).catch(err => {
            dispatch({
                type: CUSTOM_ALERT,
                payload: ['pokemon', 'other', ['danger', 'There was an error loading the data, please refresh the page'], 'There was an error loading the data, please refresh the page']
            })  
        })
    }
};

export const getDetailPokemon = (name) => {
    return async function (dispatch) {
        await axios.get(`${urlApi}pokemons?name=${name}`).then((res)=>{
            dispatch({        
                type: GET_POKEMON_DETAIL,
                payload: res.data
            })            
        }).catch(err => {
            dispatch({
                type: CUSTOM_ALERT,
                payload: ['pokemon', 'other', ['danger', 'There was an error loading the data, please refresh the page'], 'There was an error loading the data, please refresh the page']
            })  
        })
    }
};

export const cleanDetail = () => ({ type: CLEAN_DETAIL_POKEMON });

export const pokemonCreate = (payload) => {
    return async function (dispatch){
        await axios.post(`${urlApi}pokemons`, Object.fromEntries(Object.entries(payload).filter(([key, val]) => val.length))).then((res)=>{
            dispatch({
                type: POST_POKEMON,
                payload: res.data,
            })
        }).catch(err => {
            dispatch({
                type: CUSTOM_ALERT,
                payload:(err.response.data === 'There is already a pokemon with that name')?
                          ['pokemon', 'other', ['warning', `${err.response.data}. Please choose another name`], err.response.data]
                        : ['pokemon', 'create', 'danger', 'Pokémon create FAIL']
            })     
        })
    }
};

export const editPokemon = (payload, namePokemon) => {
    return async function (dispatch){
        await axios.put(`${urlApi}pokemons/${namePokemon}`, payload).then((res)=>{
            dispatch({
                type: EDIT_POKEMON
            })
        }).catch(err=>{
            dispatch({
                type: CUSTOM_ALERT,
                payload: ['pokemon', 'edit', 'danger', 'Edit pokémon FAIL']
            })               
        })
    }
};

export const deletePokemon = (payload) => {
    return async function (dispatch){
        await axios.delete(`${urlApi}pokemons/${payload}`).then((res)=>{
            dispatch({
                type: DELETE_POKEMON,
                payload: res.data,
            })
        }).catch(err=>{
            dispatch({
                type: CUSTOM_ALERT,
                payload: ['pokemon', 'delete', 'danger', 'Pokemon delete FAIL']
            })  
        })
    }
};


export const setFiltersPokemon = payload => ({ type: SET_FILTERS_POKEMON, payload });

export const removeFilters = () => ({ type: REMOVE_FILTERS });

export const randomPokemon = () => ({ type: GET_RANDOM_POKEMON });

export const cleanRandom = () => ({ type: CLEAN_RANDOM });



export const itemHallCreate = (payload, namePokemon) => {
    return async function (dispatch){
        await axios.post(`${urlApi}hall/${namePokemon}`, payload).then((res)=>{
            dispatch({
                type: POST_ITEM_HALL,
                payload: res.data,
            })
        }).catch(err=>{
            dispatch({
                type: CUSTOM_ALERT,
                payload: ['itemHall', 'create', 'danger', 'Item created FAIL']
            })     
        })
    }
};

export const deleteItemHall = (id) => {
    return async function (dispatch){
        await axios.delete(`${urlApi}hall?id=${id}`).then((res)=>{
            dispatch({
                type: DELETE_ITEM_HALL,
            })
        }).catch(error=>{
            dispatch({
                type: CUSTOM_ALERT,
                payload: ['itemHall', 'delete', 'danger', 'Item hall delete FAIL']
            }) 
        })
    }
};


export const setPage = () => ({ type: SET_PAGE });

export const paginationHome = () => ({ type: PAGINATION_HOME });


export const uploadImage = (e) => {
   return async function (dispatch){
        const files = e.target.files;
        const data = new FormData();
        data.append("file", files[0]);
        data.append("upload_preset", "diaxec6d");
        
        await axios.post("https://api.cloudinary.com/v1_1/du7lmw4vm/image/upload", data).then((res)=>{
            dispatch({
                type: UPLOAD_IMAGE,
                payload:{
                    url: res.data.secure_url, 
                    width: res.data.width, 
                    height: res.data.height
                }
            })
        }).catch(error=>{
            dispatch({
                type: CUSTOM_ALERT,
                payload: ['imageUpload', 'other', ['warning', 'Error uploading image, please try again'], 'Upload image FAIL']
            })      
        })
    }
};

export const cleanAlert = () => ({ type: CLEAN_ALERT });

export const cleanStatus = () => ({ type: CLEAN_STATUS });
