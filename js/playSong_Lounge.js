

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



    // LEVEL = 4;

    // updateSongForLevel(LEVEL);


    // deltaType = 'randomwalk';
    deltaType = 'stay';








    // TIME = 250;
    // F = 1000/TIME;

    setInterval(updateTicker,1000);


    TIME2 = 100;
    COUNT = 0;
    setInterval(playInstruments,TIME2);



}