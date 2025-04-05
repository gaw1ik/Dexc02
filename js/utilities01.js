// Copyright © 2022 Brian Gawlik
// See LICENSE.txt for license information

// this files includes utility funtions
// for the most part, these are functions for handling frequent calculations like picking random values from an array or a range of integers
// also contains functions for handy operations like converting between degrees and radians, solving linear functions, etc.


//////////////////////////////////////////////////////////// Useful Constants
twoPI = Math.PI * 2;
threePIo2 = 3/2*Math.PI ;
PI = Math.PI;
PIo2 = Math.PI/2;
PIo3 = Math.PI/3;
PIo4 = Math.PI/4;
PIo8 = Math.PI/8;
PIo16 = Math.PI/16;
PIo32 = Math.PI/32;
PIo64 = Math.PI/64;


function average(arr) {
  let sum = 0;
  for(let i=0;i<arr.length;i++) {
      sum = sum + arr[i];
  }
  return sum / arr.length;
}


function mxpb([x1,y1],[x2,y2]) {

  let m = (y2-y1)/(x2-x1);
  let b = y1 - m*x1;

  return [m,b];

}


// UTILITY FUNCTIONS
function getRandomInt(min, max) {
    return Math.floor(myrng() * (max - min + 1) + min);
}
function getRandomFloat(min=0, max=1) {
  return (myrng() * (max - min) + min);
}

function chooseFromArray(array) {
  // return array[Math.floor(myrng() * array.length)];
  let index = getRandomInt( 0, array.length-1 );
  //console.log("index",index)
  return array[ index ];
}

function randomSign() {
  return Math.round(myrng()) * 2 - 1;
}











function lin(  t, [x1,y1], [x2,y2] ) {

  let x = (1-t)*x1 + t*x2;
  let y = (1-t)*y1 + t*y2;

  return [x,y];

}

function bez3( t, [x1,y1], [xC1,yC1], [x2,y2] ) {
    
  let x = (1-t)**2*x1 + 2*(1-t)*t*xC1 + t**2*x2;
  let y = (1-t)**2*y1 + 2*(1-t)*t*yC1 + t**2*y2;
  
  return [x,y];
}


function bez4( t, [x1,y1], [xC1,yC1], [xC2,yC2], [x2,y2] ) {

  let x = (1-t)**3*x1 + 3*(1-t)**2*t*xC1 + 3*(1-t)*t**2*xC2 + t**3*x2;
  let y = (1-t)**3*y1 + 3*(1-t)**2*t*yC1 + 3*(1-t)*t**2*yC2 + t**3*y2;
  
  return [x,y];
}


function spline( t, splineConstruct ) {

  // splineConstruct = [ [ [x1,y1],[xc1,yc1],[xc2,yc2],[x2,y2] ], [x1,y1],[xc1,yc1],[xc2,yc2],[x2,y2], [x1,y1],[xc1,yc1],[xc2,yc2],[x2,y2], [x1,y1],[xc1,yc1],[xc2,yc2],[x2,y2] ]

  // console.log("t",t)

  // console.log("splineConstruct",splineConstruct)
  let nSegments = splineConstruct.length;

  let decimal = nSegments * t;

  if(t==0) {
    // segment_n = nSegments - 1;
    segment_i = 0;

  } else {
    segment_i = Math.ceil(decimal) - 1;
  }

  // let segment_i = segment_n-1;


  let t2 = decimal-segment_i;


  let [x1 ,y1 ] = splineConstruct[segment_i][0];
  let [xC1,yC1] = splineConstruct[segment_i][1];
  let [xC2,yC2] = splineConstruct[segment_i][2];
  let [x2 ,y2 ] = splineConstruct[segment_i][3];

  // console.log("t2",t2)


  let [x,y] = bez4( t2, [x1,y1], [xC1,yC1], [xC2,yC2], [x2,y2] );
  
  return [x,y];

}






function plusOrMinus(centerValue, maxAmount) {

  var newValue = centerValue + randomSign()*getRandomFloat(0,maxAmount);

  return newValue;
}


function plusThisMinusThat(centerValue, maxPlusAmount, maxMinusAmount) {

  let maxValue = centerValue + maxPlusAmount
  let minValue = centerValue - maxMinusAmount

  let adjustedCenter = (maxValue + minValue)/2

  let adjustedHalfRange = (maxPlusAmount + maxMinusAmount)/2

  let newValue = adjustedCenter + randomSign()*getRandomFloat(0,adjustedHalfRange);

  return newValue;
}



/////////////////////// vary functions
function vary(parameter, perc) {
  var min = 1-perc/100;
  var max = 1+perc/100;
  var newValue = parameter*getRandomFloat(min, max);
  return newValue;
}

function varyAbove(parameter, perc) {
  var min = 1;
  var max = 1+perc/100;
  var newValue = parameter*getRandomFloat(min, max);
  return newValue;
}

function varyUnder(parameter, perc) {
  var min = 1-perc/100;
  var max = 1;
  var newValue = parameter*getRandomFloat(min, max);
  return newValue;
}



function overunder(perc) {
  return myrng() * (2 * perc / 100) + (1 - perc / 100);
}
function under(perc) {
  return 1.0 - myrng()*(perc/100);
}
function makeChoiceArray(rarity) {
  a = Array(100-rarity).fill(0);
  if (rarity==0){
    c = a;
  } else {
    b = Array(rarity).fill(1);
    c = a.concat(b);
  }
  return c;
}

function makeChoice(rarity) {
  return myrng()<(rarity/100);
}

function deg2rad(thetad) {
  return thetad * Math.PI/180;
}
function rad2deg(thetar) {
  return thetar * 180/Math.PI;
}
function linSolve(x1,y1,x2,y2) {
  m = (y2-y1)/(x2-x1);
  b = y1-m*x1;
  return [b,m];
}

// linear solver given two points
function linSolve ( [x1,y1], [x2,y2] ) {
  var m = (y2-y1)/(x2-x1);
  var b = y1-m*x1;
    let coeffs = [b,m];
    return coeffs;
}
  
  
  
// // RANDOM FUNCTIONS
// // Make some arrays of random numbers
// function createRandomNums(){
//   let oneNumList = [];
//   var count = 0;
//   for (i=0;i<nSeeds;i++) {
//       oneNumList = [];
//       for (j=0;j<nNums;j++) {
//           count += 1;        
//           oneNumList.push(Math.random()); 
//       }
//       randomNums.push(oneNumList);
//   }
//   return randomNums;
// }
// // custom random function that is seedable (pulls numbers from randomNums)
// function myRandom(seed) {
//   randomNumber = randomNums[seed][randCount];
//   if(randCount<nNums-1){
//     randCount += 1;//add one
//   } else {
//     randCount = 0;//reset it
//   }
//   return randomNumber;
// }


function normal2range(nValue,min,max) {
  return nValue * (max-min) + min;
}
function n2r(nValue,min,max) {
  return nValue * (max-min) + min;
}

function range2normal(rValue,min,max) {
  return (rValue - min) / (max-min);
}
function r2n(rValue,min,max) {
  return (rValue - min) / (max-min);
}




function makeRandomSegmentation(nDivisions, min, max) {

  var divisionsArray = [];

  for(let k=0; k<nDivisions; k++) {
    divisionsArray.push( getRandomFloat(min,max) );
  }

  divisionsArray.sort();

  return divisionsArray;


}









