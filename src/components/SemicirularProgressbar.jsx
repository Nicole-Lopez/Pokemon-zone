import {useState, useEffect} from 'react';

export default function SemicirularProgressbar({
    radius,
    progress,
    steps,
    strokeWidth,
    pointerRadius,
    pointerStrokeWidth,
    trackStrokeWidth
}){

    const [ animationInited, setAnimationInited ] = useState(false)

    useEffect(() => {
        let timer1 = setTimeout(() => setAnimationInited(true), 100)

        return () => clearTimeout(timer1)
    }, [])


    const getProgress = () => !animationInited ? 0 : progress

    const getStrokeDashoffset = (strokeLength) => {
        const progress = getProgress()
        const progressLength = (strokeLength / steps) * (steps - progress)

        return progressLength
    }

    const getTrackStrokeDashArray = (strokeLength, circumference) => {
        if(!animationInited) return `0, ${circumference}`
        	
        return `${strokeLength}, ${circumference}`
    }

    const getExtendedWidth = () => {
        const pointerWidth = pointerRadius + pointerStrokeWidth

        if(pointerWidth > strokeWidth && pointerWidth > trackStrokeWidth) {
            return pointerWidth * 2
        } else if(strokeWidth > trackStrokeWidth) {
            return strokeWidth * 2
        }
        return trackStrokeWidth * 2
    }

    const getPointerAngle = () => {
        const progress = getProgress()

        return ((360 - 175) / steps) * progress
    }

    const d = 2 * radius
    const width = d + getExtendedWidth()

    const circumference = 2 * Math.PI * radius
    const strokeLength = (circumference / 360) * (360 - 175)

    return (
        <div>
            <svg
                width='100%'
                height='100%'
                viewBox={`0 0 ${width} ${width}`}
                style={{transform: `rotate(-182deg)`}}
            >
                <circle
                    cx={width / 2}
                    cy={width / 2}
                    r={radius}
                    fill="none"
                    stroke='#ffffff61'
                    strokeWidth={trackStrokeWidth}
                    strokeDasharray={getTrackStrokeDashArray(strokeLength, circumference)}
                    strokeLinecap='butt'
                    style={{transition: 'all .3s ease 0s'}}
                />
                <circle
                    cx={width / 2}
                    cy={width / 2}
                    r={radius}
                    fill='none'
                    stroke='#fff'
                    strokeWidth={strokeWidth}
                    strokeDasharray={`${strokeLength}, ${circumference}`}
                    strokeDashoffset={getStrokeDashoffset(strokeLength)}
                    strokeLinecap='butt'
                    style={{transition: 'all .3s ease 0s'}}
                />
                <circle
                    cx={d}
                    cy="50%"
                    r={pointerRadius}
                    fill='#fff'
                    stroke='#fff'
                    strokeWidth={pointerStrokeWidth}
                    style={{
                        transformOrigin: '50% 50%',
                        transform: `rotate(${getPointerAngle()}deg) translate(${getExtendedWidth() /
                        2}px)`,
                        transition: 'all .3s ease 0s'
                    }}
                />
            </svg>
        </div>
    )
}