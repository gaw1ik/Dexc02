
function setupParams() {

    // for(let i=0; i<Object.keys(PARAMS).length; i++) {

    //     let paramName = Object.keys(PARAMS)[i];
    //     // console.log("paramName",paramName)
    //     // RRRRNBOPARAMS[paramName].value = PARAMS[paramName];
    //     let funcName = "updateRNBOPARAM_"+ paramName;
    //     window[funcName](); // run the assign function corresponding to the active parameter

    //     let canvas = document.getElementById("canvas_" + paramName)
    //     // console.log("PARAMS[paramName]",PARAMS[paramName])

    //     // drawKnob(canvas,PARAMS[paramName]);

    // }




    // b01
    
    
    
    device.parametersById.get("b01/osc").value = 1;
    device.parametersById.get("b01/attack").value = 240;
    device.parametersById.get("b01/decay").value = 1400;
    device.parametersById.get("b01/pow").value = 0;
    device.parametersById.get("b01/shape").value = 2;
    device.parametersById.get("b01/oct").value = 0.125;
    device.parametersById.get("b01/gain").value = 0.45;
    device.parametersById.get("b01/pan").value = 0.50;


    // ms01 (kick)
    device.parametersById.get("ms01/osc").value = 1;
    device.parametersById.get("ms01/attack").value = 3;
    device.parametersById.get("ms01/decay").value = 80;
    device.parametersById.get("ms01/pow").value = 4;
    device.parametersById.get("ms01/shape").value = 2;
    device.parametersById.get("ms01/oct").value = 0.125;
    device.parametersById.get("ms01/gain").value = 0.70;
    device.parametersById.get("ms01/pan").value = 0.5;

    // ms02 (snare)
    device.parametersById.get("ms02/osc").value = 4;
    device.parametersById.get("ms02/attack").value = 5;
    device.parametersById.get("ms02/decay").value = 20;
    device.parametersById.get("ms02/pow").value = 2;
    device.parametersById.get("ms02/shape").value = 8;
    device.parametersById.get("ms02/oct").value = 1;
    device.parametersById.get("ms02/gain").value = 0.1;
    device.parametersById.get("ms02/pan").value = 0.6;

    // ms03 (hat)
    device.parametersById.get("ms03/osc").value = 3;
    device.parametersById.get("ms03/attack").value = 5;
    device.parametersById.get("ms03/decay").value = 50;
    device.parametersById.get("ms03/pow").value = 8;
    device.parametersById.get("ms03/shape").value = 1;
    device.parametersById.get("ms03/oct").value = 1;
    device.parametersById.get("ms03/gain").value = 0.2;
    device.parametersById.get("ms03/pan").value = 0.6;

    // ms04 (shaker)
    device.parametersById.get("ms04/osc").value = 4;
    device.parametersById.get("ms04/attack").value = 5;
    device.parametersById.get("ms04/decay").value = 500;
    device.parametersById.get("ms04/pow").value = 2;
    device.parametersById.get("ms04/shape").value = 1;
    device.parametersById.get("ms04/oct").value = 1;
    device.parametersById.get("ms04/gain").value = 0.04;
    device.parametersById.get("ms04/pan").value = 0.4;

    // ms08
    device.parametersById.get("ms08/osc").value = 1;
    device.parametersById.get("ms08/attack").value = 10;
    device.parametersById.get("ms08/decay").value = 100;
    device.parametersById.get("ms08/pow").value = -0.9;
    device.parametersById.get("ms08/shape").value = 2;
    device.parametersById.get("ms08/oct").value = 16;
    device.parametersById.get("ms08/gain").value = 0.01;
    device.parametersById.get("ms08/pan").value = 0.6;


    // polysynth01
    device.parametersById.get("polysynth01_oct").value = 1;
    device.parametersById.get("polysynth01_attack").value = 2000;
    device.parametersById.get("polysynth01_decay").value = 4000;
    device.parametersById.get("polysynth01_shape").value = 1.3;
    device.parametersById.get("polysynth01_decCurve").value = 1;
    device.parametersById.get("polysynth01_gain").value = 0.033;
    device.parametersById.get("polysynth01_osc").value = 1;
    device.parametersById.get("polysynth01_pan").value = 0.4;


    // polysynth02
    device.parametersById.get("polysynth02_oct").value = 0.5;
    device.parametersById.get("polysynth02_attack").value = 50;
    device.parametersById.get("polysynth02_decay").value = 2000;
    device.parametersById.get("polysynth02_shape").value = 2;
    device.parametersById.get("polysynth02_decCurve").value = 3;
    device.parametersById.get("polysynth02_gain").value = 0.05;
    device.parametersById.get("polysynth02_osc").value = 1;
    device.parametersById.get("polysynth02_pan").value = 0.6;



    // PINK NOISE
    device.parametersById.get("pink_gain").value = 0.005;


    // MASTER
    device.parametersById.get("master_gain").value = 2.00;
    device.parametersById.get("master_hpf").value = 120;
    device.parametersById.get("master_lpf").value = 20000;
    device.parametersById.get("master_noising").value = 0.003;
    device.parametersById.get("crackle_gain").value = 0.002;
    device.parametersById.get("pop_gain").value = 0.020;
    device.parametersById.get("master_reverb_decay").value = 50;
    device.parametersById.get("master_reverb_hpf").value = 350;
    device.parametersById.get("master_reverb_gain").value = 0.1;










}






// function updateRNBOPARAM_master_gain() {
//     // console.log("updateRNBOPARAM_background_gain")
//     let val = PARAMS.master_gain;
//     let adjustedValue = calcParamValue(val,0,4,2);
//     try{ device.parametersById.get("master_gain").value = adjustedValue } catch(error) {
//     }
//     let displayValue = adjustedValue*100;
//     // document.getElementById("canvasLabel_master_gain").textContent = "Volume (" + displayValue.toFixed(0) + ")";
// }

// function updateRNBOPARAM_master_lpf() {
//     // console.log("updateRNBOPARAM_background_gain")
//     let val = PARAMS.master_lpf;
//     let adjustedValue = calcParamValue(val,0,20000,6);
//     try{ device.parametersById.get("master_lpf").value = adjustedValue } catch(error) {}
//     // document.getElementById("canvasLabel_master_lpf").textContent = "Filter (" + adjustedValue.toFixed(0) + " Hz)";
// }


// function updateRNBOPARAM_chance() {
//     let adjustedValue = calcParamValue(PARAMS.chance,0,100,1);
//     PROB = adjustedValue;
//     // document.getElementById("canvasLabel_chance").textContent = "Prob (" + adjustedValue.toFixed(0) + "%)";
//     // console.log("prob",adjustedValue);
// }


// function updateRNBOPARAM_time() {
//     let adjustedValue = calcParamValue(PARAMS.time,100,4000,2);
//     TIME = adjustedValue;
//     // document.getElementById("canvasLabel_time").textContent = "Time (" + adjustedValue.toFixed(0) + "ms)";
//     // console.log("time",adjustedValue);
// }

// function updateRNBOPARAM_release() {
//     // console.log("updateRNBOPARAM_background_gain")
//     let val = PARAMS.release;
//     let adjustedValue = calcParamValue(1-val,-0.9,32,2);
//     try{ device.parametersById.get("curve").value = adjustedValue } catch(error) {}
//         let displayedValue = 1 + (val)*99;
//     // document.getElementById("canvasLabel_release").textContent = "Release (" + displayedValue.toFixed(0) + ")";
// }




// function calcParamValue(normalVal,min,max,pow) {

//     let adjustedValue = min + (max-min)*normalVal**pow;

//     return adjustedValue;

// }