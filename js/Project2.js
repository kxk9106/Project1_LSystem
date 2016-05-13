!function(){
	'use strict'
	let count = 2;
	
	//background canvas
	let canvas;
	let ctx;
	
	//Plant1 Canvas
	let canvasP1;
	let ctx1;
	
	//Plant2 Canvas
	let canvasP2;
	let ctx2;
	
	//Plant3 Canvas
	let canvasP3;
	let ctx3;
	
	//Win Canvas
	let canvasWin;
	let ctxWin;

	
	//buttons
	let plant = true;
	let water = false;
	
	//if the pot was clicked
	let pot1 = false;
	let pot2 = false;
	let pot3 = false;
	
	let plant1 = 0;
	let plant2 = 0;
	let plant3 = 0;
	
	let click = true;
	let click2 = true;
	let click3 = true;
	
	//audio
	let audioCtx;
	//https://www.youtube.com/watch?v=kcihcYEOeic
	let SOUND_1 = "media/Nuvole_Bianche.wav";
	//https://www.youtube.com/watch?v=KXKBJR1011g
	let audioElement;
	
	let j = 0;
	let p = 0;
	let t = 0;
	
	//will continue to draw in the correct place
	//for each plant
	let lastPos;
	let lastPos2;
	let lastPos3;
	
	let vec2 = Victor;
	
	//which plant to draw
	let style;
	let style2;
	let style3;
	
	//for breeding if there is a plant to breed
	let planted = false;
	let planted2 = false;
	let planted3 = false;
	
	let breed = [];
	let breedNum = 0;
	let didBreed = false;
	let didBreed2 = false;
	let didBreed3 = false;
	
	//bird
	let bird = new Image();
	bird.src = 'pictures/bird.png';
	
	
	//image stuff plants
	let imageP;
	let images;
	
	let imageCount = 1;
	
	
	$("button").button();
	
	$('#plantButton')
		.click(function(){
			plant = true;
			water = false;
	});
	$('#breedButton')
		.click(function(){
			  	console.log("bird: " + document.getElementById("draggable").style.left);
			  	console.log("bird: " + document.getElementById("draggable").style.top);
			if(parseInt(document.getElementById("draggable").style.left) > canvas.width/6+54 && parseInt(document.getElementById("draggable").style.left) < canvas.width/6+104
			&& parseInt(document.getElementById("draggable").style.top) > canvas.height-55 && parseInt(document.getElementById("draggable").style.top) < canvas.height-55 + 50){
				
				if(planted == true){
					if(breed[0] != style && breed[1] != style && breed.length != 2){
						breed[breedNum] = style;
					}
				
					if(breedNum < 1){
						breedNum++;
					}
				}
				else if(planted == false && breed.length == 2){
					didBreed = true;
					document.getElementById("draggable").style.left = "50px";
					document.getElementById("draggable").style.top = "210px";

					console.log("breed here");
					
	
				}
			}
			else if (parseInt(document.getElementById("draggable").style.left) > canvas.width - canvas.width/1.8 + 54 && parseInt(document.getElementById("draggable").style.left) < canvas.width - canvas.width/1.8 + 104
			&& parseInt(document.getElementById("draggable").style.top) > canvas.height-60 && parseInt(document.getElementById("draggable").style.top) < canvas.height-60+50){
				if(planted2 == true){
					if(breed[0] != style2 && breed[1] != style2 && breed.length != 2){
						breed[breedNum] = style2;
					}
				
					if(breedNum < 1){
						breedNum++;
					}
				}
				else if(planted2 == false && breed.length == 2){
					didBreed2 = true;
					document.getElementById("draggable").style.left = "50px";
					document.getElementById("draggable").style.top = "210px";
					console.log("breed here");
				}
			}
			else if (parseInt(document.getElementById("draggable").style.left) > canvas.width - canvas.width/4 + 70 && parseInt(document.getElementById("draggable").style.left) < canvas.width - canvas.width/4 + 120
			&& parseInt(document.getElementById("draggable").style.top) > canvas.height-60 && parseInt(document.getElementById("draggable").style.top) < canvas.height-60 + 50){
				if(planted3 == true){
					if(breed[0] != style3 && breed[1] != style3 && breed.length != 2){
						breed[breedNum] = style3;
					}
				
					if(breedNum < 1){
						breedNum++;
					}
				}
				else if(planted3 == false && breed.length == 2){
					didBreed3 = true;
					document.getElementById("draggable").style.left = "50px";
					document.getElementById("draggable").style.top = "210px";
					console.log("breed here");
				}
			}
			if(breed.length ==1){
				$("#breedButton").text("Breed: " + breed[0]);
			}
			else if(breed.length ==2){
				$("#breedButton").text("Breed: " + breed[0] + " + " + breed[1]);
			}
			
			
	});
	$('#eraseButton')
		.click(function(){
			$(".toggle").effect("shake");
				setTimeout(function(){location.reload()},300);
	});
	
	$(function(){
		$("#draggable").draggable();
	});
	
	
	function setup(){
		//background canvas
		canvas = document.getElementById("canvas");
		ctx = canvas.getContext("2d");
		canvas.setAttribute("width",window.innerWidth);
		canvas.setAttribute("height",window.innerHeight - 100);
		
		
		//plant1 canvas
		canvasP1 = document.getElementById("canvasP1");
		ctx1 = canvasP1.getContext("2d");
		canvasP1.setAttribute("width",window.innerWidth/4);
		canvasP1.setAttribute("height",window.innerHeight - 100);
		
		
		//plant2 canvas
		canvasP2 = document.getElementById("canvasP2");
		ctx2 = canvasP2.getContext("2d");
		canvasP2.setAttribute("width",window.innerWidth/4);
		canvasP2.setAttribute("height",window.innerHeight - 100);
		
		
		//plant3 canvas
		canvasP3 = document.getElementById("canvasP3");
		ctx3 = canvasP3.getContext("2d");
		canvasP3.setAttribute("width",window.innerWidth/4);
		canvasP3.setAttribute("height",window.innerHeight - 100);
		
		//win canvas
		canvasWin = document.getElementById("canvasWin");
		ctxWin = canvasWin.getContext("2d");
		canvasWin.setAttribute("width",window.innerWidth);
		canvasWin.setAttribute("height",window.innerHeight/7);
		
		
		audioCtx = new AudioContext();
		
		// get reference to <audio> element on page
		audioElement = document.querySelector('audio');
		
		ctx.fillStyle = "blue";
		ctx.fillRect(0,0,canvas.width,canvas.height);
		
		///plant1 background
		ctx1.fillStyle = "green";
		ctx1.fillRect(0,0,canvasP1.width,canvasP1.height);
		
		
		
		//plant2 background
		ctx2.fillStyle = "pink";
		ctx2.fillRect(0,0,canvasP2.width,canvasP2.height);
		
		//plant3 background
		ctx3.fillStyle = "purple";
		ctx3.fillRect(0,0,canvasP3.width,canvasP3.height);
		
		//win background
		ctxWin.fillStyle = "yellow";
		ctxWin.fillRect(140,0,canvasWin.width,canvasWin.height);
		
		


		ctx.fillStyle = "red";
		ctx1.fillStyle = "red";
		ctx2.fillStyle = "red";
		ctx3.fillStyle = "red";
		
		
		ctx1.fillRect(canvasP1.width/2 - 25, canvasP1.height-60, 50,50);
		ctx2.fillRect(canvasP2.width/2 -25, canvasP2.height-60, 50,50);
		ctx3.fillRect(canvasP3.width/2 -25, canvasP3.height-60, 50,50);
		
		ctx.fillStyle = "#FEFCD7";
		ctx.beginPath();
		ctx.arc(80,75,50,0,2*Math.PI);
		ctx.stroke();
		ctx.fill();
		
		
		
		//ctx.font = "30px Trebuchet";
		//ctx.fillText("Click on red pots to plant and grow", canvas.width/3, 50);
		//ctx.fillText("After planting, drag bird to pots to breed. Click breed button", canvas.width/3-145, 80);
		//ctx.fillText("If breeded with 2 different plants, breed at an empty pot", canvas.width/3-110, 110);
		
		//branch
		ctx.fillStyle = "brown";
		ctx.fillRect(0,250,120,10);
		
		
		lastPos = vec2(canvasP1.width/2,canvas.height-60);
		lastPos2 = vec2(canvasP2.width/2,canvas.height-60);
		lastPos3 = vec2(canvasP3.width/2,canvas.height-60);
		
		document.querySelector("#trackSelect").onchange = function(e){
				playStream(audioElement,e.target.value);
		};
		
		//playStream(audioElement,SOUND_1);

		
	}
	setup();
	
	window.Turtle = function(canvas,startX,startY){
		Object.assign(this, {
			canvas:null,
			weight:1,
			color:'red',
			pos: vec2(startX,startY),
			dir: vec2(0,-1),
			pen:1,
			posArray:[],
			dirArray:[],
			penUp : function() {this.pen = 0},
			penDown: function() {this.pen = 1},
			
			push: function(){
				this.posArray.push (this.pos.clone())
				this.dirArray.push(this.dir.clone())
			},
			
			pop: function() {
				this.pos = this.posArray.pop()
				this.dir = this.dirArray.pop()
				this.canvas.moveTo(this.pos.x,this.pos.y)
			},
			
			//THIS IS IN RADIANS!!!
			rotate: function(amt){
				this.dir.rotate(amt)
			},
			
			move: function(amt){
				if(this.pen) this.canvas.beginPath()
				this.canvas.moveTo(this.pos.x,this.pos.y)
				
				this.pos.x += this.dir.x * amt
				this.pos.y += this.dir.y * amt
				
				if(this.pen){
					this.canvas.lineTo(this.pos.x,this.pos.y)
					this.canvas.lineWidth = this.weight
					this.canvas.stroke()
					this.canvas.closePath()
				}
				else{
					this.moveTo(this.pos.x,this.pos.y)
				}
			},
		})
		this.canvas = canvas
		this.canvas.moveTo(this.pos.x,this.pos.y)
	}
	
	
	let degToRad = function( deg ) {
      return deg * Math.PI / 180
    }
	
	
	//plant 1 rules
	window.xavier = new Turtle(ctx1, 250,window.innerHeight);
	let string = "F";
	let newString = "";
	function rules(){
	if(plant == true && planted == false){
		if(document.getElementById('style1').checked){
			style = 1;
			
		}
		else if (document.getElementById('style2').checked){
			style = 2;
		}
		else if (document.getElementById('style3').checked){
			style = 3;
		}
		planted = true;
	}
		newString = "";
		for(let i = 0; i < string.length; i++)
		{
			if(string.charAt(i) == 'F')
			{
				if(style ==1){
					newString += "F[+FF]F[-FF][FF]";
				}
				else if (style ==2){
					newString += "F[F-F]F[+F]F";
				}
				else if (style ==3){
					newString += "F[-F]F[+F][-FF]";
				}
			}	
			else
			{
				newString += string.charAt(i);
			}	
		}
		
		string = newString;
	}
	
	let thetaDeg = 20;
	let theta = 2;
	
		
	theta = degToRad(thetaDeg);
		

	let time = 0;
	let timeDeg;
	let right = true;
	
	let mousex;
	let mousey;
	let event;
	
	let mousex2;
	let mousey2;
	let event2;
	
	let mousex3;
	let mousey3;
	let event3;
	
	
	

	canvasP1.onmousedown = function(event){
		mousex = event.offsetX
  		mousey = event.offsetY;
		console.log("mouse: " + mousex + ", " + mousey + "\n");

  		getMousePosition();
	}
	
	canvasP2.onmousedown = function(event2){
		mousex2 = event2.offsetX
  		mousey2 = event2.offsetY;
		console.log("mouse: " + mousex + ", " + mousey + "\n");

  		getMousePosition2();
	}
	
		canvasP3.onmousedown = function(event3){
		mousex3 = event3.offsetX
  		mousey3 = event3.offsetY;
		console.log("mouse: " + mousex + ", " + mousey + "\n");

  		getMousePosition3();
	}
	/*window.onresize = function(){
		canvas.setAttribute("width",window.innerWidth);
		canvas.setAttribute("height",window.innerHeight - 100);
		setup();
	}*/
	
	
	
	function getMousePosition(event){
			console.log("canvas: " + (canvasP1.width/2-25) + ", " + (canvasP1.width/2 + 25));

		//1st pot
		if((mousex >= canvasP1.width/2-25) & (mousex < canvasP1.width/2 + 25)
		&& (mousey >= canvasP1.height-60) && (mousey < canvasP1.height -10)){
				pot1 = true;
				pot2 = false;
				pot3 = false;
					//console.log("Mouse: " + mousex + ", " + mousey + "Canvas: " + canvas.width/6+62 + ", " + canvas.width/6 + 112);

				if(plant1 < 3 && click == true && didBreed == false){
					plant1++;
					drawCorrect();
				}
				console.log("breeds: " + didBreed);
				if(plant1 < 3 && didBreed == true){
					plant1++;
					drawCorrect4();
				}
				
		}
	}
	function getMousePosition2(event2){
			console.log("canvas: " + (canvasP1.width/2-25) + ", " + (canvasP1.width/2 + 25));
		
		//2nd pot
		if((mousex2 >= canvasP2.width/2 -25) && (mousex2 < canvasP2.width/2+25)
		&& (mousey2 >= canvasP2.height-60) && (mousey2 < canvasP2.height-10)){
				pot1 = false;
				pot2 = true;
				pot3 = false;
				if(plant2 < 3 && click2 == true & didBreed2 == false){
					plant2++;
					drawCorrect2();
				}
				if(plant2 < 3 && didBreed2 == true){
					plant2++;
					drawCorrect5();
				}
		}
	}
	function getMousePosition3(event3){
			console.log("canvas: " + (canvasP1.width/2-25) + ", " + (canvasP1.width/2 + 25));
		//3rd pot
		if((mousex3 >= canvasP3.width/2 -25) && (mousex3 < canvasP3.width/2 +25)
		&& (mousey3 >= canvasP3.height-60) && (mousey3 < canvasP3.height-10)){
				pot1 = false;
				pot2 = false;
				pot3 = true;
				if(plant3 < 3 && click3 == true && didBreed3 == false){
					plant3++;
					drawCorrect3();
				}
				if(plant3 < 3 && didBreed3 == true){
					plant3++;
					drawCorrect6();
				}
		}
	}
	
		

	
	function draw(){	
		
		xavier.pos = lastPos;

		ctx1.fillStyle = "green";		

		
		ctx1.save();
		timeDeg = degToRad(time);
		ctx1.translate(0,0);
		ctx1.rotate(timeDeg);
		
		
		                    
		
		function myLoop () {           
			setTimeout(function () {    
				if(string.charAt(j) =='F')
				{
					ctx1.strokeStyle = 'rgb(' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() 
					* 256)) + ',' + (Math.floor(Math.random() * 256)) + ')';
					xavier.move(15)
				}
				else if(string.charAt(j) =='+')
				{
	
					xavier.rotate(-theta);
				}
				else if(string.charAt(j) == '-')
				{
					xavier.rotate(theta);
				}
				else if(string.charAt(j) == '[')
				{
					xavier.push(xavier.pos.clone());
				}
				else if(string.charAt(j) == ']')
				{
					xavier.pop();
				}  
				       
				j++;                   
				if (j < string.length) {          
					myLoop();
					click = false;
				}
				if(j == string.length){
					click = true;
				}
			}, 5)
			lastPos = xavier.pos;
		}

		myLoop(); 

		
		ctx1.restore();
	}
	
	
	
	function drawCorrect(){
		for(let k = 0; k < plant1; k++){
			rules();
		}
		draw();
	}
	
	
	
	
	
	
	
	
	//plant 2 stuff
	window.jade = new Turtle(ctx2, 250,window.innerHeight);
	let string2 = "F";
	let newString2 = "";
	function rules2(){
		newString2 = "";
		if(plant == true && planted2 == false){
			if(document.getElementById('style1').checked){
				style2 = 1;
			}
			else if (document.getElementById('style2').checked){
				style2 = 2;
			}
			else if (document.getElementById('style3').checked){
				style2 = 3;
			}
			planted2 = true;
		}
		for(let i = 0; i < string2.length; i++)
		{
			if(string2.charAt(i) == 'F')
			{
				if(style2 ==1){
					newString2 += "F[+FF]F[-FF][FF]";
				}
				else if (style2 == 2){
					newString2 += "F[F-F]F[+F]F";
				}
				else if (style2 == 3){
					newString2 += "F[-F]F[+F][-FF]";
				}
			}	
			else
			{
				newString2 += string2.charAt(i);
			}	
			
		}
		string2 = newString2;
	}
	
	function draw2(){	
		jade.pos = lastPos2;
		getImage();

		ctx2.fillStyle = "green";		

		
		ctx2.save();
		timeDeg = degToRad(time);
		ctx2.translate(0,0);
		ctx2.rotate(timeDeg);
		
	
		function myLoop2 () {           
			setTimeout(function () {    
				if(string2.charAt(p) =='F')
				{
					ctx2.strokeStyle = 'rgb(' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() 
					* 256)) + ',' + (Math.floor(Math.random() * 256)) + ')';
					jade.move(15)
				}
				else if(string2.charAt(p) =='+')
				{
	
					jade.rotate(-theta);
				}
				else if(string2.charAt(p) == '-')
				{
					jade.rotate(theta);
				}
				else if(string2.charAt(p) == '[')
				{
					jade.push(jade.pos.clone());
				}
				else if(string2.charAt(p) == ']')
				{
					jade.pop();
				}  
				       
				p++;                   
				if (p < string2.length) {          
					myLoop2();
					click2 = false;
				}
				if(p == string2.length){
					click2 = true;
				}
			}, 5)
			lastPos2 = jade.pos;
		}

		myLoop2(); 

		
		ctx2.restore();
	}
	
	
	function drawCorrect2(){
		for(let k = 0; k < plant2; k++){
			rules2();
		}
		draw2();
	}
	
	
	
	//plant3 stuff
	window.kristen = new Turtle(ctx3, 250,window.innerHeight);
	let string3 = "F";
	let newString3 = "";
	function rules3(){
		newString3 = "";
		if(plant == true && planted3 == false){
			if(document.getElementById('style1').checked){
				style3 = 1;
			}
			else if (document.getElementById('style2').checked){
				style3 = 2;
			}
			else if (document.getElementById('style3').checked){
				style3 = 3;
			}
			planted3 = true;
	}
		for(let i = 0; i < string3.length; i++)
		{
			if(string3.charAt(i) == 'F')
			{
				if(style3 == 1){
					newString3 += "F[+FF]F[-FF][FF]";
				}
				else if (style3 == 2){
					newString3 += "F[F-F]F[+F]F";
				}
				else if (style3 == 3){
					newString3 += "F[-F]F[+F][-FF]";
				}
			}	
			else
			{
				newString3 += string3.charAt(i);
			}	
			
		}
		string3 = newString3;
	}
	
	function draw3(){	
		kristen.pos = lastPos3;

		ctx3.fillStyle = "green";		

		
		ctx3.save();
		timeDeg = degToRad(time);
		ctx3.translate(0,0);
		ctx3.rotate(timeDeg);
		
	
		function myLoop3 () {           
			setTimeout(function () {    
				if(string3.charAt(t) =='F')
				{
					ctx3.strokeStyle = 'rgb(' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() 
					* 256)) + ',' + (Math.floor(Math.random() * 256)) + ')';
					kristen.move(15)
				}
				else if(string3.charAt(t) =='+')
				{
	
					kristen.rotate(-theta);
				}
				else if(string3.charAt(t) == '-')
				{
					kristen.rotate(theta);
				}
				else if(string3.charAt(t) == '[')
				{
					kristen.push(kristen.pos.clone());
				}
				else if(string3.charAt(t) == ']')
				{
					kristen.pop();
				}  
				       
				t++;                   
				if (t < string3.length) {          
					myLoop3();
					click3 = false;
				}
				if(t == string3.length){
					click3 = true;
				}
			}, 5)
			lastPos3 = kristen.pos;
		}

		myLoop3(); 

		
		ctx3.restore();
	}
	
	
	function drawCorrect3(){
		for(let k = 0; k < plant3; k++){
			rules3();
		}
		draw3();
	}
	
	function playStream(audioElement,path){
			audioElement.src = path;
			audioElement.play();
			audioElement.volume = 0.5;
	}
	
	function rules4(){
		newString = "";
		//if(plant == true && planted == false){
			//newString3 += "F[F-F]F[+F]FF[-F]F[+F][-FF]";

		for(let i = 0; i < string.length; i++)
		{
			if(string.charAt(i) == 'F')
			{
				if(breed[0] == 1 || breed[1] == 1){
					//breed style 1 & 3
					if(breed[0] == 3 || breed[1] == 3){
						newString += "F[+F]F[F-FF]";
					}
					//breed style 1 & 2
					else if (breed[0] == 2 || breed[1] == 2){
						newString += "F[+FF]F[+F]F";
					}
				}
				//breed 2 & 3
				else if (breed[0] == 2 || breed[1] == 2){
					if (breed[0] == 3 || breed[1] == 3){
						newString += "F[F-F]FF[+FF]";
					}
					//breed style 1 & 2
					else if (breed[0] == 1 || breed[1] == 1){
						newString += "F[+FF]F[+F]F";
					}
				}
				//breed 2 & 3
				else if (breed[0] == 3 || breed[1] == 3){
					if (breed[0] == 2 || breed[1] == 2){
						newString += "F[F-F]FF[+FF]";
					}
					//breed style 1 & 3
					else if (breed[0] == 1 || breed[1] == 1){
						newString += "F[+F]F[F-FF]";
					}
				}
			}
			else
			{
				newString += string.charAt(i);
			}	
			
		}
		string = newString;
	}
	
	
	function rules5(){
		newString2 = "";
		//if(plant == true && planted == false){
			//newString3 += "F[F-F]F[+F]FF[-F]F[+F][-FF]";

		for(let i = 0; i < string2.length; i++)
		{
			if(string2.charAt(i) == 'F')
			{
				if(breed[0] == 1 || breed[1] == 1){
					//breed style 1 & 3
					if(breed[0] == 3 || breed[1] == 3){
						newString2 += "F[+F]F[F-FF]";
					}
					//breed style 1 & 2
					else if (breed[0] == 2 || breed[1] == 2){
						newString2 += "F[+FF]F[+F]F";
					}
				}
				//breed 2 & 3
				else if (breed[0] == 2 || breed[1] == 2){
					if (breed[0] == 3 || breed[1] == 3){
						newString2 += "F[F-F]FF[+FF]";
					}
					//breed style 1 & 2
					else if (breed[0] == 1 || breed[1] == 1){
						newString2 += "F[+FF]F[+F]F";
					}
				}
				//breed 2 & 3
				else if (breed[0] == 3 || breed[1] == 3){
					if (breed[0] == 2 || breed[1] == 2){
						newString2 += "F[F-F]FF[+FF]";
					}
					//breed style 1 & 3
					else if (breed[0] == 1 || breed[1] == 1){
						newString2 += "F[+F]F[F-FF]";
					}
				}
			}
			else
			{
				newString2 += string2.charAt(i);
			}	
			
		}
		string2 = newString2;
	}
	
	function rules6(){
		newString3 = "";
		//if(plant == true && planted == false){
			//newString3 += "F[F-F]F[+F]FF[-F]F[+F][-FF]";

		for(let i = 0; i < string3.length; i++)
		{
			if(string3.charAt(i) == 'F')
			{
				if(breed[0] == 1 || breed[1] == 1){
					//breed style 1 & 3
					if(breed[0] == 3 || breed[1] == 3){
						newString3 += "F[+F]F[F-FF]";
					}
					//breed style 1 & 2
					else if (breed[0] == 2 || breed[1] == 2){
						newString3 += "F[+FF]F[+F]F";
					}
				}
				//breed 2 & 3
				else if (breed[0] == 2 || breed[1] == 2){
					if (breed[0] == 3 || breed[1] == 3){
						newString3 += "F[F-F]FF[+FF]";
					}
					//breed style 1 & 2
					else if (breed[0] == 1 || breed[1] == 1){
						newString3 += "F[+FF]F[+F]F";
					}
				}
				//breed 2 & 3
				else if (breed[0] == 3 || breed[1] == 3){
					if (breed[0] == 2 || breed[1] == 2){
						newString3 += "F[F-F]FF[+FF]";
					}
					//breed style 1 & 3
					else if (breed[0] == 1 || breed[1] == 1){
						newString3 += "F[+F]F[F-FF]";
					}
				}
			}
			else
			{
				newString3 += string3.charAt(i);
			}	
			
		}
		string3 = newString3;
	}
	
	function drawCorrect4(){
		for(let k = 0; k < plant1; k++){
			rules4();
		}
		draw();
	}
	
	function drawCorrect5(){
		for(let k = 0; k < plant2; k++){
			rules5();
		}
		draw2();
	}
	
	function drawCorrect6(){
		for(let k = 0; k < plant3; k++){
			rules6();
		}
		draw3();
	}
	
	function getImage(){
	 images = new Image();
     images.src = canvasP1.toDataURL();
     images.style.width = "10%";
     images.style.height = "10%";
		ctxWin.drawImage(images, 70 + (imageCount * 90), 4, 72,72);
		imageCount++;
	}
	
	

}()

