
import { motion } from 'framer-motion';
import { useState } from 'react';

export default function AnimeCard({ anime }) {
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  

  const handleMouseMove = (e) => {
    const { left, top, width, height } =
      e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - left - width / 2) / 20; // sensitivity
    const y = -(e.clientY - top - height / 2) / 20;
    setRotate({ x, y });
  };

  const handleMouseLeave = () => {
    setRotate({ x: 0, y: 0 });
  };


  return (
    <motion.div
      className='movie-card'
      style={{
        transformStyle: 'preserve-3d',
      }}
      animate={{ rotateX: rotate.y, rotateY: rotate.x }}
      transition={{ type: 'spring', stiffness: 200, damping: 20 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <img
        src={anime.image || '/No-Poster.png'}
        alt={anime.title}
        className='    
          sm:w-[250px] sm:h-[350px]  
          object-cover rounded-lg'
      />
      <div className='mt-4'>
        <h3>{anime.titleEnglish || anime.title||'N/A'}</h3>
      </div>

      {/* Content */}
      <div className='mt-2 text-white'>
        <p className='text-gray-400 text-sm'>
          {anime.year||'N/A'} • {anime.episodes||'N/A'} episodes
        </p>

        {/* Rating + Rank */}
        <div className='flex items-center gap-4 mt-2 text-sm text-gray-300'>
          <span>⭐ {anime.rating ? anime.rating.toFixed(1) : 'N/A'}</span>

          <span>#{anime.rank || 'N/A'} Ranking</span>
        </div>

        {/* Tags */}
        <div className='flex flex-wrap gap-2 mt-2'>
          {anime.genres.slice(0, 2).map((genre, index) => (
            <span
              key={index}
              className='text-xs px-2 py-1 bg-gray-700 rounded-full'
            >
              {genre || 'N/A'}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}












