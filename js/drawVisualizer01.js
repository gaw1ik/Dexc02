



function drawVisualizer() {

    let canvas = canvasViz01;
    let canvasW = canvas.width;
    let canvasH = canvas.height;

    ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvasW, canvasH);

    artboardH = canvas.height;
    artboardW = canvas.width;
    artboardAR = artboardH/artboardW;
    artboardWo2 = (1/artboardAR)/2;
    xCenterOffset = artboardWo2;
    yCenterOffset = 0.0;


    switch (tabID_substr) {

        case "loun":
            drawVisualizer_Lounge();
            break;

        case "scan":
            drawVisualizer_Scanner();
            break;

        case "wall":
            drawVisualizer_Wallet();
            break;

        case "posi":
            drawVisualizer_Position();
            break;

        default:
            break;

    }




    



}



function drawVisualizer_Position() {


        
    // let yTrigHigh  = r2n(100+percentTriggerHigh,vizMin,vizMax);
    // let yTrigLow   = r2n(100+percentTriggerLow ,vizMin,vizMax);
    // path_percentTriggerHigh = [[-artboardWo2,yTrigHigh],[artboardWo2,yTrigHigh]];
    // path_percentTriggerLow = [[-artboardWo2,yTrigLow],[artboardWo2,yTrigLow]];
        


    PATH = [];

    var N = 100;

    for(let i=0; i<N; i++) {

        let this_coinvalue = CoinValueHistory[activeCoinInd][i];

        let y = r2n(this_coinvalue,vizMin,vizMax);

        let t = i/(N-1);
        let x = n2r(t,-artboardWo2,0.1);
    
        // let xShifted = x;

        PATH.push([x,y]);

        // let [x,y] = PATH;

        // if(x>-artboardWo2) {
        //     xShifted = x-0.001;
        //     PATH[i][j] = [xShifted,y];
        // } else {
        //     // console.log("removed")
        //     PATH = PATH.slice(1); // remove that element
        // }

    }




    let lw = 0.002;
    let [hue,sat,lit,alpha] = [0,0,50,255];

    if(averagePercentDelta<-percentTrigger01) {
        [hue,sat,lit] = [0,50,50,255];
    } else if (averagePercentDelta>percentTrigger01) {
        [hue,sat,lit] = [130,50,50,255];
    }


    drawPath(ctx, PATH, lw, hue, sat, lit, alpha, 1, 0);


    // if(COUNT%8>1) {

    //     // let coinValueHigh_trig = CoinValue0 + CoinValue0*percentTriggerHigh;
    //     // let coinValueLow_trig = CoinValue0 + CoinValue0*percentTriggerLow;

    //     let yTrigHigh  = r2n(100+percentTriggerHigh,vizMin,vizMax);
    //     let yTrigLow   = r2n(100+percentTriggerLow ,vizMin,vizMax);

    //     path_percentTriggerHigh = [[-artboardWo2,yTrigHigh],[artboardWo2,yTrigHigh]];
    //     path_percentTriggerLow = [[-artboardWo2,yTrigLow],[artboardWo2,yTrigLow]];

    // }

    [hue,sat,lit,alpha] = [120,0,100,100];

    path_topLine = [[-artboardWo2,1.0],[artboardWo2,1.0]];
    drawPath(ctx, path_topLine, lw*4, hue, sat, lit, alpha, 1, 0);
    path_positionLine = [[-artboardWo2,0.5],[artboardWo2,0.5]];
    drawPath(ctx, path_positionLine, lw, hue, sat, lit, alpha, 1, 0);
    path_bottomLine = [[-artboardWo2,0.0],[artboardWo2,0.0]];
    drawPath(ctx, path_bottomLine, lw*4, hue, sat, lit, alpha, 1, 0);

    

    [hue,sat,lit,alpha] = [120,80,100,100];

    var N = 8;
    for(let i=0; i<N; i++) {
        let y  = r2n(82.5+5*i,vizMin,vizMax);
        let lw = 0.001 + 0.0005*i;
        path_threshold = [[-artboardWo2,y],[artboardWo2,y]];
        let t = i/(N-1);
        // let sat = n2r(t,0,80);
        drawPath(ctx, path_threshold, lw, hue, sat, 50, alpha, 1, 0);
    }
    // drawPath(ctx, path_percentTriggerHigh, lw, hue, sat, lit, alpha, 1, 0);
    // drawPath(ctx, path_percentTriggerLow , lw, hue, sat, lit, alpha, 1, 0);

}



function drawVisualizer_Scanner() {

    let nCols = 4;
    let nRows = 5;
    let width = artboardWo2*2/nCols;
    let height = 1/nRows;

    let [hue, sat, lit] = [0,0,90];
    let alpha = 255;

    let lw = 0.001;

    let paddingX = 0.08;
    let paddingY = paddingX;


    for(let i=0; i<nCols; i++) {
        let x = -artboardWo2 + paddingX/2 + (width)*i;
        for(let j=0; j<nRows; j++) {
            let y = paddingY/2 + (height)*j;
            drawRect(ctx, x,y,width-paddingX,height-paddingY, lw, hue, sat, lit, alpha, 1);
        }
    }

}



function drawVisualizer_Lounge() {
    let [hue, sat, lit] = [0,0,90];
    let alpha = 255;
    let lw = 0.001;
    let xC = 0;;
    let yC = 0.5;
    let rad = 0.3;

    // drawCircle(ctx, xC,yC,rad, lw, hue, sat, lit, alpha, 1);

    let padding = 0.02;
    let paddingX = padding*artboardWo2;

    var height = 0.20-padding*2;
    var width = 2*artboardWo2-2*paddingX;
    var x = -artboardWo2+paddingX;
    var y = 0.80;
    drawRect(ctx, x,y,width,height, lw, hue, sat, lit, alpha, 1);

    var height = 0.80-padding*2;
    var width = 0.40*artboardWo2-paddingX*2;
    var x = -artboardWo2+paddingX;
    var y = padding;
    drawRect(ctx, x,y,width,height, lw, hue, sat, lit, alpha, 1);

    var height = 0.80-padding*2;
    var width = 0.40*artboardWo2-paddingX*2;
    var x = artboardWo2 - width - paddingX;
    var y = padding;
    drawRect(ctx, x,y,width,height, lw, hue, sat, lit, alpha, 1);

    var height = 0.80-padding*2;
    var width = 1.2*artboardWo2;
    var x = -width/2;
    var y = padding;
    drawRect(ctx, x,y,width,height, lw, hue, sat, lit, alpha, 1);

}



function drawVisualizer_Wallet() {
    
    let [hue, sat, lit] = [0,0,90];
    let alpha = 255;
    let lw = 0.001;
    let paddingX = 0.2;
    let paddingY = paddingX;
    let height = (1-paddingY*2);
    let width = height;
    let x = 0 - width/2;
    let y = paddingY;

    drawRect(ctx, x,y,width,height, lw, hue, sat, lit, alpha, 1);
 
}