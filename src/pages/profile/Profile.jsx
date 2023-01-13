import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/auth.context";
import { getProfileDetailsService } from "../../services/auth.service";
import { NavLink } from "react-router-dom";
import { FiEdit } from "react-icons/fi";

function Profile() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [profileDetails, setProfileDetails] = useState(null);

  useEffect(() => {
    getProfileDetails();
  }, []);

  const getProfileDetails = async () => {
    try {
      const response = await getProfileDetailsService(user._id);

      setProfileDetails(response.data);
      console.log(response.data);
    } catch (err) {
      navigate("/error");
    }
  };

  if (!profileDetails) {
    return <h3>...Loading...</h3>;
  }

  return (
    <div className="container-perfil">
      {user !== null && (
        <div className="container-perfil-second">
          <h4 className="name-perfil">
           <span className="edit-perfil">Bienvenid@: <strong>
            {profileDetails.username[0].toUpperCase() +
              profileDetails.username.slice(1)}
              </strong></span> 
          </h4>
          <img
            className="saludo"
            src={profileDetails.image}
            alt="imagen perfil"
          />
          <NavLink
            to={`/profile/${profileDetails._id}/edit`}
            className="edit-perfil-link"
          >
            <p className="edit-perfil margin-perfil">Editar perfil</p>
            
            <FiEdit className="bookmark" type="submit" style={{ color: '#b8b8b8', width: "1.5em", height: "1.5em" }} />
          </NavLink>
        </div>
      )}
    </div>
  );
}

export default Profile;
