import { useDispatch, useSelector } from 'react-redux';
import { cleanStatus } from '../../redux/actions/index';
import { useUpdateEffect } from 'usehooks-ts';

export const useStatusVerification = (statusA, afterA, statusB, afterB, statusC, afterC) => {
	const dispatch = useDispatch();
  	const status = useSelector((state) => state.status);

	useUpdateEffect(() => {
		if ([statusA, statusB, statusC].includes(status)) {
			if (status === statusA) afterA()
			
			if (status === statusB) afterB()
			
			if (status === statusC) afterC()

			dispatch(cleanStatus())					
		}
	}, [status])	
}