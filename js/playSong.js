



function playSong() {

    // console.log("play song")


    COUNTMOD = COUNT%32;
    QN = Math.floor(COUNTMOD/4) + 1;
    BAR = Math.floor(COUNT/32);
    BARMOD = BAR%4 + 1;
    if(COUNTMOD<10) {
        countText.innerText = BARMOD + '.' + QN + '.0' + COUNTMOD;
    } else {
        countText.innerText = BARMOD + '.' + QN + '.' + COUNTMOD;
    }

    // let updateParamsGate = 0;

    if(COUNT-COUNTWHENCLICKED < MINCOUNTAPPROACH && updateParamsGate==0) {
        // console.log(COUNT-COUNTWHENCLICKED,"too soon, delayed a bar");
                // console.log("updateParamsGate",updateParamsGate)

    } else if (COUNT-COUNTWHENCLICKED >= MINCOUNTAPPROACH && COUNTMOD%32==0 && updateParamsGate==1) {
        activeArea = activeArea_new;
        tabID = tabID_new;
        // console.log("updateParams")
        // updateParamsGate = 1;
        // if(updateParamsGate==1) {
        switch (activeArea) {
    
                case "loun":
                    MINCOUNTAPPROACH = 0;
                    updateParams_Lounge();
                    break;
        
                case "scan":
                    // COUNT = 0;
                    // COUNTMOD = COUNT%32;
                    // QN = Math.floor(COUNTMOD/4) + 1;
                    // BAR = Math.floor(COUNT/32);
                    // BARMOD = BAR%4 + 1;
                    // countText.innerText = BARMOD + '.' + QN + '.' + COUNTMOD;
                    MINCOUNTAPPROACH = 0;
                    updateParams_Scanner();
                    break;
        
                case "wall":
                    MINCOUNTAPPROACH = 0;
                    updateParams_Wallet();
                    break;
        
                case "posi":
                    MINCOUNTAPPROACH = 0;
                    updateParams_Positions();
                    if(tabID=="positions-button-01") {
                        // LEVEL=7;
                    }
                    if(tabID=="positions-button-02") {
                        // LEVEL=4;
                    }
                    if(tabID=="positions-button-03") {
                        // LEVEL=1;
                    }
        
                    break;
        
                default:
                    break;
    
        
            }
    
        updateParamsGate = 0;

        // }
    
    }

    // if(COUNTMOD%32==0) {

    // }








    switch (activeArea) {

        case "loun":
            try { playInstruments_Lounge(); } catch(err) {console.log("whoops")}
            break;

        case "scan":
            try { playInstruments_Scanner(); } catch(err) {console.log("whoops")}
            break;

        case "wall":
            try { playInstruments_Wallet(); } catch(err) {console.log("whoops")}
            break;

        case "posi":
            // if(tabID=="positions-button-01") {
            //     LEVEL=7;
            // }
            // if(tabID=="positions-button-02") {
            //     LEVEL=4;
            // }
            // if(tabID=="positions-button-03") {
            //     LEVEL=1;
            // }

            updateSongForLevel(LEVEL);
            try { playInstruments_Position(); } catch(err) {console.log(err)}
            break;

        default:
            break;

    }
    



    // }

    COUNT = COUNT + 1;


    // setTimeout(playSong,TIME2);


}



function updateSongForSiteArea() {

    let tabID =  this.id;

    tabID_substr = tabID.substr(0,4);

    // console.log(tabID);

    tabID_new = tabID;

    activeArea_new = tabID_substr;


    COUNTWHENCLICKED = COUNT;

    updateParamsGate = 1;


    //////// Tab Appearance Control
    //// Reset all tab buttons to idle color
    document.getElementById("positions-button-01").style.backgroundColor = 'black';
    document.getElementById("positions-button-02").style.backgroundColor = 'black';
    document.getElementById("positions-button-03").style.backgroundColor = 'black';
    document.getElementById("lounge-tabs-button").style.backgroundColor = 'black';
    document.getElementById("scanner-tabs-button").style.backgroundColor = 'black';
    document.getElementById("wallet-tabs-button").style.backgroundColor = 'black';

    //// Set Active Tab to Active Color
    if(tabID=="lounge-tabs-button") {
        document.getElementById("lounge-tabs-button").style.backgroundColor = 'hsl(0,0%,20%)';
    }
    if(tabID=="scanner-tabs-button") {
        document.getElementById("scanner-tabs-button").style.backgroundColor = 'hsl(0,0%,20%)';
    }
    if(tabID=="wallet-tabs-button") {
        document.getElementById("wallet-tabs-button").style.backgroundColor = 'hsl(0,0%,20%)';
    }
    if(tabID=="positions-button-01") {
        activeCoinInd = 0;
        document.getElementById("positions-button-01").style.backgroundColor = 'hsl(0,0%,20%)';
    }
    if(tabID=="positions-button-02") {
        activeCoinInd = 1;
        document.getElementById("positions-button-02").style.backgroundColor = 'hsl(0,0%,20%)';
    }
    if(tabID=="positions-button-03") {
        activeCoinInd = 2;
        document.getElementById("positions-button-03").style.backgroundColor = 'hsl(0,0%,20%)';
    }




    // console.log("COUNT-WHEN-CLICKED",COUNT)

}