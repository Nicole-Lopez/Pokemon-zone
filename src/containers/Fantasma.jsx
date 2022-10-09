import React,{ useEffect , useState} from 'react'
import { pokemonCreate, getType} from '../redux/actions/index'
import { Link, useNavigate } from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';

export default function Fantasma() {
	const dispatch = useDispatch()

	const typs = useSelector((state) => state.typePokemon)

	const [input, setInput] = useState({
		name: "",
		img: "",
		experience: "50",
		hp: "50",
		attack: "50",
		defense: "50",
		speed: "50",
		height: "50",
		weight: "50",
		tipos: []
	})




	function handleChange(e){
		setInput({
			...input,
			[e.target.name] : e.target.value
		})
		console.log(input)
	}

	function handleSelect(e) {
		if (!input.tipos.includes(e.target.value)) {
			setInput({
				...input,
				tipos: [...input.tipos, e.target.value]
			})
			console.log(input)				
		}

	}

	function handleSubmit(e) {
		e.preventDefault();
		console.log(input);
			dispatch(pokemonCreate(input))
			setInput({
				name: "",
				img: "",
				experience:"50",
				hp: "50",
				attack: "50",
				defense: "50",
				speed: "50",
				height: "50",
				weight: "50",
				tipos: []		
			})
		}
	


	function handleDelete(e) {
		setInput({
			...input,
			tipos: input.tipos.filter(occ => occ !== e)
		})
	}

	useEffect(()=>{
		dispatch(getType())
	}, [])


	return (
		<div id='formCreate'>
			<h1>CREATE YOUR POKEMON</h1>
			<form onSubmit={(e)=>handleSubmit(e)} id='form'>
				<div>
					<label>Name: </label>
					<input 
					type="text" 
					value={input.name}
					name="name" 
					onChange={(e)=>handleChange(e)}
					/>

				</div>

				<div>
					<label>Image: </label>
					<input 
					type="text" 
					value={input.img}
					name="img" 
					onChange={(e)=>handleChange(e)}					
					/>

				</div>

				<div>
					<label>EXP: </label>
					<input 
					type="text" 
					value={input.experience}
					name="experience" 
					onChange={(e)=>handleChange(e)}					
					/>
				</div>

				<div>
					<label>HP: </label>
					<input 
					type="text" 
					value={input.hp}
					name="hp" 
					onChange={(e)=>handleChange(e)}					
					/>
				</div>

				<div>
					<label>Attack: </label>
					<input 
					type="text" 
					value={input.attack}
					name="attack" 
					onChange={(e)=>handleChange(e)}					
					/>
				</div>

				<div>
					<label>Defense: </label>
					<input 
					type="text" 
					value={input.defense}
					name="defense" 
					onChange={(e)=>handleChange(e)}					
					/>
				</div>

				<div>
					<label>Speed: </label>
					<input 
					type="text" 
					value={input.speed}
					name="speed" 
					onChange={(e)=>handleChange(e)}					
					/>
				</div>

				<div>
					<label>Height: </label>
					<input 
					type="text" 
					value={input.height}
					name="height" 
					onChange={(e)=>handleChange(e)}					
					/>
				</div>

				<div>
					<label>Weight: </label>
					<input 
					type="text" 
					value={input.weight}
					name="weight" 
					onChange={(e)=>handleChange(e)}					
					/>
				</div>

				<div>
					<label>Types: </label>
          			<select onChange={(e)=>handleSelect(e)}>
    				{
        			typs.map((el) => (
        			    <option key={el.id} value={el.name}>{el.name}</option>
        			))
        			}
    				</select>
					
				</div>
				<button onClick={(e)=>handleSubmit(e)} className='submit' type="submit">Create</button>


			</form>
			<div className='listTypes'>
			{input.tipos.map(el =>
				<div className='typePreview'>
					<span>{el}</span>
					<button onClick={()=> handleDelete(el)}>X</button>
				</div>

				)
			}</div>
		</div>
	)
}