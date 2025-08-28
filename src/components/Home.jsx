import { useEffect, useState } from 'react';
import Search from './Search';
import Loader from './Loader';
import AnimeCard from './AnimeCard';
import { getTrendingAnimes, updateSearchCount } from '../appwrite';

const API_BASE_URL = 'https://api.jikan.moe/v4/';

function Home() {
  const [searchTerm, setSearchTerm] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [animeList, setAnimeList] = useState([]);
  const [trendingAnimes, setTrendingAnimies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchAnimes = async (query = '') => {
    setIsLoading(true);
    setErrorMessage('');

    try {
      const endPoint = query
        ? `${API_BASE_URL}anime?q=${encodeURIComponent(query)}&limit=20`
        : `${API_BASE_URL}top/anime?filter=bypopularity&limit=25`;

      const response = await fetch(endPoint);

      if (!response.ok) {
        throw new Error(`Failed to fetch animes`);
      }

      const data = await response.json();

      if (!data.data || data.data.length === 0) {
        setErrorMessage('No animes found for your search');
        setAnimeList([]);
        return;
      }

      setAnimeList(data.data || []);

      if (query && data.data.length > 0) {
        await updateSearchCount(query, data.data[0]);
      }
    } catch (error) {
      console.error(`Error Fetching Animes:`, error);
      setErrorMessage('Error fetching animes, Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  const loadTrendingAnimes = async () => {
    try {
      const animes = await getTrendingAnimes();
      setTrendingAnimies(animes);
    } catch (e) {
      console.log(`Error fetching trending movies:${e}`);
    }
  };

  useEffect(() => {
    fetchAnimes();
    loadTrendingAnimes();
  }, []);

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
          <Search
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            onSearch={fetchAnimes}
          />
        </header>

        {trendingAnimes.length > 0 && (
          <section className='trending'>
            <h2>Trending Animes</h2>
            <ul>
              {trendingAnimes.map((anime, index) => (
                <li key={anime.$id}>
                  <p>{index + 1}</p>
                  <img
                    src={anime.poster_url}
                    alt={anime.title}
                    title={anime.title}
                  />
                </li>
              ))}
            </ul>
          </section>
        )}

        <section className='all-movies'>
          <h2 className='mt-8'>All Animes</h2>

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
                    title: anime.title,
                    year: anime.aired?.prop?.from?.year,
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

export default Home;












// import { useEffect, useState } from 'react';
// import Search from './components/Search';
// import Loader from './components/Loader';
// import AnimeCard from './components/AnimeCard';
// import { getTrendingAnimes, updateSearchCount } from './appwrite';



// const API_BASE_URL = 'https://api.jikan.moe/v4/';


// function App() {
//   const [searchTerm, setSearchTerm] = useState('');
//   const [errorMessage, setErrorMessage] = useState('');
//   const [animeList, setAnimeList] = useState([]);
//   const[trendingAnimes,setTrendingAnimies]=useState([])
//   const [isLoading, setIsLoading] = useState(false);



//   const fetchAnimes = async (query = '') => {
//     setIsLoading(true);
//     setErrorMessage('');


//     try {
//       const endPoint = query
//         ? `${API_BASE_URL}anime?q=${encodeURIComponent(query)}&limit=20`
//         : `${API_BASE_URL}top/anime?filter=bypopularity&limit=25`;


//       const response = await fetch(endPoint);


//       if (!response.ok) {
//         throw new Error(`Failed to fetch animes`);
//       }


//       const data = await response.json();


//       if (!data.data || data.data.length === 0) {
//         setErrorMessage('No animes found for your search');
//         setAnimeList([]);
//         return;
//       }


//       setAnimeList(data.data || []);
      
// if (query && data.data.length > 0) {
//   await updateSearchCount(query, data.data[0]);
// }

//     } catch (error) {
//       console.error(`Error Fetching Animes:`, error);
//       setErrorMessage('Error fetching animes, Please try again later.');
//     } finally {
//       setIsLoading(false);
//     }
//   };


//   const loadTrendingAnimes = async () => {
//     try {
//       const animes = await getTrendingAnimes();
//       setTrendingAnimies(animes);
//     } catch (e) {
//       console.log(`Error fetching trending movies:${e}`);
//     }
//   };



//   useEffect(() => {
//     fetchAnimes();
//     loadTrendingAnimes();
//   }, []);




//   return (
//     <main>
//       <div className='pattern' />
//       <div className='wrapper'>
//         <header>
//           <h1>
//             <img src='/hero-img.png' alt='Hero Banner' />
//             Level Up Your Watchlist with the Best{' '}
//             <span className='text-gradient'>Animes</span>
//           </h1>
//           <Search
//             searchTerm={searchTerm}
//             setSearchTerm={setSearchTerm}
//             onSearch={fetchAnimes}
//           />
//         </header>

//         {trendingAnimes.length > 0 && (
//           <section className='trending'>
//             <h2>Trending Animes</h2>
//             <ul>
//               {trendingAnimes.map((anime, index) => (
//                 <li key={anime.$id}>
//                   <p>{index + 1}</p>
//                   <img src={anime.poster_url} alt={anime.title} />
//                 </li>
//               ))}
//             </ul>
//           </section>
//         )}

//         <section className='all-movies'>
//           <h2>All Animes</h2>

//           {isLoading ? (
//             <Loader />
//           ) : errorMessage ? (
//             <p className='text-red-500'>{errorMessage}</p>
//           ) : (
//             <ul className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4'>
//               {animeList.map((anime) => (
//                 <AnimeCard
//                   key={anime.mal_id}
//                   anime={{
//                     image: anime.images.jpg.large_image_url,
//                     titleEnglish: anime.title_english,
//                     title: anime.title,
//                     year: anime.aired?.prop?.from?.year,
//                     episodes: anime.episodes,
//                     rating: anime.score,
//                     rank: anime.rank,
//                     genres: anime.genres.map((g) => g.name),
//                   }}
//                   full={anime}
//                 />
//               ))}
//             </ul>
//           )}
//         </section>
//       </div>
//     </main>
//   );
// }


// export default App;
