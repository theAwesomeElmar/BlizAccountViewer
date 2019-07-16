const OWAPI_ENDPOINT = "https://ow-api.com/v1/stats/"
const REGEX_ALLOWABLE_NAME = "([A-Za-z][A-Za-z0-9]+)#(\\d+)"

class OWAPIError {
    constructor(error) {
        this.error = error;
    }
}

/**
 * OWAPI wrapper for OWAPI_ENDPOINT
 */
class OWAPI {
    region = {
        US: "us",
        Europe: "eu",
        Korea: "kr",
        Taiwan: "tw"
    }
    
    platform = {
        PC: "pc",
        Console: "console"
    }

    requests = {
        Profile: 'profile',
        Complete: 'complete',
        Heroes: 'heroes'
    }
    
    heroes = {
        Ana: "ana",
        Ashe: "ashe",
        Baptiste: "baptiste",
        Bastion: "bastion", 
        Brigitte: "brigitte",
        DVa: "dVa",
        Doomfist: "doomfist",
        Genji: "genji",
        Hanzo: "hanzo",
        Junkrat: "junkrat",
        Lucio: "lúcio",
        Mccree: "mccree",
        Mei: "mei",
        Mercy: "mercy",
        Orisa: "orisa",
        Pharah: "pharah",
        Reaper: "reaper",
        Reinhardt: "reinhardt",
        Roadhog: "roadhog",
        Soldier76: "soldier76",
        Sombra: "sombra",
        Symmetra: "symmetra",
        Torbjorn: "torbjörn",
        Tracer: "tracer",
        Widowmaker: "widowmaker",
        Winston: "winston",
        WreckingBall: "wreckingball",
        Zarya: "zarya",
        Zenyatta: "zenyatta"
    }

    constructor() {
        this.savedBattleTagQuery = ""
        this.savedRegion = ""
        this.savedPlatform = ""
    }
    
    /**
     * This is to get the initial information about the profile, as well as verifying if it exists.
     * If it is successful in the query, it will save the information regarding the query so that it can be used
     *   by the other queries without asking the wrapper app for the info again
     * 
     * @param {*} platformKey - key to match the platform object
     * @param {*} regionKey - key to match the region object
     * @param {*} battleTagInput - unsanitized input given by the user
     * 
     * Returns a Promise where the object that called it can use it
     */
    loadAccountProfile(platformKey, regionKey, battleTagInput) {
        return new Promise((resolve, reject) => {
            if(!this.verifyBattleTagValidity(battleTagInput)) {
                throw new OWAPIError("Name format is invalid")
            }
            let battleTagQuery = this.queryableBattleTag(battleTagInput)
            let region = this.region[regionKey]
            let platform = this.platform[platformKey]
            let request = this.requests.Profile

            this.get(platform, region, battleTagQuery, request)
                .then((myJson) =>{
                    //We want to save this information so that we don't need to requery it again and again
                    this.savedBattleTagQuery = battleTagQuery
                    this.savedRegion = region
                    this.savedPlatform = platform
                    if(resolve) resolve(myJson)
                })
                .catch((error) => {
                    if(reject) reject(error)
                })
        })
        
    }

    /**
     * It is the same as loadAccountProfile except it already assumes that the account is loaded
     * and the user information is saved on the object for repeated requests
     */
    getAccountProfileInfo() {
        return new Promise((resolve, reject) => {
            let battleTagQuery = this.savedBattleTagQuery
            let region = this.savedRegion
            let platform = this.savedPlatform
            let request = this.requests.Profile

            if(!region || !platform || !battleTagQuery) {
                throw new OWAPIError("Account Verification hasn't been done")
            }

            this.get(platform, region, battleTagQuery, request)
                .then((myJson) =>{
                    if(resolve) resolve(myJson)
                })
                .catch((error) => {
                    if(reject) reject(error)
                })
        })
    }

    /**
     * Getting the complete user information to display
     * 
     * It assumes that loadAccountProfile is called and some user information states has been saved, else it will throw an error
     */
    getAccountCompleteInfo() {
        return new Promise((resolve, reject) => {
            let battleTagQuery = this.savedBattleTagQuery
            let region = this.savedRegion
            let platform = this.savedPlatform
            let request = this.requests.Complete

            if(!region || !platform || !battleTagQuery) {
                throw new OWAPIError("Account Verification hasn't been done")
            }

            this.get(platform, region, battleTagQuery, request)
                .then((myJson) =>{
                    if(resolve) resolve(myJson)
                })
                .catch((error) => {
                    if(reject) reject(error)
                })
        })
    }

    /**
     * Getting the hero information requested. According to the api, the user can request for more than one hero in one go.
     *  This still needs to be verified.
     * 
     * @param {*} heroList - "The world need heroes!" an array containing the keys that will match the OWAPI
     *      hero list.
     */
    getHeroesInfo(heroList) {
        return new Promise((resolve, reject) => {
            let battleTagQuery = this.savedBattleTagQuery
            let region = this.savedRegion
            let platform = this.savedPlatform
            let request = this.requests.Heroes

            //TODO: we need to check what happens if the user requests an empty hero list
            if(heroList && heroList.length > 0) {
                request += '/'
                for(let i = 0; i < heroList.length; i++) {
                    request += this.heroes[heroList[i]]
                    //In short, if this is not yet the last one, add a comma
                    if((i+1) < heroList.length) {
                        request += ','
                    }
                }
            } else {
                throw new OWAPIError("No Hero infomation provided")
            }

            if(!region || !platform || !battleTagQuery) {
                throw new OWAPIError("Account Verification hasn't been done")
            }

            this.get(platform, region, battleTagQuery, request)
                .then((myJson) =>{
                    if(resolve) resolve(myJson)
                })
                .catch((error) => {
                    if(reject) reject(error)
                })
        })
    }

    /**
     * The wrapper to call OW API's endpoints (we only do GET)
     * 
     * @param {*} platform 
     * @param {*} region 
     * @param {*} battleTagQuery 
     * @param {*} request 
     */
    get(platform, region, battleTagQuery, request) {
        const urlRequest = OWAPI_ENDPOINT + '/' + platform + '/' + region + '/' + battleTagQuery + '/' + request

        return new Promise((resolve, reject) => {
            fetch(urlRequest)
                .then((response) => {
                    if(response.ok) {
                        return response.json()
                    } else {
                        throw new OWAPIError("Endpoint: Error" + response.status)
                    }
                })
                .then((myJson) => {
                    if(resolve) resolve(myJson)
                })
                .catch((error) => {
                    if(reject) reject(error)
                })
        })
    }

    /**
     * Checks some of the general rules of Battle.net naming standards:
     * https://us.battle.net/support/en/article/26963
     * 
     * @param {*} battleTagInput - the input provided by the user
     */
    verifyBattleTagValidity(battleTagInput) {
        let re = new RegExp(REGEX_ALLOWABLE_NAME)
        let matches = battleTagInput.match(re)

        //It meams that it exactly matches the allowable name and the name isn't truncated in any way
        if (matches && matches[0].length === battleTagInput.length) {
            let hashLocation = battleTagInput.indexOf('#')
            
            //Name length requirement
            return (hashLocation >= 3 && hashLocation <= 12);
        }

        return false
    }

    /**
     * Converts <Name>#<ID> to <Name>-<ID> for API queries
     * 
     * @param {*} A properly formatted battletag - <Name>#<ID>
     */
    queryableBattleTag(battleTagInput) {
        return battleTagInput.replace('#', '-')
    }

    /**
     * Clears the saved user info state
     */
    clearOWAPIstate() {
        this.savedBattleTagQuery = ""
        this.savedRegion = ""
        this.savedPlatform = ""
    }
}

export default OWAPI;

