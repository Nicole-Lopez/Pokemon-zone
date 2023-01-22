import { useState } from 'react';

export const useFormPokemon = (inputParam, handleSubmitParam, lengthError, initialTypes) => {
	const [input, setInput] = useState({...inputParam})
	const [errors,setErrors] = useState({})

	const [showType, setShowType] = useState([false, false])
	const [typeSelects, setTypeSelects] = useState([...initialTypes])

	const handleShowType = (e) => {
		setShowType(prev => [
			e.target.value === '0'? !prev[0] : false,
			e.target.value === '1'? !prev[1] : false
		])
	}

	const handleSelectType = (e) => {
		let item = {
			name:e.target.value,
			icon:e.target.childNodes[1].src				
		}

		let previousT = showType[0]? typeSelects[1]
					: showType[1]? typeSelects[0]
					: false

		setTypeSelects(prevType => [
			showType[0] ? item : prevType[0],
			showType[1] ? item : prevType[1]
		])


		setInput(prev => {
			return {
			...prev, 
			types: previousT? [previousT.name, item.name] : [item.name]
		}})

		setShowType([false, false])
	}

	const handleDeleteType = (e)=> {
		let { value } = e.target

        setTypeSelects(prevType => [
        	value === '0'? undefined : prevType[0],
        	value === '1'? undefined : prevType[1] 
        ])
		setInput(prev => ({
			...prev, 
			types: prev.types.filter(e => e !== typeSelects[value]?.name),
		}))
	}


	const validate=(input)=>{
	    let error = {};
	    let notDecimal = new RegExp(/^[0-9]*$/i);
	    let withDecimal = new RegExp(/^(\d)*(\.)?([0-9]{1})$/i);
	    let wordOnlyLetters = new RegExp(/^([A-Za-z]-?){0,10}[A-Za-z]$/i);

		Object.entries(input).forEach(([key, value]) => {
			error[key] = key === 'name' ? 
							!wordOnlyLetters.test(input[key]) :
						['types', 'img'].includes(key) ? 
							!value.length :
						['weight', 'height'].includes(key) ? 
							!withDecimal.test(input[key]) || value<1 || value>1000 :
							!notDecimal.test(input[key]) || value<5 || value>300

		    if (lengthError) {
		    	if (!value.length) error[key] = false
		    }
		});

	    return error;	   
	}

	const handleChange = (e) =>{
		setInput({
			...input,
			[e.target.name] : e.target.value
		})
		setErrors(validate({
			...input,
			[e.target.name] : e.target.value
		}))
	}

	const handleSubmit = (e) =>{
		e.preventDefault();
		handleSubmitParam()
	}


	return [
		input, 
		setInput,
		errors, 
		handleChange,
		handleSubmit,
		
		showType,
		setShowType,
		typeSelects,
		handleShowType,
		handleSelectType,
		handleDeleteType
	]	
}