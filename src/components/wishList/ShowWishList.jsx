import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AuthContext } from '../../context/auth.context'
import { getWishlistService } from '../../services/auth.service'
import DeleteWineWishList from './DeleteWineWishList'

function ShowWishList() {

  const { user: loggedUser } = useContext(AuthContext)
  const navigate = useNavigate()
  let { id } = useParams()

  const [ winesWished, setWineWished ] = useState([])

  useEffect(() => {
    showWishList()
  }, [])

  const showWishList = async () => {

    try {

      const { data } = await getWishlistService(id, loggedUser._id)
      setWineWished(data.wishlist)

    } catch(err) {
      navigate('/error')
    }
  }

  

  return (
    <div>
      {winesWished.map((item) => {
        return(
          <div key={item._id}>
          {item.name}
          < DeleteWineWishList />
          </div>
        )
      })}
    </div>
  )
}

export default ShowWishList