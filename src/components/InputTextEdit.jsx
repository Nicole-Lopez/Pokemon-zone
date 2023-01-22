import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck,faXmark } from '@fortawesome/free-solid-svg-icons';
import InputText from './InputText';

export default function InputTextEdit({setShowInput, placeholder, value, name, onChange, maxLength, classNameInput, classNameContainer, disabled, error}) {
	return (
		<div className={classNameContainer}>
			<InputText 
				placeholder={placeholder}
				value={value}
				name={name}
				onChange={onChange}
				maxLength={maxLength}
				className={classNameInput} 
				disabled={disabled}
				error={error}
			/>
      		{error?
      			<FontAwesomeIcon icon={faXmark}/>
      			:
      			<FontAwesomeIcon onClick={()=>setShowInput(prev => ({...prev, [name]:false}))} icon={faCheck}/>
      		}			
		</div>
	)
}