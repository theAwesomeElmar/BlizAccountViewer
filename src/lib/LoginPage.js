import React from 'react';
import LoadingMessage from './LoadingMessage.js';

import "../css/LoginPage.css";

/**
 * React class that handles verifying the existence of an account. Not really for login, but it kinda does.
 */
class LoginPage extends React.Component {
  constructor(props) {
    super(props)
    this.OWApi = this.props.OWApi
    this.state = {
      isAccountVerifying: false,
      isOnError: false
    }
  }

  /**
   * To remove the error message if it is showing when the user types on the box
   */
  handleInputChange() {
    if (this.state.isOnError) {
      this.setState({
        isOnError: false
      })
    }
  }

  /**
   * Checks the OW API the account is valid on the selected region and platform
   * 
   * @param {*} e - event that was passed when the verify button is selected
   */
  loginInfo(e) {
    e.preventDefault()

    let regionKey = this.regionInput.value
    let platformKey = this.platformInput.value
    let battleTagInput = this.textInput.value

    this.setState({
      isAccountVerifying: true,
      isOnError: false
    })

    this.OWApi.loadAccountProfile(platformKey, regionKey, battleTagInput)
      .then((resultJson) => {
        console.log(resultJson)

        this.setState({
          isAccountVerifying: false,
          isOnError: false
        })

        this.props.next() //Go to the next page
      })
      .catch((error) => {
        console.log(error.error)

        this.setState({
          isAccountVerifying: false,
          isOnError: true
        })
      })
  }

  /**
   * To render the battle tag input on the render phase
   */
  renderBattleTagInput() {
    return (
      <form>
        <span>BattleTag ID: </span>
        <input type="text" className="LoginPage-bnet-id-field" id="bnet-id" name="bnet-id" onChange={() => {this.handleInputChange()}} ref={(input) => this.textInput = input}></input>
        <button type="button" className="LoginPage-bnet-id-button" id="bnet-id-accept" onClick={(event) => {this.loginInfo(event)}}>Next</button>
      </form>
    )
  }

  /**
   * To render the region select dropdown on the render phase
   */
  renderRegionSelect() {
    let regionOptionsMap = []
    for (let keys in this.OWApi.region) {
      let optionId = "op-region-" + keys;
      regionOptionsMap.push(<option className="op-region" id={optionId} key={optionId}>{keys}</option>)
    }
    return (
      <div>
        <span>Region: </span>
        <select className = "LoginPage-op-region-select"ref={(input) => {this.regionInput = input}}>
          {regionOptionsMap}
        </select>
      </div>
    );
  }

  /**
   * To render the platform dropdown menu on the render phase
   */
  renderPlatformSelect() {
    let platformOptionsMap = []
    for (let keys in this.OWApi.platform) {
      let optionId = "op-platform-" + keys;
      platformOptionsMap.push(<option className="op-platform" id={optionId} key={optionId}>{keys}</option>)
    }
    return (
      <div>
        <span>Platform: </span>
        <select className = "LoginPage-op-platform-select" ref={(input) => {this.platformInput = input}}>
          {platformOptionsMap}
        </select>
      </div>
    );
  }

  /**
   * To render the error message if the provided information is incorrect
   */
  renderErrorLogin() {
    if(this.state.isOnError) {
      return (<p className="LoginPage-error-message">There's something wrong with the account provided. Please try again.</p>);
    } else return null
  }

  /**
   * rendering the normal verification 'login' page
   */
  renderLoginPage() {
    return (
      <div>
        {this.renderErrorLogin()}
        {this.renderRegionSelect()}
        {this.renderPlatformSelect()}
        {this.renderBattleTagInput()}
      </div>
    )
  }

  render() {
    let renderContent = this.state.isAccountVerifying ? (<LoadingMessage message="Verifying..." />) : this.renderLoginPage()

    return (
      <header className="LoginPage-header">
        <h1 className="LoginPage-title">Overwatch Account Viewer:</h1>
        {renderContent}
      </header>
    );
  }
}

export default LoginPage;
