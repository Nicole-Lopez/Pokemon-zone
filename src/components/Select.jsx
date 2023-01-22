import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';

export default function Select({type, hidenANDshow, show, optionSelect, options, handleDispatchOrder}) {
	return (
        <div className='select'>
            <button className='select__option-main' onClick={hidenANDshow} value={type} type='button'>
                {optionSelect} <FontAwesomeIcon icon={show?faChevronUp:faChevronDown}/>
            </button>
            
            <div className={`select__options ${show && "select__options--open"}`}>
            	{options.map(option=>
            		<button key={option} value={option} onClick={handleDispatchOrder} name={type} type='button' disabled={optionSelect === option}>{option}</button>
            	)}           	
            </div>
        </div>
	)
}