import React from 'react';

import '../css/Viewer.css';

const SUMMARY_INFORMATION_RENDER = {
  name: "Account Name: ",
  totalLevel: "Total Level: ",
  endorsement: "Endorsement Level: ",
  gamesWon: "Games Won: "
}

/**
 * A stateless viewer for the summary page
 * 
 * TODO: Merge all the viewers (Summary/CompleteProfile/Hero) into one
 */
class SummaryViewer extends React.Component {
  constructor(props) {
    super(props)
    if(!props.error) {
      this.getSummaryInfo(props)
    }
  }

  /**
   * Storing the needed information on a separate object, for easier read as to what's extracted
   * 
   * @param {*} props - properties received from the constructor
   */
  getSummaryInfo(props) {
    if(props.json) {
      let prestige = props.json.prestige ? props.json.prestige : 0
      let level = props.json.level ? props.json.level : 1
      let totalLevel = (prestige * 100) + level
  
      this.summaryInfo = {
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
    }

  }

  /**
   * Does a for-loop to render the content of the render function
   */
  renderSummaryInformation() {
    let summaryInfo = []
    for (let key in SUMMARY_INFORMATION_RENDER) {
      summaryInfo.push(
        <div key={key}>
            <span className="viewer-name">{SUMMARY_INFORMATION_RENDER[key]}</span>
            <span className="viewer-info">{this.summaryInfo[key]}</span>
        </div>
      )
    }
    return summaryInfo;
  }

  render() {
    if(this.props.error) {
      return (
        <div className="viewer-error">
          <span>Something went wrong when loading the information.</span>
        </div>
      );
    } else {
      let isPrivatePublic = this.summaryInfo.isPrivate ? (
        <div className="viewer-private-public">
          <span>Private Account</span>
        </div>
      ) : (
        <div className="viewer-private-public">
          <span>Public Account</span>
        </div>
      )

      let summaryInfo = this.renderSummaryInformation()
  
      return (
        <div className="SummaryViewer">
            <h1 className="viewer-header">Account Summary</h1>
            <img src={this.summaryInfo.icon} alt="account-icon"></img>
            {isPrivatePublic}
            {summaryInfo}
        </div>
      );
    }
  }
}

export default SummaryViewer;
