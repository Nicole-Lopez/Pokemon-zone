import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getType} from "../redux/actions/index";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown,faChevronUp } from '@fortawesome/free-solid-svg-icons'
import { useElementSize } from 'usehooks-ts'
import '../assets/styles/components/Select.scss';

export default function TypesSearch({showType, handleSelectType, hidenANDshow, optionSelect, type, arrow, typeList}) {
 	const dispatch = useDispatch()
	const types = useSelector((state) => state.typePokemon)
 	const mobile = useSelector((state) => state.mobile);

	const [searchType,setSearchType] = useState('');    
  	const [squareRef, { height }] = useElementSize()

  	useEffect(() => { 
        dispatch(getType())
  	},[dispatch])

  	const handleClick = (e) => {
  		// name:e.target.attributes.value.nodeValue
  		// img:e.target.attributes[0].nodeValue
  		handleSelectType(e,'type')
  		setSearchType('')
  	}

	return (
		<div className="select">              
			<button className='select__option-main' onClick={(e)=>hidenANDshow(e)} value={type} type='button'>
				{optionSelect.icon && <img src={optionSelect.icon} alt={optionSelect.name}/>}	
				{optionSelect.name}
				{arrow && <FontAwesomeIcon className='arrow' icon={showType?faChevronUp:faChevronDown} />}
			</button>

			<div className={`select__options select__options--type ${showType && "open"}`} style={showType && mobile? {height: `${height + 50}px`}:null}>
				<input type="text" placeholder='Search type...' onChange={e=>setSearchType(e.target.value)}/>
				<div ref={squareRef}>
					{types.filter(val=>{
						if (searchType === '' || val.name.toLowerCase().includes(searchType.toLowerCase())) {
							return val
						} 
					}).map(e=>{
						return(
							<button image={e.icon} className={`${typeList.includes(e.name)?'disabled':null}`} type="button" key={e.id} onClick={(e)=>handleClick(e)} value={e.name}>
								{e.name}<img src={e.icon} alt={e.name} value={e.name}/>
							</button>
						)
					})}					
				</div>
			</div>
		</div>
	)
}