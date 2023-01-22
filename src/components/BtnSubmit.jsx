import '../assets/styles/components/Btn.scss';
import { ThreeDots } from  'react-loader-spinner';

export default function BtnSubmit({text, disableSubmit, loadSubmit}) {
	return (
		<button type="submit" className='btn btn--submit' disabled={disableSubmit || loadSubmit}>
			{loadSubmit?
				<ThreeDots 
					height="clamp(2.3rem, 1rem + 1vw, 2.2rem)" 
					width="30" 
					color="#FFF" 
				/>
				:
				<span>{text}</span>
			}
		</button>	
	)
}