
import { Route, Routes, useNavigate } from 'react-router-dom';
import NavbarUp from './components/NavbarUp';
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
import IsPrivate from './components/IsPrivate';
import IsAdmin from './components/IsAdmin';
import WinesEdit from './pages/WinesEdit';
import BodegasEdit from './pages/bodegas/BodegasEdit';
import { useState, useEffect } from 'react';
import { winesListService } from './services/wines.services'

function App() {

  // const navigate = useNavigate()
  // const [ wines, setWines ] = useState([])

  // // 2. ComponentDidMount
  // useEffect(() => {
  //   getAllWines();
  // }, []);

  // // 3. Funcion que busca la Data en la API
  // const getAllWines = async () => {
  //   try {
  //     const { data } = await winesListService();
  //     const filterArr = data.map((each) => {
  //       let newObj = { id: each._id, likes: each.likes }
  //       return newObj
  //     })
  //     setWines(filterArr)

  //   } catch (err) {
  //     if (err.response.status === 401) {
  //       navigate("/login");
  //     } else {
  //       navigate("/error");
  //     }
  //   }
  // };

  // console.log(wines);

  return (
    <div className="App">
      <NavbarUp />

      <Routes>

        <Route path="/" element={ <Home />} />
        {/* Autorizacion */}
        <Route path={"/signup"} element={ <Signup /> } />
        <Route path={"/login"} element={ <Login /> } />
        {/* Perfil */}
        <Route path={"/profile"}  end={true} element={ <Profile /> } />
        <Route path={"/profile/:id/edit"} element={<ProfileEdit />} />
        {/* Vinos */}
        <Route path={"/wines"} end={true} element={ <Wines /> } />
        <Route path={"/wines/:id"} element={ <WinesDetails /> } />
        <Route path={"/wines/:id/edit"} element={ <IsPrivate> <IsAdmin> <WinesEdit /> </IsAdmin></IsPrivate> } />
        <Route path={"/wines/create"} element={ <IsPrivate> <IsAdmin> <WinesCreate /> </IsAdmin> </IsPrivate> } />
        {/* Bodegas */}
        <Route path={"/bodegas"} end={true} element={ <Bodegas /> } />
        <Route path={"/bodegas/:id"} element={ <BodegaDetails /> } />
        <Route path={"/bodegas/:id/edit"} element={ <IsPrivate> <IsAdmin> <BodegasEdit /> </IsAdmin> </IsPrivate> } />
        <Route path={'/bodegas/create'} element={ <IsPrivate> <IsAdmin> <BodegasCreate /> </IsAdmin> </IsPrivate> } />
        {/* Error */}
        <Route path={"/error"} element={ <Error /> } />

      </Routes>

    </div>
  );
}

export default App;
