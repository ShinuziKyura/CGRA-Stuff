/**
 * MyInterface
 * @constructor
 */
function MyInterface() {
	//call CGFinterface constructor
	CGFinterface.call(this);
};

MyInterface.prototype = Object.create(CGFinterface.prototype);
MyInterface.prototype.constructor = MyInterface;

/**
 * init
 * @param {CGFapplication} application
 */
MyInterface.prototype.init = function(application) {
	// call CGFinterface init
	CGFinterface.prototype.init.call(this, application);

	// init GUI. For more information on the methods, check:
	//  http://workshop.chromeexperiments.com/examples/gui

	this.gui = new dat.GUI();

	// add a button:
	// the first parameter is the object that is being controlled (in this case the scene)
	// the identifier 'doSomething' must be a function declared as part of that object (i.e. a member of the scene class)
	// e.g. LightingScene.prototype.doSomething = function () { console.log("Doing something..."); };

	this.gui.add(this.scene, 'doSomething');

	// add a group of controls (and open/expand by defult)

	var group=this.gui.addFolder("Options");
	group.open();

	// add two check boxes to the group. The identifiers must be members variables of the scene initialized in scene.init as boolean
	// e.g. this.option1=true; this.option2=false;


	group.add(this.scene, 'enableClock');

	var lights = this.gui.addFolder("Lights");
	lights.add(this.scene, 'light0');
	lights.add(this.scene, 'light1');
	lights.add(this.scene, 'light2');
	lights.add(this.scene, 'light3');
	lights.add(this.scene, 'light4');
	lights.add(this.scene, 'light5');
	lights.add(this.scene, 'AmbientLighting');


	var submarine = this.gui.addFolder("Submarine");
	submarine.add(this.scene, 'currentSubmarineTexture', this.scene.submarineAppearances);

	// add a slider
	// must be a numeric variable of the scene, initialized in scene.init
	// min and max values can be specified as parameters

	this.gui.add(this.scene.submarine, 'maxSpeed', 0, 16.667);

	return true;
};

 MyInterface.prototype.processKeyDown = function(event) {  // Change this
	 // Both uppercase and lowercase use uppercase code in this function... go figure
	switch (event.keyCode)
 	{
		case (65):
			console.log("Key 'A' pressed");
			this.scene.submarine.move('left');
			break;
		case (68):
			console.log("Key 'D' pressed");
			this.scene.submarine.move('right');
			break;
		case (83):
			console.log("Key 'S' pressed");
			this.scene.submarine.move('back');
			break;
		case (87):
			console.log("Key 'W' pressed");
			this.scene.submarine.move('front');
			break;
		case (70):
			console.log("Key 'F' pressed");
			this.scene.activateTorpedo();
			break;
		case (76):
			console.log("Key 'L' pressed");
			this.scene.submarine.move('p_down');
			break;
		case (80):
			console.log("Key 'P' pressed");
			this.scene.submarine.move('p_up');
			break;
		case (81):
			console.log("Key 'Q' pressed");
			this.scene.submarine.move('up');
			break;
		case (69):
			console.log("Key 'E' pressed");
			this.scene.submarine.move('down');
			break;
 	};
 }

 MyInterface.prototype.processKeyUp = function(event) { // Change this
    switch (event.keyCode)
    {
 	   case (65):
 		   console.log("Key 'A' released");
 		   this.scene.submarine.stop('left');
 			break;
 		case (68):
 		   console.log("Key 'D' released");
 		   this.scene.submarine.stop('right');
 			break;
 		case (83):
 		   console.log("Key 'S' released");
 			this.scene.submarine.stop('back');
 			break;
 		case (87):
 		   console.log("Key 'W' released");
 		   this.scene.submarine.stop('front');
 			break;
 		case (76):
 		   console.log("Key 'L' released");
 			   this.scene.submarine.stop('p_down');
 			   break;
 		case (80):
 		   console.log("Key 'P' released");
 		   this.scene.submarine.stop('p_up');
 			break;
 		case (81):
 		   console.log("Key 'Q' released");
 		   this.scene.submarine.stop('up');
 			break;
 		case (69):
 		   console.log("Key 'E' released");
 		   this.scene.submarine.stop('down');
 			break;
    };
 }
