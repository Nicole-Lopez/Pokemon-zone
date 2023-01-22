import { useState } from 'react';
import { useStatusVerification } from '../utils/hooks/useStatusVerification';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import '../assets/styles/components/DeleteConfirmation.scss';
import Modal from './Modal';
import { ThreeDots } from  'react-loader-spinner';

export default function DeleteConfirmation({open, close, name, handleDelete, afterDelete, statusSuccess, statusFail}) {
	const [loadDelete, setLoadDelete] = useState(false)  	

	const handleDeleteM = () => {
		handleDelete()
		setLoadDelete(true)
	}

	useStatusVerification(
		statusSuccess, ()=>{
			afterDelete()
			close(false)				
		}, 
		statusFail, ()=> setLoadDelete(false)
	)

	return (
		<Modal visible={open}>
			<div className='delete-confirmation'>
				<div className='delete-confirmation__message'>
					<FontAwesomeIcon icon={faTrashCan}/>
					<p>Are you sure you want to delete this {name}?</p>
				</div>
				<div className='delete-confirmation__buttons'>
					<button onClick={()=>close(false)} type='button' className='btn delete-confirmation__cancel' disabled={loadDelete}>Cancel</button>
					<button onClick={handleDeleteM} type='button' className='btn btn--cancel' disabled={loadDelete}>
						{loadDelete?
							<ThreeDots 
								height="clamp(2.3rem, 1rem + 1vw, 2.2rem)" 
								width="30" 
								color="#FFF" 
							/>
							:
							<span>Delete</span>
						}		
					</button>
				</div>
			</div>
		</Modal>
	)
}