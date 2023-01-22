import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useStatusVerification } from '../utils/hooks/useStatusVerification';
import { useControlUploadImage } from '../utils/hooks/useControlUploadImage';
import { itemHallCreate, cleanDetail } from '../redux/actions/index';
import '../assets/styles/containers/CreateItemHall.scss';
import BtnCancel from "../components/BtnCancel";
import BtnSubmit from "../components/BtnSubmit";
import UploadImageButton from '../components/UploadImageButton';
import backgroundImage from '../assets/static/backgroundHall.png';

export default function CreateItemHall() {
	const dispatch = useDispatch();
	const navigate = useNavigate();	
	const {name} = useParams()

	const [widthImage, setWidthImage] = useState(300)
	const [loadSubmit, setLoadSubmit] = useState(false)
	const [input, setInput] = useState({
		title: "",
		image: "",
	})


	const [loadUpload, setLoadUpload, afterUpload, imageInfo] = useControlUploadImage(setInput, 'image', 
		() => setWidthImage(imageInfo.height>660 ? ((660*imageInfo.width)/imageInfo.height) : imageInfo.width)
	)


	const handleSubmit = (e) =>{
		e.preventDefault();
		setLoadSubmit(true)
		dispatch(itemHallCreate(input, name))
	}

	useStatusVerification(
		'Item created successfully', () => {
			setLoadSubmit(false)
			dispatch(cleanDetail())
			setInput({title: "", image: "" })
			navigate(`/detail/${name}`)					
		}, 
		'Item created FAIL', () => setLoadSubmit(false)
	)


	return (
		<form onSubmit={handleSubmit} className='create-item-hall' autoComplete="off">

			<h1>Upload a picture for <span>{name}</span></h1>

			<div className='item' style={{'width':`${widthImage}px`}}>				
				<UploadImageButton 
					image={input.image || backgroundImage} 
					disabled={loadSubmit} 
					iconTransparent={input.image} 
					iconColor='#633115'
					afterUpload={afterUpload}
					setLoadUpload={setLoadUpload}
				/>
				<textarea 
					type="text"
					value={input.title}
					name="title" 
					onChange={(e)=>setInput(prevState=>({...prevState, title: e.target.value}))}
					maxLength={145}
					placeholder='Description...'
					disabled={loadSubmit || loadUpload}
				/>
			</div>

			<div className='buttons'>
				<BtnCancel route={`/detail/${name}`}/>
				<BtnSubmit text='CREATE' disableSubmit={!input.image || !input.title || loadUpload} loadSubmit={loadSubmit}/>				
			</div>
		</form>
	)
}