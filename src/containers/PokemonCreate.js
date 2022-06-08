import React from "react";
import '../assets/styles/containers/PokemonCreate.css'
import { useEffect , useState, useMemo} from "react";
import { Link, useNavigate } from 'react-router-dom';
import { pokemonCreate, getType} from '../redux/actions/index'
import {useDispatch, useSelector} from 'react-redux';
import BtnReturn from '../components/BtnReturn'

const numberValidation=(number)=> (number < 1 || number > 1000)? true : false


const entValidation=(number)=> (number % 1 !== 0)? true : false


const wordValidation = (name) => {
    let regularExp = new RegExp(/^[A-Z]+$/i);
    return regularExp.test(name);
};

const imgValidation = (name) => {
    let regularExp = new RegExp(/(http[s]?:\/\/.*\.(?:png|jpg|gif|svg|jpeg))/i);
    return regularExp.test(name);
};


const validate=(input)=>{
    let error = {};

    if(!input.name) error.name = 'Enter a name'
    if(input.name && !wordValidation(input.name)) error.name = "Only letters. You cannot use spaces, numbers or special characters(@#%)"
    if(input.name.length > 15) error.name = 'Must contain between 1 to 15 letters'
    
    if (input.img && !imgValidation(input.img)) error.img = 'Enter a valid link to an image'
    
    if (numberValidation(input.hp)) error.hp = 'For the HP, you must enter a number from 1 to 1000'
    if (entValidation(input.hp)) error.hp = 'Enter a whole number'
    

    if (numberValidation(input.attack)) error.attack = 'For the attack, you must enter a number from 1 to 1000'     
    if (entValidation(input.attack)) error.attack = 'Enter a whole number'
     

    if (numberValidation(input.defense)) error.defense = 'For the defense, you must enter a number from 1 to 1000'
    if (entValidation(input.defense)) error.defense = 'Enter a whole number'
     

    if (numberValidation(input.speed)) error.speed = 'For the speed, you must enter a number from 1 to 1000'
    if (entValidation(input.speed)) error.speed = 'Enter a whole number'
         
 
    if (numberValidation(input.height))error.height = 'For the height, you must enter a number from 1 to 1000'
    if (entValidation(input.height))error.height = 'Enter a whole number'
    
    if (numberValidation(input.weight))error.weight = 'For the weight, you must enter a number from 1 to 1000'
    if (entValidation(input.weight))error.weight = 'Enter a whole number'
     
    
    return error;

}




export default function PokemonCreate() {

	const dispatch = useDispatch()
	const navigate = useNavigate();

	const typs = useSelector((state) => state.typePokemon)
	const [errors,setErrors] = useState({});

	const [input, setInput] = useState({
		name: "",
		img: "",
		hp: 1,
		attack: 1,
		defense: 1,
		speed: 1,
		height: 1,
		weight: 1,
		tipos: []
	})

	function handleChange(e){
		setInput({
			...input,
			[e.target.name] : e.target.value
		})
		setErrors(validate({
			...input,
			[e.target.name] : e.target.value
		}))
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
	    if (Object.keys(errors).length === 0){
			dispatch(pokemonCreate(input))
			alert('Pokemon created')
			setInput({
				name: "",
				img: "",
				hp: 1,
				attack: 1,
				defense: 1,
				speed: 1,
				height: 1,
				weight: 1,
				tipos: []		
			})
			navigate('/pokemons')
		}
		else {
      		alert("Please, enter correct information for your pokemon");
    	}		
	}


const disableSubmit = ()=> (input.name.length > 0 && input.tipos.length >= 1)? false:true




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
			<BtnReturn />
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
					{errors.name && (<p>{errors.name}</p>)}

				</div>

				<div>
					<label>Image: </label>
					<input 
					type="text" 
					value={input.img}
					name="img" 
					onChange={(e)=>handleChange(e)}					
					/>
					{errors.img && (<p>{errors.img}</p>)}

				</div>

				<div>
					<label>HP: </label>
					<input 
					type="number" 
					value={input.hp}
					name="hp" 
					onChange={(e)=>handleChange(e)}					
					/>
					{errors.hp && (<p>{errors.hp}</p>)}
				</div>

				<div>
					<label>Attack: </label>
					<input 
					type="number" 
					value={input.attack}
					name="attack" 
					onChange={(e)=>handleChange(e)}					
					/>
					{errors.attack && (<p>{errors.attack}</p>)}
				</div>

				<div>
					<label>Defense: </label>
					<input 
					type="number" 
					value={input.defense}
					name="defense" 
					onChange={(e)=>handleChange(e)}					
					/>
					{errors.defense && (<p>{errors.defense}</p>)}
				</div>

				<div>
					<label>Speed: </label>
					<input 
					type="number" 
					value={input.speed}
					name="speed" 
					onChange={(e)=>handleChange(e)}					
					/>
					{errors.speed && (<p>{errors.speed}</p>)}
				</div>

				<div>
					<label>Height: </label>
					<input 
					type="number" 
					value={input.height}
					name="height" 
					onChange={(e)=>handleChange(e)}					
					/>
					{errors.height && (<p>{errors.height}</p>)}
				</div>

				<div>
					<label>Weight: </label>
					<input 
					type="number" 
					value={input.weight}
					name="weight" 
					onChange={(e)=>handleChange(e)}					
					/>
					{errors.weight && (<p>{errors.weight}</p>)}
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
				<button className='submit' type="submit" disabled={disableSubmit()}>Create</button>


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















