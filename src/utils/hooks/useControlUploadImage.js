import { useState } from 'react';
import { useSelector } from 'react-redux';

export const useControlUploadImage = (setInput, key, extraFunction) => {
  	const imageInfo = useSelector((state) => state.status);
	const [loadUpload, setLoadUpload] = useState(false)

	const afterUpload = () => {
		setInput(prevState => ({ ...prevState, [key] : imageInfo.url}))

		if (extraFunction) extraFunction()
	}	

	return [
		loadUpload, 
		setLoadUpload, 
		afterUpload,
		imageInfo
	]
}