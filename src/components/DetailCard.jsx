import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faGauge, faShieldHalved } from '@fortawesome/free-solid-svg-icons';
import { stadisticProgressBar } from '../utils/functions/stadisticProgressBar'
import SwordIcon from '../assets/static/SwordIcon';
import '../assets/styles/components/DetailCard.scss';
import TypeIcon from "./TypeIcon";
import SemicirularProgressbar from './SemicirularProgressbar';

export default function DetailCard({name, img, type, weight, height, attack, defense, speed, hp, exp, original}) {
	let stadistics = [
		{ title: 'Attack', value: attack, icon: <SwordIcon/> },
		{ title: 'Defense', value: defense, icon: <FontAwesomeIcon icon={faShieldHalved}/> },
		{ title: 'Speed', value: speed, icon: <FontAwesomeIcon icon={faGauge}/> },
		{ title: 'HP', value: hp, icon: <FontAwesomeIcon icon={faHeart}/> }		
	]

	return (
	    <div className='detail-card'>
	    	{!original && 
		    	<div className='pokefan-identifiquer'>
		    		<div className='burst-12'></div>
		    		<p>POKÉFAN</p>
		    	</div>
	    	}

          	<p className='detail-card__exp'>exp{exp}</p>

	        <div className='detail-card__semicircular'>
		        <SemicirularProgressbar
					radius={125}
		          	progress={exp}
		          	steps={310}
		          	strokeWidth={10}
					trackStrokeWidth={10}
		          	pointerRadius={5}
		    		pointerStrokeWidth={15}
		        />	        	
	        </div>

	        <div className='detail-card__info'>
	        	<div className='detail-card__image'>
		       		<img src={img} alt={name}/>  	        		
	        	</div>
	        
	        	<h1 className='detail-card__name'>{name}</h1>

	        	<div className='detail-card__table'>
	        		<div className='table table--types'>
	        			<div className='table__type-icon'>
		        			{type.map(type=>{
		        				return(
		        					<TypeIcon key={type.name} icon={type.icon} name={type.name}/>
		        				)
		        			})}        				
	        			</div>
	        			<p className='table__title'>Type</p>
	        		</div>
	        		<div className='table table--weight'>
	        			<p className='table__value'>{weight}</p>
	        			<p className='table__title'>Weight</p>
	        		</div>
	        		<div className='table table--height'>
	        			<p className='table__value'>{height}</p>
	        			<p className='table__title'>Height</p>        			
	        		</div>
	        	</div>

	        	<div className='detail-card__statistics-container'>
					{stadistics.map(item => {
						return (
				        	<div className='statistics' key={item.title}>
				        		<span className='statistics__title'>{item.title}</span>
					        	<div className='statistics__progress-bar-horizontal'>
					        		<div style={stadisticProgressBar(item.value, item.title.toLowerCase())}></div>
					            </div>  
					            <span className='statistics__info'>{item.value}{item.icon}</span>      		
				        	</div>
						)
					})}
				</div>
	        </div>
		</div>
	)
}