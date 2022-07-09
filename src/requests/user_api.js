import axios from 'axios'

const usersUrl = 'http://23.88.43.148/users/'

const userUrl = 'http://23.88.43.148/user/'


export function getUsers() {
    return axios.get(usersUrl)
}

export function getUser(id) {
    return axios.get( userUrl+id)
}

export function putUser(id, data) {
    return axios.put( userUrl+id, {...data})
}

export function postUser(data) {
    return axios.post( usersUrl, {...data}, 
    {
        'Access-Control-Allow-Origin': '*',
})
}

export function deleteUser(id) {
    return axios.put(userUrl+id)
}

