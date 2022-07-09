import { useSelector, useDispatch } from "react-redux"
import { useEffect } from "react"
import { changeUserField, editUser, updateUser, createUser, deleteUser, setDefault, updatingSuccess } from "../state"
import { useParams } from "react-router-dom"
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";
import styled from '@emotion/styled';

const Wrapper = styled.div`
display: flex;
margin: 30px auto;
width: 300px;
`

export default function UserEdit() {
    const user = useSelector(state => state.users.editUser)
    const updated = useSelector(state => state.users.updated)
    const dispatch = useDispatch()
    const {id} = useParams()
    const navigate = useNavigate()

    useEffect(() => {
      if(id === undefined) {
        dispatch(updatingSuccess('pending'))
      }
      if(id) {
        dispatch(editUser({id}))
      }
    }, [dispatch, id])

    

    const handleChange = e => {
        let id = e.target.id
        dispatch(changeUserField({id, value: e.target.value}))
    }

    const handleUpdateCreateClick = () => {
      if(id) {
        dispatch(updateUser({id, data: {...user}}))
      } else {
        dispatch(createUser({...user}))
      }
    }

    const handleGoBack = () => {
      dispatch(setDefault())
      navigate('/')
    }

    const handleDelete = () => {
      dispatch(deleteUser({id}))
    }

    if (!user || user.name === null || user.surname === null || user.desc === null) {
      return (<Wrapper>
      <div>User not found</div>
      <Button onClick={handleGoBack} variant="outlined">TO TABLE</Button>
      </Wrapper>)
    }
    else return (
      <Wrapper>
        <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '300px' },
      }}
      noValidate
      autoComplete="off"
      onChange={handleChange}
    >
      <TextField id="name" fullWidth size="small" label="Name" variant="outlined" value={user.name} InputLabelProps={{ shrink: true }}/>
      <TextField id="surname" fullWidth size="small" label="Surname" variant="outlined" value={user.surname} InputLabelProps={{ shrink: true }}/>
      <TextField id="description" fullWidth multiline rows={8} label="Description" variant="outlined" value={user.desc} InputLabelProps={{ shrink: true }}/>
      <Button onClick={handleUpdateCreateClick} variant="contained" disabled={(updated === 'deleted' || updated === 'created' || updated === 'updated') ? true : false}>{id ? 'UPDATE' : 'CREATE'}</Button>
      <Button onClick={handleDelete} variant="contained" disabled={(updated === 'deleted' || updated === 'pending' || updated === 'created') ? true : false}>DELETE</Button>
      <Button onClick={handleGoBack} variant="outlined">TO TABLE</Button>
    </Box>
    </Wrapper>
    )
}