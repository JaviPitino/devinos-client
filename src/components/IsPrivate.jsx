import React, { useContext } from "react"
import { Navigate } from "react-router-dom"
import { AuthContext } from "../context/auth.context"


function IsPrivate(props) {

  const { isLogin } = useContext(AuthContext)

  if (isLogin === true) {
    return props.children
  } else {
    return <Navigate to='/login' />
  }

}

export default IsPrivate