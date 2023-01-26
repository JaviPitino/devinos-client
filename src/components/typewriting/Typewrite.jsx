import { useTypewriter, Cursor } from "react-simple-typewriter";
import "./typewrite.css";

function Typewrite() {
  const [ text ] = useTypewriter({
    // Array de palabras para animas
    words: [
      "Busca",
      "Filtra",
      "Ordena",
      "Conoce sus bodegas",
      'Comenta',
      "Guarda",
      'Dale a me encanta',
      'Visita tu lista de favoritos',
      '...Ah! y si te gusta, visita mi perfil de GitHub'
    ],
    // Loop 0 es infinito
    loop: 0,
    // Velocidad de typeo
    typeSpeed: 70,
    // Velocidad de borrado
    deleteSpeed: 40,
    // Tiempo entre palabra y palabra
    delaySpeed: 1300,
  });
  return (
    <div className="typewrite"># <span>{text}</span> 
      <Cursor cursorColor='red' />
    </div>
  )
}

export default Typewrite;
