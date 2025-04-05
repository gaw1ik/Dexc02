function updateTicker() {

    

    // if(Count%F==0) {
    if(deltaType=='randomwalk') {
        CoinDelta = getRandomFloat(-1,1)*0.03;
    } else if (deltaType=='up') {
        CoinDelta =  0.01;
    } else if (deltaType=='down') {
        CoinDelta = -0.01;
    } else if (deltaType=='stay') {
        CoinDelta = 0;
    }


        CoinValue = CoinValue + CoinDelta; 
        // tickerText.innerText = 'SHTUSD $' + CoinValue.toFixed(3);
    // }

    // if(CoinDelta>0) {
    //     tickerText.style.color = 'hsl(130,50%,50%)';
    // } else if(CoinDelta<0) {
    //     tickerText.style.color = 'hsl(0,50%,50%)';
    // } else {
    //     tickerText.style.color = 'hsl(0,0%,50%)';
    // }



    deltaFrom0 = (CoinValue-CoinValue0)/CoinValue0;


    percentFrom0 = deltaFrom0*100;
    percentFrom0Abs = Math.abs(percentFrom0);

    // if ( deltaFrom0>deltaTrigger01 ) {
    //     tickerText.innerText = 'BTCUSD $' + CoinValue.toFixed(1) + " " + percentFrom0.toFixed(2) + "%";
    // } else if (deltaFrom0<-deltaTrigger01) {
    //     tickerText.innerText = 'BTCUSD $' + CoinValue.toFixed(1) + " " + percentFrom0.toFixed(2) + "%";
    // } else {
    //     //
    // }

    deltaFrom0_MA = deltaFrom0_MA.slice(1);
    deltaFrom0_MA.push(deltaFrom0);
    // console.log("deltaFrom0_MA",deltaFrom0_MA);
    averageDelta = average(deltaFrom0_MA);
    averagePercentDelta = averageDelta*100;
    averagePercentDeltaAbs = Math.abs(averagePercentDelta);

    CoinValue_MA = CoinValue_MA.slice(1);
    CoinValue_MA.push(CoinValue);
    // console.log("deltaFrom0_MA",deltaFrom0_MA);
    average_CoinValue = average(CoinValue_MA);


    // console.log("averageDelta",averageDelta);

    if(percentFrom0<percentFrom0_previous) {
        tickerText.style.color = 'hsl(0,50%,50%)';
    } else if (percentFrom0>percentFrom0_previous) {
        tickerText.style.color = 'hsl(130,50%,50%)';
    } else {
        tickerText.style.color = 'hsl(130,0%,50%)';
    }

    if(percentFrom0<0) {
        tickerText.innerText = 'SHTUSD $' + CoinValue.toFixed(2) + " - " + percentFrom0Abs.toFixed(3) + "%";
    } else {
        tickerText.innerText = 'SHTUSD $' + CoinValue.toFixed(2) + " + " + percentFrom0Abs.toFixed(3) + "%";
    }


    // tickerHigh.innerText = percentTriggerHigh.toFixed(3) + "%";
    // tickerLow.innerText = percentTriggerLow.toFixed(3) + "%";



    // if ( deltaFrom0>deltaTrigger01 ) {
    //     CoinValue0 = CoinValue; // reset
    //     // degnew = degnew + 1;
    //     playUp(deltaFrom0);
    // } else if (deltaFrom0<-deltaTrigger01) {
    //     CoinValue0 = CoinValue; // reset
    //     // degnew = degnew - 1;
    //     playDown(deltaFrom0);
    // } else {
    //     //
    // }

    // CoinValue0 = average_CoinValue;

    percentFrom0_previous = percentFrom0;


}