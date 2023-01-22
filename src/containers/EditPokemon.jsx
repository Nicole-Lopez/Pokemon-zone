import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { useStatusVerification } from '../utils/hooks/useStatusVerification';
import { useControlUploadImage } from '../utils/hooks/useControlUploadImage';
import { useFormPokemon } from '../utils/hooks/useFormPokemon';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { editPokemon, cleanDetail } from '../redux/actions/index';
import { stadisticProgressBar } from '../utils/functions/stadisticProgressBar'
import '../assets/styles/containers/EditPokemon.scss';
import TypesSearch from '../components/TypesSearch';
import BtnCancel from '../components/BtnCancel';
import BtnSubmit from '../components/BtnSubmit';
import SemicirularProgressbar from '../components/SemicirularProgressbar';
import UploadImageButton from '../components/UploadImageButton';
import InputTextEdit from '../components/InputTextEdit';

export default function EditPokemon() {
	const dispatch = useDispatch();
	const {name} = useParams()
	const navigate = useNavigate();	
	const pokemonDetail = useSelector((state) => state.detail)
	const [loadSubmit, setLoadSubmit] = useState(false)
	const [showInput, setShowInput] = useState({
		name: false,
		img: false,
		experience: false,
		hp: false,
		attack: false,
		defense: false,
		speed: false,
		height: false,
		weight: false
	})	
	const initialTypes= pokemonDetail[0].types.length < 2 ? [pokemonDetail[0].types[0],undefined] : pokemonDetail[0].types

	let pokemonOriginalValues= {
		name: pokemonDetail[0].name,
		img: pokemonDetail[0].img,
		experience: `${pokemonDetail[0].experience}`,
		hp: `${pokemonDetail[0].hp}`,
		attack: `${pokemonDetail[0].attack}`,
		defense: `${pokemonDetail[0].defense}`,
		speed: `${pokemonDetail[0].speed}`,
		height: `${pokemonDetail[0].height}`,
		weight: `${pokemonDetail[0].weight}`,
		types: pokemonDetail[0].types.map(e=>e.name)		
	}

	const handleSubmitEdit = (e) => {
		setLoadSubmit(true)
		openEdit(false)
		dispatch(editPokemon(input, name))
	}

	const [
		input, setInput, errors, handleChange, handleSubmit,
		showType, setShowType, typeSelects, handleShowType, handleSelectType, handleDeleteType

	] = useFormPokemon(pokemonOriginalValues, handleSubmitEdit, false, initialTypes)

	

	const [loadUpload, setLoadUpload, afterUpload] = useControlUploadImage(setInput, 'img')

	const disableSubmit = JSON.stringify(pokemonOriginalValues) === JSON.stringify(input) || Object.values(errors).includes(true)


	const openEdit = (type) => {
		setShowType([false, false])

		let res = {}
	   	Object.entries(showInput).forEach(([key, value]) => res[key] = (key===type) ); 
	    if(!Object.values(errors).includes(true)) setShowInput(res)    
	}

	useStatusVerification(
		'Edit pokémon SUCCESS', () => {
			dispatch(cleanDetail())
			navigate(`/detail/${input.name}`)
		}, 
		'Edit pokémon FAIL', ()=> setLoadSubmit(false)
	)


	let stadistics = [
		{ title: 'Attack', value: input.attack, show: showInput.attack, error:errors.attack},
		{ title: 'Defense', value: input.defense, show: showInput.defense, error:errors.defense},
		{ title: 'Speed', value: input.speed, show: showInput.speed, error:errors.speed},
		{ title: 'HP', value: input.hp, show: showInput.hp, error:errors.hp}		
	]

	let tableInfo = [
		{ title: 'Weight', value: input.weight, show: showInput.weight, error:errors.weight},
		{ title: 'Height', value: input.height, show: showInput.height, error:errors.height},
	]

	return (
		<div className='edit-pokemon'>
			<h1>EDIT <span>{name}</span></h1>

		    <form onSubmit={handleSubmit} className='detail-card' autoComplete="off" style={loadSubmit?{opacity: '0.8'}:null}>
	          	{showInput.experience?
          			<InputTextEdit
						setShowInput={setShowInput}
						placeholder="5 - 300"
						value={input.experience}
						name='experience'
						onChange={handleChange}
						maxLength={3}
						classNameInput='input'
						classNameContainer='input-exp'
						disabled={loadSubmit}
						error={errors.experience}
          			/>
          			:
          			<p className='detail-card__exp'>
          				exp{input.experience}	
          				<button type='button' onClick={()=>openEdit('experience')} disabled={loadSubmit}><FontAwesomeIcon icon={faPenToSquare}/></button>
          			</p>
          		}
 
		        <div className='detail-card__semicircular'>
			        <SemicirularProgressbar
						radius={125}
			          	progress={errors.experience? 5 : input.experience}
			          	steps={310}
			          	strokeWidth={10}
						trackStrokeWidth={10}
			          	pointerRadius={5}
			    		pointerStrokeWidth={15}
			        />	        	
		        </div>


		        <div className='detail-card__info'>
					<UploadImageButton
						image={input.img}
						disabled={loadSubmit}
						iconTransparent={input.img}
						iconColor='#dbdbd9'
						afterUpload={afterUpload}
						setLoadUpload={setLoadUpload}
					/>

		        	{showInput.name?
	          			<InputTextEdit
							setShowInput={setShowInput}
							placeholder='Only letters'
							value={input.name}
							name='name'
							onChange={handleChange}
							maxLength={10}
							classNameInput='input'
							classNameContainer='input-name'
							disabled={loadSubmit}
							error={errors.name}
	          			/>
						:
		        		<p className='detail-card__name'>
		        			{input.name}
		        			<button type='button' onClick={()=>openEdit('name')} disabled={loadSubmit}><FontAwesomeIcon icon={faPenToSquare}/></button>
		        		</p>
		        	}

		        	<div className='detail-card__table'>
		        		<div className='table table--types'>
		        			<div className='table__type-icon'>
								{typeSelects?.map((e, index) => {
									return(
				        				<div className={`type-container ${e && 'type-container--used'}`} key={index}>
											<TypesSearch  
												showType={showType[index]} 
												handleSelectType={handleSelectType}
												hidenANDshow={handleShowType}
												optionSelect={e?e:{name:'+'}} 
												type={index}
												typeList={input.types}
											/>
											{e && <button className='type-container__delete' type="button" onClick={handleDeleteType} value={index} disabled={loadSubmit}>x</button>}											
										</div>
									)
								})}	  								
    						</div>
		        			<p className='table__title'>Type</p>
		        		</div>

		        		{tableInfo.map(item => {
		        			return (
				        		<div key={item.title} className={`table table--${item.title.toLowerCase()}`}>
				        			{item.show?
			          					<InputTextEdit
											setShowInput={setShowInput}
											placeholder={`1 - 1000 ${item.title === 'Weight' ? 'kg' : item.title === 'Height' ? 'm' : null}`}
											value={item.value}
											name={item.title.toLowerCase()}
											onChange={handleChange}
											maxLength={5}
											classNameInput='input'
											classNameContainer={`input-${item.title.toLowerCase()}`}
											disabled={loadSubmit}
											error={item.error}
					          			/>
					          			:		        				
				        				<p className='table__value'>
				        					<button type='button' onClick={()=>openEdit(item.title.toLowerCase())} disabled={loadSubmit}><FontAwesomeIcon icon={faPenToSquare}/></button>
				        					{item.value}
				        				</p>
				        			}
				        			<p className='table__title'>{item.title}</p>
				        		</div>		
		        			)
		        		})}
		        	</div>

		        	<div className='detail-card__statistics-container'>
		        		{stadistics.map(item=>{
		        			return (
				        		<div key={item.title} className='statistics'>
				        			<span className='statistics__title'>{item.title}</span>
						        	{item.show?		
			          					<InputTextEdit
											setShowInput={setShowInput}
											placeholder='5 - 300'
											value={item.value}
											name={item.title.toLowerCase()}
											onChange={handleChange}
											maxLength={3}
											classNameInput='input'
											classNameContainer='input-statistics'
											disabled={loadSubmit}
											error={item.error}
					          			/>
					          			:
					          			<>
							        		<div className='statistics__progress-bar-horizontal'>
					        					<div style={stadisticProgressBar(item.value, item.title.toLowerCase())}></div>
							        		</div>  
								            <span className='statistics__info'>
								            	{item.value}
								            	<button type='button' onClick={()=>openEdit(item.title.toLowerCase())} disabled={loadSubmit}><FontAwesomeIcon icon={faPenToSquare}/></button>
								            </span>      	        			
				        				</>
				        			}
				        		</div>
		        			)
		        		})}
					</div>
					
					<div className="edit-pokemon__buttons">
						<BtnCancel route={`/detail/${name}`}/>
						<BtnSubmit text='CHANGE' disableSubmit={disableSubmit || loadUpload} loadSubmit={loadSubmit}/>
					</div>
		        </div>
			</form>
		</div>
	)
}