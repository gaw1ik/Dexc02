function updateParams_Wallet() {

    // b01
    device.parametersById.get("b01/attack").value = 1000;

    // ms01 (kick)
    device.parametersById.get("ms01/attack").value = 3;
    device.parametersById.get("ms01/decay").value = 100;
    device.parametersById.get("ms01/pow").value = 4;
    device.parametersById.get("ms01/shape").value = 2;
    device.parametersById.get("ms01/drive").value = 4.0;

    // ms04 (shaker)
    device.parametersById.get("ms04/decay").value = 300;
    device.parametersById.get("ms04/lpf").value = 2000;

    // // ps02 (chime up/down)
    // device.parametersById.get("ps02/attack").value = 5000;
    // device.parametersById.get("ps02/decay").value = 200;
    // device.parametersById.get("ps02/shape").value = 2.0;
    // device.parametersById.get("ps02/pow").value = 3;







}





function playInstruments_Wallet() {


    // kick (ms01)

    if(COUNT%16==0 ) {
        playNote_ms01(-1,0.7);
    }
    if(COUNT%16==2) {
        playNote_ms01(-5,0.4);
    }
    

    // snare (ms02)
    if(COUNT%32==24) {
        playNote_ms02(1,0.7);
        setTimeout(playNote_ms02,200,1,0.3);
    }

    // hat01 (ms03)
    if(COUNT%4==0 && makeChoice(80)) {
        playNote_ms03(1,getRandomFloat(0.4,0.7));
    }
    if(COUNT%16==2 && makeChoice(50)) {
        for(let i=0; i<6; i++) {
            wait = 70*i;
            vel = 0.7/i;
            setTimeout(playNote_ms03,wait,1,vel);
        }
    }



    //bass (b01)
    if(COUNT%32==19) {
        playNote_b01(12,0.05);
    }

    // // ms04
    if(COUNT%32==16) {

        deg = -6;
        setTimeout(playNote_ms04,0,deg,0.1);

        deg = -3;
        setTimeout(playNote_ms04,50,deg,0.2);

    }
    if(COUNT%32==18) {

        deg = -6;
        setTimeout(playNote_ms04,0,deg,0.1);

        deg = -3;
        setTimeout(playNote_ms04,50,deg,0.2);

    }

    // gas (ms05)
    if(COUNT%128==96) {
        playNote_ms05(1,0.4);
    }

    // ms06 (wu waa)
    if(COUNT%64==16) {

        let deg = -12;
        setTimeout(playNote_ms06,0,deg,0.02);

        deg = -9;
        setTimeout(playNote_ms06,100,deg,0.08);

    }
    if(COUNT%64==18) {

        let deg = -9;
        setTimeout(playNote_ms06,0,deg,0.02);

        deg = -5;
        setTimeout(playNote_ms06,100,deg,0.08);

    }
    
    // ms07
    if(COUNT%128==64) {

        let deg = chooseFromArray([-9,-7,-5]);
        let wait = 200;
        let nNotes = 9;
        let vel = 1.0;
        let inc = 2;
        for(let i=0; i<nNotes; i++) {
            setTimeout(playNote_ms07,wait,deg,vel);
            wait = wait + 75;
            deg = deg + inc;
            vel = vel*0.80;
        }
        for(let i=0; i<nNotes; i++) {
            setTimeout(playNote_ms07,wait,deg,vel);
            wait = wait + 75;
            deg = deg - inc;
            vel = vel*0.80;
        }

    }

    // bleep (ms08)
    if(COUNT%64==12) {

        // let deg1 = getRandomFloat(0,4);
        let deg1 = getRandomFloat(0,4);
        // let deg2 = deg1+2;

        // playNote_ms08(deg1,0.3);

        // deg = getRandomFloat(0,4);
        // setTimeout(playNote_ms08,100,deg2,0.01);

        let nNotes = 36;
        // let deg = 8;
        let vel = 0.2;
        let arr = [-2,2,-1,1,0]
        for(let i=0; i<nNotes; i++) {
            let deg = arr[i%5];

            // let deg = getRandomInt(-2,2);
            setTimeout(playNote_ms08,wait,deg,vel);
            // setTimeout(playNote_ms08,wait+30,deg+9,0.2);

            wait = wait + 60;
            // deg = deg-1;
            vel = vel*0.80;

        }
    }

    // ps02
    if(COUNT%32==16) {
        // deg = 2;
        setTimeout(playNote_ps02,0,-2,0.2);
    }

    if(COUNT%128==96) {
        setTimeout(playNote_ps02,300,deg+9,0.15);
    }

    // ps03
    if(COUNT%96==0) {

        let nNotes = getRandomInt(2,5);
        let arr = [-2,0,3,0,1];
        let wait = 0;
        for(let i=0; i<nNotes; i++) {
            deg = arr[i];
            setTimeout(playNote_ps03,wait,deg,0.7);
            setTimeout(playNote_ps03,wait+30,deg+9,0.2);

            wait = wait + 1000;
        }
    }





    

}