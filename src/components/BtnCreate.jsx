import React from 'react'
import '../assets/styles/components/Btn.scss'
import { ThreeCircles } from  'react-loader-spinner'

export default function BtnCreate({handleSubmit, disableSubmit, loadSubmit}) {
	return (
		<button onClick={(e)=>handleSubmit(e)} className='btn btn--submit' type="submit" disabled={disableSubmit}>
			{loadSubmit?
			<ThreeCircles
				height="30"
				width="30"
				color="red"
				wrapperStyle={{}}
				wrapperClass=""
				visible={true}
				ariaLabel="three-circles-rotating"
				outerCircleColor=""
				innerCircleColor="#0088ff"
				middleCircleColor=""
			/> :
				<span>CREATE</span>
			}
		</button>	
	)
}