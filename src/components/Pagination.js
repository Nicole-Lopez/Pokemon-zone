import React from 'react';
import '../assets/styles/components/Pagination.css'

export default function Pagination ({pokePerPage, allPokemon, setCurrentPage,currentPage}) { 
const pageNumbers = []
for (let i = 1; i<= Math.ceil(allPokemon/pokePerPage); i++){
    pageNumbers.push(i)
}
function handlePrev(){
    setCurrentPage(currentPage - 1)
}
function handleNext(){
    setCurrentPage(currentPage + 1)
}

const paginado = (pageNumber) => {
    setCurrentPage(pageNumber)
}


    return (
        <div id='pagination'>
            <button disabled={currentPage <=1} onClick={(e)=> handlePrev(e) } id='previusBtn'>Previus</button>     
                {pageNumbers?.map(number=>( 
                    <button key={number} onClick={() =>paginado(number)}>{number}</button>
                ))}
            <button disabled={currentPage === pageNumbers[pageNumbers.length -1]} onClick={(e)=> handleNext(e)} id='nextBtn'>Next</button>
        </div>
    )
}