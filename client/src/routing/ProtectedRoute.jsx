// Desc: ProtectedRoute component to protect routes from unauthenticated users
import { useSelector, useDispatch } from 'react-redux'
import { Navigate } from 'react-router-dom'
import React, { useEffect } from 'react'
import { toast } from 'react-toastify'
import { revertAll } from '../slices/user/userAPI'

export const ProtectedRoute = ({ children }) => {
  const user = useSelector((state) => state.user)
  const dispatch = useDispatch()

  // redirect to the login page if the user is not authenticated
  useEffect(() => {
    if (!user.loggedIn) {
      dispatch(revertAll());
      toast.warn('Please login to access this page');
    }
  }, [user.loggedIn, dispatch]);

  if (!user.loggedIn) {
    return <Navigate to="/login" />;
  }

  // returns child route elements
  return children
}
