import axios from 'axios'

const UserAPI = {
  //to get info on logged-in user.
  getUser: (token) => axios.get('/users', {
      headers: {
        "Authorization": "Bearer " + token}
    }),
    
  //edit profile
  updateUser: (id, values) => axios.put(`/users/${id}`, values),

  //add YouTube to profile? CURRENTLY NOT WORKING
  // addYoutube: (id, youtubeLink) => axios.post(`/youtubes/${id}`, youtubeLink),

    addYoutube: (token, youtubeLink) => axios({
      method: 'post',
      url: '/youtubes',
      data: {
        link: youtubeLink
      },
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    }),

  //Register new user
  addUser: (user) => axios.post('/users', user),
  
  //delete user.
  deleteUser: (id) => axios.delete(`/users/${id}`),
  
  //login existing user.
  loginUser: (user) => axios.post('/login', user)
  
}

export default UserAPI
