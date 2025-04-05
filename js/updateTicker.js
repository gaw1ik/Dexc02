




function updateTicker() {


    CoinValue = updateCoinValues();

            //// coin 0 (JMPUSD)
            var i = 0;
            var CoinDelta2Prev = CoinDelta[i];
            CoinDelta[i] = CoinValue[i] - CoinDelta2Prev;
            deltaFrom0[i] = (CoinValue[i]-CoinValue0[i])/CoinValue0[i];
            percentFrom0[i] = deltaFrom0[i]*100;
            percentFrom0Abs[i] = Math.abs(percentFrom0[2]);
        
            //// coin 1 (WLKUSD)
            var i = 1;
            CoinValue[i] = CoinValue[i] + CoinDelta[i];
            deltaFrom0[i] = (CoinValue[i]-CoinValue0[i])/CoinValue0[i];
            percentFrom0[i] = deltaFrom0[i]*100;
            percentFrom0Abs[i] = Math.abs(percentFrom0[i]);
        
            //// coin 2 (SINUSD)
            var i = 2;
            var CoinDelta2Prev = CoinDelta[i];
            CoinDelta[i] = CoinValue[i] - CoinDelta2Prev;
            deltaFrom0[i] = (CoinValue[i]-CoinValue0[i])/CoinValue0[i];
            percentFrom0[i] = deltaFrom0[i]*100;
            percentFrom0Abs[i] = Math.abs(percentFrom0[i]);


    // update history array
    CoinValueHistory[0].push(CoinValue[0]);
    CoinValueHistory[1].push(CoinValue[1]);
    CoinValueHistory[2].push(CoinValue[2]);
    CoinValueHistory[0] = CoinValueHistory[0].slice(1);
    CoinValueHistory[1] = CoinValueHistory[1].slice(1);
    CoinValueHistory[2] = CoinValueHistory[2].slice(1);




    for(let i=0; i<3; i++) {

        if(CoinDelta[i]>0) {
            dir = 1;
        } else if(CoinDelta[i]<0) {
            dir = -1;
        } else {
            dir = 0;
        }

        dir_stream[i] = dir_stream[i].slice(1);
        dir_stream[i].push(dir);

    }


    if(percentFrom0[activeCoinInd]<percentFrom0_previous[activeCoinInd]) {
        tickerText.style.color = 'hsl(0,50%,50%)';
    } else if (percentFrom0[activeCoinInd]>percentFrom0_previous[activeCoinInd]) {
        tickerText.style.color = 'hsl(130,50%,50%)';
    } else {
        tickerText.style.color = 'hsl(130,0%,50%)';
    }

    if(activeCoinInd==0) {
        CoinName = "JMPUSD";
    }
    if(activeCoinInd==1) {
        CoinName = "WLKUSD";
    }
    if(activeCoinInd==2) {
        CoinName = "SINUSD";
    }

    if(percentFrom0[activeCoinInd]<0) {
        tickerText.innerText = CoinName + ' $' + CoinValue[activeCoinInd].toFixed(2) + " - " + percentFrom0Abs[activeCoinInd].toFixed(3) + "%";
    } else {
        tickerText.innerText = CoinName + ' $' + CoinValue[activeCoinInd].toFixed(2) + " + " + percentFrom0Abs[activeCoinInd].toFixed(3) + "%";
    }



    for(let i=0; i<3; i++) {

        percentFrom0_previous[i] = percentFrom0[i];

    }




}




function updateCoinValues() {

        TICKERCOUNT = TICKERCOUNT + 1;

        //// coin 0 (JMPUSD)
        var i = 0;
        if(TICKERCOUNT%4==0) {
            CoinValue[i] = CoinValue0[i] + getRandomFloat(-1,1)*20;
        } else {
            CoinValue[i] = CoinValue[i] + getRandomFloat(-1,1)*3;
        }

    
        //// coin 1 (WLKUSD)
        var i = 1;
        CoinDelta[i] = getRandomFloat(-1,1)*1;
        CoinValue[i] = CoinValue[i] + CoinDelta[i];
        if(CoinValue[i]>vizMax) {
            CoinValue[i] = vizMax;
        } else if (CoinValue[i]<vizMin) {
            CoinValue[i] = vizMin;
        }

    
        //// coin 2 (SINUSD)
        var i = 2;
        let stride = 64000;
        CoinValue[i] = CoinValue0[i] + Math.sin( ((Date.now()-MS0)%stride / stride)*twoPI ) * 20;


        return CoinValue;
}

