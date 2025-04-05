



function updateParams_Lounge() {

    // b01
    device.parametersById.get("b01/attack").value = 1000;


    // ms01 (kick)
    device.parametersById.get("ms01/attack").value = 3;
    device.parametersById.get("ms01/decay").value = 100;
    device.parametersById.get("ms01/pow").value = 4;
    device.parametersById.get("ms01/shape").value = 2;
    device.parametersById.get("ms01/drive").value = 4.0;

    // ms04 (shaker)
    device.parametersById.get("ms04/decay").value = 500;
    device.parametersById.get("ms04/lpf").value = 2000;

    // ps02 (chime up/down)
    // device.parametersById.get("ps02/attack").value = 5000;
    // device.parametersById.get("ps02/decay").value = 200;
    // device.parametersById.get("ps02/shape").value = 2.0;
    // device.parametersById.get("ps02/pow").value = 3;

    // // ps01 (chime up/down)
    // device.parametersById.get("ps01/attack").value = 800;
    // device.parametersById.get("ps01/decay").value = 20;
    // device.parametersById.get("ps01/shape").value = 32.0;
    // device.parametersById.get("ps01/pow").value = 0.1;
    // device.parametersById.get("ps01/gain").value = 0.02;
    // device.parametersById.get("ps01/send").value = 2;



}





function playInstruments_Lounge() {

    // kick (ms01)
    if(COUNT%16==8 ) {
        playNote_ms01(1,0.3);
    }
    if(COUNT%16==10) {
        playNote_ms01(1,0.05);
    }
    if(COUNT%32==22 ) {
        playNote_ms01(1,0.3);
    }
    if(COUNT%32==24) {
        playNote_ms01(1,0.05);
    }
    
    
    // if(COUNT%1==0 && makeChoice(doublekickchance)) {
    //     playNote_ms01(-3);
    // }

    // snare (ms02)
    let snarechoicescanner = (Math.cos( (COUNT%512) / 512 * twoPI ) - 1) * -0.5 * 100;
    if(COUNT%16==8 && makeChoice(snarechoicescanner)) {
        playNote_ms02(1,0.7);
    }
    // console.log("snarechoicescanner",snarechoicescanner);
    // hat01 (ms03)
    let hatchoicescanner = (Math.cos( (COUNT%512) / 512 * twoPI ) - 1) * -0.5 * 100;
    if(COUNT%chooseFromArray([2,4,1])==0 && makeChoice(hatchoicescanner)) {
        playNote_ms03(1,getRandomFloat(0.1,0.4));
    }


    // sh01 (ms04)
    if(COUNT%32==16) {
        playNote_ms04(1,0.7);
    }


    // ms05 (gas)
    if(COUNT%64==24) {

        let deg = -12;
        setTimeout(playNote_ms05,0,deg,0.04);

        deg = -9;
        setTimeout(playNote_ms05,100,deg,0.1);

    }
    if(COUNT%64==28) {

        let deg = -9;
        setTimeout(playNote_ms05,0,deg,0.04);

        deg = -5;
        setTimeout(playNote_ms05,100,deg,0.1);

    }

    // ms06 (wu waa)
    if(COUNT%64==16) {

        let deg = -20;
        setTimeout(playNote_ms06,0,deg,0.03);

        deg = -13;
        setTimeout(playNote_ms06,1000,deg,0.1);

    }
    if(COUNT%64==18) {

        let deg = -20;
        setTimeout(playNote_ms06,0,deg,0.03);

        deg = -13;
        setTimeout(playNote_ms06,1000,deg,0.1);

    }


    // bass (b01)
    if(COUNT%64==0) {
        let deg = 1;
        playNote_b01(deg,0.7);
    }
    if(COUNT%64==8) {
        let deg = 5;
        playNote_b01(deg,0.2);
    }




    // ps02
    if(COUNT%4==0) {

        let stride = 64;

        let theta = (COUNT%stride)/stride * twoPI;
        let vel = (Math.cos(theta)+1)*0.3;

        // let vel = 0.3;

        var deg;
        if(COUNT%128<64) {
            deg = Math.sin( COUNT%stride/stride * twoPI) * 8 - 8 + 7;
        } else {
            deg = Math.sin( COUNT%stride/stride * twoPI) * 8 - 6 + 7;
        }

        var wait = getRandomFloat(0,20);
        setTimeout(playNote_ps02,wait,deg,vel);

        if(makeChoice(35)) {
            var wait = getRandomFloat(200,1000);
            setTimeout(playNote_ps02,wait,deg+7,vel/2);
        }


        // deg = getRandomFloat(-4,4);
        // var wait = getRandomFloat(600,800);
        // setTimeout(playNote_ps01,wait,deg,vel);

    }

    // ms07
    if(COUNT%128==64) {

        let k = getRandomInt(0,2);
        let octDeg = [-1,0,7];
        let vel_arr = [0.3,0.1,0.06];
        let vel = vel_arr[k];

        var deg;
        if(COUNT%256<128) {
            deg = 5 + octDeg[k];
        } else {
            deg = 3 + octDeg[k];
        }
        let wait = 200;
        let nNotes = 48;
        // let vel = 0.2;
        // let inc = getRandomFloat(0.1,0.3) * randomSign();
        let inc = 0;

        for(let i=0; i<nNotes; i++) {
            setTimeout(playNote_ms07,wait,deg,vel);
            wait = wait + 100;
            deg = deg + inc;
            vel = vel*0.86;
        }

    }



    // ps03
    if(COUNT%64==0) {

        let nNotes = getRandomInt(3,6);

        let deg = -1;
        let wait = 100;
        let vel = 0.5
        let inc = getRandomInt(1,3);


        for(let i=0; i<nNotes; i++) {
            setTimeout(playNote_ps03,wait,deg,vel);
            wait = wait + 100;
            deg = deg + inc;
            vel = vel*0.80;

        }
    }





}