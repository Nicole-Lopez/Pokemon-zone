import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown,faChevronUp } from '@fortawesome/free-solid-svg-icons'

export default function Select({type, hidenANDshow, show, optionSelect, options, handleDispatchOrder}) {
	return (
        <div className='select'>
            <button className='select__optionMain' onClick={()=>hidenANDshow(type)}>
            	{optionSelect} <FontAwesomeIcon className='select__optionMain__arrow' icon={show?faChevronUp:faChevronDown} />
            </button>
            <div className={`select__options ${show && "open"}`}>
            	{options.map(option=>
            		<button onClick={(e)=>handleDispatchOrder(e, type)} value={option}>{option}</button>
            	)}           	
            </div>
        </div>
	)
}