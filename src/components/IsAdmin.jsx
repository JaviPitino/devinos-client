import { useContext } from "react"
import { AuthContext } from "../context/auth.context"


function IsAdmin(props) {

  const { user } = useContext(AuthContext)
  
  if ( user.role === 'admin' ) {
    return props.children
  }

}

export default IsAdmin