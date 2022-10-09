import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getType} from "../redux/actions/index";
import '../assets/styles/components/TypeSearch.scss'

export default function TypesSearch({showType,handleFilterType,typeSelec}) {
 	const dispatch = useDispatch()
	const types = useSelector((state) => state.typePokemon)

	const [searchType,setSearchType] = useState('');    

  	useEffect(() => { 
        dispatch(getType())
  	},[dispatch])

	return (
		<>
		{showType?
			<div className='option_container type_esp'>
					<input 
						type="text"
						placeholder='Search type...'
						onChange={event=>{
							setSearchType(event.target.value);
						}}
					/>
					{types.filter(val=>{
						if (searchType === '') {
							return val
						} else if(val.name.toLowerCase().includes(searchType.toLowerCase())){
							return val
						}
					}).map(e=>{
						return(
							<button
								key={e.id} 
								className='option' 
								onClick={(e)=>handleFilterType(e,typeSelec)} 
								value={e.name}
							>
							{e.name.toUpperCase()} <img src={e.icon} alt="icon"/>
							</button>
						)}
					)}
		
				</div>:null}
		</>
	)
}