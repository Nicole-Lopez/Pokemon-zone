import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useUpdateEffect } from 'usehooks-ts';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleArrowUp } from '@fortawesome/free-solid-svg-icons';
import { ThreeCircles } from  'react-loader-spinner';
import { uploadImage, cleanStatus } from '../redux/actions/index';
import '../assets/styles/components/UploadImageButton.scss';

export default function UploadImageButton({image, disabled, iconTransparent, iconColor, afterUpload, setLoadUpload}) {
	const dispatch = useDispatch();
	const [loadImage, setLoadImage] = useState(false)
  	const status = useSelector((state) => state.status);

	const handleUploadImage = (e) => {
		setLoadImage(true)
		setLoadUpload(true)
		dispatch(uploadImage(e))
	}

	useUpdateEffect(() => {
		if (['Upload image FAIL'].includes(status) || status.url) {
			setLoadImage(false)
			setLoadUpload(false)

			if (status.url?.includes('https://res.cloudinary.com/du7lmw4vm/image/upload')) afterUpload()

			dispatch(cleanStatus())		
		}
	}, [status])

	return (
		<div className='upload-image-button'>
			{loadImage?
				<ThreeCircles
					height="100"
					width="100"
					outerCircleColor="#1288cc"
					innerCircleColor="#259ad4"
					middleCircleColor="#5bc0e5"
					wrapperClass="loader"
				/>
				:	
				<div className={`upload-image-button__input ${iconTransparent && "upload-image-button__input--exist"}`}>
					<FontAwesomeIcon icon={faCircleArrowUp} style={{color:`${iconColor}`}}/>
					<input type="file" onChange={handleUploadImage} disabled={disabled}/>
				</div>
			}		
			<img src={image} alt="Sorry!"/>
		</div>			
	)
}