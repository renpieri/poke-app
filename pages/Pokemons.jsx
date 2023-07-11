import { useState, useEffect } from 'react'
import * as PokemonsController from '../services/pokemon.services'
import '../public/css/pokemons.css'


function Pokemons () {

    const [pokemon, setPokemon] = useState(null)
    const [id, setId] = useState(1)
    const [error, setError] = useState(null)
    const [name, setName] = useState('')


    function handleName (e) {
        setName(e.target.value)
    }
    
    function handleBefore (e) {
        if(id > 1) {
            setId(id-1)
        }
    }
    function handleAfter (e) {  
        if(id < 1008) {
            setId(id+1)
        }
    }


    //POKEMON POR ID
    useEffect(() => {
        setPokemon(null)

        PokemonsController.getPokemons(id)
        .then(data => {
            setPokemon({ 
                name: data.species.name, 
                img: data.sprites.front_default, 
                hp: data.stats[0].base_stat,
                attack: data.stats[1].base_stat,
                defense: data.stats[2].base_stat,
                type: data.types[0].type.name,
            })
        })
        

    }, [id])


    //BUSQUEDA POKEMON
    function onSubmit(e) {
        e.preventDefault()

        if(name.length > 2) {
            setPokemon(null)
            setError(null)

            PokemonsController.getPokemonsByName(name)
            .then(data => {       
                setPokemon({
                    name: name, 
                    species: data.species.name, 
                    img: data.sprites.front_default, 
                    hp: data.stats[0].base_stat,
                    attack: data.stats[1].base_stat,
                    defense: data.stats[2].base_stat,
                    type: data.types[0].type.name,
                })
                setId(data.id)    
            })
            .catch(err => {
                setError('Pokemon no encontrado')
            })
            setName('')
        }
    }

  

    return(
        <>
        <section className='sectionForm'>

            <form onSubmit={onSubmit} className='form w-full max-w-sm'>
            <div className="flex items-center justify-between border-b border-red-500 py-2 w-full">
                <input type="text" id='name' name='name' value={name} onChange={handleName} placeholder='Pokemon' className='appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none'/>
                <button className='flex-shrink-0 bg-red-500 hover:bg-red-700 border-red-500 hover:border-red-700 text-sm border-4 text-white py-1 px-2 rounded'>Buscar</button>
            </div>
            </form>
            
                
            <div className='divPokemons'>
                { !error ? !pokemon ? <h1>Cargando...</h1> :

                    <div className="w-full max-w-sm rounded-lg bg-white shadow-[rgba(0,_0,_0,_0.25)_0px_25px_50px_-12px] rounded-lg">
                        <div className='divImgPoke'>
                            <img className="rounded-t-lg m-auto" src={pokemon.img} alt={pokemon.name}/>
                        </div>
                        <div className="px-5 pb-5">             
                            <div className='flex justify-between'>
                                <h2 className="text-xl font-semibold text-center">{pokemon.name.toUpperCase()}</h2> 
                                <p className={`text-center font-medium ${pokemon.type === 'normal' ? 'p-1 text-white rounded bg-red-300' : ''}${pokemon.type === 'fire' ? 'p-1 text-white rounded bg-red-600' : ''}${pokemon.type === 'grass' ? 'p-1 text-white rounded bg-green-600' : ''}${pokemon.type === 'water' ? 'p-1 text-white rounded bg-blue-600' : ''}${pokemon.type === 'flying' ? 'p-1 text-white rounded bg-stone-500' : ''}${pokemon.type === 'fighting' ? 'p-1 text-white rounded bg-orange-500' : ''}${pokemon.type === 'poison' ? 'p-1 text-white rounded bg-violet-600' : ''}${pokemon.type === 'electric' ? 'p-1 text-white rounded bg-yellow-300' : ''}${pokemon.type === 'ground' ? 'p-1 text-white rounded bg-amber-700' : ''}${pokemon.type === 'rock' ? 'p-1 text-white rounded bg-amber-900' : ''}${pokemon.type === 'psychic' ? 'p-1 text-white rounded bg-pink-600' : ''}${pokemon.type === 'ice' ? 'p-1 text-white rounded bg-blue-300' : ''}${pokemon.type === 'bug' ? 'p-1 text-white rounded bg-green-600' : ''}${pokemon.type === 'ghost' ? 'p-1 text-white rounded bg-violet-500' : ''}${pokemon.type === 'steel' ? 'p-1 text-white rounded bg-teal-400' : ''}${pokemon.type === 'dragon' ? 'p-1 text-white rounded bg-cyan-400	' : ''}${pokemon.type === 'dark' ? 'p-1 text-white rounded bg-neutral-800' : ''}${pokemon.type === 'fairy' ? 'p-1 text-white rounded bg-pink-800' : ''}`}>{pokemon.type.toUpperCase()}</p>
                            </div>   
                            <h3 className='font-medium'>STATS:</h3>                     
                            <ul>
                                <li><span className='font-medium'>Hp:</span> {pokemon.hp}</li>
                                <li><span className='font-medium'>Attack:</span> {pokemon.attack}</li>
                                <li><span className='font-medium'>Defense:</span> {pokemon.defense}</li>
                            </ul>
                            <div className="flex gap-5 mt-2.5 justify-center btnAction">
                                <button className='flex-shrink-0 bg-red-500 hover:bg-red-700 border-red-500 hover:border-red-700 text-sm border-4 text-white py-1 px-2 rounded' onClick={handleBefore}> Anterior</button>
                                <button className='flex-shrink-0 bg-red-500 hover:bg-red-700 border-red-500 hover:border-red-700 text-sm border-4 text-white py-1 px-2 rounded' onClick={handleAfter}> Siguiente</button>
                            </div>
                        </div>
                    </div>
                    
                    : error
                }
            </div>
        </section>
            
        </>  
    )
}


export default Pokemons
