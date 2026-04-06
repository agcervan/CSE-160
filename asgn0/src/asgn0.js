// DrawTriangle.js (c) 2012 matsuda
function main() {  
  // Retrieve <canvas> element
  var canvas = document.getElementById('example');  
  if (!canvas) { 
    console.log('Failed to retrieve the <canvas> element');
    return false; 
  } 

  // Get the rendering context for 2DCG
  var ctx = canvas.getContext('2d');

  // Draw a blue rectangle
  ctx.fillStyle = 'rgba(0, 0, 0, 1.0)'; // Set color to blue --> now black
  ctx.fillRect(0, 0, canvas.width, canvas.height);        // Fill a rectangle with the color (120, 10, width, height)

  // Part 2
  //let v1 = new Vector3([2.5, 2.5, 0]); // Used example values from Part 2
  //drawVector(v1, "red");

  // Part 3, 4
  //handleDrawEvent();

  // Part 5, 6, 7, 8
  //handleDrawOperationEvent();

}

function drawVector(v, color) {
  const canvas = document.getElementById('example');
  const ctx = canvas.getContext('2d');

  //  Starts at center
  let cx = canvas.width/2;
  let cy = canvas.height/2;

  // Get x and y from v
  let x = v.elements[0];
  let y = v.elements[1];

  // Scale dat
  x *= 20;
  y *= 20;
  
  ctx.beginPath();
  ctx.moveTo(cx, cy);
  ctx.lineTo(200+x, 200-y);
  ctx.strokeStyle = color; // Set da color
  ctx.stroke();
}

function handleDrawEvent() {

  /*
  1. Clear the canvas.
  2. Read the values of the text boxes to create v1.
  3. Call drawVector(v1, "red")
  */
  const canvas = document.getElementById('example');
  const ctx = canvas.getContext('2d');

  ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear it

  ctx.fillStyle = 'rgba(0, 0, 0, 1.0)'; // Make it black and big!
  ctx.fillRect(0, 0, canvas.width, canvas.height);

   // Get x and y values from input
  let v1x = document.getElementById('x1').value;
  let v1y = document.getElementById('y1').value;

  let v2x = document.getElementById('x2').value;
  let v2y = document.getElementById('y2').value;

  let v1 = new Vector3([v1x, v1y, 0]); 
  drawVector(v1, "red");

  let v2 = new Vector3([v2x, v2y, 0]); 
  drawVector(v2, "blue");

}

function handleDrawOperationEvent() {

  /*
  1. Clear the canvas.
  2. Read the values of the text boxes to create v1 and call drawVector(v1, "red") .  
  3. Read the values of the text boxes to create v2 and call drawVector(v2, "blue") .  
  4. Read the value of the selector and call the respective Vector3 function. For add and sub operations,
  draw a green vector v3 = v1 + v2  or v3 = v1 - v2. For mul and div operations, draw two green vectors v3 = v1 * s and v4 = v2 * s
  */

  const canvas = document.getElementById('example');
  const ctx = canvas.getContext('2d');

  ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear it

  ctx.fillStyle = 'rgba(0, 0, 0, 1.0)'; // Make it black and big!
  ctx.fillRect(0, 0, canvas.width, canvas.height);

   // Get x and y values from input
  let v1x = document.getElementById('x1').value;
  let v1y = document.getElementById('y1').value;

  let v2x = document.getElementById('x2').value;
  let v2y = document.getElementById('y2').value;

  let v1 = new Vector3([v1x, v1y, 0]); 
  drawVector(v1, "red");

  let v2 = new Vector3([v2x, v2y, 0]); 
  drawVector(v2, "blue");
  
  let opp = document.getElementById('opp').value;
  let scale = document.getElementById('scale').value;
  if (opp === "Add") {
    let v3 = new Vector3([0, 0, 0]);
    v3.set(v1);
    v3.add(v2);
    drawVector(v3, "green");
  }
  else if (opp === "Subtract") {
    let v3 = new Vector3([0, 0, 0]);
    v3.set(v1);
    v3.sub(v2);
    drawVector(v3, "green");
  }
  else if (opp === "Multiply") {
    let v3 = new Vector3([0, 0, 0]);
    let v4 = new Vector3([0, 0, 0]);
    v3.set(v1);
    v4.set(v2);
    v3.mul(scale);
    v4.mul(scale);
    drawVector(v3, "green");
    drawVector(v4, "green");
  }
  else if (opp === "Divide") {
    let v3 = new Vector3([0, 0, 0]);
    let v4 = new Vector3([0, 0, 0]);
    v3.set(v1);
    v4.set(v2);
    v3.div(scale);
    v4.div(scale);
    drawVector(v3, "green");
    drawVector(v4, "green");
  }
  else if (opp === "Magnitude") {
    console.log("Magnitude v1: "+ v1.magnitude());
    console.log("Magnitude v2: "+ v2.magnitude());

  }
  else if (opp === "Normalize") {
    let v3 = new Vector3([0, 0, 0]);
    let v4 = new Vector3([0, 0, 0]);
    v3.set(v1);
    v4.set(v2);
    v3.normalize();
    v4.normalize();
    drawVector(v3, "green");
    drawVector(v4, "green");
  }
  else if (opp === "Angle between") {
    angleBetween(v1,v2);
  }
  else if (opp === "Area") {
    areaTriangle(v1,v2);
  }
}

function angleBetween() {
  // dot product dot(v1, v2) = ||v1|| * ||v2|| * cos(alpha)
  let v1x = document.getElementById('x1').value;
  let v1y = document.getElementById('y1').value;

  let v2x = document.getElementById('x2').value;
  let v2y = document.getElementById('y2').value;

  let v3 = new Vector3([v1x, v1y, 0]); 
  let v4 = new Vector3([v2x, v2y, 0]); 
  let or = Vector3.dot(v3, v4);

  let v3m = v3.magnitude();
  let v4m = v4.magnitude();
  let angle = Math.acos(or/(v3m*v4m));
  let answr = angle*(180/Math.PI);
  console.log("Angle: ", answr);
}

function areaTriangle(v1,v2) {
  let first = Vector3.cross(v1,v2);
  let v5 = new Vector3().set(first)
  //v5.set(first);
  let mg = v5.magnitude();
  let aT = mg/2;
  console.log("Area of the triangle: ", aT);
}

