import React from 'react'
import {useDispatch, useSelector} from 'react-redux'

import {useState, useEffect} from 'react';
import {
    filterByOrder,
    orderByExp,
    filterByOrigin,
    filterByType,
    filterFalse,
    setPage,
} from "../redux/actions/index"
import '../assets/styles/components/Filter.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown,faChevronUp,faFilterCircleXmark } from '@fortawesome/free-solid-svg-icons'
import RandomPokemon from "./RandomPokemon"


export default function Filters() {
 	const dispatch = useDispatch()
	const types = useSelector((state) => state.typePokemon)
  	const filterANDorder = useSelector((state) => state.filterANDorder)

	const [showAlph,setShowAlph] = useState(false);
	const [showExp,setShowExp] = useState(false);
	
	const [showOrigin,setShowOrigin] = useState(false);
	const [showType,setShowType] = useState(false);

	const [orderTextALPH,setOrderTextALPH] = useState('ORDER ALPHABETICALLY');
	const [orderTextEXP,setOrderTextEXP] = useState('ORDER BY EXP');    
	
	const [filterTextORIGIN,setFilterTextORIGIN] = useState('ORIGIN');    
	const [filterTextTYPE,setFilterTextTYPE] = useState('TYPE');    

	const [searchType,setSearchType] = useState('');    

    const [openRandom,setOpenRandom] = useState(false);    


    function handleOrder(e){
        e.preventDefault();
        dispatch(setPage());
        dispatch(filterByOrder(e.target.value))
        setOrderTextEXP('ORDER BY EXP')
        setShowAlph(false)
        if (e.target.value === 'ASC')setOrderTextALPH('A-Z')
        if (e.target.value === 'DESC')setOrderTextALPH('Z-A')
    }

    function handleOrderExp(e){
        e.preventDefault();
        dispatch(setPage());
        dispatch(orderByExp(e.target.value))
        setOrderTextALPH('ORDER ALPHABETICALLY')
        setShowExp(false)
        if (e.target.value === 'highest to lowest')setOrderTextEXP('WEAK TO STRONG')
        if (e.target.value === 'lowest to highest')setOrderTextEXP('STRONG TO WEAK')
    }

    function handleFilterOrigin(e){
        e.preventDefault();
        dispatch(setPage());
        dispatch(filterByOrigin(e.target.value))
        setFilterTextTYPE('TYPE')
        setShowOrigin(false)
        if (e.target.value === 'fan')setFilterTextORIGIN('CREATED')
        if (e.target.value === 'api')setFilterTextORIGIN('EXISTING')
    }

    function handleFilterType(e){
        e.preventDefault();
        dispatch(setPage());
        dispatch(filterByType(e.target.value))
        setFilterTextORIGIN('ORIGIN')
        setShowType(false)
        setSearchType('')
        setFilterTextTYPE(e.target.value.toUpperCase())
    }

    function handleRemove(){
        dispatch(setPage()); 
        dispatch(filterFalse())
        setFilterTextORIGIN('ORIGIN')
        setFilterTextTYPE('TYPE')
        setOrderTextALPH('ORDER ALPHABETICALLY')
        setOrderTextEXP('ORDER BY EXP')
    }

    // function handleRandom(){
    //     dispatch(randomPokemon())
    //     setFilterTextORIGIN('ORIGIN')
    //     setFilterTextTYPE('TYPE')
    //     setOrderTextALPH('ORDER ALPHABETICALLY')
    //     setOrderTextEXP('ORDER BY EXP')
    // }



    function hidenANDshow(name) {
    	if (name==='alph') {
    		setShowAlph(!showAlph)
    		setShowExp(false)
    		setShowOrigin(false)
    		setShowType(false)
    	}
    	if (name==='exp') {
    		setShowAlph(false)
    		setShowExp(!showExp)
    		setShowOrigin(false)
    		setShowType(false)
    	}
    	if (name==='origin') {
    		setShowAlph(false)
    		setShowExp(false)
    		setShowOrigin(!showOrigin)
    		setShowType(false)
    	}
    	if (name==='type') {
    		setShowAlph(false)
    		setShowExp(false)
    		setShowOrigin(false)
    		setShowType(!showType)
    		setSearchType('')
    	}    	
    }


	return (
		<div className='filters_container'>
			<div className='order_and_filters'>
				<div className='select'>
					<button className='option_main' onClick={()=>hidenANDshow('alph')} disabled={filterANDorder==='random pokemon'}>{orderTextALPH} <span>{!showAlph?<FontAwesomeIcon icon={faChevronDown} />:<FontAwesomeIcon icon={faChevronUp}/>}</span></button>
					{showAlph?
						<div className='option_container'>
							<button className='option' onClick={(e)=>handleOrder(e)} value='ASC'>A-Z</button>
							<button className='option' onClick={(e)=>handleOrder(e)} value='DESC'>Z-A</button>
						</div>:null}
				</div>

				<div className='select'>
					<button className='option_main' onClick={()=>hidenANDshow('exp')} disabled={filterANDorder==='random pokemon'}>{orderTextEXP} <span>{!showExp?<FontAwesomeIcon icon={faChevronDown} />:<FontAwesomeIcon icon={faChevronUp}/>}</span></button>
					{showExp?
						<div className='option_container'>
							<button className='option' onClick={(e)=>handleOrderExp(e)} value='highest to lowest'>WEAK TO STRONG</button>
							<button className='option' onClick={(e)=>handleOrderExp(e)} value='lowest to highest'>STRONG TO WEAK</button>
						</div>:null}
				</div>

				<div className='select'>
					<button className='option_main' onClick={()=>hidenANDshow('origin')} disabled={filterANDorder==='random pokemon'}>{filterTextORIGIN} <span>{!showOrigin?<FontAwesomeIcon icon={faChevronDown} />:<FontAwesomeIcon icon={faChevronUp}/>}</span></button>
					{showOrigin?
						<div className='option_container'>
							<button className='option' onClick={(e)=>handleFilterOrigin(e)} value='fan'>CREATED</button>
							<button className='option' onClick={(e)=>handleFilterOrigin(e)} value='api'>EXISTING</button>
						</div>:null}
				</div>

				<div className='select'>
					<button className='option_main' onClick={()=>hidenANDshow('type')} disabled={filterANDorder==='random pokemon'}>{filterTextTYPE} <span>{!showType?<FontAwesomeIcon icon={faChevronDown} />:<FontAwesomeIcon icon={faChevronUp}/>}</span></button>
					{showType?
						<div className='option_container'>
							<input 
								type="text"
								placeholder='Search type...'
								onChange={event=>{
									setSearchType(event.target.value);
								}}
							/>
							{types.filter(val=>{
								if (searchType == '') {
									return val
								} else if(val.name.toLowerCase().includes(searchType.toLowerCase())){
									return val
								}
							}).map(e=>{
								return(
									<button className='option' onClick={(e)=>handleFilterType(e)} value={e.name}>{e.name.toUpperCase()} <img src={e.icon} alt="icon"/></button>
								)}
							)}

						</div>:null}
				</div>




			</div>
			<div className='remove_random_container'>
				<button className='remove_btn' onClick={()=>handleRemove()}><FontAwesomeIcon icon={faFilterCircleXmark} /> Remove filters</button>
				<button className='random_btn' onClick={()=>setOpenRandom(true)}>Random pokemon <svg className="icon icon-tabler icon-tabler-pokeball" fill="none" height="24" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M0 0h24v24H0z" fill="none" stroke="none"/><circle cx="9" cy="9" r="9" transform="translate(3 3)"/><circle cx="12" cy="12" r="3"/><path d="M3 12h6m6 0h6"/></svg></button>
			    <RandomPokemon open={openRandom} onClose={()=>setOpenRandom(false)}/>
            </div>

		</div>
	)
}