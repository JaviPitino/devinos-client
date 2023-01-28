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
        <div className="container-typewrite" >
          <Typewrite />
        </div>
        <div className="line">
        </div>
        <div className="article-home" >
            <button className="btn-edit-perfil">Try it!</button>
        </div>
      </div>
  );
}

export default Home;
