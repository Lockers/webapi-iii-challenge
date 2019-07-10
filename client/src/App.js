import React from 'react';
import axios from 'axios';
import { User } from '../src/components/User'

class App extends React.Component {
    state = {
      users: [],
      posts: ''
    }
  
  componentDidMount() {
    this.getUsers()
  }
  
  getUsers = () => {
    axios
      .get('http://localhost:4000/users/')
      .then(res => {
        this.setState({users: res.data})
      })
      .catch(err => {
      
    })
  }
  createUser = (event) => {
    event.preventDefault()
    const name = event.target['name'].value
    const user = {
      name: name
    } 
    axios
      .post('http://localhost:4000/users/', user)
      .then(res => {
        const newUser = res.data
        this.setState({users: [...this.state.users, newUser]})
      })
      .catch(err => {
        console.log(err)
    })
  }
  deleteUser = (id) => {
    axios
      .delete(`http://localhost:4000/users/${id}`)
      .then(res => {
      this.getUsers()
      })
      .catch(err => {
        console.log(err)
      })
  }

  getPosts = (id) => {
    axios
      .get(`http://localhost:4000/users/${id}/posts`)
      .then(res => {
        this.setState({posts: res.data.text})
      })
      .catch(err => {
        console.log(err)
      })
  }
  

  render() {
    return (
  <div>
        <form onSubmit={this.createUser}>
          <input
            type='text'
            name='name'
          />
          <button>Add user</button>
        </form>
      <div className="App">
        {
          this.state.users.map(user => {
            return <User user={user} key={user.id} getPosts={this.getPosts} post={this.state.posts} deleteUser={this.deleteUser} />
          })
        }
        </div>
    </div>
    );
  }
}

export default App;
