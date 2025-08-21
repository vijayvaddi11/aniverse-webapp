import { useState } from "react";
import Search from "./components/Search";

function App() {
const [searchTerm,setSearchTerm]= useState('');

  return (
    <main>
      <div className='pattern' />
      <div className='wrapper'>
        <header>
          <h1>
            <img src='/hero-img.png' alt='Hero Banner' />
            Level Up Your Watchlist with the Best{' '}
            <span className='text-gradient'>Animes</span>
          </h1>
        </header>
        <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      </div>
    </main>
  );
}

export default App
