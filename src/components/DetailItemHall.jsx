import React from 'react'
import { useElementSize } from 'usehooks-ts'
import '../assets/styles/components/DetailItemHall.scss'

export default function DetailItemHall({image, description}) {
	const [imageRef, { width }] = useElementSize()

	return (
		<div className='detail-item-hall' style={{'maxWidth':`${width}px`}}>
			<img ref={imageRef} src={image} />
			<p style={{'width':`${width}px`}}>{description}</p>				
		</div>
	)
}