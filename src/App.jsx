import { useState } from 'react'
import Pokemons from '../pages/Pokemons'
import Footer from '../pages/Footer'
import '../public/css/home.css'

function App() {


  return (
<>
  <section className='header bg-red-500'>
    <h1 hidden>POKEDEX</h1>
    <picture className='divImg'>
      <source srcSet="/img/pokedex.png" media="(min-width: 800px)" width={'500px'}/>
      <img src="/img/p.png" alt="MDN" width={'100px'}/>
    </picture>
  </section>


    <Pokemons/>
    <Footer/>
</>
  )
}

export default App
