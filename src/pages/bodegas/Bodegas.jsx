import React, { useEffect, useState } from "react";
import "./bodegas.css";
import { Link, useNavigate } from "react-router-dom";
import { bodegasListService } from "../../services/bodegas.services";

function Bodegas() {
  const navigate = useNavigate();

  // 1. crear estados
  const [bodegas, setBodegas] = useState([]);

  // 2. Component Did Mount
  useEffect(() => {
    getAllBodegas();
  }, []);

  const getAllBodegas = async () => {
    try {
      const response = await bodegasListService();
      console.log(response.data);
      setBodegas(response.data);
    } catch (err) {
      if (err.response.status === 401) {
        navigate("/login");
      } else {
        navigate("/error");
      }
    }
  };

  if (!bodegas) {
    return <h3>...loading</h3>;
  }

  return (
    <div className="wineries" >
      {bodegas.map((eachBodega) => {
        return (
          
            <div className="winerie-container" key={eachBodega._id}>
              <div className="img-winerie-container">
                <img
                  className="img-winerie"
                  src={eachBodega.image}
                  alt="imagen bodega"
                />
              </div>
              <div>
                <Link
                  className="info-winerie"
                  to={`/bodegas/${eachBodega._id}`}
                >
                  <h4 className="winerie-title">{eachBodega.name}</h4>
                  <span className="winerie-region">{eachBodega.region}</span>
                </Link>
              </div>
              <br />
            </div>
       
        );
      })}
    </div>
  );
}

export default Bodegas;
