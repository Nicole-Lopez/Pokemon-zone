import React from 'react';
import ProgressBar from 'react-customizable-progressbar';
import { useWindowSize } from 'usehooks-ts';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart,faGauge,faShieldHalved } from '@fortawesome/free-solid-svg-icons';
import '../assets/styles/components/DetailCard.scss';
import TypeIcon from "./TypeIcon";

export default function DetailCard({name, img, type, weight, height, attack, defense, speed, hp, exp}) {

	const { width } = useWindowSize()

	const calculatePercentage = (number) =>(number*100)/300;

	return (
	    <div className='detail-card'>
          	<p className='detail-card__exp'>exp{exp}</p>

	        <ProgressBar
	        	className='progress_circle'
	            radius={width<620?125:180}
	            progress={exp}
	            strokeWidth={10}
	            steps={305}
	            strokeColor="#fff"
	            strokeLinecap="butt"
	            trackStrokeWidth={10}
	            trackStrokeColor="#ffffff61"
	            trackStrokeLinecap="butt"
	            cut={175}
	            rotate={-182}
	            initialAnimation={true}
	            initialAnimationDelay={100}
	            pointerRadius={5}
	            pointerStrokeColor="#fff"
	            pointerStrokeWidth={20}
	            pointerFillColor="white"
	        >
	        </ProgressBar>

	        <div className='detail-card__info'>

	       		<img className='detail-card__image' src={img} alt="pokemon"/>           
	        
	        	<h1>{name}</h1>

	        	<div className='detail-card__table'>
	        		<div className='table table--types'>
	        			<div className='table__type-icon'>
		        			{type.map(tip=>{
		        				return(
		        					<TypeIcon icon={tip.icon} name={tip.name}/>
		        				)
		        			})}        				
	        			</div>
	        			<p className='table__title'>Type</p>
	        		</div>
	        		<div className='table table--weight'>
	        			<p className='table__value'>{weight}<span> kg</span></p>
	        			<p className='table__title'>Weight</p>
	        		</div>
	        		<div className='table table--height'>
	        			<p className='table__value'>{height}<span> m</span></p>
	        			<p className='table__title'>Height</p>        			
	        		</div>
	        	</div>

	        	<div className='detail-card__statistics-container'>
	        		<div className='statistics'>
	        			<span className='statistics__title'>Attack</span>
			        	<div className='statistics__progress-bar-horizontal'>
			        		<div style={{width: `${calculatePercentage(attack)}%`, background:"#D74040"}}></div>
			            </div>  
			            <span className='statistics__info'>{attack} <svg id="Flat" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" className='icon' width={width<620?25:30} height={width<620?25:30} fill="#476B6A">
				  			<path d="M221.65723,34.34326A8.00246,8.00246,0,0,0,216,32h-.02539l-63.79883.20117A8.00073,8.00073,0,0,0,146.0332,35.106L75.6369,120.32275,67.31348,111.999A16.02162,16.02162,0,0,0,44.68555,112L32.001,124.68555A15.99888,15.99888,0,0,0,32,147.31348l20.88672,20.88769L22.94531,198.14258a16.01777,16.01777,0,0,0,.001,22.62695l12.28418,12.28418a16.00007,16.00007,0,0,0,22.62793,0L87.79883,203.1123,108.68652,224.001A16.02251,16.02251,0,0,0,131.31445,224L143.999,211.31445A15.99888,15.99888,0,0,0,144,188.68652l-8.32318-8.32324,85.21673-70.39648a8.00125,8.00125,0,0,0,2.90528-6.14258L224,40.02539A8.001,8.001,0,0,0,221.65723,34.34326ZM120,212.68652,99.11328,191.79883a16,16,0,0,0-22.62793,0L46.544,221.74023,34.25977,209.45605l29.9414-29.9414a16.01866,16.01866,0,0,0,0-22.62695L43.31445,136,56,123.31348l14.50165,14.50195.00116.001L94.34045,161.6543l.00232.00293.00251.00195L132.68555,200Zm87.81055-112.665-83.49829,68.97706L111.314,156l54.3432-54.34277a8.00053,8.00053,0,0,0-11.31446-11.31446L99.99994,144.686l-12.998-12.99854L155.97852,48.189l51.99609-.16357Z"/>
						</svg>
						</span>      	        			
	        		</div>

		        	<div className='statistics'>
		        		<span className='statistics__title'>Defense</span>
			        	<div className='statistics__progress-bar-horizontal'>
			        		<div style={{width: `${calculatePercentage(defense)}%`, background:"#27FF23"}}></div>
			            </div>  
			            <span className='statistics__info'>{defense} <FontAwesomeIcon className='icon' icon={faShieldHalved} /></span>      		
		        	</div>

		        	<div className='statistics'>
		        		<span className='statistics__title'>Speed</span>
			        	<div className='statistics__progress-bar-horizontal'>
			        		<div style={{width: `${calculatePercentage(speed)}%`, background:"#FF9900"}}></div>
			            </div>  
			            <span className='statistics__info'>{speed} <FontAwesomeIcon className='icon' icon={faGauge} /></span>      		
		        	</div>
		        	<div className='statistics'>
		        		<span className='statistics__title'>HP</span>
			        	<div className='statistics__progress-bar-horizontal'>
			        		<div style={{width: `${calculatePercentage(hp)}%`, background:"#1D40FF"}}></div>
			            </div>  
			            <span className='statistics__info'>{hp} <FontAwesomeIcon className='icon' icon={faHeart} /></span>      		
		        	</div>
				</div>

	        </div>

		</div>
	)
}