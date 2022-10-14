import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getType} from "../redux/actions/index";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown,faChevronUp } from '@fortawesome/free-solid-svg-icons'
import { useElementSize } from 'usehooks-ts'

export default function TypesSearch({showType, handleSelectType, withOptionMain, hidenANDshow, optionSelect}) {
 	const dispatch = useDispatch()
	const types = useSelector((state) => state.typePokemon)
 	const mobile = useSelector((state) => state.mobile);

	const [searchType,setSearchType] = useState('');    
  	const [squareRef, { height }] = useElementSize()

  	useEffect(() => { 
        dispatch(getType())
  	},[dispatch])

  	const handleClick = (e) => {
  		handleSelectType(e,'type')
  		setSearchType('')
  	}

	return (
		<div className='select'>
		{withOptionMain?                        
			<button className='select__optionMain' onClick={()=>hidenANDshow('type')}>
				{optionSelect}<FontAwesomeIcon className='select__optionMain__arrow' icon={showType?faChevronUp:faChevronDown} />
			</button>
		:null}

			<div className={`select__options select__options--type ${showType && "open"}`} style={showType && mobile? {height: `${height + 50}px`}:null}>
				<input type="text" placeholder='Search type...' onChange={e=>setSearchType(e.target.value)}/>
				<div ref={squareRef}>
					{types.filter(val=>{
						if (searchType === '' || val.name.toLowerCase().includes(searchType.toLowerCase())) {
							return val
						} 
					}).map(e=>{
						return(
							<button key={e.id} onClick={(e)=>handleClick(e)} value={e.name}>
								{e.name.toUpperCase()} <img src={e.icon} alt="icon"/>
							</button>
						)
					})}					
				</div>

			</div>
		</div>
	)
}