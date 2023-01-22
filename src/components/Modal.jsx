import '../assets/styles/components/Modal.scss';

export default function Modal({visible, closeModal, children, className}) {
	return (
		<>
			{visible &&
				<div className={`modal ${className}`}>
		            {closeModal && <button className='modal__close-btn' type='button' onClick={closeModal}>X</button>}
					{children}
				</div>			
			}
		</>
	)
}