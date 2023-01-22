import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useDispatch,useSelector } from 'react-redux';
import { getDetailPokemon, deletePokemon, getPokemon } from '../redux/actions/index';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import '../assets/styles/containers/DetailsPokemon.scss';
import InfiniteScroll from "react-infinite-scroll-component";
import DetailCard from '../components/DetailCard';
import ItemHall from '../components/ItemHall';
import NoContent from '../assets/static/204.png';
import SkeletonLoader from '../components/Skeleton loader/SkeletonLoader';
import DeleteConfirmation from '../components/DeleteConfirmation';

export default function DetailsPokemon() {
	const dispatch = useDispatch();
	const {name} = useParams()
	const navigate = useNavigate();	
	const pokemonDetail = useSelector((state) => state.detail)

	const [currentPage, setCurrentPage] = useState(1)
	const [openDeleteConfirmation, setOpenDeleteConfirmation] = useState(false)

	let hallOfFame = pokemonDetail[0]?.hallOfFames.slice(0, currentPage * 3)

	const handleDeletePokemon = () => dispatch(deletePokemon(name))	

	const afterDeletePokemon = () => {
		dispatch(getPokemon())
		navigate(`/`)
	}		
	

	useEffect(() => {
		if (!pokemonDetail.length) {
	        window.scrollTo(0,0);
			dispatch(getDetailPokemon(name))
		}
	}, [dispatch, name, pokemonDetail])

    return ( 
        <div className='detail-pokemon-page'> 
			<div className="detail-pokemon-page__card-info">
				{!pokemonDetail[0]?
					<SkeletonLoader 
						width='clamp(280px, 55vw, 480px)' 
						height='clamp(528px, 55vw + 220px, 699px)' 
						wrapperStyle={{borderRadius: '20px'}}
					/>
					:
				    <DetailCard 
					    name={pokemonDetail[0].name}
					    img={pokemonDetail[0].img}
					    type={pokemonDetail[0].types}
					    weight={pokemonDetail[0].weight}
					    height={pokemonDetail[0].height}
					    attack={pokemonDetail[0].attack}
					    defense={pokemonDetail[0].defense}
					    speed={pokemonDetail[0].speed}
					    hp={pokemonDetail[0].hp}
					    exp={pokemonDetail[0].experience}
					    original={pokemonDetail[0].original}
				    /> 
				}

				{!pokemonDetail[0]?
					<SkeletonLoader className='origin'/>
					:
					pokemonDetail[0].original?
			    	<p className='origin origin--original'>ORIGINAL POKÉMON</p> 
				    :
				    <>
				    	<div className='origin origin--pokefan'>
					    	<button className="pokefan pokefan--delete" onClick={()=>setOpenDeleteConfirmation(true)}><FontAwesomeIcon icon={faTrashCan}/></button>
					    	<Link to={`/pokemon/edit/${name}`} className='pokefan pokefan--edit'><FontAwesomeIcon icon={faPenToSquare}/></Link>				    	
					    </div>

				    	<DeleteConfirmation 
							open={openDeleteConfirmation} 
							close={setOpenDeleteConfirmation}
							name='pokémon'
							handleDelete={handleDeletePokemon}
							afterDelete={afterDeletePokemon}
							statusSuccess='Pokemon deleted from DB'
							statusFail='Pokemon delete FAIL'
						/>
				    </>

				}
			</div>

		    <div className='hall-Of-fame'>
			    <h2>HALL OF FAME</h2>

			    <Link to={`/hall/${name}`} className='hall-Of-fame__upload-btn'>Upload picture</Link>

			    {!pokemonDetail[0]?
					<SkeletonLoader width='100%' height='400px' wrapperStyle={{marginTop: '15px'}}/>
					:
			    	pokemonDetail[0].hallOfFames[0]?
					    <InfiniteScroll
					    	dataLength={hallOfFame.length}
					    	hasMore={pokemonDetail[0].hallOfFames.length !== hallOfFame.length}
					    	next={ () => setCurrentPage(prev=>prev + 1) }
					    	style={{display: 'flex', flexDirection: 'column'}}
					    >
					  		{hallOfFame.map((e,index)=>{
					  			return (
					  				<ItemHall  
					  					key={e.id} 
					  					id={e.id} 
					  					title={e.title} 
					  					image={e.image} 
					  					flex={(index % 2) === 0?'row':'row-reverse'}
					  				/>	
					  			)
							})}
					  	</InfiniteScroll>
					:
					<div className="hall-Of-fame__no-content">
						<p>This pokemon has no pictures.</p>
						<img src={NoContent} alt="204 Sorry!"/>
						<p>Be the first to post a picture!</p>
					</div>
			    }			    	
		    </div>
		</div>
    )
}