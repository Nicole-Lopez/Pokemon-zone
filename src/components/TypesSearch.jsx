import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getType } from "../redux/actions/index";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown,faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { useTrueElementSize } from 'use-true-element-size';
import { useDebounce } from 'usehooks-ts';

export default function TypesSearch({showType, handleSelectType, hidenANDshow, optionSelect, type, typeList}) {
 	const dispatch = useDispatch()
	const types = useSelector((state) => state.typePokemon)
  	const divRef = useRef(null);
  	const { elementHeight } = useTrueElementSize(divRef);
	const [searchType, setSearchType] = useState('');   
    const debouncedValue = useDebounce(searchType, 300)


  	const handleSelect = (e) => {
  		// img:e.target.childNodes[1].src
  		handleSelectType(e)
  		setSearchType('')
  	}
  	const handleOpenSelect = (e) => {
  		hidenANDshow(e)
  		setSearchType('')  		
  	}


  	useEffect(() => { 
  		if (!types.length) dispatch(getType())
  	},[dispatch, types])

	return (
		<div className="select">              
			<button className='select__option-main' type='button' onClick={handleOpenSelect} value={type}>
				{optionSelect.icon && <img src={optionSelect.icon} alt={optionSelect.name}/>}	
				<span>{optionSelect.name}</span>
				<FontAwesomeIcon icon={showType?faChevronUp:faChevronDown}/>
			</button>

			<div className={`select__options select__options--type ${showType && "open"}`} style={showType? {height: `${elementHeight + 60}px`}:null}>
				<input type="text" value={searchType} placeholder='Search type...' onChange={e=>setSearchType(e.target.value)}/>
				<div ref={divRef}>
					{types.filter(val => val.name.toLowerCase().includes(debouncedValue.toLowerCase()))
					.map(e=>{
						return(
							<button type="button" key={e.id} onClick={handleSelect} value={e.name} name='type' disabled={typeList.includes(e.name)}>
								{e.name}<img src={e.icon} alt={e.name}/>
							</button>
						)
					})}					
				</div>
			</div>
		</div>
	)
}