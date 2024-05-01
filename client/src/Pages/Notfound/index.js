import React from 'react'
import Landing from '../Landing'
import { useSelector } from 'react-redux'

export default function ProtectedRoute({user, children}) {

    const { isAuthenticated } = useSelector(state => state.user)
    if(!isAuthenticated) {
        return <div><Landing /></div>
    }
    return children 
}
