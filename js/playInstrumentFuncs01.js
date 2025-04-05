









dir_stream = [0,0,0];


function playInstruments() {


    COUNTMOD = COUNT%32;
    QN = Math.floor(COUNTMOD/4) + 1;
    BAR = Math.floor(COUNT/32);
    BARMOD = BAR%4 + 1;
    countText.innerText = BARMOD + '.' + QN + '.' + COUNTMOD;





    if(CoinDelta>0) {
        dir = 1;
    } else if(CoinDelta<0) {
        dir = -1;
    } else {
        dir = 0;
    }

    dir_stream = dir_stream.slice(1);
    dir_stream.push(dir);




    // kick (ms01)
    if(COUNT%kk01_step==0) {
        playNote_ms01(1);
    }
    if(COUNT%kk01_step==2) {
        playNote_ms01(1);
    }
    if(COUNT%1==0 && makeChoice(doublekickchance)) {
        playNote_ms01(-3);
    }

    // snare (ms02)
    if(COUNT%sn01_step==0 && makeChoice(snarechance)) {
        playNote_ms02(1);
    }
    // if(COUNT%8==4) {
    //     playNote_ms02(1);
    // }

    // hat01 (ms03)
    if(COUNT%hh01_step==0 && makeChoice(hatchance)) {
        playNote_ms03(1);
    }

    // sh01 (ms04)
    if(COUNT%sh01_step==sh01_offset) {
        playNote_ms04(1);
    }

    // bass (b01)
    
    if(COUNT%b01_step==0) {
        // let count;
        let deg0 = b01_deg0;
        let deg = deg0 + b01_inc*b01_count;
        playNote_b01(deg);
        // b01inc = b01inc + 1;
        if(b01_count>3) {
            deg=deg0;
            b01_count = 0;
        }
        // console.log("b01inc",b01inc)
        b01_count = b01_count+1;
    }


    // bleep (ms08)
    if(COUNT%ms08_step==3) {

        let dir_stream_avg = average(dir_stream);

        let deg1 = getRandomFloat(0,4);

        if(dir_stream_avg>0) {
            deg2 = deg1 + 1;
        } else if (dir_stream_avg<0) {
            deg2 = deg1 - 1;
        } else {
            deg2 = deg1;
        }

        playNote_ms08(deg1);

        // deg = getRandomFloat(0,4);
        setTimeout(playNote_ms08,100,deg2);
    }

    // ps01

    if(COUNT%ps01_step==0) {

        // deg = 9 + COUNT%4

        var oct;
        if(COUNT%8==0) {
            oct = chooseFromArray([0.5,1.0]);; 
            device.parametersById.get("polysynth01_oct").value = oct;
        }

        if(oct==0.5){
            device.parametersById.get("polysynth01_gain").value = 0.033;
        } else {
            device.parametersById.get("polysynth01_gain").value = 0.020;
        }

        if((COUNT%ps01_stride)<(ps01_stride/2)) {
            ps01_deg0 = 3;
        } else {
            ps01_deg0 = 5;
        }
        let deg = ps01_deg0;
        playNote_ps01(deg);

        // deg = getRandomFloat(0,4);
        // setTimeout(playNote_ps01,100,deg);
    }




    /////////////////////////////////////////////// Percent Threshold Trigger Stuff
    if(COUNT%32==0 && COUNT>0) {
        // if(justWentOver==1){
            justWentUnder = 0;
        // }
        // if(justWentUnder==1) {
            justWentOver = 0;
        // }
        // console.log("percentTriggerLow",percentTriggerLow);

        // console.log("justWentOver",justWentOver);
        // console.log("justWentUnder",justWentUnder);

    }

    let delayTime;
    let deg0;
    let N;
    let delayTimeExp

    if(percentFrom0>percentTriggerHigh && justWentOver==0) {

        LEVEL = LEVEL + 1;

        updateSongForLevel(LEVEL);

        ps02_inc = 2;
        ps02_inc2 = 1;
        delayTime = 50;
        deg0 = 4;
        N=4;
        delayTimeExp = 1;
        play_ps02(ps02_inc, ps02_inc2, delayTime, deg0, N, delayTimeExp)

        justWentOver = 1;

        // console.log("just went OVER");

        if(Math.sign(percentFrom0)<0) {
            percentTriggerHigh = Math.floor(percentFrom0/percentTrigger01Step)*percentTrigger01Step + percentTrigger01;
            percentTriggerLow  = Math.floor(percentFrom0/percentTrigger01Step)*percentTrigger01Step - percentTrigger01;
        } else {
            percentTriggerHigh = Math.floor(percentFrom0/percentTrigger01Step)*percentTrigger01Step + percentTrigger01;
            percentTriggerLow  = Math.floor(percentFrom0/percentTrigger01Step)*percentTrigger01Step - percentTrigger01;
        }   
        // console.log("justWentOver");
        // console.log("percentTrigger01",percentTrigger01);
        // console.log("percentFrom0",percentFrom0);


    } else if (percentFrom0<percentTriggerLow && justWentUnder==0) {

        LEVEL = LEVEL - 1;

        updateSongForLevel(LEVEL);

        ps02_inc = -3.4;
        ps02_inc2 = -1;
        delayTime = 100;
        deg0 = 8;
        N = 5;
        delayTimeExp = 1.1;
        play_ps02(ps02_inc, ps02_inc2, delayTime, deg0, N, delayTimeExp)

        justWentUnder = 1;

        // console.log("just went UNDER");

        if(Math.sign(percentFrom0)<0) {
            percentTriggerHigh = Math.ceil(percentFrom0/percentTrigger01Step)*percentTrigger01Step + percentTrigger01;
            percentTriggerLow  = Math.ceil(percentFrom0/percentTrigger01Step)*percentTrigger01Step - percentTrigger01;
        } else {
            percentTriggerHigh = Math.ceil(percentFrom0/percentTrigger01Step)*percentTrigger01Step + percentTrigger01;
            percentTriggerLow  = Math.ceil(percentFrom0/percentTrigger01Step)*percentTrigger01Step - percentTrigger01;
        }   

        // console.log("percentTrigger01",percentTrigger01);
        // console.log("percentFrom0",percentFrom0);


    } else {
        
        // console.log("neither");
        // return;
    }


    COUNT = COUNT + 1;

}








function play_ps02(ps02_inc, ps02_inc2, delayTime, deg0, N, delayTimeExp) {

    let delay0 = 0;
    let delay = delay0;
    let deg = deg0;

    for(let i=0;i<N;i++) {

        deg = deg0 + ps02_inc*(i)+ps02_inc2*i;
        delay = delay0 + (delayTime*i)**delayTimeExp;

        // console.log("ps02_inc",ps02_inc);

        setTimeout( playNote_ps02, delay, deg);

    }



// for(let i=0;i<N-1;i++) {

//     deg = deg0+ps02_inc*i - 7;
    
//     setTimeout( playNote_ps02, delay, deg);

//     delay = delay0 + delayTime2*i + 600;
// }
}













function playNote_b01(deg) {
    device.parametersById.get("b01/deg").value = deg + getRandomFloat(0,0.1)*Math.sign(deg);
}

function playNote_ms01(deg) {
    device.parametersById.get("ms01/deg").value = deg + getRandomFloat(0,0.1)*Math.sign(deg);
}
function playNote_ms02(deg) {
    device.parametersById.get("ms02/deg").value = deg + getRandomFloat(0,0.1)*Math.sign(deg);
}
function playNote_ms03(deg) {
    device.parametersById.get("ms03/deg").value = deg + getRandomFloat(0,0.1)*Math.sign(deg);
}
function playNote_ms04(deg) {
    device.parametersById.get("ms04/deg").value = deg + getRandomFloat(0,0.1)*Math.sign(deg);
}
function playNote_ms05(deg) {
    device.parametersById.get("ms05/deg").value = deg + getRandomFloat(0,0.1)*Math.sign(deg);
}
function playNote_ms06(deg) {
    device.parametersById.get("ms06/deg").value = deg + getRandomFloat(0,0.1)*Math.sign(deg);
}
function playNote_ms07(deg) {
    device.parametersById.get("ms07/deg").value = deg + getRandomFloat(0,0.1)*Math.sign(deg);
}
function playNote_ms08(deg) {
    device.parametersById.get("ms08/deg").value = deg + getRandomFloat(0,0.1)*Math.sign(deg);
}

function playNote_ps01(deg) {
    device.parametersById.get("polysynth01_deg").value = deg + getRandomFloat(0,0.1)*Math.sign(deg);
}
function playNote_ps02(deg) {
    device.parametersById.get("polysynth02_deg").value = deg + getRandomFloat(0,0.1)*Math.sign(deg);
}




function playUp(delta) {

    let delay = 0;
    let delayTime = 150;
    let N = Math.ceil( r2n(delta,0.005,0.050) * 16 ) + 4;
    deg = 3;

    setTimeout( playNote_ps02, delay, deg); // first one

    for(let i=0;i<N-1;i++) {

        deg = deg+1;
        
        setTimeout( playNote_ps02, delay, deg);

        delay = delay + delayTime;
    }

}

function playDown(delta) {

    let delay = 0;   
    let delayTime = 150;
    let N = Math.ceil( r2n(delta,0.005,0.050) * 16 ) + 4;
    deg = 3;

    setTimeout( playNote_ps02, delay, deg); // first one

    for(let i=0;i<N-1;i++) {

        deg = deg-1;
        
        setTimeout( playNote_ps02, delay, deg);

        delay = delay + delayTime;
    }

}




function playUpDownPeriodic(delta) {

    let delay = 0;
    let delayTime = 150;
    let deltaAbs = Math.abs(delta);
    let N = Math.ceil( r2n(deltaAbs,0.0001,0.0010) * 20 );
    deg = 3;

    let inc = 0;
    if(delta<0) {
        inc = -1;
    } else if (delta>0) {
        inc = 1;
    }

    // console.log("inc",inc);

    setTimeout( playNote_ps02, delay, deg); // first one

    for(let i=0;i<N-1;i++) {

        deg = deg+inc;
        
        setTimeout( playNote_ps02, delay, deg);

        delay = delay + delayTime;
    }

}







