import React from 'react';
import HeroViewer from './HeroViewer.js'
import LoadingMessage from './LoadingMessage.js';

import '../css/Viewer.css';

/**
 * View that renders the heroes information received from OWAPI
 * Unlike the other viewers, this will be stateful and 'might' handle child components
 * TODO: will be done later on once it's more clear on how the heroes API works
 */

class HeroesViewer extends React.Component {
  constructor(props){
    super(props)
    this.OWApi = props.OWApi
    this.heroes = props.OWApi.heroes
    this.state = {
      currentHeroSelection: 'Ana'
    }

    //This should contain the json of the loaded heroes
    this.jsonHeroes = {}

    // We need to keep track what is loaded and what is not, and what faced an error
    for (let key in this.heroes) {
      let stateLoadedKey = 'is' + key + 'Loaded'
      let stateErrorKey = 'is' + key + 'Error'
      this.state[stateLoadedKey] = false
      this.state[stateErrorKey] = false

      this.jsonHeroes[key] = {}
    }
  }

  /**
   * This is to load the prelimenary hero information (Ana)
   */
  componentDidMount() {
    this.getHeroInformation(this.state.currentHeroSelection)
  }

  /**
   * Gets called every time the hero drop down info changes. It should fetch the information from the OWAPI 
   * 
   * @param {*} e - event of the change, just for preventDefault
   */
  handleInfoChange(e) {
    e.preventDefault()

    this.setState({
        currentHeroSelection: e.target.value
    })

    //Get the hero information if it is not yet loaded
    this.getHeroInformation(e.target.value)
  }

  /**
   * This is to load the hero information if it is not yet loaded
   * * 
   * @param {*} e - the key (or name) of the hero being loaded - It needs to be passed instead of depending on the
   *  currentHeroSelection state as that seems to be asynchronous
   */
  getHeroInformation(heroKey) {
    let heroList = [this.heroes[heroKey]]
    let setStateInfo = {}
    let stateLoadedKey = 'is' + heroKey + 'Loaded'
    let stateErrorKey = 'is' + heroKey + 'Error'

    //If the information is already tracked loaded, don't do anything anymore
    if(this.state[stateLoadedKey]) {
      return;
    }

    this.OWApi.getHeroesInfo(heroList)
      .then((resultJson) => {
        resultJson['heroName'] = heroKey //Just adding some more information
        this.jsonHeroes[heroKey] = resultJson
        setStateInfo[stateLoadedKey] = true
        
        console.log(resultJson)
        this.setState(setStateInfo)
      })
      .catch((error) => {
        this.jsonHeroes[heroKey] = {}
        setStateInfo[stateLoadedKey] = true
        setStateInfo[stateErrorKey] = true

        console.log(error.error)
        this.setState(setStateInfo)
      })
  }

  renderHeroSelection() {
    let infoOptionsMap = []
    for (let key in this.heroes) {
      let optionId = "op-hero-" + this.heroes[key];
      infoOptionsMap.push(<option className="op-hero" id={optionId} key={optionId} value={key}>{key}</option>)
    }
    return (
        <select className = "viewer-select" value={this.state.currentSelection} onChange={(e) => this.handleInfoChange(e)}>
            {infoOptionsMap}
        </select>
    );
  }

  render() {
    let stateLoadedKey = 'is' + this.state.currentHeroSelection + 'Loaded'
    let stateErrorKey = 'is' + this.state.currentHeroSelection + 'Error'
    let viewer = this.state[stateLoadedKey] ? (
      <HeroViewer key={this.state.currentHeroSelection} json={this.jsonHeroes[this.state.currentHeroSelection]} error={this.state[stateErrorKey]}/>
    ) : (
      <LoadingMessage message="Loading" />
    )

    return (
      <div className="HeroesViewer">
          <h1 className="viewer-header">Specific Heroes Detail</h1>
          {this.renderHeroSelection()}
          {viewer}
      </div>
    );
  }
}

export default HeroesViewer;
