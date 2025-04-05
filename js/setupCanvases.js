

function setupCanvases() {

    


    // console.log("window loaded");


    




    // INITIAL STATE VALUES
    currentMuteState = 0;
    VAL = [0.917, 0.400, 0.594, 0.682];
    LASTY = [0,0,0,0];

    // xC_arr = [];
    // yC_arr = [];
    // rMaxThis_arr = [];
    // vizCallMax = 64;
    // vizCall = vizCallMax; // initially set to maxCall
    // SHAPES = [];
    // for(let i=0; i<8; i++) {
    //     let xC = getRandomFloat();
    //     let yC = getRandomFloat();
    //     let speed = getRandomFloat(1.0,8.0);
    //     let aspect = 1.0;
    //     let age = 0.0;
    //     let shape = {rad:0, xC:xC, yC:yC, aspect:aspect, alpha:1.0, speed:speed, age:age, on:0};
    //     SHAPES.push(shape);
    //     // console.log(shape);
    // }


    canvasViz01 = document.getElementById("canvasViz01");





    // canvas_setTheme = document.getElementById("canvas_setTheme");
    // canvas_setTheme.addEventListener("click", setTheme); // commented this out bc setupCanvases() is already called in setup()






    handleResize();



    
    





}
