import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home'; // Make sure to import the Home component
import Create from './Create';
import Login from './Login';
import Admindis from './Admindis';
import Customerdis from './Customerdis';
import Books from './Books';
import Stats from './Stats';
import Nbook from './Nbook';
import Addcartb from './Addcartb';
import Navbar from './Navbar';
import Footer from './Footer';
import Bookrec from './Bookrec';
import Updatebok from './Updatebok';
import Statrec from './Statrec';
import Updatestats from './Updatestats';

function App() {
  return (
    <div className="App">
      <Router>
       <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<Create />} />
          <Route path="/login" element={<Login />} />
          <Route path="/Admindis" element={<Admindis />} />
          <Route path="/customerdis" element={<Customerdis />} />
          <Route path="/books" element={<Books />} />
          <Route path="/stats" element={<Stats />} />
          <Route path="/nbook" element={<Nbook />} />
          <Route path="/addcartb" element={<Addcartb />} />
          <Route path="/navbar" element={<Navbar />} />
          <Route path="/footer" element={<Footer />} />
          <Route path="/bookrec" element={<Bookrec />} />
          <Route path="/updatebok/:id" element={<Updatebok />} />
          <Route path="/statrec" element={<Statrec />} />
          <Route path="/updatestats/:id" element={<Updatestats />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
