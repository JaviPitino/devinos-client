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
          {/* <p>
            DeVinos surge como proyecto personal para crecer como desarrollador web, es una aplicación MERN STACK construida con <b>React</b>. Los vinos disponibles, al igual que las bodegas, han sido creados en una base de datos en <b>MongoDB</b> y están escogidos al azar como una pequeña muestra de las posibilidades de la aplicación.
          </p>
          <p>
          Como usuario registrado, puedes <b>comentar</b> los vinos que más te gusten, <b>añadir</b> el vino a tu <b>lista de favoritos</b>  y por supuesto, no olvides de darle <b>'Me Encanta'</b> a los vinos que más te gusten!.
          </p>
          <p>
          El administrador puede crear tanto nuevos vinos como bodegas al igual que editarlos y actualizarlos.
          </p> */}
        </div>
      </div>
  );
}

export default Home;
