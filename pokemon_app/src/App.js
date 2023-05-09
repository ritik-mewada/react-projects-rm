import React, { useState } from "react";
import Axios from "axios";
import "./App.css";
import PokeCard from "./components/PokeCard";
import LoadingSpinner from "./components/LoadingSpinner";

const App = () => {
    const [query, setQuery] = useState("");
    const [pokemon, setPokemon] = useState([]);
    const [loading, setLoading] = useState(false);

    const url = `https://pokeapi.co/api/v2/pokemon/${query}`;

    const getPokemon = async () => {
        try {
            setLoading(true);
            const result = await Axios.get(url);
            setPokemon([result.data]);
            console.log(result.data);
            setLoading(false);
        } catch (error) {
            // setPokemon(false);
            alert("Enter Valid Pokemon name");
            setLoading(false);
            console.error(error);
        }
    };

    const onSubmit = (e) => {
        e.preventDefault();
        getPokemon();
    };

    return (
        <div className="app">
            <img
                className="logo"
                src="https://seeklogo.com/images/P/Pokemon-logo-497D61B223-seeklogo.com.png"
                alt="pokemon-logo"
            />
            <form className="app-form" onSubmit={onSubmit}>
                <input
                    type="text"
                    className="app-input"
                    placeholder="e.g. bulbasaur, charmander, charmeleon"
                    value={query.toLowerCase()}
                    onChange={(e) => setQuery(e.target.value)}
                    autoComplete="true"
                />

                <button
                    type="submit"
                    onClick={getPokemon}
                    className="app-submit"
                >
                    Search
                </button>
            </form>

            {loading ? (
                <LoadingSpinner />
            ) : (
                <div className="app-poke-container">
                    {pokemon?.map((pokeItem, index) => {
                        return <PokeCard key={index} poke={pokeItem} />;
                    })}
                </div>
            )}
        </div>
    );
};

export default App;
