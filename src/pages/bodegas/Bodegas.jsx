import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { bodegasListService } from '../../services/bodegas.services';

function Bodegas() {

  const navigate = useNavigate()

  // 1. crear estados
  const [ bodegas, setBodegas ] = useState([]);

  // 2. Component Did Mount
  useEffect(() => {
    getAllBodegas()
  }, [])

  const getAllBodegas = async () => {

    try {
      const response = await bodegasListService();
      console.log(response.data)
      setBodegas(response.data)

    } catch(err) {
      if (err.response.status === 401) {
        navigate("/login");
      } else {
        navigate("/error");
      }
    }
  } 

  if (!bodegas) {
    return <h3>...loading</h3>
  }

  return (
    <div>
      <h3 className='title'>Bodegas</h3>
      {
        bodegas.map((eachBodega) => {
          return(
            <div key={eachBodega._id}>
              <div>
                <img src={eachBodega.image} alt="imagen bodega" width={150} />
              </div>
              <div>
                <Link to={`/bodegas/${eachBodega._id}`}>
                <h4>{eachBodega.name}</h4>
                <span>{eachBodega.region}</span>
                </Link>
              </div>
              <br />
            </div>
          )
        })
      }
    </div>
  )
}

export default Bodegas