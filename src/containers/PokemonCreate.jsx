import React,{ useEffect , useState} from 'react'
import {useParams} from 'react-router-dom'
import DetailCard from '../components/DetailCard'
import '../assets/styles/containers/PokemonCreate.scss';
import { useNavigate } from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown,faChevronUp } from '@fortawesome/free-solid-svg-icons';
import  TypesSearch from '../components/TypesSearch'
import { pokemonCreate, CleanStatus} from '../redux/actions/index'
import { CirclesWithBar,ThreeCircles } from  'react-loader-spinner'
import BtnCancel from "../components/BtnCancel"
import BtnCreate from "../components/BtnCreate"
import { useWindowSize } from 'usehooks-ts'

export default function PokemonCreate() {
	const dispatch = useDispatch();
	const navigate = useNavigate();	
  	const status = useSelector((state) => state.status);
  	const { width } = useWindowSize()

  	const [previewOpen, setPreviewOpen] = useState(false)

	const [showType, setShowType] = useState([false, false])
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
		types: []
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

	const handleShowType = (e) => {
		setShowType([
			e.target.value === '0'? !showType[0]:false,
			e.target.value === '1'? !showType[1]:false
		])
	}

	const handleSelectType = (e) => {
    	if (!input.types.find(item => item === e.target.attributes.value.nodeValue)) {
			let item = {
				name:e.target.attributes.value.nodeValue,
				icon:e.target.attributes[0].nodeValue				
			}

			setTypeSelects([
				showType[0]?item:typeSelects[0],
				showType[1]?item:typeSelects[1]
			])

			setShowType([false, false])
		}		

	}

	const handleDeleteType = (e)=> {
        setTypeSelects([
        	e.target.value === '0'? undefined : typeSelects[0],
        	e.target.value === '1'? undefined : typeSelects[1] 
        ])        
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
			types: typeSelects.filter((item) => item !== undefined).map(n=>n.name)
		})
	}, [typeSelects])

	useEffect(() => {
		setDisableSubmit(input.name.length <= 0 || input.types.length < 1 || Object.values(errors).includes(true))
		console.log(input)
	}, [input])

	useEffect(() => {
		if (width>=920) setPreviewOpen(true)
	}, [width])


	const validate=(input)=>{
	    let error = {};
	    let notDecimal = new RegExp(/^[0-9]*$/i);
	    let withDecimal = new RegExp(/^(\d)*(\.)?([0-9]{1})$/i);
	    let wordOnlyLetters = new RegExp(/^([A-Za-z]-?){0,10}[A-Za-z]$/i);

		Object.entries(input).forEach(([key, value]) => {
			if (key === 'name') {
		    	error[key] = (wordOnlyLetters.test(input[key]))?null:true
			}
			else if (key === 'img' || key === 'types') {
				error[key] = null
			} else if (key === 'weight' || key === 'height') {
		    	error[key] = !withDecimal.test(input[key]) || value<1 || value>1000?true:null		    
		    } else {
		    	error[key] = !notDecimal.test(input[key]) || value<5 || value>300?true:null
		    }

		    if (!value.length) error[key] = null
		});

	    return error;
	}


	return (
		<div className='pokemon-create'>
			<h1>CREATE YOUR POKEMON</h1>

			<form autoComplete="off">
				<div className='form-container'>
					<div className='form-container__row--image'>
				        {loadImage?
				        <div className='loader-image'>
					     	<CirclesWithBar
								height="100"
								width="100"
								color="#ffcf00"
								visible={true}
								ariaLabel='circles-with-bar-loading'
							/>		        		
				        </div> : 						
			        	<div className='input-image' disabled={loadSubmit}>
							<p>Select image</p>
							<input 
								type="file"
								onChange={(e)=>uploadImage(e)}
								disabled={loadImage||loadSubmit}
							/>						
						</div>}					
						<img src={input.img} alt="Select image"/>		
					</div>

					<div className='form-container__row'>
						<label>Name</label>
						<input 
							type="text"
							placeholder="Up to 10 characters"
							value={input.name}
							name="name" 
							onChange={(e)=>handleChange(e)}
							maxLength={10}
							className={`input-text ${errors.name?'input-text__error':input.name?'input-text__correct':null}`} 
							disabled={loadSubmit}
						/>
					</div>

					<div className='form-container__row'>
						<label>Experience</label>
						<input 
							type="text"
							placeholder="5 - 300"
							value={input.experience}
							name="experience" 
							onChange={(e)=>handleChange(e)}
							maxLength={3}
							className={`input-text ${errors.experience?'input-text__error':input.experience?'input-text__correct':null}`} 
							disabled={loadSubmit}
						/>
					</div>

					<div className='form-container__row'>
						<label>Attack</label>
						<input 
							type="text"
							placeholder="5 - 300"
							value={input.attack}
							name="attack" 
							onChange={(e)=>handleChange(e)}
							maxLength={3}
							className={`input-text ${errors.attack?'input-text__error':input.attack?'input-text__correct':null}`} 
							disabled={loadSubmit}
						/>
					</div>

					<div className='form-container__row'>
						<label>Defense</label>
						<input 
							type="text"
							placeholder="5 - 300"
							value={input.defense}
							name="defense" 
							onChange={(e)=>handleChange(e)}	
							maxLength={3}
							className={`input-text ${errors.defense?'input-text__error':input.defense?'input-text__correct':null}`} 
							disabled={loadSubmit}
						/>
					</div>

					<div className='form-container__row'>
						<label>Speed</label>
						<input 
							type="text"
							placeholder="5 - 300"
							value={input.speed}
							name="speed" 
							onChange={(e)=>handleChange(e)}	
							maxLength={3}
							className={`input-text ${errors.speed?'input-text__error':input.speed?'input-text__correct':null}`} 
							disabled={loadSubmit}
						/>
					</div>	

					<div className='form-container__row'>
						<label>HP</label>
						<input 
							type="text"
							placeholder="5 - 300"
							value={input.hp}
							name="hp" 
							onChange={(e)=>handleChange(e)}
							maxLength={3}
							className={`input-text ${errors.hp?'input-text__error':input.hp?'input-text__correct':null}`} 
							disabled={loadSubmit}
						/>
					</div>

					<div className='form-container__row'>
						<label>Weight</label>
						<input 
							type="text"
							placeholder="1 - 1000"
							value={input.weight}
							name="weight" 
							onChange={(e)=>handleChange(e)}
							maxLength={5}
							className={`input-text ${errors.weight?'input-text__error':input.weight?'input-text__correct':null}`} 
							disabled={loadSubmit}
						/>
						<span>kg</span>
					</div>	

					<div className='form-container__row'>
						<label>Height</label>
						<input  
							type="text" 
							placeholder="1 - 1000" 
							value={input.height} 
							name="height"  
							onChange={(e)=>handleChange(e)}	 
							maxLength={5} 
							className={`input-text ${errors.height?'input-text__error':input.height?'input-text__correct':null}`} 
							disabled={loadSubmit}
						/>
						<span>m</span>
					</div>

					<div className='form-container__row form-container__row--type'>
						<label>Type</label>
						<div className='input-text' disabled={loadSubmit}>
							{typeSelects.map((e, index) => {
								return (
									<div className="type-container" key={index}>
										<TypesSearch  
											showType={showType[index]} 
											handleSelectType={handleSelectType}
											hidenANDshow={handleShowType}
											optionSelect={e? e :{name:'+'}} 
											type={index}
											typeList={input.types}
										/>										
										{e && <button className='type-container__delete' type="button" onClick={(e)=> handleDeleteType(e)} value={index} disabled={loadSubmit}>x</button>}											
									</div>									
								)
							})}
						</div>
					</div>
				</div>

				<div className='example'>
					{width<920 && <button className='preview-btn' type="button" onClick={()=>setPreviewOpen(!previewOpen)}>Preview<FontAwesomeIcon className='icon' icon={previewOpen?faChevronUp:faChevronDown}/></button>}
					{previewOpen &&				
			        <div className={loadSubmit?'card--load':'card'}>
				        <DetailCard
					        name={input.name || 'NAME'}
					        img={input.img}
					        type={typeSelects.filter((item) => item !== undefined)}
					        weight={input.weight>1000 || input.weight<1 ? 1:input.weight || 1}
					        height={input.attack>1000 || input.attack<1 ? 1:input.height || 1}
					        attack={input.attack>300 || input.attack<5 ? 5:input.attack || 5}
					        defense={input.defense>300 || input.defense<5 ? 5:input.defense || 5}
					        speed={input.speed>300 || input.speed<5 ? 5:input.speed || 5}
					        hp={input.hp>300 || input.hp<5 ? 5:input.hp || 5}
					        exp={input.experience>300 || input.experience<5 ? 5:input.experience || 5}
				        />

				        {loadSubmit &&		        	
				        <div className='loader-submit'>
							<ThreeCircles
								height="200"
								width="200"
								color="red"
								visible={true}
								ariaLabel="three-circles-rotating"
								innerCircleColor="#0088ff"
							/>       		
				        </div>}
					</div>}

					<div className="buttons">
						<BtnCancel route={`/`}/>
						<BtnCreate handleSubmit={handleSubmit} disableSubmit={disableSubmit} loadSubmit={loadSubmit}/>
					</div>
				</div>
			</form>

		</div>
	)
}