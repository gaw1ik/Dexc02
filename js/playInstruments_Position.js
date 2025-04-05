function updateParams_Positions() {

    // b01
    device.parametersById.get("b01/attack").value = 240;
    
    // ms01 (kick)
    device.parametersById.get("ms01/attack").value = 3;
    device.parametersById.get("ms01/decay").value = 100;
    device.parametersById.get("ms01/pow").value = 4;
    device.parametersById.get("ms01/shape").value = 2;
    device.parametersById.get("ms01/drive").value = 4.0;

    // ms04 (shaker)
    device.parametersById.get("ms04/decay").value = 300;
    device.parametersById.get("ms04/lpf").value = 20000;

    // ps02 (chime up/down)
    // device.parametersById.get("ps02/attack").value = 50;
    // device.parametersById.get("ps02/decay").value = 2000;
    // device.parametersById.get("ps02/attack").value = 200;
    // device.parametersById.get("ps02/decay").value = 200;
    // device.parametersById.get("ps02/shape").value = 2.0;
    // device.parametersById.get("ps02/pow").value = 3;


}



function playInstruments_Position() {






    // kick (ms01)
    if(COUNT%kk01_step==0) {
        playNote_ms01(1,0.7);
    }
    if(COUNT%kk01_step==2) {
        playNote_ms01(1,0.7);
    }
    if(COUNT%1==0 && makeChoice(doublekickchance)) {
        playNote_ms01(-3,0.7);
    }

    // snare (ms02)
    if(COUNT%sn01_step==0 && makeChoice(snarechance)) {
        playNote_ms02(1,0.7);
    }

    // hat01 (ms03)
    if(COUNT%hh01_step==0 && makeChoice(hatchance)) {
        playNote_ms03(1,0.7);
    }

    // sh01 (ms04)
    if(COUNT%sh01_step==sh01_offset) {
        playNote_ms04(1,0.5);
    }

    // bass (b01)
    if(COUNT%b01_step==0) {
        // let count;
        let deg0 = b01_deg0;
        let deg = deg0 + b01_inc*b01_count;
        let vel = b01_vel;
        // console.log("vel",vel);
        playNote_b01(deg,vel);
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

        // let deg1 = getRandomFloat(0,4);
        let deg1 = 2;


        if(dir_stream_avg>0) {
            deg2 = deg1 + 1;
        } else if (dir_stream_avg<0) {
            deg2 = deg1 - 1;
        } else {
            deg2 = deg1;
        }

        playNote_ms08(deg1,0.7);

        // deg = getRandomFloat(0,4);
        setTimeout(playNote_ms08,100,deg2,0.7);
    }

    // ps03
    if(COUNT%ps03_step==0) {

        let nNotes = getRandomInt(3,6);

        let deg = -1;
        let wait = 100;
        for(let i=0; i<nNotes; i++) {
            setTimeout(playNote_ps03,wait,deg,0.3);
            wait = wait + 100;
            deg = deg + 2;
        }
    }

    let this_percentFrom0 = percentFrom0[activeCoinInd];

    if(this_percentFrom0>percentTrigger01*3.5) {
        LEVEL = 8;
    }
    if(this_percentFrom0>percentTrigger01*2.5 && this_percentFrom0<percentTrigger01*3.5) {
        LEVEL = 7;
    }
    if(this_percentFrom0>percentTrigger01*1.5 && this_percentFrom0<percentTrigger01*2.5) {
        LEVEL = 6;
    }
    if(this_percentFrom0>percentTrigger01*0.5 && this_percentFrom0<percentTrigger01*1.5) {
        LEVEL = 5;
    }
    if(this_percentFrom0>percentTrigger01*-0.5 && this_percentFrom0<percentTrigger01*0.5) {
        LEVEL = 4;
    }
    if(this_percentFrom0>percentTrigger01*-1.5 && this_percentFrom0<percentTrigger01*-0.5) {
        LEVEL = 3;
    }
    if(this_percentFrom0>percentTrigger01*-2.5 && this_percentFrom0<percentTrigger01*-1.5) {
        LEVEL = 2;
    }
    if(this_percentFrom0>percentTrigger01*-3.5 && this_percentFrom0<percentTrigger01*-2.5) {
        LEVEL = 1;
    }
    if(this_percentFrom0<percentTrigger01*-3.5) {
        LEVEL = 0;
    }

    if(LEVEL>LEVELPREV) {
        updateSongForLevel(LEVEL);
        ps02_inc = 2;
        ps02_inc2 = 1;
        delayTime = 50;
        deg0 = 4;
        N = 2;
        delayTimeExp = 1.1;
        play_chime(ps02_inc, ps02_inc2, delayTime, deg0, N, delayTimeExp);
    }
    if(LEVEL<LEVELPREV) {
        ps02_inc = -3.4;
        ps02_inc2 = -1;
        delayTime = 100;
        deg0 = 8;
        N = 6;
        delayTimeExp = 1.1;
        play_chime(ps02_inc, ps02_inc2, delayTime, deg0, N, delayTimeExp);
    }

    LEVELPREV = LEVEL;

    // /////////////////////////////////////////////// Percent Threshold Trigger Stuff (ps02)
    // if(COUNT%32==0 && COUNT>0) {
    //     justWentUnder = 0;
    //     justWentOver = 0;
    // }

    // let delayTime;
    // let deg0;
    // let N;
    // let delayTimeExp;

    // let this_percentFrom0 = percentFrom0[activeCoinInd];

    // // console.log("this_percentFrom0",this_percentFrom0);

    // if(this_percentFrom0>percentTriggerHigh && justWentOver==0) {

    //     LEVEL = LEVEL + 1;

    //     updateSongForLevel(LEVEL);

    //     ps02_inc = 2;
    //     ps02_inc2 = 1;
    //     delayTime = 50;
    //     deg0 = 4;
    //     N=4;
    //     delayTimeExp = 1;
    //     play_chime(ps02_inc, ps02_inc2, delayTime, deg0, N, delayTimeExp);

    //     justWentOver = 1;

    //     console.log("just went OVER");

    //     if(Math.sign(this_percentFrom0)<0) {
    //         percentTriggerHigh = Math.floor(this_percentFrom0/percentTrigger01Step)*percentTrigger01Step + percentTrigger01;
    //         percentTriggerLow  = Math.floor(this_percentFrom0/percentTrigger01Step)*percentTrigger01Step - percentTrigger01;
    //     } else {
    //         percentTriggerHigh = Math.floor(this_percentFrom0/percentTrigger01Step)*percentTrigger01Step + percentTrigger01;
    //         percentTriggerLow  = Math.floor(this_percentFrom0/percentTrigger01Step)*percentTrigger01Step - percentTrigger01;
    //     }   
    //     // console.log("justWentOver");
    //     // console.log("percentTrigger01",percentTrigger01);
    //     // console.log("this_percentFrom0",this_percentFrom0);


    // } else if (this_percentFrom0<percentTriggerLow && justWentUnder==0) {

    //     LEVEL = LEVEL - 1;

    //     updateSongForLevel(LEVEL);

    //     ps02_inc = -3.4;
    //     ps02_inc2 = -1;
    //     delayTime = 100;
    //     deg0 = 8;
    //     N = 5;
    //     delayTimeExp = 1.1;
    //     play_chime(ps02_inc, ps02_inc2, delayTime, deg0, N, delayTimeExp)

    //     justWentUnder = 1;

    //     console.log("just went UNDER");

    //     if(Math.sign(this_percentFrom0)<0) {
    //         percentTriggerHigh = Math.ceil(this_percentFrom0/percentTrigger01Step)*percentTrigger01Step + percentTrigger01;
    //         percentTriggerLow  = Math.ceil(this_percentFrom0/percentTrigger01Step)*percentTrigger01Step - percentTrigger01;
    //     } else {
    //         percentTriggerHigh = Math.ceil(this_percentFrom0/percentTrigger01Step)*percentTrigger01Step + percentTrigger01;
    //         percentTriggerLow  = Math.ceil(this_percentFrom0/percentTrigger01Step)*percentTrigger01Step - percentTrigger01;
    //     }   

    //     // console.log("percentTrigger01",percentTrigger01);
    //     // console.log("this_percentFrom0",this_percentFrom0);


    // } else {
        

    // }



}








function play_chime(ps02_inc, ps02_inc2, delayTime, deg0, N, delayTimeExp) {

    let delay0 = 0;
    let delay = delay0;
    // let deg0 = deg0;

    for(let i=0;i<N;i++) {

        let deg = deg0 + LEVEL + ps02_inc*(i)+ps02_inc2*i;
        delay = delay0 + (delayTime*i)**delayTimeExp;

        // console.log("ps02/inc",ps02_inc);

        setTimeout( playNote_ps02, delay, deg+4, 0.2);
        setTimeout( playNote_ms07, delay, deg, 0.1);


    }



// for(let i=0;i<N-1;i++) {

//     deg = deg0+ps02_inc*i - 7;
    
//     setTimeout( playNote_ps02, delay, deg);

//     delay = delay0 + delayTime2*i + 600;
// }
}

// function playUp(delta) {

//     let delay = 0;
//     let delayTime = 150;
//     let N = Math.ceil( r2n(delta,0.005,0.050) * 16 ) + 4;
//     deg = 3;

//     setTimeout( playNote_ps02, delay, deg); // first one

//     for(let i=0;i<N-1;i++) {

//         deg = deg+1;
        
//         setTimeout( playNote_ps02, delay, deg);

//         delay = delay + delayTime;
//     }

// }

// function playDown(delta) {

//     let delay = 0;   
//     let delayTime = 150;
//     let N = Math.ceil( r2n(delta,0.005,0.050) * 16 ) + 4;
//     deg = 3;

//     setTimeout( playNote_ps02, delay, deg); // first one

//     for(let i=0;i<N-1;i++) {

//         deg = deg-1;
        
//         setTimeout( playNote_ps02, delay, deg);

//         delay = delay + delayTime;
//     }

// }

// function playUpDownPeriodic(delta) {

//     let delay = 0;
//     let delayTime = 150;
//     let deltaAbs = Math.abs(delta);
//     let N = Math.ceil( r2n(deltaAbs,0.0001,0.0010) * 20 );
//     deg = 3;

//     let inc = 0;
//     if(delta<0) {
//         inc = -1;
//     } else if (delta>0) {
//         inc = 1;
//     }

//     // console.log("inc",inc);

//     setTimeout( playNote_ps02, delay, deg); // first one

//     for(let i=0;i<N-1;i++) {

//         deg = deg+inc;
        
//         setTimeout( playNote_ps02, delay, deg);

//         delay = delay + delayTime;
//     }

// }







