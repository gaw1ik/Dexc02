

percentTriggerHigh = 5;
percentTriggerLow = -5;

function playSong() {

    CoinValue0 = 1.000; // starting coin value when site is opened
    CoinValueOld = CoinValue0;
    CoinValue = CoinValueOld;
    CoinDelta = 0;
    Count = 0;
    // degnew = 1;

    averageDelta = 0;
    averagePercentDelta = 0;
    averagePercentDeltaAbs = 0;
    percentFrom0 = 0;
    percentFrom0Abs = 0;
    percentFrom0_previous = 0;

    percentFromLastThreshold = percentFrom0;
    percentFromLastThreshold0 = 0;



    percentTrigger01 = 5;
    percentTrigger01Step = percentTrigger01;
    deltaTrigger01 = percentTrigger01/100;
    percentTriggerLow = percentFrom0 - percentTrigger01Step;
    percentTriggerHigh = percentFrom0 + percentTrigger01Step;

    tickerText = document.getElementById("tickerText");
    tickerHigh = document.getElementById("tickerHigh");

    tickerLow = document.getElementById("tickerLow");

    countText = document.getElementById("countText");


    deltaFrom0_MA = [0,0,0,0,0,0,0,0];

    CoinValue_MA = [];
    for(let i=0;i<32;i++) {
        CoinValue_MA.push(CoinValue0);
    }
    average_CoinValue = CoinValue0;




    /////////////////////////////////////////// SONG VARS

    // kick (kk01)
    kk01_step_arr = [Infinity,32,16,16,16,8,8,8,4];

    // snare (sn01)

    // hihat (hh01)

    // bass (b01)
    b01_step_arr = [Infinity,64,32,32,32,32,8,4,4];
    b01_inc = 0;
    b01_count = 0;
    // b01_deg0 = 1;
    b01_deg0_arr = [-1,-1,-1,-1,1,3,-2,2,1];


    // polysynth01 (ps01) (single pad note)
    // ps01_step = 4;
    ps01_step_arr = [64,64,32,32,32,16,8,4,2];

    // ps01_deg0 = 9;
    ps01_stride = 32;
    ps01_osc_arr = [4,4,4,1,1,1,1,1,1];

    // // polysynth02 (ps02) (strum pad)
    // ps02_step = 256;
    justWentOver = 0;
    justWentUnder = 1;

    // monosynth08 (ms08) (bleep)
    ms08_step = 24;

    reverb_decay0 = 50;
    reverb_gain0 = 0.1;
    reverb_decay_arr = [90,70,reverb_decay0,reverb_decay0,reverb_decay0,reverb_decay0,reverb_decay0,reverb_decay0,reverb_decay0];
    reverb_gain_arr = [0.9,0.6,reverb_gain0,reverb_gain0,reverb_gain0,reverb_gain0,reverb_gain0,reverb_gain0,reverb_gain0];



    LEVEL = 4;

    updateSongForLevel(LEVEL);


    deltaType = 'randomwalk';
    // deltaType = 'stay';




    ///////// INITIAL PARAMETER SETTING
    setupParams();



    // TIME = 250;
    // F = 1000/TIME;

    setInterval(updateTicker,1000);


    TIME2 = 100;
    COUNT = 0;
    setInterval(playInstruments,TIME2);



}



function updateSongForLevel(level) {

    let level_clipped = level;
    if(level<0) {
        level_clipped=0;
    }
    if(level>8){
        level_clipped=8;
    }

    let lc = level_clipped;

    musicLevelText.innerText = 'MUSIC LEVEL: ' + level_clipped;


    let t = level_clipped/8;

    let i = Math.round(level_clipped/2);

    var tpow;

    // kick (kk01)
    kk01_step = kk01_step_arr[lc];
    tpow = t**4;
    doublekickchance = n2r(tpow,0,60);
    b01_deg0 = b01_deg0_arr[lc];


    // snare (sn01)
    sn01_step = 2;
    tpow = t**2;
    snarechance = n2r(tpow,0,50);

    // hihat (hh01)
    hh01_step = 1;
    tpow = t**2;
    hatchance  = n2r(tpow,0,60);

    // shaker (sh01)
    sh01_offset_arr = [Infinity,Infinity,Infinity,Infinity,Infinity,4,4,2,1];
    sh01_offset = sh01_offset_arr[lc];
    sh01_step_arr = [Infinity,Infinity,Infinity,Infinity,Infinity,8,8,4,0];
    sh01_step = sh01_step_arr[lc];

    // bass (b01)
    b01_step = b01_step_arr[lc];
    b01_inc = 0;

    // polysynth01 (ps01) (single pad note)
    ps01_step = ps01_step_arr[lc];
    ps01_deg0 = 9;
    device.parametersById.get("polysynth01_osc").value = ps01_osc_arr[lc];


    // polysynth02 (ps02) (strum pad)
    // ps02_step = 256;

    // monosynth08 (ms08) (bleep)
    ms08_step = 24;


    device.parametersById.get("master_reverb_decay").value = reverb_decay_arr[lc];

    device.parametersById.get("master_reverb_gain").value = reverb_gain_arr[lc];
    
    tpow = t**0.5;
    device.parametersById.get("master_lpf").value = n2r(tpow,1000,20000);



}


function updateSongForLevel01() {

    console.log("LEVEL",LEVEL)

    if(LEVEL==7) {
        b01_step = 4;
        b01_deg0 = 1;
        // kick (kk01)
        kk01_step = 8;
        doublekickchance = 50;
        // snare (sn01)
        sn01_step = 1;
        snarechance = 5;
        // hihat (hh01)
        hh01_step = 1;
        hatchance = 70;
    }

    if(LEVEL==6) {
        b01_step = 8;
        b01_deg0 = -3;
        b01_inc = 0;
        device.parametersById.get("b01/shape").value = 3;
        device.parametersById.get("b01/oct").value = 0.0625;
        device.parametersById.get("b01/pow").value = 1;
        // kick (kk01)
        kk01_step = 8;
        doublekickchance = 30;
        // snare (sn01)
        sn01_step = 2;
        snarechance = 5;
        // hihat (hh01)
        hh01_step = 1;
        hatchance = 10;
    }

    if(LEVEL==5) {
        b01_step = 8;
        b01_deg0 = -3;
        device.parametersById.get("b01/shape").value = 2;
        device.parametersById.get("b01/oct").value = 0.125;
        device.parametersById.get("b01/pow").value = 1;
        // kick (kk01)
        kk01_step = 8;
        doublekickchance = 20;
        // snare (sn01)
        sn01_step = 2;
        snarechance = 5;
        // hihat (hh01)
        hh01_step = 1;
        hatchance = 20;
    }

    if(LEVEL==4) {
        b01_step = 16;
        b01_deg0 = 1;
        // kick (kk01)
        kk01_step = 8;
        doublekickchance = 10;
        // snare (sn01)
        sn01_step = 2;
        snarechance = 5;
        // hihat (hh01)
        hh01_step = 1;
        hatchance = 1;
    }

    if(LEVEL==3) {
        b01_step = 16;
        b01_deg0 = 0;
        device.parametersById.get("b01/pow").value = 0;
        // kick (kk01)
        kk01_step = 8;
        doublekickchance = 10;
        // snare (sn01)
        sn01_step = 2;
        snarechance = 3;
        // hihat (hh01)
        hh01_step = 1;
        hatchance = 1;
    }

    if(LEVEL==2) {
        b01_step = 32;
        b01_deg0 = -1;
        // kick (kk01)
        kk01_step = 16;
        doublekickchance = 10;
        // snare (sn01)
        sn01_step = Infinity;
        snarechance = 2;
        // hihat (hh01)
        hh01_step = 1;
        hatchance = 10;
    }

    if(LEVEL==1) {
        b01_step = 64;
        b01_deg0 = -2;
        // kick (kk01)
        kk01_step = 16;
        doublekickchance = 10;
        // snare (sn01)
        sn01_step = Infinity;
        snarechance = 1;
        // hihat (hh01)
        hh01_step = 1;
        hatchance = 5;
    }

    if(LEVEL==0) {
        b01_step = 128;
        b01_deg0 = -3;
        // kick (kk01)
        kk01_step = Infinity;
        doublekickchance = 0;
        // snare (sn01)
        sn01_step = Infinity;
        snarechance = 0;
        // hihat (hh01)
        hh01_step = Infinity;
        hatchance = 0;
    }

}

