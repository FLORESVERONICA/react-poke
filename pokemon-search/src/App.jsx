import React, {useState, useEffect} from 'react';
import axios from 'axios'
import './App.css';

function App () {
  const [searchTerm, setSearchTerm] = useState('');
  const [pokemonData, setPokemonData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPokemon = async () => {
      if(!searchTerm) {
        setPokemonData(null);
        setError(null);
        return;
      }
      setLoading(true);
      setError(null);
      try{
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${searchTerm.toLowerCase()}`)
        setPokemonData(response.data);
      } catch(error) {
        setPokemonData(null);
        setError('Pokemon no encontrado');
      } finally{
        setLoading(false);
      }
    };
  const delayDebounceFn = setTimeout(() => {
    fetchPokemon();
  }, 500);
  return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);
  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };
  return (
    <div className='App'>
      <h1>Buscador de Pokemón</h1>
      <input
      type='text'
      placeholder='Escribe el nombre de un Pokémon'
      value={searchTerm}
      onChange={handleInputChange}
      />
      {loading && <p>Cargando ...</p>}
      {error && <p>{error}</p>}
      {pokemonData && (
        <div className='pokemon-info'>
         <h2>{pokemonData.name}</h2>
         <img src={pokemonData.sprites.front_default} alt={pokemonData.name} />
         </div>
      )}
    </div>
  );
}

export default App;
