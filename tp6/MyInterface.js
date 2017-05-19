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

	this.gui.add(this.scene.submarine, 'accel', 0, 1);

	return true;
};

/**
 * processKeyboard
 * @param event {Event}
 */
MyInterface.prototype.processKeyboard = function(event) {
	// call CGFinterface default code (omit if you want to override)
	CGFinterface.prototype.processKeyboard.call(this,event);

	// Check key codes e.g. here: http://www.asciitable.com/
	// or use String.fromCharCode(event.keyCode) to compare chars

	// for better cross-browser support, you may also check suggestions on using event.which in http://www.w3schools.com/jsref/event_key_keycode.asp
	switch (event.keyCode)
	{
		case (97):
			console.log("Key 'A' pressed");
			this.scene.submarine.move('left');
            break;
        case (100):
			console.log("Key 'D' pressed");
			this.scene.submarine.move('right');
            break;
        case (115):
    		console.log("Key 'S' pressed");
            this.scene.submarine.move('back');
            break;
        case (119):
        	console.log("Key 'W' pressed");
        	this.scene.submarine.move('front');
            break;
        case (108):
      		console.log("Key 'L' pressed");
       		this.scene.submarine.move('p_down');
       		break;
        case (112):
        	console.log("Key 'P' pressed");
        	this.scene.submarine.move('p_up');
            break;
        case (113):
        	console.log("Key 'Q' pressed");
        	this.scene.submarine.move('down');
            break;
        case (101):
        	console.log("Key 'E' pressed");
        	this.scene.submarine.move('up');
            break;
	};
};
