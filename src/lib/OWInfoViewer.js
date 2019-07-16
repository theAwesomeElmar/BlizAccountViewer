import React from 'react';
import SummaryViewer from './SummaryViewer.js';
import CompleteProfileViewer from './CompleteProfileViewer.js';
import HeroesViewer from './HeroesViewer.js';
import LoadingMessage from './LoadingMessage.js';

import '../css/OWInfoViewer.css';

const INFO_SELECTION = {
    profile: "Account Summary",
    complete: "Complete Profile",
    heroes: "Heroes"
}

/**
 * Wrapper component that displays the user's information. Contains the states as to which info the user is viewing and
 *  saves the state of the already requested information
 */
class OWInfoViewer extends React.Component {
  constructor(props) {
    super(props)
    this.OWApi = this.props.OWApi

    this.state = {
        currentSelection: 'profile',
        isSummaryLoaded: false,
        isSummaryError: false,
        isCompleteProfileLoaded: false,
        isCompleteProfileError: false,
    }
  }

  /**
   * componentDidMout of OWInfoViewer
   * 
   * We are going to fetch both account summary and complete profile information
   *  If it failed in loading, we set the error and loading to true and there won't be any attempt of loading it again
   * TODO: attempt to load it again by other means (e.g. either have some load button or when the user reselects it from
   *  dropdown menu)
   */
  componentDidMount() {
    // Getting the summary
    this.OWApi.getAccountProfileInfo()
      .then((resultJson) => {
        this.summaryJson = resultJson
  
        this.setState({
          isSummaryLoaded: true,
        })
      })
      .catch((error) => {
        this.summaryJson = null
        console.log(error.error)
        this.setState({
          isSummaryLoaded: true,
          isSummaryError: true
        })
      })

    // Getting the Complete information
    this.OWApi.getAccountCompleteInfo()
      .then((resultJson) => {
        this.completeProfileJson = resultJson
        this.setState({
          isCompleteProfileLoaded: true
        })
      })
      .catch((error) => {
        this.completeProfileJson = null
        console.log(error.error)
        this.setState({
          isCompleteProfileLoaded: true,
          isCompleteProfileError: true
        })
      })
  }

  /**
   * To detect changes on the info dropdown and make changes to the info display
   * @param {*} e 
   */
  handleInfoChange(e) {
    e.preventDefault()

    this.setState({
        currentSelection: e.target.value
    })
  }

  renderInfoSelection() {
    let infoOptionsMap = []
    for (let key in INFO_SELECTION) {
      let optionId = "op-info-" + key;
      infoOptionsMap.push(<option className="op-info" id={optionId} key={optionId} value={key}>{INFO_SELECTION[key]}</option>)
    }
    return (
        <select className = "OWInfoViewer-op-info-select" value={this.state.currentSelection} onChange={(e) => this.handleInfoChange(e)}>
            {infoOptionsMap}
        </select>
    );
  }

  /**
   * It is to go back to the account verification 'login' page
   * 
   * @param {*} e - Event of the click, just calling preventDefault for it so that the event won't traverse anymore
   */
  backToLogin(e) {
    e.preventDefault()

    this.OWApi.clearOWAPIstate()
    this.props.back()
  }

  render() {
    let renderInformation
    if(this.state.currentSelection === 'profile') {
        if(this.state.isSummaryLoaded) {
          renderInformation = (<SummaryViewer json={this.summaryJson} error={this.state.isSummaryError}/>)
        } else {
          renderInformation = (<LoadingMessage message="Loading" />)
        }
    } else if(this.state.currentSelection === 'complete') {
        if(this.state.isCompleteProfileLoaded) {
          renderInformation = (<CompleteProfileViewer json={this.completeProfileJson} error={this.state.isCompleteProfileError}/>)
        } else {
          renderInformation = (<LoadingMessage message="Loading" />)
        }
    } else if(this.state.currentSelection === 'heroes') {
        renderInformation = (<HeroesViewer OWApi={this.OWApi}/>)
    }

    return (
      <div className="OWInfoViewer">
        <div className="OWInfoViewer-selection-area">
            <button className="OWInfoViewer-back-button" onClick={(event) => {this.backToLogin(event)}}>Back</button>
            {this.renderInfoSelection()}
        </div>
        {renderInformation}
      </div>
    );
  }
}

export default OWInfoViewer;
