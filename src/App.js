import './App.css';
import Navbar from './Navbar';
import Home from './Home';
import Book from './Book';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <>
      <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/book" element={<Book />} />
        </Routes>
    </>
  );
}

export default App;