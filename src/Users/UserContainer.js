import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getUsersFetch } from '../state'
import Users from './Users'

export default function UsersContainer() {
  const users = useSelector(state => state.users.users)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getUsersFetch())
  }, [dispatch])

  return <Users users={users}/>
}
