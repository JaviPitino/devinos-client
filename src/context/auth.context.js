import React,{ createContext, useEffect, useState } from 'react'
import { verifyService } from '../services/auth.service'


const AuthContext = createContext()

function AuthWrapper(props) {

  // Estados y funciones
  const [isLogin, setIsLogin ] = useState(false)
  const [ user, setUser ] = useState(null)
  const [ isLoading, setIsLoading ] = useState(true)
  const [ role, setRole ] = useState(null)


  const authenticatedUser = async () => {
    setIsLoading(true)

    try {
      // llamar a la ruta verify
      const response = await verifyService()
      // console.log("token válido")
      // console.log("El payload es:", response.data);
      setIsLogin(true)
      setUser(response.data)
      setRole(response.data.role)
      setIsLoading(false)
      return response.data.role

    } catch(err) {
      console.log("El usuario no tiene token o el token no es válido")
      setIsLogin(false)
      setUser(null)
      setRole(null)
      setIsLoading(false)
    }
  }

  const passedContext = {
    isLogin, user, authenticatedUser
  }

  useEffect(() => {
    authenticatedUser()
  }, [])

  if(isLoading === true) {
    return <h4 className='App' >Verificando Usuario</h4>
  }

  return(
    <AuthContext.Provider value={passedContext}>
      {props.children}
    </AuthContext.Provider>
  )
}

export { AuthContext, AuthWrapper }