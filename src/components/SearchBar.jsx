import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useDebounce, useUpdateEffect } from 'usehooks-ts';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { setFiltersPokemon } from '../redux/actions/index';
import '../assets/styles/components/SearchBar.scss';

export default function SearchBar (){ 
    const dispatch = useDispatch()
    const search = useSelector((state) => state.search)
    const [searchValue, setSearchValue] = useState(search)
    const debouncedValue = useDebounce(searchValue, 300)

    useUpdateEffect(() => {
        dispatch(setFiltersPokemon(debouncedValue))
    }, [debouncedValue])

    useEffect(() => {
        if (search === 'Remove filters') setSearchValue('')
    }, [search])

    return(
        <div className='search-bar'>
            <input  type= 'text' value={searchValue} placeholder="Search..." onChange={e => setSearchValue(e.target.value)} maxLength={12}/>
            {!searchValue && <FontAwesomeIcon icon={faMagnifyingGlass}/>}
        </div>
    )
}