import {Component} from 'react'
import {v4} from 'uuid'

import './App.css'

const colorList = ['yellow', 'green', 'orange', 'brown', 'blue']

class App extends Component {
  state = {
    isTrue: false,
    latestPasswordsList: [],
    website: '',
    username: '',
    password: '',
    isShowPassword: false,
  }

  onWebsiteInput = event => {
    this.setState({website: event.target.value})
  }

  onUserNameInput = event => {
    this.setState({username: event.target.value})
  }

  onPasswordInput = event => {
    this.setState({password: event.target.value})
  }

  onAddBtnClick = event => {
    event.preventDefault()
    const {username, website, password} = this.state
    const initial = website.slice(0, 1).toUpperCase()
    const classValue = colorList[Math.floor(Math.random() * 5)]

    const newValues = {
      id: v4(),
      initialValue: initial,
      websiteName: website,
      userName: username,
      Password: password,
      classAdd: classValue,
    }

    this.setState(prevState => ({
      latestPasswordsList: [...prevState.latestPasswordsList, newValues],
      website: '',
      username: '',
      password: '',
      isTrue: true,
      searchInput: '',
    }))
  }

  onSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  showPasswordCheckBoxClick = event => {
    if (event.target.checked) {
      this.setState({isShowPassword: true})
    } else {
      this.setState({isShowPassword: false})
    }
  }

  onDeleteItem = id => {
    const {latestPasswordsList} = this.state
    const newList = latestPasswordsList.filter(eachItem => eachItem.id !== id)
    const caseOf = newList.length !== 0
    this.setState({latestPasswordsList: newList, isTrue: caseOf})
  }

  render() {
    const {
      website,
      username,
      password,
      latestPasswordsList,
      isShowPassword,
      searchInput,
    } = this.state
    let {isTrue} = this.state
    const newList = latestPasswordsList.filter(eachItem =>
      eachItem.websiteName.toLowerCase().includes(searchInput.toLowerCase()),
    )

    if (newList.length === 0) {
      isTrue = false
    } else {
      isTrue = true
    }
    return (
      <div className="main-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
          alt="app logo"
          className="app-logo"
        />
        <div className="sub-div1">
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-sm-img.png"
            alt="password manager"
            className="sub-div1-image2"
          />
          <form onSubmit={this.onAddBtnClick} className="add-details">
            <h1 className="detail-heading">Add New Password</h1>
            <div className="input-holder">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
                alt="website"
                className="input-image"
              />
              <input
                type="text"
                placeholder="Enter Website"
                value={website}
                onChange={this.onWebsiteInput}
                className="input-element"
              />
            </div>
            <div className="input-holder">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
                alt="username"
                className="input-image"
              />
              <input
                type="text"
                placeholder="Enter Username"
                value={username}
                onChange={this.onUserNameInput}
                className="input-element"
              />
            </div>
            <div className="input-holder">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
                alt="password"
                className="input-image"
              />
              <input
                type="password"
                placeholder="Enter Password"
                value={password}
                onChange={this.onPasswordInput}
                className="input-element"
              />
            </div>
            <button type="submit" className="add-btn">
              Add
            </button>
          </form>
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-lg-img.png"
            alt="password manager"
            className="sub-div1-image1"
          />
        </div>
        <div className="sub-div2">
          <div className="first-div">
            <div className="your-password">
              <h1 className="heading-name">Your Passwords</h1>
              <p className="colored-text">{newList.length}</p>
            </div>
            <div className="search-holder">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
                alt="search"
                className="input-image"
              />
              <input
                className="input-element"
                type="search"
                placeholder="Search"
                value={searchInput}
                onChange={this.onSearchInput}
              />
            </div>
          </div>
          <hr />
          <div className="show-passwords">
            <input
              type="checkbox"
              id="check"
              onChange={this.showPasswordCheckBoxClick}
              className="check-box"
            />
            <label htmlFor="check" className="label-password">
              Show Passwords
            </label>
          </div>
          {!isTrue && (
            <div className="empty-state">
              <img
                src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
                alt="no passwords"
                className="empty-image"
              />
              <p className="no-passwords">No Passwords</p>
            </div>
          )}
          {isTrue && (
            <ul className="result-container">
              {newList.map(eachItem => (
                <li className="item-list" id={eachItem.id} key={eachItem.id}>
                  <p className={`initial ${eachItem.classAdd}`}>
                    {eachItem.initialValue}
                  </p>
                  <div className="list-content">
                    <p className="website">{eachItem.websiteName}</p>
                    <p className="website">{eachItem.userName}</p>
                    {!isShow && (
                      <img
                        src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png"
                        alt="stars"
                        className="stars-image"
                      />
                    )}
                    {isShow && <p className="website">{eachItem.Password}</p>}
                  </div>
                  <button
                    type="button"
                    onClick={() => this.onDeleteItem(eachItem.id)}
                    className="del-btn"
                    testid="delete"
                  >
                    <img
                      src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
                      alt="delete"
                      className="del-image"
                    />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    )
  }
}

export default App
