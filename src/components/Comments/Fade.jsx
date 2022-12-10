import { useState } from 'react'

const FadeoutButton = () => {
  const [fadeout, setFadeout] = useState(false);

  const handleClick = () => {
    setFadeout(true);
  };

  return (
    <button
      onClick={handleClick}
      style={{
        transition: "opacity 1s",
        opacity: fadeout ? 0 : 1
      }}
    >
      Click to fade out
    </button>
  );
};

export default FadeoutButton