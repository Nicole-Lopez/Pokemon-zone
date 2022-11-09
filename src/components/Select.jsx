import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown,faChevronUp } from '@fortawesome/free-solid-svg-icons'
import '../assets/styles/components/Select.scss';

export default function Select({type, hidenANDshow, show, optionSelect, options, handleDispatchOrder,dis}) {
	return (
        <div className='select'>
            <button className='select__option-main' onClick={(e)=>hidenANDshow(e)} value={type} type='button'>
            	{optionSelect} <FontAwesomeIcon className='arrow' icon={show?faChevronUp:faChevronDown} />
            </button>
            <div className={`select__options ${show && "open"}`}>
            	{options.map(option=>
            		<button className={`${optionSelect === option?'disabled':null}`} key={option} onClick={(e)=>handleDispatchOrder(e, type)} value={option}>{option}</button>
            	)}           	
            </div>
        </div>
	)
}