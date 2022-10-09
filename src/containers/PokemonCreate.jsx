import React,{ useEffect , useState} from 'react'
import DetailCard from '../components/DetailCard'
import '../assets/styles/containers/PokemonCreate.scss';
import { Link, useNavigate } from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlus,faPlus } from '@fortawesome/free-solid-svg-icons';
import  TypesSearch from '../components/TypesSearch'
import { pokemonCreate, getType,CleanStatus} from '../redux/actions/index'
import { CirclesWithBar,ThreeCircles } from  'react-loader-spinner'

export default function PokemonCreate() {
	const dispatch = useDispatch();
	const navigate = useNavigate();	
  	const status = useSelector((state) => state.status);

	const [showTypeOne,setShowTypeOne] = useState(false);
	const [showTypeTwo,setShowTypeTwo] = useState(false);
	const [typeSelects, setTypeSelects] = useState([undefined,undefined])

	const [loadImage, setLoadImage] = useState(false)
	const [disableSubmit, setDisableSubmit] = useState(false)
	const [loadSubmit, setLoadSubmit] = useState(false)

	const [errors,setErrors] = useState({});
	const [input, setInput] = useState({
		name: "",
		img: "https://res.cloudinary.com/du7lmw4vm/image/upload/v1660016735/FANpokemon/silhouette_htizmn.png",
		experience: "",
		hp: "",
		attack: "",
		defense: "",
		speed: "",
		height: "",
		weight: "",
		tipos: []
	})

	const uploadImage = async (e)=>{
		setLoadImage(true)
		const files = e.target.files;
		const data = new FormData();
		data.append("file", files[0]);
		data.append("upload_preset", "diaxec6d");

		await axios.post("https://api.cloudinary.com/v1_1/du7lmw4vm/image/upload", data).then((res)=>{
			setInput({
				...input,
				img:res.data.secure_url
			})
			setLoadImage(false)
		})
	}

	const handleShowType = (e,val) => {
        e.preventDefault();
        if (val === 'one') {
			setShowTypeOne(!showTypeOne)
        	setShowTypeTwo(false)
        } 
        if (val === 'two') {
        	setShowTypeOne(false)	
			setShowTypeTwo(!showTypeTwo)
        }
	}

    const handleFilterType = (e,arg)=>{
        e.preventDefault();
        // console.log(e.target.value)
        console.log(input.tipos.find(item => item === e.target.value))
		if (!input.tipos.find(item => item === e.target.value)) {
	        if (arg==='one') {
		        setTypeSelects([{
		        	name:e.target.value,
		        	icon:e.target.childNodes[2].currentSrc
		        }, typeSelects[1]])
		        setShowTypeOne(false)
	    	}

	        if (arg==='two') {
		        setTypeSelects([typeSelects[0], {
		        	name:e.target.value,
		        	icon:e.target.childNodes[2].currentSrc
		        }])
		        setShowTypeTwo(false)
	    	}   
	    }
    }


	const handleDeleteType = (e)=> {
        e.preventDefault();
        if (e.target.value === 'one') setTypeSelects([undefined, typeSelects[1]])        	
        if (e.target.value === 'two') setTypeSelects([typeSelects[0], undefined])        
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
		dispatch(pokemonCreate(input))
		setLoadSubmit(true)
	}

	useEffect(() => {
		if (status === 'Successful creation') {
			setLoadSubmit(false)
			// alert('pokemon creado con exito')
			navigate(`/detail/${input.name}`)
		}
		if (status === 'There is already a pokemon with that name') {
			setLoadSubmit(false)
			alert('existe un pokemon con este nombre')
		}
		// dispatch(CleanStatus());
	}, [status])


	useEffect(() => {
		setInput({
			...input,
			tipos: typeSelects.filter((item) => item !== undefined).map(n=>n.name)
		})
	}, [typeSelects])

	useEffect(() => {
		(input.name.length > 0 && input.tipos.length >= 1 && !Object.keys(errors).length)? setDisableSubmit(false):setDisableSubmit(true)			
		console.log(input)
	}, [input])


	const wordValidation = (name) => {
	    let regularExp = new RegExp(/^([A-Za-z]-?){0,10}[A-Za-z]$/i);
	    return regularExp.test(name);
	};

	const numberValidation = (number,type) => {
	    let regularExpNumberNotDecimal = new RegExp(/^[0-9]*$/i);
	    let regularExpNumberWithDecimal = new RegExp(/^(\d)*(\.)?([0-9]{1})$/i);

		if (type==='experience') return (regularExpNumberNotDecimal.test(number) && number>= 5 && number <= 300)?false:true
		if (type==='stadistic') return (regularExpNumberNotDecimal.test(number) && number>= 5 && number <= 200)?false:true
		if (type==='weight' || type==='height') return (regularExpNumberWithDecimal.test(number) && number>= 1 && number <= 1000)?false:true
	};

	const validate=(input)=>{
	    let error = {};
	    if (!wordValidation(input.name)) error.name = "NAME ERROR"
	    if (!input.name.length) error.name = null

	    if (numberValidation(input.experience,'experience')) error.experience = 'EXP ERROR'
	    if (!input.experience.length) error.experience = null
		    	    
	    if (numberValidation(input.hp,'stadistic')) error.hp = 'HP ERROR'
	    if (!input.hp.length) error.hp = null

	    if (numberValidation(input.attack,'stadistic')) error.attack = 'ATTACK ERROR'     
	    if (!input.attack.length) error.attack = null
	     
	    if (numberValidation(input.defense,'stadistic')) error.defense = 'DEFENSE ERROR'
	    if (!input.defense.length) error.defense = null
	     
	    if (numberValidation(input.speed,'stadistic')) error.speed = 'SPEED ERROR'
	    if (!input.speed.length) error.speed = null
	         
	    if (numberValidation(input.weight,'weight')) error.weight = 'WEIGHT ERROR'
	    if (!input.weight.length) error.weight = null
	    
	    if (numberValidation(input.height,'height')) error.height = 'HEIGHT ERROR'
	    if (!input.height.length) error.height = null
	    
	    return error;
	}



	return (
		<div className='create_pokemon_container'>
	        
	        <div className={loadSubmit?'detail_card_load':'detail_card'}>
		        <DetailCard
			        name={input.name?input.name:'NAME'}
			        img={input.img}
			        type={typeSelects.filter((item) => item !== undefined)}
			        weight={input.weight?input.weight : 5}
			        height={input.height?input.height : 5}
			        attack={input.attack>200? 5:input.attack?input.attack : 5}
			        defense={input.defense>200? 5:input.defense?input.defense: 5}
			        speed={input.speed>200? 5:input.speed?input.speed:5}
			        hp={input.hp>200? 5:input.hp?input.hp: 5}
			        exp={input.experience>300? 5:input.experience?input.experience: 5}
			        convertValue={false}
		        />
	        {loadImage?
	        	<div className='loader_image'>
		        	<CirclesWithBar
						height="100"
						width="100"
						color="#ffcf00"
						visible={true}
						ariaLabel='circles-with-bar-loading'
					/>		        		
	        	</div>
	        :null}

	        {loadSubmit?		        	
	        	<div className='loader_submit'>
					<ThreeCircles
						height="300"
						width="300"
						color="red"
						visible={true}
						ariaLabel="three-circles-rotating"
						innerCircleColor="#0088ff"
					/>       		
	        	</div>
	        :null}

			</div>
			
			<div className="background_figure"></div>

			<form className='form_create' autoComplete="off">


				<div className="title">
					<h1>CREATE YOUR POKEMON</h1>
			        <div className='underline'></div>
				</div>				

				<div className='form_input_large'>
					<label>Name: </label>
					<input 
						type="text"
						value={input.name}
						name="name" 
						onChange={(e)=>handleChange(e)}
						maxLength={10}
						className={errors.name?'input_error':input.name?'input_correct':'input_normal'}
						disabled={loadSubmit}
					/>
				</div>

				<div className='form_input_large'>
					<label>Image: </label>
					<input 
						type="file"
						onChange={(e)=>uploadImage(e)}
						className='input_img'
						disabled={loadImage||loadSubmit}
					/>
				</div>

				<div className='form_input_short'>
					<label>Experience: </label>
					<span className='span_exp'>exp</span>
					<input 
						type="text"
						placeholder='5 - 300'
						value={input.experience}
						name="experience" 
						onChange={(e)=>handleChange(e)}
						maxLength={3}
						className={errors.experience?'input_error':input.experience?'input_correct':'input_normal'}
						disabled={loadSubmit}
					/>
				</div>

				<div className='form_input_short'>
					<label>Attack: </label>
					<input 
						type="text"
						placeholder='5 - 200'
						value={input.attack}
						name="attack" 
						onChange={(e)=>handleChange(e)}
						maxLength={3}
						className={errors.attack?'input_error':input.attack?'input_correct':'input_normal'}
						disabled={loadSubmit}
					/>
				</div>

				<div className='form_input_short'>
					<label>Defense: </label>
					<input 
						type="text"
						placeholder='5 - 200'
						value={input.defense}
						name="defense" 
						onChange={(e)=>handleChange(e)}	
						maxLength={3}
						className={errors.defense?'input_error':input.defense?'input_correct':'input_normal'}
						disabled={loadSubmit}
					/>
				</div>

				<div className='form_input_short'>
					<label>Speed: </label>
					<input 
						type="text"
						placeholder='5 - 200'
						value={input.speed}
						name="speed" 
						onChange={(e)=>handleChange(e)}	
						maxLength={3}
						className={errors.speed?'input_error':input.speed?'input_correct':'input_normal'}
						disabled={loadSubmit}
					/>
				</div>	

				<div className='form_input_short'>
					<label>HP: </label>
					<input 
						type="text"
						placeholder='5 - 200'
						value={input.hp}
						name="hp" 
						onChange={(e)=>handleChange(e)}
						maxLength={3}
						className={errors.hp?'input_error':input.hp?'input_correct':'input_normal'}
						disabled={loadSubmit}
					/>
				</div>

				<div className='form_input_short'>
					<label>Weight: </label>
					<input 
						type="text"
						placeholder='1 - 1000'
						value={input.weight}
						name="weight" 
						onChange={(e)=>handleChange(e)}
						maxLength={5}
						className={errors.weight?'input_error':input.weight?'input_correct':'input_normal'}
						disabled={loadSubmit}
					/><span className='span_weight'>kg</span>
				</div>	

				<div className='form_input_short'>
					<label>Height: </label>
					<input 
						type="text"
						placeholder='1 - 1000'
						value={input.height}
						name="height" 
						onChange={(e)=>handleChange(e)}	
						maxLength={4}
						className={errors.height?'input_error':input.height?'input_correct':'input_normal'}
						disabled={loadSubmit}
					/><span className='span_height'>m</span>
				</div>

				<div className='form_input_type'>
					<label>Type: </label>
					
					{typeSelects[0]===undefined?
					<div className="select_type_one">
						<button onClick={(e)=>handleShowType(e,'one')} value='one' className='type_btn_select' disabled={loadSubmit}><FontAwesomeIcon icon={faPlus} /></button>
						<TypesSearch showType={showTypeOne} handleFilterType={handleFilterType} typeSelec='one'/>
					</div>:
					<div className="select_type_one">
						<img src={typeSelects[0].icon} alt="lis"/>			
						<div className='text_select'>
							<span>{typeSelects[0].name.toUpperCase()}</span>	
							<button onClick={(e)=> handleDeleteType(e)} value='one' disabled={loadSubmit}>x</button>						
						</div>
					</div>
					}

					{typeSelects[1]===undefined?
					<div className="select_type_two">
						<button onClick={(e)=>handleShowType(e,'two')} value='two' className='type_btn_select' disabled={loadSubmit}><FontAwesomeIcon icon={faPlus} /></button>
						<TypesSearch showType={showTypeTwo} handleFilterType={handleFilterType} typeSelec='two'/>
					</div>:
					<div className="select_type_two">
						<img src={typeSelects[1].icon} alt="lis"/>	
						<div className='text_select'>
							<span>{typeSelects[1].name.toUpperCase()}</span>	
							<button onClick={(e)=> handleDeleteType(e)} value='two' disabled={loadSubmit}>x</button>						
						</div>		
					</div>		
					}
				</div>

				<button onClick={(e)=>handleSubmit(e)} className='btn_submit' type="submit" disabled={disableSubmit}>
				{loadSubmit?
				<ThreeCircles
					  height="30"
					  width="30"
					  color="red"
					  wrapperStyle={{}}
					  wrapperClass=""
					  visible={true}
					  ariaLabel="three-circles-rotating"
					  outerCircleColor=""
					  innerCircleColor="#0088ff"
					  middleCircleColor=""
					/> :
				<div>
					<p>CREATE</p>
				</div>
				}
				</button>
			</form>

		</div>
	)
}