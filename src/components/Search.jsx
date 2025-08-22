export default function Search({ searchTerm, setSearchTerm, onSearch }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(searchTerm); 
  };

  return (
    <form
      onSubmit={handleSubmit}
      className='flex g mt-10 w-full max-w-[800px] mx-auto'
    >
      <input
        type='text'
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder='Search through thousand of animes'
        className='rounded-l-xl w-full px-4 py-2 border border-gray-700 
           bg-white/10 backdrop-blur-md text-white placeholder-gray-400 
           focus:outline-none'
      />
      <button
        type='submit'
        className='bg-blue-600  px-5 py-2 rounded-r-xl 
               text-white font-medium shadow-md hover:bg-blue-900 
               transition'
      >
        Search
      </button>
    </form>
  );
}
