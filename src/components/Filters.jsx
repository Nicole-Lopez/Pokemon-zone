import React, {useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {
    filterByOrder,
    orderByExp,
    filterByOrigin,
    filterByType,
    setPage,
} from "../redux/actions/index"
import '../assets/styles/components/Filter.scss'
import TypesSearch from './TypesSearch'
import Select from './Select'

export default function Filters() {
 	const dispatch = useDispatch()
    const filters = useSelector((state) => state.filters)

	const [showAlph,setShowAlph] = useState(false);
	const [showExp,setShowExp] = useState(false);
	const [showOrigin,setShowOrigin] = useState(false);
	const [showType,setShowType] = useState(false);

    const hidenANDshow = (name) => {
        name==='alph'?setShowAlph(!showAlph):setShowAlph(false)
        name==='exp'?setShowExp(!showExp):setShowExp(false)
        name==='origin'?setShowOrigin(!showOrigin):setShowOrigin(false)
        name==='type'?setShowType(!showType):setShowType(false)
    }

    const combination = () => {
        if (filters.alph !== 'ALPHABETICALLY') dispatch(filterByOrder(filters.alph))
        if (filters.exp !== 'EXP') dispatch(orderByExp(filters.exp))
    }

    const handleDispatchOrder = (e, name) => {
        e.preventDefault();
        dispatch(setPage());

        let dispatchOrder = {
            'alph':filterByOrder,
            'exp':orderByExp,
            'origin':filterByOrigin,
            'type':filterByType
        }
        dispatch(dispatchOrder[name](e.target.value))

        if (name==='origin' || name==='type') combination()

        hidenANDshow('all')
    }

	return (
		<div className='orderANDfilters'>
            <div className='orderANDfilters__order'>
                <p>ORDER</p>
                <div>
                    <Select type='alph' hidenANDshow={hidenANDshow} show={showAlph} optionSelect={filters.alph} options={['A-Z','Z-A']} handleDispatchOrder={handleDispatchOrder}/>
                    <Select type='exp' hidenANDshow={hidenANDshow} show={showExp} optionSelect={filters.exp} options={['WEAK TO STRONG','STRONG TO WEAK']} handleDispatchOrder={handleDispatchOrder}/>                          
                </div>
            </div>
            <div className='orderANDfilters__filter'>
                <p>FILTER</p>
                <div>
                    <Select type='origin' hidenANDshow={hidenANDshow} show={showOrigin} optionSelect={filters.origin} options={['CREATED','EXISTING']} handleDispatchOrder={handleDispatchOrder}/> 
                    <TypesSearch showType={showType} handleSelectType={handleDispatchOrder} withOptionMain={true} hidenANDshow={hidenANDshow} optionSelect={filters.types}/>
                </div>
            </div>
		</div>
	)
}