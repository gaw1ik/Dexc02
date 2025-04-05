


COUNTWHENCLICKED = 0;


function startSong() {

    CoinValue0 = [100,100,100]; // starting coin value when site is opened
    CoinValueOld = [...CoinValue0];
    CoinValue = CoinValueOld;
    CoinDelta = [0,0,0];

    dir_stream = [[0,0,0],[0,0,0],[0,0,0]];


    // initialize coin value history
    CoinValueHistory = [ [], [], [] ];
    for(let i=0; i<100; i++) {
        CoinValue = updateCoinValues();
        CoinValueHistory[0].push(CoinValue[0]);
        CoinValueHistory[1].push(CoinValue[1]);

        

        let stride = 50;
        CoinValue[2] = CoinValue0[2] + Math.sin( (i%stride / stride)*twoPI ) * 20;
        CoinValueHistory[2].push(CoinValue[2]);

    }
    CoinValue[1] = CoinValue0[1];
    CoinValueHistory[1][99] = CoinValue[1];


    averageDelta = 0;
    averagePercentDelta = 0;
    averagePercentDeltaAbs = 0;
    deltaFrom0 = [0,0,0];
    percentFrom0 = [0,0,0];
    percentFrom0Abs = [0,0,0];
    percentFrom0_previous = [0,0,0];

    percentFromLastThreshold = percentFrom0;
    percentFromLastThreshold0 = 0;

    percentTrigger01 = 5;
    percentTrigger01Step = percentTrigger01;
    deltaTrigger01 = percentTrigger01/100;
    percentTriggerLow = -percentTrigger01Step;
    percentTriggerHigh = percentTrigger01Step;

    tickerText = document.getElementById("tickerText");
    tickerHigh = document.getElementById("tickerHigh");
    tickerLow = document.getElementById("tickerLow");
    countText = document.getElementById("countText");





    /////////////////////////////////////////// SONG VARS


    // kick (kk01)
    kk01_step_arr = [Infinity,32,16,16,16,8,8,8,4];

    // snare (sn01)

    // hihat (hh01)

    // bass (b01)
    b01_step_arr = [Infinity,64,32,32,32,32,8,4,4];
    b01_inc = 0;
    b01_count = 0;
    b01_deg0_arr = [-1,-1,-1,-1,1,3,-2,2,5];
    b01_vel_arr = [0.7,0.7,0.7,0.5,0.5,0.7,0.3,0.3,0.3];

    for(let i=0; i<b01_vel_arr.length; i++) {
        // b01_deg0_arr[i] = b01_deg0_arr[i]+7;
        b01_vel_arr[i] = b01_vel_arr[i]/2;
    }

    // polysynth01 (ps01) (single pad note)
    ps01_step_arr = [64,64,32,32,32,16,8,4,2];

    ps01_stride = 32;
    ps01_osc_arr = [4,4,4,1,1,1,1,1,1];

    ps03_arr = [256,128,64,32,32,32,32,16,16];

    // // polysynth02 (ps02) (strum pad)
    justWentOver = 0;
    justWentUnder = 1;

    // monosynth08 (ms08) (bleep)
    ms08_step = 24;

    reverb_decay0 = 50;
    reverb_gain0 = 0.1;
    reverb_decay_arr = [90,70,reverb_decay0,reverb_decay0,reverb_decay0,reverb_decay0,reverb_decay0,reverb_decay0,reverb_decay0];
    reverb_gain_arr = [0.9,0.6,reverb_gain0,reverb_gain0,reverb_gain0,reverb_gain0,reverb_gain0,reverb_gain0,reverb_gain0];



    LEVEL = 4;
    LEVELPREV = LEVEL;
    updateSongForLevel(LEVEL);


    deltaType = 'randomwalk';
    // deltaType = 'stay';


    // PATH = [[[0.1,0.5]],[[0.1,0.5]],[[0.1,0.5]]];
    // PATH = [];

    ///////// INITIAL PARAMETER SETTING
    setupParams();

    setInterval(updateTicker,1000);

    MINCOUNTAPPROACH = 6;
    TIME2 = 100;
    COUNT = 0;
    updateParamsGate = 0;
    // activeArea = "posi";
    // activeArea = "loun";
    // activeArea_new = activeArea;
    // tabID="positions-button-02";
    tabID="lounge-tabs-button";
    tabID_substr = tabID.substr(0,4);
    tabID_new = tabID_substr;
    activeArea = tabID_new;
    activeArea_new = activeArea;
    activeCoinInd = 1;

    document.getElementById(tabID).click();


    // document.getElementById("positions-button-02").click();
    // document.getElementById("positions-button-02").style.backgroundColor = 'hsl(0,0%,20%)';    setInterval(playSong,TIME2);
    setInterval(playSong,TIME2);






}



function updateSongForLevel(level) {

    // console.log("level")

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
    b01_vel = b01_vel_arr[lc];


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
    // device.parametersById.get("ps01/osc").value = ps01_osc_arr[lc];

    ps03_step = ps03_arr[lc];



    // polysynth02 (ps02) (strum pad)
    // ps02_step = 256;

    // monosynth08 (ms08) (bleep)
    ms08_step = 24;


    // device.parametersById.get("master_reverb_decay").value = reverb_decay_arr[lc];

    // device.parametersById.get("master_reverb_gain").value = reverb_gain_arr[lc];
    
    tpow = t**0.5;
    // device.parametersById.get("master_lpf").value = n2r(tpow,1000,20000);



}


