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

    const hidenANDshow = (e) => {
        setShowAlph(e.target?.value==='alph'? !showAlph : false)
        setShowExp(e.target?.value==='exp'? !showExp : false)
        setShowOrigin(e.target?.value==='origin'? !showOrigin : false)
        setShowType(e.target?.value==='type'? !showType : false)
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
        dispatch(dispatchOrder[name](e.target.attributes.value.nodeValue))
        if (name==='origin' || name==='type') combination()

        hidenANDshow('all')
    }

	return (
		<div className='filters'>
            <div className='filters__section filters__section--order'>
                <p>ORDER</p>
                <div>
                    <Select type='alph' hidenANDshow={hidenANDshow} show={showAlph} optionSelect={filters.alph} options={['A-Z','Z-A']} handleDispatchOrder={handleDispatchOrder}/>
                    <Select type='exp' hidenANDshow={hidenANDshow} show={showExp} optionSelect={filters.exp} options={['WEAK TO STRONG','STRONG TO WEAK']} handleDispatchOrder={handleDispatchOrder}/>                          
                </div>
            </div>
            <div className='filters__section filters__section--filter'>
                <p>FILTER</p>
                <div>
                    <Select type='origin' hidenANDshow={hidenANDshow} show={showOrigin} optionSelect={filters.origin} options={['CREATED','EXISTING']} handleDispatchOrder={handleDispatchOrder}/> 
                    <TypesSearch type='type' showType={showType} handleSelectType={handleDispatchOrder} hidenANDshow={hidenANDshow} optionSelect={filters.types} arrow={true} typeList={[filters.types.name.toLowerCase()]}/>
                </div>
            </div>
		</div>
	)
}