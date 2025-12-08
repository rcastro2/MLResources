var points;
var numPoints = 20;
var k;
var oldk = document.getElementById("k").value;

function setup() {
	createCanvas(500,500)
	points = []
	for(var i = 0; i < numPoints; i++){
		points.push(new Point(Math.random() * width, Math.random()* height))
	}
}

function randomizePoints(){
  points = []
	for(var i = 0; i < numPoints; i++){
		points.push(new Point(Math.random() * width, Math.random()* height))
	}
	background(255)
}

function draw() {
	k = document.getElementById("k").value;
	document.getElementById("klabel").innerHTML = "k: " + k
	if (k != oldk){
		background(255)
		oldk = k
	}
	console.log(k)
	classifyMouse(k)
 	for(var i = 0; i < 20; i++){
		points[i].display();
	}
}


class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.class = floor(Math.random() * 2)
		this.isNeighbor = false
  }

  distance(otherX, otherY) {
    return Math.sqrt(Math.pow(this.x - otherX, 2) + Math.pow(this.y - otherY , 2));
  }

  display(){
  	strokeWeight(2)
		if (this.isNeighbor){
			stroke("#ffc740")
		}
		else if (!this.isNeighbor){
			if (this.class == 1){
				stroke(255)
			}
			else if (this.class == 0){
				stroke(0)
			}
		}

  	if (this.class == 1){
  		fill('#141c3a')
  	}
  	else if (this.class == 0){
  		fill("#6df0c2")
  	}
  	ellipse(this.x, this.y, 20, 20);
  }

}

function classifyMouse(inputK){
	distances = []
	for(var i = 0; i < 20; i++){
		distances.push([points[i].distance(mouseX, mouseY), points[i]])
		points[i].isNeighbor = false
	}
	distances.sort(function(a, b) {
    	return a[0] > b[0] ? 1 : -1;
	});
	numZero = 0;
	numOne = 0;
	//neighbors = distances.slice(0, inputK)
	for(var i = 0; i < inputK; i++){
		distances[i][1].isNeighbor = true
		if (distances[i][1].class == 1){
			numOne += 1
		}
		else if (distances[i][1].class == 0){
			numZero += 1
		}

	}
	noStroke()
	if (numOne > numZero){
		fill("#141c3a")
	}
	else{
		fill("#6df0c2")
	}
	ellipse(mouseX, mouseY, 10, 10)

}