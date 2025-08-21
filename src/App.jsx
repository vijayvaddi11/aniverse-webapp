import { useEffect, useState } from "react";
import Search from "./components/Search";
import Loader from "./components/Loader";
import AnimeCard from "./components/AnimeCard";

const API_BASE_URL = 'https://api.jikan.moe/v4/';

const API_OPTIONS = {
  method: 'GET',
  headers: {
    accept:'application/json'
  }
}


function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [animeList, setAnimeList] = useState([])
  const[isLoading,setIsLoading]=useState(false)

  const fetchAnimes = async () => {
    setIsLoading(true)
    setErrorMessage('')


    try {
      const endPoint = `${API_BASE_URL}top/anime?filter=bypopularity&limit=25`;

      const response = await fetch(endPoint, API_OPTIONS)
      
      if (!response.ok) {
        throw new Error(`Failed to fetch animes`)
      }

      const data = await response.json();
      
      if (data.response === 'false') {
        setErrorMessage(data.Error || `Failed to fetch animes`)
        setAnimeList([]);
        return
      }

      setAnimeList(data.data || [])
      
    } catch(error) {
      console.log(`Error Fetching Animes: ${error}`);
      setErrorMessage('Error fetching animes, Please try again later.')
    } finally {
      setIsLoading(false);
    }
  }
  
  useEffect(() => {
    fetchAnimes()
  },[])

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
          <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </header>

        <section className='all-movies'>
          <h2 className='mt-[50px]'>All Animes</h2>

          {isLoading ? (
            <Loader />
          ) : errorMessage ? (
            <p className='text-red-500'>{errorMessage}</p>
          ) : (
            <ul className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4'>
              {animeList.map((anime) => (
                <AnimeCard
                  key={anime.mal_id}
                  anime={{
                    image: anime.images.jpg.large_image_url,
                    titleEnglish: anime.title_english,
                    titleJapanese:anime.title_japanese,
                    status: anime.status,
                    episodes: anime.episodes,
                    rating: anime.score,
                    rank: anime.rank,
                    genres: anime.genres.map((g) => g.name),
                  }}
                  full={anime}
                />
              ))}
            </ul>
          )}
        </section>
      </div>
    </main>
  );
}

export default App
