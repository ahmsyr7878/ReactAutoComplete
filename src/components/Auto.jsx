import { useEffect, useState, useRef  } from 'react';
import './Auto.css';
function Auto(){
const [display, setDisplay] = useState(false);
const [options, setOptions] = useState([]);
const [search,setSearch] = useState("");
const wrapperRef = useRef(null);
// Fill Entries using Free API  and Asynchronous operation
useEffect(() => {
    const onePokemon = [];
    const promises = new Array(10)
    
      .fill()
      .map((v, i) => fetch(`https://pokeapi.co/api/v2/pokemon-form/${i + 1}`));
    Promise.all(promises).then(pokemonArr => {
      return pokemonArr.map(value =>
        value
          .json()
          .then(({ name }) =>
          onePokemon.push({ name })
          )
      );
    });
    setOptions(onePokemon);
  }, []);
  // Add Event Listener MouseDown
  useEffect(() => {
    window.addEventListener("mousedown", handleClickOutside);
    return () => {
      window.removeEventListener("mousedown", handleClickOutside);
    };
  });

  const handleClickOutside = event => {
    const { current: wrap } = wrapperRef;
    if (wrap && !wrap.contains(event.target)) {
      setDisplay(true);
    }
  };


  const loadPokemons = async (poke) => {
    setSearch(poke);
    setDisplay(true);
        
};


    return <>
<div ref={wrapperRef} className="flex-container flex-column pos-rel">
      <input
        id="auto"
        onClick={() => setDisplay(!display)}
        placeholder="Please Type Pokemon Name!"
        value={search}
        onChange={event => setSearch(event.target.value)}
        
      />
      {display && (
        <div className="autoContainer">
          {options
            .filter(({ name }) => name.indexOf(search.toLowerCase()) > -1)
            .map((value, i) => {
              return (
                <div
                  onClick={() => loadPokemons(value.name)}
                  className="option"
                  key={i}
                  tabIndex="0"
                >
                  <span>{value.name}</span>
                </div>
              );
            })}
        </div>
      )}
    </div>
    
   
    </>
}
// Auto is the functional component for AutoComplete
export default Auto;