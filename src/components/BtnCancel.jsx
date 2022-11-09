import React from 'react'
import {Link} from 'react-router-dom'
import '../assets/styles/components/Btn.scss'

export default function BtnCancel({route}) {
	return (
		<Link to={route} className='btn btn--cancel'>CANCEL</Link>			
	)
}