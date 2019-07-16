import React from 'react';
import LoginPage from './LoginPage.js';
import OWInfoViewer from './OWInfoViewer.js';
import OWAPI from './OWAPI.js';

import '../css/BLAccountViewer.css';

/**
 * React component that acts as the top level wrapper for the whole app.
 * 
 * Right now, it can only view Overwatch information from a third party OW API access
 * The plan for the future is to have other Blizzard accounts tied to this app as well
 */
class BLAccountViewer extends React.Component {
  constructor(props) {
    super(props)
    this.OWApi = new OWAPI()
    this.state = {
      isAccountVerified: false
    }
  }


  moveToVerifiedPage() {
    console.log('Move to info page')
    this.setState({
      isAccountVerified: true
    })
  }

  moveFromVerifiedPage() {
    console.log('Move back to login page')
    this.setState({
      isAccountVerified: false
    })
  }

  render() {
    return (
      <div className="BLAccoutViewer">
        {this.state.isAccountVerified ? (
          <OWInfoViewer back={() => {this.moveFromVerifiedPage()}} OWApi={this.OWApi}/>
        ) : (
          <LoginPage next={() => {this.moveToVerifiedPage()}} OWApi={this.OWApi}/>
        )}
      </div>
    );
  }
}

export default BLAccountViewer;
