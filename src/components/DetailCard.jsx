import React from 'react';
import ProgressBar from 'react-customizable-progressbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart,faGauge,faShieldHalved } from '@fortawesome/free-solid-svg-icons';
import TypeIcon from "./TypeIcon";
import '../assets/styles/components/DetailCard.scss';


export default function DetailCard({name, img, type, weight, height, attack, defense, speed, hp, exp, convertValue}) {

const hectoToKgANDdecToM = (number) =>(number/10).toFixed(1);

const capitalizeFirstLetter = (str) =>str.charAt(0).toUpperCase() + str.slice(1);

const calculatePercentage = (number) =>(number*100)/200;


	return (
	        <div id='detail_card_container_main'>
          	<p className='detail_exp'>exp{exp}</p>
	        
	        <ProgressBar
	        	className='progress_circle'
	            radius={280}
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

	        <div className='detail_info_container'>

	       		<img className='detail_pokemon_img' src={img} alt="pokemon"/>           
	        
	        	<h1>{convertValue?capitalizeFirstLetter(name):name}</h1>

	        	<div className='table_container'>
	        		<div className='detail_types'>
	        			<div className='detail_icon_type'>
		        			{type.map(tip=>{
		        				return(
		        					<TypeIcon icon={tip.icon} name={tip.name}/>
		        				)
		        			})}        				
	        			</div>
	        			<p className='detail_info_title'>Type</p>
	        		</div>
	        		<div className='detail_weight'>
	        			<p className='detail_info'>{convertValue?hectoToKgANDdecToM(weight):weight}<span> kg</span></p>
	        			<p className='detail_info_title'>Weight</p>
	        		</div>
	        		<div className='detail_height'>
	        			<p className='detail_info'>{convertValue?hectoToKgANDdecToM(height):height}<span> m</span></p>
	        			<p className='detail_info_title'>Height</p>        			
	        		</div>
	        	</div>



	        	<div className='statistics_container'>
	        		<div className='detail_container'>
	        			<span className='detail_info_title'>Attack</span>
		        	<div className='pro_cont'>
		        		<div className='progress_bar' style={{width: `${calculatePercentage(attack)}%`, background:"#D74040"}}></div>
		            </div>  
		            <span className='detail_info'>{attack} <svg id="Flat" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" className='icon' width={35} height={35} fill="#476B6A">
			  			<path d="M221.65723,34.34326A8.00246,8.00246,0,0,0,216,32h-.02539l-63.79883.20117A8.00073,8.00073,0,0,0,146.0332,35.106L75.6369,120.32275,67.31348,111.999A16.02162,16.02162,0,0,0,44.68555,112L32.001,124.68555A15.99888,15.99888,0,0,0,32,147.31348l20.88672,20.88769L22.94531,198.14258a16.01777,16.01777,0,0,0,.001,22.62695l12.28418,12.28418a16.00007,16.00007,0,0,0,22.62793,0L87.79883,203.1123,108.68652,224.001A16.02251,16.02251,0,0,0,131.31445,224L143.999,211.31445A15.99888,15.99888,0,0,0,144,188.68652l-8.32318-8.32324,85.21673-70.39648a8.00125,8.00125,0,0,0,2.90528-6.14258L224,40.02539A8.001,8.001,0,0,0,221.65723,34.34326ZM120,212.68652,99.11328,191.79883a16,16,0,0,0-22.62793,0L46.544,221.74023,34.25977,209.45605l29.9414-29.9414a16.01866,16.01866,0,0,0,0-22.62695L43.31445,136,56,123.31348l14.50165,14.50195.00116.001L94.34045,161.6543l.00232.00293.00251.00195L132.68555,200Zm87.81055-112.665-83.49829,68.97706L111.314,156l54.3432-54.34277a8.00053,8.00053,0,0,0-11.31446-11.31446L99.99994,144.686l-12.998-12.99854L155.97852,48.189l51.99609-.16357Z"/>
					</svg>
					</span>      	        			
	        		</div>
		
	        	

		        	<div className='detail_container'>
		        		<span className='detail_info_title'>Defense</span>
			        	<div className='pro_cont'>
			        		<div className='progress_bar' style={{width: `${calculatePercentage(defense)}%`, background:"#27FF23"}}></div>
			            </div>  
			            <span className='detail_info'>{defense} <FontAwesomeIcon className='icon' icon={faShieldHalved} /></span>      		
		        	</div>

		        	<div className='detail_container'>
		        		<span className='detail_info_title'>Speed</span>
			        	<div className='pro_cont'>
			        		<div className='progress_bar' style={{width: `${calculatePercentage(speed)}%`, background:"#FF9900"}}></div>
			            </div>  
			            <span className='detail_info'>{speed} <FontAwesomeIcon className='icon' icon={faGauge} /></span>      		
		        	</div>
		        	<div className='detail_container'>
		        		<span className='detail_info_title'>HP</span>
			        	<div className='pro_cont'>
			        		<div className='progress_bar' style={{width: `${calculatePercentage(hp)}%`, background:"#1D40FF"}}></div>
			            </div>  
			            <span className='detail_info'>{hp} <FontAwesomeIcon className='icon' icon={faHeart} /></span>      		
		        	</div>
				</div>

	        </div>

		</div>
	)
}