function MyClockPost(scene) {
	CGFobject.call(this, scene);

    this.radunit = Math.PI / 180.0;

    this.bodyAppearance = new CGFappearance(scene); // temp textures
    this.bodyAppearance.setAmbient(0,0,0,1);
    this.bodyAppearance.setDiffuse(0.9,0.9,0.9,1);
    this.bodyAppearance.setSpecular(0.3,0.3,0.3,1);
    this.bodyAppearance.setShininess(50);

	this.body1Appearance = new CGFappearance(scene);
	this.body1Appearance.setAmbient(0,0,0,1);
	this.body1Appearance.setDiffuse(0.9,0.9,0.9,1);
	this.body1Appearance.setSpecular(0.3,0.3,0.3,1);
	this.body1Appearance.setShininess(50);
	this.body1Appearance.loadTexture("..\\resources\\images\\column.png");

	this.body2Appearance = new CGFappearance(scene);
	this.body2Appearance.setAmbient(0,0,0,1);
	this.body2Appearance.setDiffuse(0.9,0.9,0.9,1);
	this.body2Appearance.setSpecular(0.3,0.3,0.3,1);
	this.body2Appearance.setShininess(50);
	this.body2Appearance.loadTexture("..\\resources\\images\\rust.jpg");

    this.clock1 = new MyClock(scene);
    this.clock2 = new MyClock(scene);
    this.clock3 = new MyClock(scene);
	this.clock4 = new MyClock(scene);
    this.body1 = new MyPrism(scene, 4, 1, 0.2);
    this.body2 = new MyPrism(scene, 4, 1, 0.8);
    this.body3 = new MyCylinder(scene, 32, 1, 0);
    this.body4 = new MyCylinder(scene, 32, 1);
    this.body5 = new MyCylinder(scene, 32, 1);
    this.body6 = new MyCylinder(scene, 32, 1);
    this.body7 = new MyCylinder(scene, 32, 1);
	this.body8 = new MyLamp(scene, 32, 16);
	this.body9 = new MyLamp(scene, 32, 16);
	this.body10 = new MyLamp(scene, 32, 16);
	this.body11 = new MyLamp(scene, 32, 16);
    this.body12 = new MyPrism(scene, 4, 1, 0.2, 0);
    this.body13 = new MyCylinder(scene, 32, 1);
    this.body14 = new MyCylinder(scene, 32, 1);
    this.body15 = new MyCylinder(scene, 32, 1);
    this.body16 = new MyCylinder(scene, 32, 1);
	this.body17 = new MyLamp(scene, 32, 16);
	this.body18 = new MyLamp(scene, 32, 16);
	this.body19 = new MyLamp(scene, 32, 16);
	this.body20 = new MyLamp(scene, 32, 16);
}

MyClockPost.prototype = Object.create(CGFobject.prototype);
MyClockPost.prototype.constructor=MyClockPost;

MyClockPost.prototype.displayClockPost = function () {
    this.scene.pushMatrix();
        this.scene.rotate(-90 * this.radunit, 1, 0, 0);

        this.scene.pushMatrix();
            this.scene.scale(1.5, 1.5, 1.5);

			this.bodyAppearance.apply();
            this.body1.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
			this.scene.translate(0, 0, 1.5);
            this.scene.scale(1.2, 1.2, 0.5);

			this.bodyAppearance.apply();
            this.body2.display();
        this.scene.popMatrix();

		this.scene.pushMatrix();
			this.scene.translate(0, 0, 2);
            this.scene.scale(0.2, 0.2, 6);

			this.body1Appearance.apply();
            this.body3.display();
        this.scene.popMatrix();

		this.scene.pushMatrix();
			this.scene.translate(0.8, 0.8, 8);
            this.scene.scale(0.2, 1.6, 0.2);
			this.scene.rotate(90 * this.radunit, 1, 0, 0);

			this.bodyAppearance.apply();
            this.body4.display();
        this.scene.popMatrix();

		this.scene.pushMatrix();
			this.scene.translate(-0.8, 0.8, 8);
            this.scene.scale(1.6, 0.2, 0.2);
			this.scene.rotate(90 * this.radunit, 0, 1, 0);

			this.bodyAppearance.apply();
            this.body5.display();
        this.scene.popMatrix();

		this.scene.pushMatrix();
			this.scene.translate(-0.8, 0.8, 8);
			this.scene.scale(0.2, 1.6, 0.2);
			this.scene.rotate(90 * this.radunit, 1, 0, 0);

			this.bodyAppearance.apply();
			this.body6.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
			this.scene.translate(-0.8, -0.8, 8);
			this.scene.scale(1.6, 0.2, 0.2);
			this.scene.rotate(90 * this.radunit, 0, 1, 0);

			this.bodyAppearance.apply();
			this.body7.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
			this.scene.translate(0.8, -0.8, 8);
            this.scene.scale(0.2, 0.2, 0.2);
			this.scene.rotate(90 * this.radunit, 1, 0, 0);

			this.bodyAppearance.apply();
            this.body8.display();
        this.scene.popMatrix();

		this.scene.pushMatrix();
			this.scene.translate(0.8, 0.8, 8);
			this.scene.scale(0.2, 0.2, 0.2);
			this.scene.rotate(90 * this.radunit, -1, 0, 0);

			this.bodyAppearance.apply();
			this.body9.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
			this.scene.translate(-0.8, -0.8, 8);
			this.scene.scale(0.2, 0.2, 0.2);
			this.scene.rotate(90 * this.radunit, 1, 0, 0);

			this.bodyAppearance.apply();
			this.body10.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
			this.scene.translate(-0.8, 0.8, 8);
			this.scene.scale(0.2, 0.2, 0.2);
			this.scene.rotate(90 * this.radunit, -1, 0, 0);

			this.bodyAppearance.apply();
			this.body11.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
			this.scene.translate(0, 0, 10);
			this.scene.scale(1.5, 1.5, 2);
			this.scene.rotate(45 * this.radunit, 0, 0, 1);
			this.scene.rotate(180 * this.radunit, 0, 1, 0);

			this.body2Appearance.apply();
			this.body12.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
			this.scene.translate(1, 1, 10);
            this.scene.scale(0.2, 2, 0.2);
			this.scene.rotate(90 * this.radunit, 1, 0, 0);

			this.bodyAppearance.apply();
            this.body13.display();
        this.scene.popMatrix();

		this.scene.pushMatrix();
			this.scene.translate(-1, 1, 10);
            this.scene.scale(2, 0.2, 0.2);
			this.scene.rotate(90 * this.radunit, 0, 1, 0);

			this.bodyAppearance.apply();
            this.body14.display();
        this.scene.popMatrix();

		this.scene.pushMatrix();
			this.scene.translate(-1, 1, 10);
			this.scene.scale(0.2, 2, 0.2);
			this.scene.rotate(90 * this.radunit, 1, 0, 0);

			this.bodyAppearance.apply();
			this.body15.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
			this.scene.translate(-1, -1, 10);
			this.scene.scale(2, 0.2, 0.2);
			this.scene.rotate(90 * this.radunit, 0, 1, 0);

			this.bodyAppearance.apply();
			this.body16.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
			this.scene.translate(1, -1, 10);
			this.scene.scale(0.2, 0.2, 0.2);
			this.scene.rotate(90 * this.radunit, 1, 0, 0);

			this.bodyAppearance.apply();
			this.body17.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
			this.scene.translate(1, 1, 10);
			this.scene.scale(0.2, 0.2, 0.2);
			this.scene.rotate(90 * this.radunit, -1, 0, 0);

			this.bodyAppearance.apply();
			this.body18.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
			this.scene.translate(-1, -1, 10);
			this.scene.scale(0.2, 0.2, 0.2);
			this.scene.rotate(90 * this.radunit, 1, 0, 0);

			this.bodyAppearance.apply();
			this.body19.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
			this.scene.translate(-1, 1, 10);
			this.scene.scale(0.2, 0.2, 0.2);
			this.scene.rotate(90 * this.radunit, -1, 0, 0);

			this.bodyAppearance.apply();
			this.body20.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
			this.scene.translate(0, 0.753, 9);
			this.scene.scale(0.8, 1, 0.8);
			this.scene.rotate(180 * this.radunit, 0, 0, 1);
			this.scene.rotate(94.85 * this.radunit, 1, 0, 0);

			this.bodyAppearance.apply();
			this.clock1.displayClock();
		this.scene.popMatrix();

		this.scene.pushMatrix();
			this.scene.translate(0.753, 0, 9);
			this.scene.scale(1, 0.8, 0.8);
			this.scene.rotate(90 * this.radunit, 0, 0, 1);
			this.scene.rotate(94.85 * this.radunit, 1, 0, 0);

			this.bodyAppearance.apply();
			this.clock2.displayClock();
		this.scene.popMatrix();

		this.scene.pushMatrix();
			this.scene.translate(0, -0.753, 9);
			this.scene.scale(0.8, 1, 0.8);
			this.scene.rotate(94.85 * this.radunit, 1, 0, 0);

			this.bodyAppearance.apply();
			this.clock3.displayClock();
		this.scene.popMatrix();

		this.scene.pushMatrix();
			this.scene.translate(-0.753, 0, 9);
			this.scene.scale(1, 0.8, 0.8);
			this.scene.rotate(-90 * this.radunit, 0, 0, 1);
			this.scene.rotate(94.85 * this.radunit, 1, 0, 0);

			this.bodyAppearance.apply();
			this.clock4.displayClock();
		this.scene.popMatrix();

    this.scene.popMatrix();
};

 MyClockPost.prototype.updateClocks = function(currTime) {
    this.clock1.updateClock(currTime);
    this.clock2.updateClock(currTime);
    this.clock3.updateClock(currTime);
    this.clock4.updateClock(currTime);
 };
