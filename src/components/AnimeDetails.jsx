import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Loader from '../components/Loader'; 
import YouTube from 'react-youtube';

export default function AnimeDetails({ani}) {
  const { id } = useParams();
  const [anime, setAnime] = useState(null);
  const [characters, setCharacters] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [showTrailer, setShowTrailer] = useState(false);
  const [trailerError, setTrailerError] = useState(false);


  useEffect(() => {
    // Main Anime Info
    fetch(`https://api.jikan.moe/v4/anime/${id}/full`)
      .then((res) => res.json())
      .then((data) => setAnime(data.data));

    // Characters
    fetch(`https://api.jikan.moe/v4/anime/${id}/characters`)
      .then((res) => res.json())
      .then((data) => setCharacters(data.data || []));

    // Recommendations
    fetch(`https://api.jikan.moe/v4/anime/${id}/recommendations`)
      .then((res) => res.json())
      .then((data) => setRecommendations(data.data || []));
  }, [id]);

  if (!anime) return <Loader />;

  //formatter function
  const formatUsers = (num) => {
    if (!num) return '0';

    if (num >= 10000000) return (num / 10000000).toFixed(1) + 'Cr+'; 
    if (num >= 100000) return (num / 100000).toFixed(1) + 'L+'; 
    if (num >= 1000) return (num / 1000).toFixed(1) + 'k+'; 

    return num;
  };

  return (
    <div className=' bg-[#151a46] p-4 m-4 mt-6 rounded-xl shadow-[inset_0_84px_30px_rgba(0,0,0,0.7)] shadow-[0_8px_30px_rgba(0,0,0,0.7)] text-white xl:mx-36 xl:mt-12'>
      <div id='first' className='flex justify-between items-center'>
        <div className='flex flex-col'>
          <p className='text-white text-3xl font-bold '>
            {anime.title_english || anime.title}
          </p>
          <h3 className='text-gray-300 text-sm '>{anime.rating}</h3>
        </div>
        <div>
          <span>
            ⭐ {anime.score ? anime.score.toFixed(1) : 'N/A'}/10
            <span className='ml-[5px] text-gray-200 text-xs hidden sm:inline'>
              ({formatUsers(anime.scored_by)})
            </span>
          </span>
        </div>
      </div>

      <div
        id='second'
        className='mt-8 flex flex-col items-center justify-center gap-6 lg:flex-row md:m-4'
      >
        {/* Poster (clickable) */}
        <div
          className='relative cursor-pointer flex-shrink-0 w-full max-w-sm sm:max-w-md lg:max-w-xs'
          onClick={() => {
            setShowTrailer(true);
            setTrailerError(false);
          }}
        >
          <img
            src={anime.images?.jpg?.large_image_url || '/No-Poster.png'}
            alt={anime.title}
            className='w-full h-auto max-h-[30rem] rounded-lg shadow-lg object-cover hover:scale-105 transition duration-300 ease-in-out'
          />
          <div className='absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 opacity-0 hover:opacity-100 transition rounded-lg'>
            <span className='text-white text-lg font-semibold flex items-center gap-2'>
              ▶ Watch Trailer
            </span>
          </div>
        </div>

        {/* Modal for Trailer */}
        {showTrailer && (
          <div className='fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50'>
            <div className='relative bg-[#151a46] rounded-lg p-4 w-[90%] max-w-3xl shadow-xl'>
              {/* Close button */}
              <button
                onClick={() => {
                  setShowTrailer(false);
                  setTrailerError(false);
                }}
                className='absolute top-2 right-2 text-white text-2xl font-bold hover:text-red-500'
              >
                ✖
              </button>

              {/* Title */}
              <h2 className='text-xl font-bold text-white mb-4'>
                {anime.title_english || anime.title}
              </h2>

              {/* YouTube Trailer OR Fallback */}
              {anime.trailer?.youtube_id && !trailerError ? (
                <YouTube
                  videoId={anime.trailer.youtube_id}
                  opts={{
                    width: '100%',
                    height: '400',
                    playerVars: { autoplay: 1 },
                  }}
                  className='w-full h-[200px] sm:h-[300px] lg:h-[400px] rounded-lg overflow-hidden'
                  onReady={() => console.log('Trailer loaded ✅')}
                  onError={() => {
                    console.warn('YouTube trailer failed ❌, showing fallback');
                    setTrailerError(true);
                  }}
                />
              ) : (
                <img
                  src='/404.png'
                  alt='Trailer not available'
                  className='w-full h-[200px] sm:h-[300px] lg:h-[20rem] object-cover rounded-lg shadow-lg'
                />
              )}
            </div>
          </div>
        )}

        {/* Right side content */}
        <div className='m-2 p-2 w-full max-w-3xl'>
          {/* Genres */}
          <div className='flex justify-center items-center gap-2 mb-6 flex-wrap'>
            {anime.genres?.slice(0, 3).map((genre) => (
              <span
                key={genre.mal_id}
                className='bg-white/10 backdrop-blur-md border border-white/20 px-3 py-1 text-sm rounded-lg shadow-2xl'
              >
                {genre.name}
              </span>
            ))}
          </div>

          {/* Overview */}
          <div className='m-2'>
            <h2 className='text-xl font-semibold mb-2 text-center sm:text-left'>
              Overview
            </h2>
            <p className='text-gray-200 text-justify leading-relaxed tracking-wide indent-6'>
              {anime.synopsis}
            </p>
          </div>

          {/* Details Grid */}
          <div className='m-2 mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-gray-300'>
            <div>
              <h3 className='font-semibold text-white'>Release Date</h3>
              <p>{anime.aired?.string || 'N/A'}</p>
            </div>
            <div>
              <h3 className='font-semibold text-white'>Status</h3>
              <p>{anime.status}</p>
            </div>
            <div>
              <h3 className='font-semibold text-white'>Episodes</h3>
              <p>{anime.episodes || 'N/A'}</p>
            </div>
            <div>
              <h3 className='font-semibold text-white'>Rating</h3>
              <p>⭐ {anime.score || 'N/A'} / 10</p>
            </div>
            <div>
              <h3 className='font-semibold text-white'>Rank</h3>
              <p>#{anime.rank || 'N/A'}</p>
            </div>
            <div>
              <h3 className='font-semibold text-white'>Popularity</h3>
              <p>{anime.popularity || 'N/A'}</p>
            </div>
          </div>
        </div>
      </div>

      <div className='m-4'>
        {/* Characters Section */}
        {characters.length > 0 && (
          <div className='mt-8'>
            <h2 className='text-2xl font-bold mb-8'>Main Characters</h2>
            <div className='grid grid-cols-2 md:grid-cols-4 place-items-center gap-4'>
              {characters.slice(0, 4).map((char) => (
                <div
                  key={char.character.mal_id}
                  className='bg-[#060515] p-6 rounded-xl shadow-2xl hover:scale-105 transition'
                >
                  <img
                    src={char.character.images?.jpg?.image_url}
                    alt={char.character.name}
                    className='rounded-lg mb-2 w-30 h-40 object-cover'
                  />
                  <h3 className='font-semibold'>{char.character.name}</h3>
                  <p className='text-gray-400 text-sm'>{char.role}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className='m-6'>
        {/* Recommendations Section */}
        {recommendations.length > 0 && (
          <div className='mt-14'>
            <h2 className='text-3xl font-bold mb-10 text-center md:text-left'>
              Recommended Anime
            </h2>
            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6'>
              {recommendations.slice(0, 10).map((rec) => (
                <a
                  key={rec.entry.mal_id}
                  href={`/anime/${rec.entry.mal_id}`}
                  className='bg-[#0d0c22] rounded-2xl shadow-lg hover:shadow-2xl 
                       hover:scale-105 transition-transform duration-300 p-3 flex flex-col'
                >
                  <div className='relative w-full h-56 overflow-hidden rounded-xl'>
                    <img
                      src={rec.entry.images?.jpg?.large_image_url}
                      alt={rec.entry.title}
                      className='w-full h-full object-cover rounded-xl hover:opacity-90 transition'
                    />
                  </div>
                  <h3 className='font-medium text-sm md:text-base mt-3 text-center text-gray-200 line-clamp-2'>
                    {rec.entry.title_english
                      ? rec.entry.title_english
                      : rec.entry.title_synonyms?.[0] || rec.entry.title}
                  </h3>
                </a>
              ))}
            </div>
          </div>
        )}
      </div> 
    </div>
  );
}
