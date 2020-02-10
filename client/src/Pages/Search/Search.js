import React, { useState } from 'react'
import SearchAPI from '../../utils/SearchAPI'
import { useHistory } from 'react-router-dom'
import './search.css'

const { searchUsers } = SearchAPI

const Search = () => {
  let history = useHistory()

  const [searchState, setSearchState] = useState({
    searchBar: '',
    searchedUsers: []
  })

  searchState.handleInputChange = (event) => {
    setSearchState({ ...searchState, [event.target.name]: event.target.value })
  }

  //SIMPLE SEARCH FORM: finds users using username or name.
  const handleSearch = (event) => {
    event.preventDefault()
    if (searchState.searchBar) {
      searchUsers(searchState.searchBar)
        .then(({ data }) => {
          setSearchState({
            searchedUsers: data
          })
        })
        .catch(e => console.error(e))
    }
  }

  //save chosen user's id to sessionStorage, render OtherProfile.js
  const visitProfile = (id) => {
    sessionStorage.setItem("token", id)
    history.push('/otherprofile')
  }

  return (
    <>
      <div className="container">
        <h4 className="center-align white-text">Search for a musician</h4>
        <br></br>
        <form id="searchForm">
          <input id="searchInput" type="search" name="searchBar" value={searchState.searchBar} onChange={searchState.handleInputChange} />
          <button onClick={handleSearch}><i className="fa fa-search"></i></button>
        </form>
      </div>
      <div className="container"> {/* FOUND USERS POPULATE HERE; need styling. */}
        {
          searchState.searchedUsers.length ? searchState.searchedUsers.map((user, index) => (
            <div className={(index % 2) ? "row grey lighten-4" : "row grey lighten-2"}>
              <div className="col s6 m6">
                {/* PROFILE PIC */}
                {(user.profile) ? <img className="responsive-img" alt="Your pf pic" id="img" src={user.profile} /> : null}
                  </div>
              <div className="col s6 m6">
                {/* BASIC INFO */}
                <h5 onClick={() => visitProfile(user._id)}>{user.name}</h5>
                <h6>{user.username}</h6>
                {/* NEEDS LOCATION */}
                </div>
              <div className="col s12 m6 grey lighten-5"> {/* INSTRUMENTS/SKILLS */}
                {/* INSTRUMENTS */}
                <div className="col s12 m6">
                  <h6>Instruments</h6>
                  {
                    user.instruments.length ? <>
                      {user.instruments.map(instrument => (
                        <p>{instrument + " "}</p>
                      ))}
                    </> : <p>No instruments listed.</p>
                  }
                </div>
                {/* SKILLS */}
                <div className="col s6 m6">
                  <h6>Skills</h6>
                  {
                    user.skills.length ? <>
                      {user.skills.map(skill => (
                        <p>{skill + " "}</p>
                      ))}
                    </> : <p>No skills listed.</p>
                  }
                </div>
              </div>
            </div>
          )) : <p className="white-text center-align">No users match your search query.</p>
        }
      </div>
    </>
  )
}

export default Search