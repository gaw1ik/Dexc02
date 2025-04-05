// Copyright © 2022 Brian Gawlik
// See LICENSE.txt for license information

function drawArc(ctx, x, y, radX, radY, rotation, startAngle, endAngle, lineWidth, hue, sat, lit, alpha, fillMode) {

    // console.log("ctxIndex",ctxIndex);

    //var thisCtx = CTX[ctxIndex];

    var x = (x+xCenterOffset  ) * artboardH;
    var y = (1-y-yCenterOffset) * artboardH;
    var radX = radX * artboardH;
    var radY = radY * artboardH;

    var alpha = alpha/255;

    // //console.log("x",x);
    // //console.log("y",y);
    // //console.log("rad",rad);

    ctx.beginPath();

    // //console.log("ctx",ctx)

    ctx.ellipse(x,y,radX,radY,rotation,startAngle,endAngle);

    // //console.log("hsla",hue,sat,lit,alpha/255);

    if(fillMode==0) {
        ctx.fillStyle   = 'hsla(' + hue + ', ' +  sat + '%, ' + lit + '%,'  + alpha + ')'; 
        ctx.fill();
    } else {
        ctx.strokeStyle = 'hsla(' + hue + ', ' +  sat + '%, ' + lit + '%,'  + alpha + ')'; 
        ctx.lineWidth = lineWidth * artboardH;
        ctx.stroke()
    }
    
}

function drawBezierCurve(ctx, bezCurve, lineWidth, hue, sat, lit, alpha, fillMode, referencePointsOn) {

    // //console.log("bezCurve", bezCurve);

    var rMarker = lineWidth;   
    var rMarkerC = lineWidth;
    var markerLineW = lineWidth/2;
    var markerHue = 150;
    var markerHueC = 300;
    var alphaMarker = 255;

    var alpha = alpha/255;



    ctx.beginPath();

    let i = 0;

    var x1  = (  bezCurve[i][0][0]+xCenterOffset) * artboardH;
    var y1  = (1-bezCurve[i][0][1]-yCenterOffset) * artboardH;

    ctx.moveTo(x1,y1);


    for(let i=0; i<bezCurve.length; i++) {



        //var x1  = (  bezCurve[i][0][0]+xCenterOffset) * artboardH;
        //var y1  = (1-bezCurve[i][0][1]-yCenterOffset) * artboardH;
        var xC1 = (  bezCurve[i][1][0]+xCenterOffset) * artboardH;
        var yC1 = (1-bezCurve[i][1][1]-yCenterOffset) * artboardH;

        var xC2 = (  bezCurve[i][2][0]+xCenterOffset) * artboardH;
        var yC2 = (1-bezCurve[i][2][1]-yCenterOffset) * artboardH;

        var x2  = (  bezCurve[i][3][0]+xCenterOffset) * artboardH;
        var y2  = (1-bezCurve[i][3][1]-yCenterOffset) * artboardH;



        ctx.bezierCurveTo( xC1,yC1, xC2,yC2, x2,y2 );

        // //console.log(bezCurve);

    }

    // ctx.closePath();

    if(fillMode==0) {
        ctx.fillStyle   = 'hsla(' + hue + ', ' +  sat + '%, ' + lit + '%,'  + alpha + ')';
        ctx.fill();
    } else {
        ctx.strokeStyle = 'hsla(' + hue + ', ' +  sat + '%, ' + lit + '%,'  + alpha + ')';
        ctx.lineWidth = lineWidth * artboardH;
        ctx.stroke()
    }


    // STUFF FOR DRAWING REFERENCE POINTS
    if(referencePointsOn==0) {
        return;
    }
    // otherwise draw the reference points
    for(let i=0; i<bezCurve.length; i++) {

        x1  = bezCurve[i][0][0];
        y1  = bezCurve[i][0][1];
        xC1 = bezCurve[i][1][0];
        yC1 = bezCurve[i][1][1];
        xC2 = bezCurve[i][2][0];
        yC2 = bezCurve[i][2][1];
        x2  = bezCurve[i][3][0];
        y2  = bezCurve[i][3][1];

        sat = 100;
        lit = 50;

        drawCircle(x1, y1, rMarker, markerLineW,markerHue, 100, 50, alphaMarker, 0);

        drawCircle(xC1,yC1,rMarkerC,markerLineW,markerHueC,100, 50, alphaMarker, 1);

        drawCircle(xC2,yC2,rMarkerC,markerLineW,markerHueC,100, 50, alphaMarker, 1);
        
        drawCircle(x2, y2, rMarker, markerLineW,markerHue, 100, 50, alphaMarker, 0);

        path = [[x2,y2],[xC2,yC2]];
        drawPath(path,markerLineW,markerHueC,100,0,alphaMarker,1);

        path = [[x1,y1],[xC1,yC1]];
        drawPath(path,markerLineW,markerHueC,100,0,alphaMarker,1);


    }



    
}



function drawBezierPath(ctx, bezierPath, lineWidth, hue, sat, lit, alpha, fillMode, referencePointsOn) {

    // //console.log("bezierPath", bezierPath);

    var rMarker = lineWidth;
    var markerLineW = lineWidth;
    var markerHue = hue+180;
    var markerHue2 = 0;

    let path = [];

    let circle = [];

    ctx.beginPath();

    //let i = 0;
    //var x1  = (  bezierPath[i][0][0]+xCenterOffset) * artboardH;
    //var y1  = (1-bezierPath[i][0][1]-yCenterOffset) * artboardH;

    ctx.moveTo(x1,y1);

    for(let i=0; i<bezierPath.length-1; i++) {

        var x1  = (  bezierPath[i][0][0]+xCenterOffset) * artboardH;
        var y1  = (1-bezierPath[i][0][1]-yCenterOffset) * artboardH;
        var xC1 = (  bezierPath[i][1][0]+xCenterOffset) * artboardH;
        var yC1 = (1-bezierPath[i][1][1]-yCenterOffset) * artboardH;

        var x2  = (  bezierPath[i+1][0][0]+xCenterOffset) * artboardH;
        var y2  = (1-bezierPath[i+1][0][1]-yCenterOffset) * artboardH;
        var xC2 = (  bezierPath[i+1][1][0]+xCenterOffset) * artboardH;
        var yC2 = (1-bezierPath[i+1][1][1]-yCenterOffset) * artboardH;


        ctx.bezierCurveTo( xC1,yC1, xC2,yC2, x2,y2 );

        // //console.log(bezierPath);

    }

    ctx.closePath();

    if(fillMode==0) {
        ctx.fillStyle   = 'hsla(' + hue + ', ' +  sat + '%, ' + lit + '%,'  + alpha + ')';; 
        ctx.fill();
    } else {
        ctx.strokeStyle = 'hsla(' + hue + ', ' +  sat + '%, ' + lit + '%,'  + alpha + ')';;
        ctx.lineWidth = lineWidth * artboardH;
        ctx.stroke()
    }


    // STUFF FOR DRAWING REFERENCE POINTS
    if(referencePointsOn==0) {
        return;
    }
    // otherwise draw the reference points
    for(let i=0; i<bezierPath.length; i++) {

        x1  = bezierPath[i][0][0];
        y1  = bezierPath[i][0][1];
        xC1 = bezierPath[i][1][0];
        yC1 = bezierPath[i][1][1];

        x2  = bezierPath[i][0][0];
        y2  = bezierPath[i][0][1];
        xC2 = bezierPath[i][1][0];
        yC2 = bezierPath[i][1][1];


        // ctx.beginPath();

        drawCircle(xC1,yC1,rMarker,markerLineW,markerHue,sat,lit,1);

        drawCircle(xC2,yC2,rMarker,markerLineW,markerHue2,100,lit,1);
        
        drawCircle(x2,y2,rMarker,markerLineW,markerHue2,100,lit,0);

        path = [[x2,y2],[xC2,yC2]];
        drawPath(path,markerLineW,markerHue2,100,lit,1);

        path = [[x1,y1],[xC1,yC1]];
        drawPath(path,markerLineW,markerHue,sat,lit,1);


    }



    
}

function drawCircle(ctx, x, y, rad, lineWidth, hue, sat, lit, alpha, fillMode) {

    // console.log("ctxIndex",ctxIndex);

    //var thisCtx = CTX[ctxIndex];

    

    var x = (x+xCenterOffset  ) * artboardH;
    var y = (1-y-yCenterOffset) * artboardH;
    
    var rad = rad * artboardH;

    var alpha = alpha/255;



    // console.log("x",x);
    // console.log("y",y);
    // console.log("rad",rad);

    ctx.beginPath();

    // //console.log("ctx",ctx)

    ctx.ellipse(x,y,rad,rad,0,0,twoPI);

    // //console.log("hsla",hue,sat,lit,alpha/255);

    if(fillMode==0) {
        ctx.fillStyle   = 'hsla(' + hue + ', ' +  sat + '%, ' + lit + '%,'  + alpha + ')'; 
        ctx.fill();
    } else {
        ctx.strokeStyle = 'hsla(' + hue + ', ' +  sat + '%, ' + lit + '%,'  + alpha + ')'; 
        ctx.lineWidth = lineWidth * artboardH;
        ctx.stroke()
    }
    
}

function drawEllipse(ctx, x, y, radX, radY, rotation, lineWidth, hue, sat, lit, alpha, fillMode) {

    // console.log("ctxIndex",ctxIndex);

    //var thisCtx = CTX[ctxIndex];

    var x = (x+xCenterOffset  ) * artboardH;
    var y = (1-y-yCenterOffset) * artboardH;
    var radX = radX * artboardH;
    var radY = radY * artboardH;

    var alpha = alpha/255;

    // //console.log("x",x);
    // //console.log("y",y);
    // //console.log("rad",rad);

    ctx.beginPath();

    // //console.log("ctx",ctx)

    ctx.ellipse(x,y,radX,radY,rotation,0,twoPI);

    // //console.log("hsla",hue,sat,lit,alpha/255);

    if(fillMode==0) {
        ctx.fillStyle   = 'hsla(' + hue + ', ' +  sat + '%, ' + lit + '%,'  + alpha + ')'; 
        ctx.fill();
    } else {
        ctx.strokeStyle = 'hsla(' + hue + ', ' +  sat + '%, ' + lit + '%,'  + alpha + ')'; 
        ctx.lineWidth = lineWidth*artboardH;
        ctx.stroke()
    }
    
}



function drawPath(ctx, path, lineWidth, hue, sat, lit, alpha, fillMode, close) {

    // console.log("path",path);

    ctx.beginPath()

    //var x = (x+xCenterOffset)*artboardH;
    //var y = (y+yCenterOffset)*artboardH;

    var x = (path[0][0]+xCenterOffset  ) * artboardH;
    var y = (1-path[0][1]-yCenterOffset) * artboardH;

    ctx.moveTo(x,y)   

    for(let i=1; i<path.length; i++) {
        
        x = (path[i][0]+xCenterOffset  ) * artboardH;
        y = (1-path[i][1]-yCenterOffset) * artboardH;
        ctx.lineTo(x,y)
        // //console.log("[x,y]",[x,y])
    }

    if(close==1){
        ctx.closePath();
    }

    var alpha = alpha/255;
    

    if(fillMode==0) {
        ctx.fillStyle   = 'hsla(' + hue + ', ' +  sat + '%, ' + lit + '%,'  + alpha + ')'; 
        ctx.fill();
    } else if(fillMode==1) {
        ctx.strokeStyle   = 'hsla(' + hue + ', ' +  sat + '%, ' + lit + '%,'  + alpha + ')'; 
        ctx.lineWidth = lineWidth*artboardH;
        ctx.stroke()
    } else {
        ctx.fillStyle   = 'hsla(' + hue + ', ' +  sat + '%, ' + lit + '%,'  + alpha + ')'; 
        ctx.fill();
        ctx.strokeStyle   = 'hsla(' + 210 + ', ' +  70 + '%, ' + 95 + '%,'  + alpha + ')'; 
        ctx.lineWidth = lineWidth*artboardH;
        ctx.stroke()
    }
    
}

function drawRect(ctx, x, y, width, height, lineWidth=0.005, hue=0, sat=0, lit=0, alpha=255, fillMode=0) {

    //let layerIndex = layer.ctxIndex;

    // console.log("ctxIndex",ctxIndex);

    //var thisCtx = CTX[ctxIndex];

    var width  = width  * artboardH;
    var height = height * artboardH;
    

    var x = (x+xCenterOffset  ) * artboardH;
    var y = (1-y-yCenterOffset) * artboardH - height;

    // console.log("x",x)
    // console.log("y",y)

    //y = 1-y;

    var alpha = alpha/255;

    ctx.beginPath();

    ctx.rect(x,y,width,height);


    if(fillMode==0) {
        ctx.fillStyle   = 'hsla(' + hue + ', ' +  sat + '%, ' + lit + '%,'  + alpha + ')'; 
        ctx.fill();
    } else {
        ctx.strokeStyle = 'hsla(' + hue + ', ' +  sat + '%, ' + lit + '%,'  + alpha + ')'; 
        ctx.lineWidth = lineWidth*artboardH;
        ctx.stroke()
    }

    
}

function drawText(ctx, text, x, y, fontSize, hue, sat, lit) {


    var x = (x+xCenterOffset  ) * artboardH;
    var y = (1-y-yCenterOffset) * artboardH;



    ctx.beginPath();

    var fontSizePix = fontSize*artboardH;

    ctx.font = fontSizePix.toString() + "px serif";

        // ctx.fontSize = fontSizePix.toString() + "px"; // doesn't work....


    ctx.fillStyle   = 'hsl(' + hue + ', ' +  sat + '%, ' + lit + '%'  +')'; 

    ctx.fillText(text, x, y);

    // console.log("x",x,"y",y)

    //ctx.endPath();

}

function drawTextPix(ctx, text, x, y, fontSizePix, hue, sat, lit) {

    ctx.beginPath();

    ctx.font = fontSizePix.toString() + "px serif";

    ctx.fillStyle   = 'hsl(' + hue + ', ' +  sat + '%, ' + lit + '%'  +')'; 

    ctx.fillText(text, x*artboardW, y*artboardH);

    //ctx.endPath();

}






function drawRectRGB(ctx, x, y, width, height, lineWidth=0.005, R,G,B, alpha=255, fillMode=0) {

    //let layerIndex = layer.ctxIndex;

    // console.log("ctxIndex",ctxIndex);

    //var thisCtx = CTX[ctxIndex];

    var width  = width  * artboardH;
    var height = height * artboardH;
    

    var x = (x+xCenterOffset  ) * artboardH;
    var y = (1-y-yCenterOffset) * artboardH - height;

    // console.log("x",x)
    // console.log("y",y)

    //y = 1-y;

    var alpha = alpha/255;

    ctx.beginPath();

    ctx.rect(x,y,width,height);


    if(fillMode==0) {
        ctx.fillStyle   = 'rgba(' + R + ', ' +  G + ', ' + B + ', '  + alpha + ')'; 
        ctx.fill();
    } else {
        ctx.strokeStyle = 'rgba(' + R + ', ' +  G + ', ' + B + ', '  + alpha + ')'; 
        ctx.lineWidth = lineWidth*artboardH;
        ctx.stroke()
    }

    
}

function drawPathRGB(ctx, path, lineWidth, R, G, B, alpha, fillMode, close) {

    // console.log("path",path);

    ctx.beginPath()

    //var x = (x+xCenterOffset)*artboardH;
    //var y = (y+yCenterOffset)*artboardH;

    var x = (path[0][0]+xCenterOffset  ) * artboardH;
    var y = (1-path[0][1]-yCenterOffset) * artboardH;

    ctx.moveTo(x,y)   

    for(let i=1; i<path.length; i++) {
        
        x = (path[i][0]+xCenterOffset  ) * artboardH;
        y = (1-path[i][1]-yCenterOffset) * artboardH;
        ctx.lineTo(x,y)
        // //console.log("[x,y]",[x,y])
    }

    if(close==1){
        ctx.closePath();
    }

    var alpha = alpha/255;
    

    if(fillMode==0) {
        ctx.fillStyle   = 'rgba(' + R + ', ' +  G + ', ' + B + ', '  + alpha + ')'; 
        ctx.fill();
    } else {
        ctx.strokeStyle = 'rgba(' + R + ', ' +  G + ', ' + B + ', '  + alpha + ')'; 
        ctx.lineWidth = lineWidth*artboardH;
        ctx.stroke()
    }
    
}

function drawEllipseRGB(ctx, x, y, radX, radY, rotation, lineWidth, R, G, B, alpha, fillMode) {

    var x = (x+xCenterOffset  ) * artboardH;
    var y = (1-y-yCenterOffset) * artboardH;
    var radX = radX * artboardH;
    var radY = radY * artboardH;

    var alpha = alpha/255;

    ctx.beginPath();

    ctx.ellipse(x,y,radX,radY,rotation,0,twoPI);

    // //console.log("hsla",hue,sat,lit,alpha/255);

    if(fillMode==0) {
        ctx.fillStyle   = 'rgba(' + R + ', ' +  G + ', ' + B + ', '  + alpha + ')'; 
        ctx.fill();
    } else {
        ctx.strokeStyle = 'rgba(' + R + ', ' +  G + ', ' + B + ', '  + alpha + ')'; 
        ctx.lineWidth = lineWidth*artboardH;
        ctx.stroke()
    }
    
}

function drawBezierCurveRGB(ctx, bezCurve, lineWidth, R, G, B, alpha, fillMode, referencePointsOn) {

    // //console.log("bezCurve", bezCurve);

    // var rMarker = lineWidth;
    // var markerLineW = lineWidth/2;
    // var markerHue = hue+180;
    // var markerHue2 = 0;
    // var alphaMarker = 255;

    var alpha = alpha/255;



    ctx.beginPath();

    let i = 0;

    var x1  = (  bezCurve[i][0][0]+xCenterOffset) * artboardH;
    var y1  = (1-bezCurve[i][0][1]-yCenterOffset) * artboardH;

    ctx.moveTo(x1,y1);


    for(let i=0; i<bezCurve.length; i++) {



        //var x1  = (  bezCurve[i][0][0]+xCenterOffset) * artboardH;
        //var y1  = (1-bezCurve[i][0][1]-yCenterOffset) * artboardH;
        var xC1 = (  bezCurve[i][1][0]+xCenterOffset) * artboardH;
        var yC1 = (1-bezCurve[i][1][1]-yCenterOffset) * artboardH;

        var xC2 = (  bezCurve[i][2][0]+xCenterOffset) * artboardH;
        var yC2 = (1-bezCurve[i][2][1]-yCenterOffset) * artboardH;

        var x2  = (  bezCurve[i][3][0]+xCenterOffset) * artboardH;
        var y2  = (1-bezCurve[i][3][1]-yCenterOffset) * artboardH;



        ctx.bezierCurveTo( xC1,yC1, xC2,yC2, x2,y2 );

        // //console.log(bezCurve);

    }

    // ctx.closePath();

    if(fillMode==0) {
        ctx.fillStyle   = 'rgba(' + R + ', ' +  G + ', ' + B + ', '  + alpha + ')'; 
        ctx.fill();
    } else {
        ctx.strokeStyle = 'rgba(' + R + ', ' +  G + ', ' + B + ', '  + alpha + ')'; 
        ctx.lineWidth = lineWidth*artboardH;
        ctx.stroke()
    }


    // STUFF FOR DRAWING REFERENCE POINTS
    if(referencePointsOn==0) {
        return;
    }
    // otherwise draw the reference points
    // for(let i=0; i<bezCurve.length; i++) {

    //     x1  = bezCurve[i][0][0];
    //     y1  = bezCurve[i][0][1];
    //     xC1 = bezCurve[i][1][0];
    //     yC1 = bezCurve[i][1][1];
    //     xC2 = bezCurve[i][3][0];
    //     yC2 = bezCurve[i][3][1];
    //     x2  = bezCurve[i][2][0];
    //     y2  = bezCurve[i][2][1];

    //     sat = 100;
    //     lit = 50;

    //     drawCircle(x1,y1,rMarker,markerLineW,markerHue2,sat,lit,alphaMarker,1);

    //     drawCircle(xC1,yC1,rMarker,markerLineW,markerHue,sat,lit,alphaMarker,1);

    //     drawCircle(xC2,yC2,rMarker,markerLineW,markerHue2,100,lit,alphaMarker,1);
        
    //     drawCircle(x2,y2,rMarker,markerLineW,markerHue2,100,lit,alphaMarker,1);

    //     path = [[x2,y2],[xC2,yC2]];
    //     drawPath(path,markerLineW,markerHue2,100,50,alphaMarker,1);

    //     path = [[x1,y1],[xC1,yC1]];
    //     drawPath(path,markerLineW,markerHue2,100,50,alphaMarker,1);


    // }



    
}