// import { motion } from 'framer-motion';
// import { useState } from 'react';

// export default function AnimeCard({ anime }) {
//   const [rotate, setRotate] = useState({ x: 0, y: 0 });

//   const handleMouseMove = (e) => {
//     const { left, top, width, height } =
//       e.currentTarget.getBoundingClientRect();
//     const x = (e.clientX - left - width / 2) / 20; // sensitivity
//     const y = -(e.clientY - top - height / 2) / 20;
//     setRotate({ x, y });
//   };

//   const handleMouseLeave = () => {
//     setRotate({ x: 0, y: 0 });
//   };

//   return (
//     <motion.div
//       className='relative w-72 rounded-2xl overflow-hidden bg-[#FFFFFF1A] shadow-lg cursor-pointer mx-auto'
//       style={{
//         transformStyle: 'preserve-3d',
//       }}
//       animate={{ rotateX: rotate.y, rotateY: rotate.x }}
//       transition={{ type: 'spring', stiffness: 200, damping: 20 }}
//       onMouseMove={handleMouseMove}
//       onMouseLeave={handleMouseLeave}
//     >
//       {/* Anime Image */}
//       <div className='w-full bg-black flex items-center justify-center'>
//         <img
//           src={anime.image}
//           alt={anime.title}
//           className='w-full object-contain max-h-60'
//         />
//       </div>

//       {/* Content */}
//       <div className='p-3 text-white'>
//         <p className='text-sm bg-indigo-500 px-2 py-1 rounded-md w-fit mb-2'>
//           {anime.status}
//         </p>
//         <h2 className='text-lg font-semibold'>{anime.title}</h2>
//         <p className='text-gray-400 text-sm'>
//           {anime.season} • {anime.episodes} episodes
//         </p>

//         {/* Rating + Rank */}
//         <div className='flex items-center gap-4 mt-2 text-sm text-gray-300'>
//           <span>⭐ {anime.rating}</span>
//           <span>#{anime.rank} Ranking</span>
//         </div>

//         {/* Tags */}
//         <div className='flex flex-wrap gap-2 mt-2'>
//           {anime.genres.map((genre, index) => (
//             <span
//               key={index}
//               className='text-xs px-2 py-1 bg-gray-700 rounded-full'
//             >
//               {genre}
//             </span>
//           ))}
//         </div>
//       </div>
//     </motion.div>
//   );
// }



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
        <h3>{anime.titleEnglish || anime.titleJapanese}</h3>
      </div>

      {/* Content */}
      <div className='mt-2 text-white'>
        <h2 className='text-lg font-semibold'>{anime.title}</h2>
        <p className='text-gray-400 text-sm'>
          {anime.season} • {anime.episodes} episodes
        </p>

        {/* Rating + Rank */}
        <div className='flex items-center gap-4 mt-2 text-sm text-gray-300'>
          <span>⭐ {anime.rating.toFixed(1) }</span>
          <span>#{anime.rank || N / A} Ranking</span>
        </div>

        {/* Tags */}
        <div className='flex flex-wrap gap-2 mt-2'>
          {anime.genres.slice(0, 2).map((genre, index) => (
            <span
              key={index}
              className='text-xs px-2 py-1 bg-gray-700 rounded-full'
            >
              {genre || N / A}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}












