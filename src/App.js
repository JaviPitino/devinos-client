
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Login from './pages/auth/Login';
import Signup from './pages/auth/Signup';
import Bodegas from './pages/Bodegas';
import Home from './pages/Home';
import Wines from './pages/Wines';
import WinesDetails from './pages/WinesDetails';

function App() {
  return (
    <div className="App">
      <Navbar />

      <Routes>

        <Route path="/" element={ <Home /> } />
        <Route path={"/signup"} element={ <Signup /> } />
        <Route path={"/login"} element={ <Login /> } />
        <Route path={"/wines"} element={ <Wines persona="Juanito" /> } />
        <Route path={"/wines/:id"} element={ <WinesDetails /> } />
        <Route path={"/bodegas"} element={ <Bodegas /> } />

      </Routes>

    </div>
  );
}

export default App;
