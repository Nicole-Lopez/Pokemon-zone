import { useState, useRef }  from 'react';
import { useDispatch } from 'react-redux';
import { useTrueElementSize } from 'use-true-element-size';
import { deleteItemHall,cleanDetail } from '../redux/actions/index';
import '../assets/styles/components/ItemHall.scss';
import Modal from './Modal';
import DeleteConfirmation from './DeleteConfirmation';

export default function ItemHall({id, title, image, flex}) {
	const dispatch = useDispatch();
	const imageSizeRef = useRef(null);
	const { elementWidth } = useTrueElementSize(imageSizeRef);

	const [openDeleteConfirmation, setOpenDeleteConfirmation] = useState(false)
	const [showDetail, setShowDetail] = useState(false)


	const afterDeleteItem = () => {
		dispatch(cleanDetail())
		setShowDetail(false)		
	}

	const handleDeleteItem = () => dispatch(deleteItemHall(id))
	
	const closeDetail = () => setShowDetail(false)
	

	return (
		<div className='item-hall'>
		  	<div className="item-hall-card" style={{'flexDirection': `${flex}`}}>
		  		<div className="item-hall-card__image">
					<img src={image} alt='Not found'/>
		  		</div>
				
				<div className='item-hall-card__text'>
					<p>{title.length >= 95? title.slice(0,95)+'...': title}</p>
					<button onClick={()=>setShowDetail(true)}>More</button>
				</div>
			</div>

			<Modal visible={showDetail} closeModal={closeDetail} className='item-hall-detail'>
				<div className='item-hall-detail__content' style={{'maxWidth':`${elementWidth}px`}}>
					<img ref={imageSizeRef} src={image} alt='Pokémon moment'/>
					<p style={{'width':`${elementWidth}px`}}>{title}</p>	
				</div>	

				<button onClick={()=>setOpenDeleteConfirmation(true)} className='item-hall-detail__delete-btn'>
			   		<div className="trash-icon-animation">
						<span><span></span><i></i></span>
			    	</div>				
					Delete
				</button>	

				<DeleteConfirmation 
					open={openDeleteConfirmation} 
					close={setOpenDeleteConfirmation}
					name='picture'
					handleDelete={handleDeleteItem}
					afterDelete={afterDeleteItem}
					statusSuccess='Item hall delete SUCCESS'
					statusFail='Item hall delete FAIL'
				/>	
			</Modal>
		</div>
	)
}