export default function InputText({placeholder, value, name, onChange, maxLength, className, disabled, error}) {
	return (
		<input 
			type="text"
			placeholder={placeholder}
			value={value}
			name={name}
			onChange={onChange}
			maxLength={maxLength}
			className={`${className} ${error? `${className}--error` : value? `${className}--correct`:null}`} 
			disabled={disabled}
		/>			
	)
}