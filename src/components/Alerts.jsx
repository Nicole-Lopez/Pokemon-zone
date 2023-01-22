import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useUpdateEffect } from 'usehooks-ts';
import { cleanAlert } from '../redux/actions/index';
import '../assets/styles/components/Alerts.scss';


export default function Alerts() {
	const dispatch = useDispatch();
	const alert = useSelector((state) => state.alert);
	const [type, setType] = useState('')
	const [message, setMessage] = useState('')

	const handleCloseAlert = () => dispatch(cleanAlert())		

	useUpdateEffect(() => {
		Object.entries(alert).forEach(([keyM, valueM]) => {
		    let nameobj = {
		        pokemon: "Pokémon",
		        itemHall: "Picture"
		    }
		    let name = nameobj[keyM]   
		    
		    Object.entries(valueM).forEach(([key, value]) => {
		        if (key==='other') {
		        	setType(value[0])
		        	setMessage(value[1])
		        
		        } else{
		        	setType(value)
		            
		            let verbPast = {
		                create: 'created',
		                delete: 'deleted',
		                edit:'edited'
		            }
		            let action = verbPast[key]             

		            let messageSelect = {
		                success: `${name} successfully ${action}`,
		                danger: `This ${name.toLowerCase()} could not be ${action}, please try again`,
		            }
		            setMessage(messageSelect[value])
		        }        
		    })
		})


        if (alert) { 
	        let timer = setTimeout(() => handleCloseAlert(), 15000)     
        	return () => clearTimeout(timer)
        }
	}, [alert])

	return (
		<div className={`alert alert--${type} ${alert && 'alert--open'}`}>
			<h3>{message}</h3>
			<button onClick={() => handleCloseAlert()} type='button' className="alert__close-btn">X</button>
		</div>
	)
}