import { useContext } from "react"
import { AuthContext } from "../context/auth.context"


function IsAdmin(props) {

  const { user } = useContext(AuthContext)

  console.log(user)
  console.log(props.children)
  if ( user.role === 'admin' ) {
    return props.children
  }

}

export default IsAdmin