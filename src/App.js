
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Login from './pages/auth/Login';
import Signup from './pages/auth/Signup';
import Bodegas from './pages/bodegas/Bodegas.jsx';
import Home from './pages/Home';
import Profile from './pages/profile/Profile';
import Wines from './pages/Wines';
import WinesCreate from './pages/WinesCreate';
import WinesDetails from './pages/WinesDetails';
import Error from './pages/Error'
import ProfileEdit from './pages/profile/ProfileEdit';
import BodegasCreate from './pages/bodegas/BodegasCreate';
import BodegaDetails from './pages/bodegas/BodegaDetails';

function App() {
  return (
    <div className="App">
      <Navbar />

      <Routes>

        <Route path="/" element={ <Home />} />
        <Route path={"/signup"} element={ <Signup /> } />
        <Route path={"/login"} element={ <Login /> } />
        <Route path={"/wines"} element={ <Wines persona="Juanito" /> } />
        <Route path={"/wines/:id"} element={ <WinesDetails /> } />
        <Route path={"/wines/create"} element={ <WinesCreate /> } />
        <Route path={"/bodegas"} element={ <Bodegas /> } />
        <Route path={"/bodegas/:id"} element={ <BodegaDetails /> } />
        <Route path={'/bodegas/create'} element={ <BodegasCreate /> } />
        <Route path={"/profile"} element={ <Profile /> } />
        <Route path={"/profile/:id/edit"} element={<ProfileEdit />} />

        <Route path={"/error"} element={ <Error /> } />

      </Routes>

    </div>
  );
}

export default App;
