import { Link } from "react-router-dom";
import Loading from "../components/Loading/Loading";
import Typewrite from "../components/typewriting/Typewrite";

function Home() {
  return (
    <div className="super-container-home">
      <div className="container-home">
        <img
          src="https://res.cloudinary.com/dttp09igh/image/upload/v1673272916/wines-routes/logo-devinos-brand-bold_zgeud2.png"
          alt="brand"
        />
      </div>
      <div className="container-home">
        <img
          src="https://res.cloudinary.com/dttp09igh/image/upload/v1673436035/wines-routes/logo-devinos-bold-letras_vfd4ez.png"
          alt="logo"
        />
      </div>
      <div className="container-typewrite">
        <Typewrite />
      </div>
      <div className="line"></div>
      <div className="article-home">
        <p className="txt-home">
       DeVinos es un proyecto realizado utilizando el stack de tecnologías MERN, consistente en <strong>MongoDB, Express, React y Node.js.</strong> Ha sido una gran oportunidad para profundizar mis habilidades en <strong>desarrollo web</strong> y aplicaciones <strong>full-stack</strong>. Me concentré en construir una aplicación de usuario y administración de tareas, implementando características como autenticación de usuarios, lectura, creación, edición y actualización de tareas. Estoy muy orgulloso con el resultado y emocionado de seguir mejorando mis habilidades. Si te ha gustado el resultado puedes decírmelo <strong><a href={'https://www.linkedin.com/in/javier-lopez-diaz/'}>contactando conmigo</a></strong> en cualquiera de los enlaces de contacto.
        </p>
      </div>
      <div className="line"></div>
      <Link className="a-home" to={"/wines"}>
        <button className="btn-edit-perfil">Entra</button>
      </Link>
    </div>
  );
}

export default Home;
