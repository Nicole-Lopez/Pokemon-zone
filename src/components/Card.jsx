import {Link} from 'react-router-dom';
import '../assets/styles/components/Card.scss';
import TypeIcon from './TypeIcon';

export default function Card({name, types, image, exp, original}) {	
	return (
        <Link to={`/detail/${name}`} className='card'>
			{!original &&
				<div className='card__pokefan'>
					<p>POKÉFAN</p>
				</div>
			}
			<p className='card__experience'>exp{exp}</p>
			<img className='card__img' src={image} alt={name}/>
			<p className='card__name'>{name}</p>
			<div className='card__types'>
				{types.map(e=>{
					return(
						<TypeIcon key={e.id} icon={e.icon} name={e.name}/>	
					)			
				})}				
			</div>
        </Link>    
	)
}