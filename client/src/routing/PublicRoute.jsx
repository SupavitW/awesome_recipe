import { redirect } from 'react-router-dom'
import { useSelector } from 'react-redux'

export const PublicRoute = ({children}) => {
    const user = useSelector((state) => state.user)
  
    // redirect to home page if user is logged in
    if (user.loggedIn) {
        redirect("/");
    }

    return children;
}