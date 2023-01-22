import { Link } from 'react-router-dom';
import '../assets/styles/components/Btn.scss';

export default function BtnCancel({route, disabled}) {
	return (
		<Link to={route} className='btn btn--cancel' style={disabled?{pointerEvents:'none', opacity: '0.6'}:null}>CANCEL</Link>			
	)
}