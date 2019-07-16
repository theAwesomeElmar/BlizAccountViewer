import React from 'react';
import * as OWHeroPortraits from './OWHeroPortraits.js';

import '../css/Viewer.css';

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
 * Stateless view version of the Heroes viewer, which will display the stats of the hero selected
 * 
 * TODO: Need to study more how the heroes api work and how to tailor the information here
 * TODO: Merge all the viewers (Summary/CompleteProfile/Hero) into one
 */
class HeroViewer extends React.Component {
    constructor(props) {
        super(props)
        if(!props.error) {
            this.getHeroInfo(props)
        }
    }
    
    /**
     * Storing the needed information on a separate object, for easier read as to what's extracted
     * 
     * @param {*} props - properties received from the constructor
     */
    getHeroInfo(props) {
        if(props.json) {
            this.heroInfo = {
                heroName: props.json.heroName ? props.json.heroName : "",
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

            this.heroInfo.quickPlay = qp
            this.heroInfo.competitive = comp
        }
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
                <span className="viewer-info">{this.heroInfo[gameType][key]}</span>
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
            
        const message = "Player's stats: " + this.heroInfo.heroName
        const imageAlt = this.heroInfo.heroName + "-icon"
        const heroPortrait = OWHeroPortraits.getHeroPortrait(this.heroInfo.heroName)
        const qpInfo = this.renderSpecificGameplayInformation('quickPlay')
        const compInfo = this.renderSpecificGameplayInformation('competitive')
        
        return (
                <div className="HeroViewer">
                    <h1 className="viewer-header">{message}</h1>
                    <img src={heroPortrait} alt={imageAlt}></img>
                    <h2 className="viewer-header-two">Quick Play Stats</h2>
                    {qpInfo}

                    <h2 className="viewer-header-two">Competitive Play Stats</h2>
                    {compInfo}
                </div>
            );
        }
    }
}

export default HeroViewer;