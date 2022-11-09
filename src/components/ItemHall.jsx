import React,{useState, useEffect}  from 'react'
import DetailItemHall from './DetailItemHall'

export default function ItemHall({title,image,flex}) {
	const [detail, setDetail] = useState(false)

	return (
	  	<div className="item-hall" style={{'flexDirection': `${flex}`}}>
	  		<div className="item-hall__image">
				<img src={image} />
	  		</div>
			
			<div className='item-hall__text'>
				<p>{title.slice(0,100)+'...'}</p>
				<button onClick={()=>setDetail(true)}>Ver mas +</button>
			</div>

			{detail && 
				<div className="detail">
					<button onClick={()=>setDetail(false)}>Nath</button>
					<DetailItemHall image={image} description={title}/>
				</div>
			}

		</div>
	)
}