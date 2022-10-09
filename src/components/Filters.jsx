import React, {useState, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'

import {
    filterByOrder,
    orderByExp,
    filterByOrigin,
    filterByType,
    filterFalse,
    setPage,
    ireneMAdrigal
} from "../redux/actions/index"
// import '../assets/styles/components/Filter.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown,faChevronUp,faFilterCircleXmark } from '@fortawesome/free-solid-svg-icons'
import RandomPokemon from "./RandomPokemon"
import TypesSearch from './TypesSearch'

export default function Filters() {
 	const dispatch = useDispatch()
  	const filterANDorder = useSelector((state) => state.filterANDorder)

     const irene = useSelector((state) => state.irene)


	const [showAlph,setShowAlph] = useState(false);
	const [showExp,setShowExp] = useState(false);
	
	const [showOrigin,setShowOrigin] = useState(false);
	const [showType,setShowType] = useState(false);

	const [orderTextALPH,setOrderTextALPH] = useState('ALPHABETICALLY');
	const [orderTextEXP,setOrderTextEXP] = useState('EXP');    
	
	const [filterTextORIGIN,setFilterTextORIGIN] = useState('ORIGIN');    
	const [filterTextTYPE,setFilterTextTYPE] = useState('TYPE');    

	const [searchType,setSearchType] = useState('');    

    // const [openRandom,setOpenRandom] = useState(false);    

    function handleOrder(e){
        e.preventDefault();
        dispatch(setPage());
        dispatch(filterByOrder(e.target.value))
        setOrderTextEXP('EXP')
        setShowAlph(false)
        dispatch(ireneMAdrigal('t'))
        if (e.target.value === 'ASC')setOrderTextALPH('A-Z')
        if (e.target.value === 'DESC')setOrderTextALPH('Z-A')
    }

    function handleOrderExp(e){
        e.preventDefault();
        dispatch(setPage());
        dispatch(orderByExp(e.target.value))
        setOrderTextALPH('ALPHABETICALLY')
        setShowExp(false)
        dispatch(ireneMAdrigal('t'))
        if (e.target.value === 'highest to lowest')setOrderTextEXP('WEAK TO STRONG')
        if (e.target.value === 'lowest to highest')setOrderTextEXP('STRONG TO WEAK')
    }

    function handleFilterOrigin(e){
        e.preventDefault();
        dispatch(setPage());
        dispatch(filterByOrigin(e.target.value))
        setOrderTextALPH('ALPHABETICALLY')
        setOrderTextEXP('EXP')
        setFilterTextTYPE('TYPE')
        setShowOrigin(false)
        dispatch(ireneMAdrigal('t'))
        if (e.target.value === 'fan')setFilterTextORIGIN('CREATED')
        if (e.target.value === 'api')setFilterTextORIGIN('EXISTING')
    }

    function handleFilterType(e,lop){
        e.preventDefault();
        dispatch(setPage());
        dispatch(filterByType(e.target.value))
        setOrderTextALPH('ALPHABETICALLY')
        setOrderTextEXP('EXP')
        setFilterTextORIGIN('ORIGIN')
        setShowType(false)
        dispatch(ireneMAdrigal('t'))
        setSearchType('')
        setFilterTextTYPE(e.target.value.toUpperCase())
    }

    // function handleRemove(){
    //     dispatch(setPage()); 
    //     dispatch(filterFalse())
    //     setFilterTextORIGIN('ORIGIN')
    //     setFilterTextTYPE('TYPE')
    //     setOrderTextALPH('ALPHABETICALLY')
    //     setOrderTextEXP('EXP')
    // }

    // function handleRandom(){
    //     dispatch(randomPokemon())
    //     setFilterTextORIGIN('ORIGIN')
    //     setFilterTextTYPE('TYPE')
    //     setOrderTextALPH('ALPHABETICALLY')
    //     setOrderTextEXP('EXP')
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

    useEffect(() => {
        if (!irene) {
            setFilterTextORIGIN('ORIGIN')
            setFilterTextTYPE('TYPE')
            setOrderTextALPH('ALPHABETICALLY')
            setOrderTextEXP('EXP')            
        }
    }, [irene])

	return (
		<div className='orderANDfilters'>

            <div>
                <p>ORDER</p>
                <div className='select'>
                    <button className='option_main' onClick={()=>hidenANDshow('alph')}>{orderTextALPH} <span>{!showAlph?<FontAwesomeIcon icon={faChevronDown} />:<FontAwesomeIcon icon={faChevronUp}/>}</span></button>
                    {showAlph?
                        <div className='option_container'>
                            <button className='option' onClick={(e)=>handleOrder(e)} value='ASC'>A-Z</button>
                            <button className='option' onClick={(e)=>handleOrder(e)} value='DESC'>Z-A</button>
                        </div>:null}
                </div>

                <div className='select'>
                    <button className='option_main' onClick={()=>hidenANDshow('exp')}>{orderTextEXP} <span>{!showExp?<FontAwesomeIcon icon={faChevronDown} />:<FontAwesomeIcon icon={faChevronUp}/>}</span></button>
                    {showExp?
                        <div className='option_container'>
                            <button className='option' onClick={(e)=>handleOrderExp(e)} value='highest to lowest'>WEAK TO STRONG</button>
                            <button className='option' onClick={(e)=>handleOrderExp(e)} value='lowest to highest'>STRONG TO WEAK</button>
                        </div>:null}
                </div>                

            </div>


            <div>
                <p>FILTER</p>
                <div className='select'>
                    <button className='option_main' onClick={()=>hidenANDshow('origin')}>{filterTextORIGIN} <span>{!showOrigin?<FontAwesomeIcon icon={faChevronDown} />:<FontAwesomeIcon icon={faChevronUp}/>}</span></button>
                    {showOrigin?
                        <div className='option_container'>
                            <button className='option' onClick={(e)=>handleFilterOrigin(e)} value='fan'>CREATED</button>
                            <button className='option' onClick={(e)=>handleFilterOrigin(e)} value='api'>EXISTING</button>
                        </div>:null}
                </div>

                <div className='select'>
                    <button className='option_main' onClick={()=>hidenANDshow('type')}>{filterTextTYPE} <span>{!showType?<FontAwesomeIcon icon={faChevronDown} />:<FontAwesomeIcon icon={faChevronUp}/>}</span></button>
                    
                    <TypesSearch handleFilterType={handleFilterType} showType={showType}/>
                </div>
            </div>

		</div>

	)
}