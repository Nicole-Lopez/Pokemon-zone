import React,{ useEffect , useState} from 'react'
import {useParams, Link} from 'react-router-dom'
import {useDispatch} from 'react-redux';
import axios from 'axios'
import {itemHallCreate} from '../redux/actions/index'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleArrowUp } from '@fortawesome/free-solid-svg-icons';
import {CirclesWithBar} from  'react-loader-spinner'
import '../assets/styles/containers/CreateItemHall.scss'
import BtnCancel from "../components/BtnCancel"

export default function CreateItemHall() {
	const dispatch = useDispatch();
	const [widthImage, setWidthImage] = useState(300)
	const [loadImage, setLoadImage] = useState(false)

	const {name} = useParams()

	const [input, setInput] = useState({
		title: "",
		image: "",
	})

	const uploadImage = async (e)=>{
		setLoadImage(true)
		const files = e.target.files;
		const data = new FormData();
		data.append("file", files[0]);
		data.append("upload_preset", "clb9u90e");

		await axios.post("https://api.cloudinary.com/v1_1/du7lmw4vm/image/upload", data).then((res)=>{
			setInput({
				...input,
				image:res.data.secure_url
			})
									
			if (res.data.height>660) {
				setWidthImage((660*res.data.width)/res.data.height)
			} else {
				setWidthImage(res.data.width)
			}
			setLoadImage(false)
		})
	}

	const handleChange = (e) =>{
		setInput({
			...input,
			[e.target.name] : e.target.value
		})
	}

	const handleSubmit = (e) =>{
		e.preventDefault();
		dispatch(itemHallCreate(input, name))
	}

	return (
		<form className='create-item-hall' autoComplete="off">
			<h1>Upload a picture for <span>{name}</span></h1>

			<div className='item' style={{'width':`${widthImage}px`}}>				
				<div className='item__image'>
					<div className={`item__input-file ${input.image && "exist"}`}>
						{loadImage?
						<CirclesWithBar
							height="50"
							width="50"
							color="#000"
							visible={true}
							ariaLabel='circles-with-bar-loading'
						/> :	
						<>
							<FontAwesomeIcon icon={faCircleArrowUp} />
							<input 
								type="file"
								onChange={(e)=>uploadImage(e)}
								disabled={loadImage}
							/>
						</>}
					</div>
										
					<img src={input.image || 'https://res.cloudinary.com/du7lmw4vm/image/upload/v1666326726/CRUD%20pokemon%20NO%20DELETE/Frame_1_zf01xe.png'} alt="image"/>
				</div>

				<textarea 
					type="text"
					value={input.title}
					name="title" 
					onChange={(e)=>handleChange(e)}
					maxLength={500}
					placeholder='Description...'
					disabled={loadImage}
				/>
			</div>

			<div className='buttons'>
				<BtnCancel route={`/detail/${name}`}/>
				<button className='buttons__button buttons__button--submit' onClick={(e)=>handleSubmit(e)} type="submit" disabled={loadImage || !input.image || !input.title}>Create</button>				
			</div>
		</form>
	)

}