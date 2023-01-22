export const stadisticProgressBar = (value, type) => {
	let color = {
		attack: '#D74040', 
		defense: '#27FF23',
		speed: '#FF9900',
		hp: '#1D40FF',
	}

	return {width: `${(value*100)/300}%`, background:color[type]}
}