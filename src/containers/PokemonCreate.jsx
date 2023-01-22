import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useStatusVerification } from '../utils/hooks/useStatusVerification';
import { useControlUploadImage } from '../utils/hooks/useControlUploadImage';
import { useFormPokemon } from '../utils/hooks/useFormPokemon';
import { pokemonCreate, getPokemon, removeFilters } from '../redux/actions/index';
import { ThreeCircles } from  'react-loader-spinner';
import '../assets/styles/containers/PokemonCreate.scss';
import DetailCard from '../components/DetailCard';
import TypesSearch from '../components/TypesSearch';
import BtnCancel from "../components/BtnCancel";
import BtnSubmit from "../components/BtnSubmit";
import UploadImageButton from '../components/UploadImageButton';
import InputText from '../components/InputText';


export default function PokemonCreate() {
	const dispatch = useDispatch();
	const navigate = useNavigate();	
	const [loadSubmit, setLoadSubmit] = useState(false)

	const handleSubmitCreate = () =>{
		setLoadSubmit(true)
		dispatch(pokemonCreate(input))
	}

	const [
		input, setInput, errors, handleChange, handleSubmit,
		showType, , typeSelects, handleShowType, handleSelectType, handleDeleteType
	] = useFormPokemon(
		{
			name: "",
			img: "https://res.cloudinary.com/du7lmw4vm/image/upload/v1669690910/CRUD%20pokemon%20NO%20DELETE/silhouette_ylta04.png",
			experience: "",
			hp: "",
			attack: "",
			defense: "",
			speed: "",
			height: "",
			weight: "",
			types: []
		},
		handleSubmitCreate,
		true,
		[undefined,undefined]
	)

	const [loadUpload, setLoadUpload, afterUpload] = useControlUploadImage(setInput, 'img')

	const disableSubmit = input.name.length <= 0 || Object.values(errors).includes(true) || input.types.length < 1


	useStatusVerification(
		'Successful creation', () => {
			setLoadSubmit(false)
			dispatch(getPokemon())
			dispatch(removeFilters())
			navigate(`/detail/${input.name}`)			
		}, 
		'Pokémon create FAIL', ()=> setLoadSubmit(false),
		'There is already a pokemon with that name', ()=> setLoadSubmit(false),
	)

	const inputText = [
		{type:'Name', placeholder:'Only letters', maxLength:10, value:input.name, error: errors.name},
		{type:'Experience', placeholder:'5 - 300', maxLength:3, value:input.experience, error: errors.experience},
		{type:'Attack', placeholder:'5 - 300', maxLength:3, value:input.attack, error: errors.attack},
		{type:'Defense', placeholder:'5 - 300', maxLength:3, value:input.defense, error: errors.defense},
		{type:'Speed', placeholder:'5 - 300', maxLength:3, value:input.speed, error: errors.speed},
		{type:'HP', placeholder:'5 - 300', maxLength:3, value:input.hp, error: errors.hp},
		{type:'Weight', placeholder:'1 - 1000 kg', maxLength:5, value:input.weight, error: errors.weight},
		{type:'Height', placeholder:'1 - 1000 m', maxLength:5, value:input.height, error: errors.height},
	]

	return (
		<div className='pokemon-create'>
			<h1>CREATE YOUR POKÉMON</h1>

			<form onSubmit={handleSubmit} autoComplete="off">
				<div className='form-container' disabled={loadSubmit}>
					<UploadImageButton
						image={input.img}
						disabled={loadSubmit}
						iconTransparent={input.img}
						iconColor='#dbdbd9'
						afterUpload={afterUpload}
						setLoadUpload={setLoadUpload}
					/>

					{inputText.map(arr=>{
						return(
							<div className='form-container__row' key={arr.type.toLowerCase()}>
								<label>{arr.type}</label>
								<InputText 
									placeholder={arr.placeholder}
									value={arr.value}
									name={arr.type.toLowerCase()}
									onChange={handleChange}
									maxLength={arr.maxLength}
									className='input-text'
									disabled={loadSubmit}
									error={arr.error}
								/>
							</div>
						)
					})}

					<div className='form-container__row form-container__row--type'>
						<label>Type</label>
						<div className='input-text'>
							{typeSelects?.map((e, index) => {
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
										{e && <button className='type-container__delete' type="button" onClick={handleDeleteType} value={index} disabled={loadSubmit}>x</button>}											
									</div>									
								)
							})}
						</div>
					</div>
				</div>

				<div className='example'>
			        <div className='card-container' disabled={loadSubmit}>
				        <DetailCard
					        name={input.name || 'NAME'}
					        img={input.img}
					        type={typeSelects?.filter((item) => item)}
					        weight={errors.weight || !input.weight ? 1 : input.weight}
					        height={errors.height || !input.height ? 1 : input.height}
					        attack={errors.attack || !input.attack ? 5 : input.attack}
					        defense={errors.defense || !input.defense ? 5 : input.defense}
					        speed={errors.speed || !input.speed ? 5 : input.speed}
					        hp={errors.hp || !input.hp ? 5 : input.hp}
					        exp={errors.experience || !input.experience ? 5 : input.experience}
				        />
				        {loadSubmit &&		   
							<ThreeCircles
								height="200"
								width="200"
								outerCircleColor="#324ff1"
								innerCircleColor="#5f76f5"
								middleCircleColor="#76c8fb"
								wrapperClass="loader-submit"
							/>      
				    	}
					</div>

					<div className="buttons">
						<BtnCancel route={`/`} disabled={loadSubmit}/>
						<BtnSubmit text='CREATE' disableSubmit={disableSubmit || loadUpload} loadSubmit={loadSubmit}/>
					</div>
				</div>
			</form>
		</div>
	)
}