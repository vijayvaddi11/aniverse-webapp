import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import AnimeDetails from './components/AnimeDetails';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/anime/:id' element={<AnimeDetails />} />
    </Routes>
  );
}

export default App;
