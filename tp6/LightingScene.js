var RADUNIT = Math.PI / 180;

var BOARD_WIDTH = 6.0;
var BOARD_HEIGHT = 4.0;

var BOARD_A_DIVISIONS = 1;
var BOARD_B_DIVISIONS = 100;

function LightingScene() {
	CGFscene.call(this);
}

LightingScene.prototype = Object.create(CGFscene.prototype);
LightingScene.prototype.constructor = LightingScene;

LightingScene.prototype.init = function(application) {
	CGFscene.prototype.init.call(this, application);

	this.enableTextures(true);

	this.initCameras();

	this.initLights();

	this.AmbientLighting = true;

	this.light0 = true;
	this.light1 = false;
	this.light2 = true;
	this.light3 = true;
	this.light4 = true;
	this.light5 = true;

	this.enableClock = true;

	this.gl.clearColor(0.0, 0.3, 0.3, 1.0);
	this.gl.clearDepth(100.0);
	this.gl.enable(this.gl.DEPTH_TEST);
	this.gl.enable(this.gl.CULL_FACE);
	this.gl.depthFunc(this.gl.LEQUAL);

	this.axis = new CGFaxis(this);

	// Scene elements
//	this.table = new MyTable(this);
	this.wall = new MyQuad(this, 4);
	this.floor = new Plane(this, 10, 0, 10000, 0, 10000); // Changing the second parameter gives better image quality
	this.targets = [new MyTarget(this, 0, 2, 4), new MyTarget(this, 11, 3, 16), new MyTarget(this, -12, 4, 24)];

/*	this.boardA = new Plane(this, BOARD_A_DIVISIONS, -0.25, 1.25, 0, 1);
	this.boardB = new Plane(this, BOARD_B_DIVISIONS);

	this.cylinder = new MyCylinder(this, 8, 20);
	this.semisphere = new MyLamp(this, 32, 32);
*/	this.clockpost = new MyClockPost(this);

	this.submarine = new MySubmarine(this);
	this.torpedo;
	this.torpedo_active = 0;

	// Materials
	this.materialDefault = new CGFappearance(this);

	this.materialA = new CGFappearance(this);
	this.materialA.setAmbient(0.3,0.3,0.3,1);
	this.materialA.setDiffuse(0.6,0.6,0.6,1);
	this.materialA.setSpecular(0.8,0.8,0.8,1);
	this.materialA.setShininess(10);

	this.materialB = new CGFappearance(this);
	this.materialB.setAmbient(0.3,0.3,0.3,1);
	this.materialB.setDiffuse(0.6,0.6,0.6,1);
	this.materialB.setSpecular(0.8,0.8,0.8,1);
	this.materialB.setShininess(120);

	this.materialFloor = new CGFappearance(this);
	this.materialFloor.setAmbient(0.3,0.3,0.3,1);
	this.materialFloor.setDiffuse(0.25,0.075,0.025,1);
	this.materialFloor.setSpecular(0.5,0.5,0.5,1);
	this.materialFloor.setShininess(100);

	this.materialWall = new CGFappearance(this);
	this.materialWall.setAmbient(0.3,0.3,0.3,1);
	this.materialWall.setDiffuse(0.9,0.9,0.9,1);
	this.materialWall.setSpecular(0.25,0.25,0.25,1);
	this.materialWall.setShininess(100);

	this.materialTableTop = new CGFappearance(this);
	this.materialTableTop.setAmbient(0.3,0.3,0.3,1);
	this.materialTableTop.setDiffuse(0.725,0.425,0.125,1);
	this.materialTableTop.setSpecular(0.725,0.215,0.1,1);
	this.materialTableTop.setShininess(10);

	this.materialTableLegs = new CGFappearance(this);
	this.materialTableLegs.setAmbient(0.3,0.3,0.3,1);
	this.materialTableLegs.setDiffuse(0.5,0.5,0.5,1);
	this.materialTableLegs.setSpecular(0.25,0.25,0.25,1);
	this.materialTableLegs.setShininess(100);

	this.materialColumn = new CGFappearance(this);
	this.materialColumn.setAmbient(0.2,0.2,0.2,1);
	this.materialColumn.setDiffuse(0.9,0.8,0.8,1);
	this.materialColumn.setSpecular(0.7,0.6,0.6,1);
	this.materialColumn.setShininess(50);

	this.materialLamp = new CGFappearance(this);
	this.materialLamp.setAmbient(0.2,0.2,0.2,1);
	this.materialLamp.setDiffuse(0.9,0.9,0.6,1);
	this.materialLamp.setSpecular(0.6,0.6,0.3,1);
	this.materialLamp.setShininess(150);

	// Textures

	this.floorAppearance = new CGFappearance(this);
	this.floorAppearance.setAmbient(0.3,0.3,0.3,1);
	this.floorAppearance.setDiffuse(0.8,0.7,0.5,1);
	this.floorAppearance.setSpecular(0.2,0.1,0.05,1);
	this.floorAppearance.setShininess(10);
	this.floorAppearance.loadTexture("..\\resources\\images\\reef.png");

	this.windowAppearance = new CGFappearance(this);
	this.windowAppearance.setAmbient(0.3,0.3,0.3,1);
	this.windowAppearance.setDiffuse(0.7,0.7,0.7,1);
	this.windowAppearance.setSpecular(0.4,0.4,0.4,1);
	this.windowAppearance.setShininess(50);
	this.windowAppearance.loadTexture("..\\resources\\images\\window.png");
	this.windowAppearance.setTextureWrap('CLAMP_TO_EDGE', 'CLAMP_TO_EDGE');

	this.slidesAppearance = new CGFappearance(this);
	this.slidesAppearance.setAmbient(0,0,0,1);
	this.slidesAppearance.setDiffuse(0.9,0.9,0.9,1);
	this.slidesAppearance.setSpecular(0.1,0.1,0.1,1);
	this.slidesAppearance.setShininess(10);
	this.slidesAppearance.loadTexture("..\\resources\\images\\slides.png");
	this.slidesAppearance.setTextureWrap('CLAMP_TO_EDGE', 'CLAMP_TO_EDGE');

	this.boardAppearance = new CGFappearance(this);
	this.boardAppearance.setAmbient(0,0,0,1);
	this.boardAppearance.setDiffuse(0.7,0.7,0.7,1);
	this.boardAppearance.setSpecular(1,1,1,1);
	this.boardAppearance.setShininess(100);
	this.boardAppearance.loadTexture("..\\resources\\images\\board.png");
	this.boardAppearance.setTextureWrap('CLAMP_TO_EDGE', 'CLAMP_TO_EDGE');

	this.sub1Appearance = new CGFappearance(this); // Criar nova textura
	this.sub1Appearance.setAmbient(0,0,0,1);
	this.sub1Appearance.setDiffuse(0.9,0.9,0.9,1);
	this.sub1Appearance.setSpecular(0.3,0.3,0.3,1);
	this.sub1Appearance.setShininess(50);
	this.sub1Appearance.loadTexture("..\\resources\\images\\rust.jpg");

	this.sub2Appearance = new CGFappearance(this); // Criar nova textura
	this.sub2Appearance.setAmbient(0,0,0,1);
	this.sub2Appearance.setDiffuse(0.9,0.9,0.9,1);
	this.sub2Appearance.setSpecular(0.3,0.3,0.3,1);
	this.sub2Appearance.setShininess(50);
	this.sub2Appearance.loadTexture("..\\resources\\images\\metal.jpg");

	this.submarineAppearances ={
		"Rusted" : 0,
		"Metal" : 1
	};

	this.AppearanceList = new Array(this.sub1Appearance, this.sub2Appearance);

	this.currentSubmarineTexture = 1;

	this.setUpdatePeriod(10); // If it's superior to 16.667, the submarine animation will start to lose fluidity
};

LightingScene.prototype.doSomething = function () {
	console.log("Doing something...");
};

LightingScene.prototype.initCameras = function() {
	this.camera = new CGFcamera(0.4, 0.1, 500, vec3.fromValues(30, 30, 30), vec3.fromValues(0, 0, 0));
};

LightingScene.prototype.initLights = function() {

	//this.setGlobalAmbientLight(0.0, 0.0, 0.0,1.0); // No ambient light
	this.setGlobalAmbientLight(0.0, 1.0, 1.0, 1.0); // Cyan ambient light

	// Positions for four lights
	this.lights[0].setPosition(0, 0, -2, 1);
	this.lights[0].setVisible(true); // show marker on light position (different from enabled)
	this.lights[1].setPosition(10.5, 6.0, 1.0, 1.0);
	this.lights[1].setVisible(true); // show marker on light position (different from enabled)
	this.lights[2].setPosition(10.5, 6.0, 5.0, 1.0);
	this.lights[2].setVisible(true); // show marker on light position (different from enabled)
	this.lights[3].setPosition(4.0, 6.0, 5.0, 1.0);
	this.lights[3].setVisible(true); // show marker on light position (different from enabled)

	this.lights[0].setAmbient(0, 0, 0, 1);
	this.lights[0].setDiffuse(0.8, 0.8, 0.8, 1.0);
	this.lights[0].setSpecular(0.8, 0.8, 0.8, 1.0);
	this.lights[0].enable();

	this.lights[1].setAmbient(0, 0, 0, 1);
	this.lights[1].setDiffuse(0.8, 0.8, 0.8, 1.0);
	this.lights[1].setSpecular(0.8, 0.8, 0.8, 1.0);
//	this.lights[1].enable();

	this.lights[2].setAmbient(0, 0, 0, 1);
	this.lights[2].setDiffuse(1.0, 1.0, 1.0, 1.0);
	this.lights[2].setSpecular(1.0, 1.0, 1.0, 1.0);
	this.lights[2].setConstantAttenuation(0);
	this.lights[2].setLinearAttenuation(1);
	this.lights[2].setQuadraticAttenuation(0);
//	this.lights[2].enable();

	this.lights[3].setAmbient(0, 0, 0, 1);
	this.lights[3].setDiffuse(1.0, 1.0, 1.0, 1.0);
	this.lights[3].setSpecular(1.0, 1.0, 1.0, 1.0);
	this.lights[3].setConstantAttenuation(0);
	this.lights[3].setLinearAttenuation(0);
	this.lights[3].setQuadraticAttenuation(0.2);
//	this.lights[3].enable();

	this.lights[4].setAmbient(0.3, 0.3, 0.3, 1);
	this.lights[4].setDiffuse(0.6, 0.6, 0.6, 1.0);
	this.lights[4].setSpecular(0.1, 0.1, 0.1, 1.0);
	this.lights[4].setPosition(-1, 4.0, 7.5, 1.0);
	this.lights[4].setVisible(true);
	this.lights[4].enable();

	this.lights[5].setAmbient(0, 0, 0, 1);
	this.lights[5].setDiffuse(0.9, 0.9, 0.9, 1.0);
	this.lights[5].setSpecular(0.6, 0.6, 0.6, 1.0);
	this.lights[5].setPosition(7.0, 8.0, 7.0, 1.0);
	this.lights[5].setVisible(true);
	this.lights[5].enable();
};

LightingScene.prototype.updateLights = function() {
	lights = [
		this.light0,
		this.light1,
		this.light2,
		this.light3,
		this.light4,
		this.light5
	]

	for (i = 0; i < this.lights.length; i++)
		if (lights[i]) this.lights[i].enable();
		else this.lights[i].disable();

	for (i = 0; i < this.lights.length; i++)
		this.lights[i].update();

	if (this.AmbientLighting)
		this.setGlobalAmbientLight(0.0, 1.0, 1.0, 1.0); // Cyan ambient light
	else
		this.setGlobalAmbientLight(0.0, 0.0, 0.0,1.0); // No ambient light
};

LightingScene.prototype.update = function(currTime) {
	if (this.enableClock)
		this.clockpost.updateClocks(currTime);

	this.submarine.updateSubmarine(currTime);
};

LightingScene.prototype.display = function() {
	// ---- BEGIN Background, camera and axis setup

	// Clear image and depth buffer everytime we update the scene
	this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
	this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);

	// Initialize Model-View matrix as identity (no transformation)
	this.updateProjectionMatrix();
	this.loadIdentity();

	// Apply transformations corresponding to the camera position relative to the origin
	this.applyViewMatrix();

	// Update all lights used
	this.updateLights();

	// Draw axis
	this.axis.display();

	this.materialDefault.apply();


	// ---- END Background, camera and axis setup


	// ---- BEGIN Geometric transformation section

	// ---- END Geometric transformation section


	// ---- BEGIN Primitive drawing section

	// Floor
	this.pushMatrix();
		this.rotate(-90 * RADUNIT, 1, 0, 0);
		this.scale(100000, 100000, 0.2);

//		this.materialFloor.apply();
		this.floorAppearance.apply();
		this.floor.display();
	this.popMatrix();

	// Left Wall
/*	this.pushMatrix();
		this.translate(0, 4, 7.5);
		this.rotate(90 * RADUNIT, 0, 1, 0);
		this.scale(15, 8, 0.2);

//		this.materialWall.apply();
		this.windowAppearance.apply();
		this.wall.display();
	this.popMatrix(); */

	// Plane Wall
/*	this.pushMatrix();
		this.translate(7.5, 4, 0);
		this.scale(15, 8, 0.2);

		this.materialWall.apply();
		this.wall.display();
	this.popMatrix();

	// First Table
	this.pushMatrix();
		this.translate(5, 0, 8);

//		this.materialTableTop.apply();
		this.table.displayTableTop();

		this.materialTableLegs.apply();
		this.table.displayTableLegs();
	this.popMatrix();

	// Second Table
	this.pushMatrix();
		this.translate(12, 0, 8);

//		this.materialTableTop.apply();
		this.table.displayTableTop();

		this.materialTableLegs.apply();
		this.table.displayTableLegs();
	this.popMatrix();

	// Board A
	this.pushMatrix();
		this.translate(4, 4.5, 0.2);
		this.scale(BOARD_WIDTH, BOARD_HEIGHT, 1);

//		this.materialA.apply();
		this.slidesAppearance.apply();
		this.boardA.display();
	this.popMatrix();

	// Board B
	this.pushMatrix();
		this.translate(10.5, 4.5, 0.2);
		this.scale(BOARD_WIDTH, BOARD_HEIGHT, 1);

//		this.materialB.apply();
		this.boardAppearance.apply();
		this.boardB.display();
	this.popMatrix();

	this.pushMatrix();
		this.rotate(RADUNIT * -90, 1, 0, 0);
		this.translate(4, -14, 0);
		this.scale(1, 1, 8);

		this.materialColumn.apply();
		this.prism.display();
	this.popMatrix();

	this.pushMatrix();
		this.rotate(RADUNIT * -90, 1, 0, 0);
		this.translate(11, -14, 0);
		this.scale(1, 1, 8);

		this.materialColumn.apply();
		this.cylinder.display();
	this.popMatrix();

	// Lamp

	this.pushMatrix();
		this.rotate(RADUNIT * 90, 1, 0, 0);
		this.translate(7, 7, -8);

		this.materialLamp.apply();
		this.semisphere.display();
	this.popMatrix(); */

	this.pushMatrix();
		this.scale(0.5, 0.5, 0.5);
		this.translate(16, 0, 0);

		this.clockpost.displayClockPost();
	this.popMatrix();

	this.pushMatrix();
		for (i = 0; i < this.targets.length; ++i)
			this.targets[i].displayTarget();
	this.popMatrix();

	this.pushMatrix();
		this.translate(this.submarine.pos_x, this.submarine.pos_y, this.submarine.pos_z);
		this.pushMatrix();
			// Corrects the rotation axis
			// Increment k in k * -Math.sin(sub_rotation) and k * -Math.cos(sub_rotation) to drag the axis to the tail of the submarine
			this.translate(5 * -Math.sin(this.submarine.pos_rotation * RADUNIT), 0, 5 * -Math.cos(this.submarine.pos_rotation * RADUNIT));
			// Rotates the submarine
			this.rotate(this.submarine.pos_rotation * RADUNIT, 0, 1, 0);
			this.rotate(this.submarine.pos_angle * RADUNIT, 1, 0, 0);
			this.AppearanceList[this.currentSubmarineTexture].apply();
			this.submarine.displaySubmarine();
		this.popMatrix();
	this.popMatrix();

	this.pushMatrix();
		if (this.torpedo_active == 1)
			this.torpedo.displayTorpedo();
	this.popMatrix();

	// ---- END Primitive drawing section
};
