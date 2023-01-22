import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setFiltersPokemon } from "../redux/actions/index";
import '../assets/styles/components/Filters.scss';
import TypesSearch from './TypesSearch';
import Select from './Select';

export default function Filters() {
 	const dispatch = useDispatch()
    const filters = useSelector((state) => state.filters)
    const [showSelects, setShowSelects] = useState({
        alph: false,
        exp: false,
        origin: false,
        type: false
    })

    const hidenANDshow = (e) => {
        let res = {}
        Object.entries(showSelects).forEach(([key, value]) => res[key] = (key===e.target.value) && !value); 
        setShowSelects(res)   
    }

    const handleFilterPokemon = (e) => {
        let {value, name} = e.target

        dispatch(setFiltersPokemon([name, value]))
        hidenANDshow(e)
    }

	return (
		<div className='filters'>
            <div className='filters__section filters__section--order'>
                <p>ORDER</p>
                <div>
                    <Select
                        type='alph'
                        hidenANDshow={hidenANDshow}
                        show={showSelects.alph}
                        optionSelect={filters.alph}
                        options={['A-Z','Z-A']}
                        handleDispatchOrder={handleFilterPokemon}
                    />
                    <Select 
                        type='exp' 
                        hidenANDshow={hidenANDshow} 
                        show={showSelects.exp} 
                        optionSelect={filters.exp} 
                        options={['WEAK TO STRONG','STRONG TO WEAK']} 
                        handleDispatchOrder={handleFilterPokemon}
                    />                          
                </div>
            </div>
            <div className='filters__section filters__section--filter'>
                <p>FILTER</p>
                <div>
                    <Select
                        type='origin'
                        hidenANDshow={hidenANDshow}
                        show={showSelects.origin}
                        optionSelect={filters.origin}
                        options={['CREATED','EXISTING']}
                        handleDispatchOrder={handleFilterPokemon}
                    /> 
                    <TypesSearch
                        type='type'
                        showType={showSelects.type}
                        handleSelectType={handleFilterPokemon}
                        hidenANDshow={hidenANDshow}
                        optionSelect={filters.type} 
                        typeList={[filters.type.name]}
                    />
                </div>
            </div>
		</div>
	)
}