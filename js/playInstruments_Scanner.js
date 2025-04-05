function updateParams_Scanner() {

    // b01
    device.parametersById.get("b01/attack").value = 1000;

    // ms01 (kick)
    device.parametersById.get("ms01/attack").value = 3;
    device.parametersById.get("ms01/decay").value = 800;
    device.parametersById.get("ms01/pow").value = 8;
    device.parametersById.get("ms01/shape").value = 6;
    device.parametersById.get("ms01/drive").value = 4.0;

    // ms04 (shaker)
    device.parametersById.get("ms04/decay").value = 500;
    device.parametersById.get("ms04/lpf").value = 2000;

        // // ps01
        // device.parametersById.get("ps01/oct").value = 2;
        // device.parametersById.get("ps01/attack").value = 2000;
        // device.parametersById.get("ps01/decay").value = 4000;
        // device.parametersById.get("ps01/shape").value = 1.3;
        // device.parametersById.get("ps01/drive").value = 1.0;
        // device.parametersById.get("ps01/pow").value = 4;
        // device.parametersById.get("ps01/gain").value = 0.06;
        // device.parametersById.get("ps01/osc").value = 1;
        // device.parametersById.get("ps01/pan").value = 0.4;
        // device.parametersById.get("ps01/lpf").value = 800;
        // device.parametersById.get("ps01/send").value = 0.7;

    // ps02 (chime up/down)
    // device.parametersById.get("ps02/attack").value = 5000;
    // device.parametersById.get("ps02/decay").value = 200;
    // device.parametersById.get("ps02/shape").value = 2.0;
    // device.parametersById.get("ps02/pow").value = 3;

}





function playInstruments_Scanner() {


    // kick (ms01)
    if(COUNT%32==16 ) {
        playNote_ms01(1,0.1);
    }
    if(COUNT%32==18) {
        playNote_ms01(1,0.05);
    }
    
    
    // if(COUNT%1==0 && makeChoice(doublekickchance)) {
    //     playNote_ms01(-3);
    // }

    // // snare (ms02)
    // let snarechoicescanner = (Math.cos( (COUNT%512) / 512 * twoPI ) + 1) * 0.5 * 30;
    // if(COUNT%16==8 && makeChoice(snarechoicescanner)) {
    //     playNote_ms02(1,0.7);
    // }
    // // hat01 (ms03)
    // let hatchoicescanner = (Math.cos( (COUNT%512) / 512 * twoPI ) + 1) * 0.5 * 50;
    // if(COUNT%chooseFromArray([2,4,1])==0 && makeChoice(hatchoicescanner)) {
    //     playNote_ms03(1,getRandomFloat(0.4,0.7));
    // }
    // sh01 (ms04)
    if(COUNT%64==32) {
        playNote_ms04(1,0.7);
    }

    // bass (b01)
    if(COUNT%32==0) {
        // let count;
        let deg = 1;
        // let deg = deg0 + b01_inc*b01_count;
        playNote_b01(deg,0.7);
        // if(b01_count>3) {
        //     deg=deg0;
        //     b01_count = 0;
        // }
        // b01_count = b01_count+1;
    }




    // ps01
    if(COUNT%4==0) {

        let theta = (COUNT%64)/64 * twoPI;
        let vel = (Math.cos(theta)+1)*0.5;

        deg = getRandomFloat(-4,4);
        var wait = getRandomFloat(0,200);
        setTimeout(playNote_ps01,wait,deg,vel);

        deg = getRandomFloat(-4,4);
        var wait = getRandomFloat(600,800);
        setTimeout(playNote_ps01,wait,deg,vel);

    }

    // ms07
    if(COUNT%128==64) {

        let deg = getRandomInt(-12,-9);
        let wait = 200;
        let nNotes = 48;
        let vel = 1.0;
        for(let i=0; i<nNotes; i++) {
            setTimeout(playNote_ms07,wait,deg,vel);
            wait = wait + 100;
            deg = deg + 1;
            vel = vel*0.86;
        }

    }



    // ps03
    if(COUNT%64==0) {

        let nNotes = getRandomInt(3,6);

        let deg = -1;
        let wait = 100;
        for(let i=0; i<nNotes; i++) {
            setTimeout(playNote_ps03,wait,deg,0.7);
            wait = wait + 100;
            deg = deg + 2;
        }
    }






    

}