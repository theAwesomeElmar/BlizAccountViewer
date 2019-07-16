import React from 'react';

import '../css/Viewer.css';

const BASIC_INFORMATION_RENDER = {
  name: "Account Name: ",
  prestige: "Prestige: ",
  level: "Level: ",
  totalLevel: "Total Level: ",
  endorsement: "Endorsement Level: ",
  gamesWon: "Games Won: "
}

const SPECIFIC_INFORMATION_RENDER = {
  gamesWon: "Games Won: ",
  gamesPlayed: "Games Played: ",
  eliminationAvg: "Elimination (Avg): ",
  damageDoneAvg: "Damage Done (Avg): ",
  deathsAvg: "Deaths (Avg): ",
  finalBlowsAvg: "Final Blows (Avg): ",
  healingDoneAvg: "Healing Done (Avg): ",
  objectiveKillsAvg: "Objective Kills (Avg): ",
  objectiveTimeAvg: "Objective Time (Avg): ",
  soloKillsAvg: "Solo Kills (Avg): "
}

/**
 * A stateless viewer for the complete profile page
 * 
 * TODO: Merge all the viewers (Summary/CompleteProfile/Hero) into one
 */
class CompleteProfileViewer extends React.Component {
  constructor(props) {
    super(props)
    if(!props.error) {
      this.getCompleteInfo(props)
    }
  }

  /**
   * Storing the needed information on a separate object, for easier read as to what's extracted
   * 
   * @param {*} props - properties received from the constructor
   */
  getCompleteInfo(props) {
    if(props.json) {
      let prestige = props.json.prestige ? props.json.prestige : 0
      let level = props.json.level ? props.json.level : 1
      let totalLevel = (prestige * 100) + level
  
      this.completeInfo = {
        name: props.json.name ? props.json.name : "",
        isPrivate: props.json.private ? props.json.private : true,
        gamesWon: props.json.gamesWon ? props.json.gamesWon : 0,
        prestige: prestige,
        level: level,
        totalLevel: totalLevel,
        endorsement: props.json.endorsement ? props.json.endorsement : 1,
        endorsementIcon: props.json.endorsementIcon ? props.json.endorsementIcon : "",
        icon: props.json.icon ? props.json.icon : ""
      }

      let qp = {
        eliminationAvg: (props.json.quickPlayStats && props.json.quickPlayStats.eliminationAvg) ? props.json.quickPlayStats.eliminationAvg : "0.0",
        damageDoneAvg: (props.json.quickPlayStats && props.json.quickPlayStats.damageDoneAvg) ? props.json.quickPlayStats.damageDoneAvg : "0.0",
        deathsAvg: (props.json.quickPlayStats && props.json.quickPlayStats.deathsAvg) ? props.json.quickPlayStats.deathsAvg : "0.0",
        finalBlowsAvg: (props.json.quickPlayStats && props.json.quickPlayStats.finalBlowsAvg) ? props.json.quickPlayStats.finalBlowsAvg : "0.0",
        healingDoneAvg: (props.json.quickPlayStats && props.json.quickPlayStats.healingDoneAvg) ? props.json.quickPlayStats.healingDoneAvg : "0.0",
        objectiveKillsAvg: (props.json.quickPlayStats && props.json.quickPlayStats.objectiveKillsAvg) ? props.json.quickPlayStats.objectiveKillsAvg : "0.0",
        objectiveTimeAvg: (props.json.quickPlayStats && props.json.quickPlayStats.objectiveTimeAvg) ? props.json.quickPlayStats.objectiveTimeAvg : "0.0",
        soloKillsAvg: (props.json.quickPlayStats && props.json.quickPlayStats.soloKillsAvg) ? props.json.quickPlayStats.soloKillsAvg : "0.0",
        gamesPlayed: (props.json.quickPlayStats && props.json.quickPlayStats.games && props.json.quickPlayStats.games.played) ? props.json.quickPlayStats.games.played : "0",
        gamesWon: (props.json.quickPlayStats && props.json.quickPlayStats.games && props.json.quickPlayStats.games.won) ? props.json.quickPlayStats.games.won : "0",
      }

      let comp = {
        eliminationAvg: (props.json.quickPlayStats && props.json.quickPlayStats.eliminationAvg) ? props.json.quickPlayStats.eliminationAvg : "0.0",
        damageDoneAvg: (props.json.quickPlayStats && props.json.quickPlayStats.damageDoneAvg) ? props.json.quickPlayStats.damageDoneAvg : "0.0",
        deathsAvg: (props.json.quickPlayStats && props.json.quickPlayStats.deathsAvg) ? props.json.quickPlayStats.deathsAvg : "0.0",
        finalBlowsAvg: (props.json.quickPlayStats && props.json.quickPlayStats.finalBlowsAvg) ? props.json.quickPlayStats.finalBlowsAvg : "0.0",
        healingDoneAvg: (props.json.quickPlayStats && props.json.quickPlayStats.healingDoneAvg) ? props.json.quickPlayStats.healingDoneAvg : "0.0",
        objectiveKillsAvg: (props.json.quickPlayStats && props.json.quickPlayStats.objectiveKillsAvg) ? props.json.quickPlayStats.objectiveKillsAvg : "0.0",
        objectiveTimeAvg: (props.json.quickPlayStats && props.json.quickPlayStats.objectiveTimeAvg) ? props.json.quickPlayStats.objectiveTimeAvg : "0.0",
        soloKillsAvg: (props.json.quickPlayStats && props.json.quickPlayStats.soloKillsAvg) ? props.json.quickPlayStats.soloKillsAvg : "0.0",
        gamesPlayed: (props.json.quickPlayStats && props.json.quickPlayStats.games && props.json.quickPlayStats.games.played) ? props.json.quickPlayStats.games.played : "0",
        gamesWon: (props.json.quickPlayStats && props.json.quickPlayStats.games && props.json.quickPlayStats.games.won) ? props.json.quickPlayStats.games.won : "0",
      }

      this.completeInfo.quickPlay = qp
      this.completeInfo.competitive = comp
    }
  }

  /**
   * Does a for-loop to render the content of the render function for the basic info
   */
  renderBasicInformation() {
    let basicInfo = []
    for (let key in BASIC_INFORMATION_RENDER) {
      basicInfo.push(
        <div key={key}>
            <span className="viewer-name">{BASIC_INFORMATION_RENDER[key]}</span>
            <span className="viewer-info">{this.completeInfo[key]}</span>
        </div>
      )
    }
    return basicInfo;
  }

  /**
   * This is to render for specific gameplay information - quick play or competitive play
   * 
   * @param {*} gameType - either 'quickPlay' or 'competitive'. If not, it returns null
   */
  renderSpecificGameplayInformation(gameType) {
    if(gameType !== 'quickPlay' && gameType !== 'competitive') return null

    let specificInfo = []
    for (let key in SPECIFIC_INFORMATION_RENDER) {
      specificInfo.push(
        <div key={key}>
            <span className="viewer-name">{SPECIFIC_INFORMATION_RENDER[key]}</span>
            <span className="viewer-info">{this.completeInfo[gameType][key]}</span>
        </div>
      )
    }
    return specificInfo;
  }

  render() {
    if(this.props.error) {
      return (
        <div className="viewer-error">
          <span>Something went wrong when loading the information.</span>
        </div>
      );
    } else {
      const isPrivatePublic = this.completeInfo.isPrivate ? (
        <div className="viewer-private-public">
          <span>Private Account</span>
        </div>
      ) : (
        <div className="viewer-private-public">
          <span>Public Account</span>
        </div>
      )

      const basicInfo = this.renderBasicInformation()
      const qpInfo = this.renderSpecificGameplayInformation('quickPlay')
      const compInfo = this.renderSpecificGameplayInformation('competitive')
    
      return (
        <div className="CompleteProfileViewer">
            <h1 className="viewer-header">Account Information</h1>
            <img src={this.completeInfo.icon} alt="account-icon"></img>
            {isPrivatePublic}
            {basicInfo}

            <h1 className="viewer-header">Quick Play Stats</h1>
            {qpInfo}

            <h1 className="viewer-header">Competitive Play Stats</h1>
            {compInfo}
        </div>
      );
    }
  }
}

export default CompleteProfileViewer;