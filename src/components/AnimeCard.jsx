import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useState } from 'react';

export default function AnimeCard({ anime ,full}) {
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
    <Link to={`/anime/${full.mal_id}`}>
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
          alt={anime.title||'N/A'}
          className='    
          sm:w-[250px] sm:h-[350px]  
          object-cover rounded-lg'
        />
        <div className='mt-4'>
          <h3>{anime.titleEnglish || anime.title || 'N/A'}</h3>
        </div>

        {/* Content */}
        <div className='mt-2 text-white'>
          <p className='text-gray-400 text-sm'>
            {anime.year || 'N/A'} • {anime.episodes || 'N/A'} episodes
          </p>

          
        </div>
      </motion.div>
    </Link>
  );
}












