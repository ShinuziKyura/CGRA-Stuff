function MySubmarine(scene) {
	CGFobject.call(this, scene);

	this.radunit = Math.PI / 180.0;

	this.main_body = new MyCylinder(scene, 32, 4, 0);
	this.front_body = new MyLamp(scene, 32, 24);
	this.rear_body = new MyLamp(scene, 32, 24);
/*	this.top_body = new MyCylinder(scene, 32, 4);
	this.propeller_left_body = new MyCylinder(scene, 32, 4); // wont work as is
	this.propeller_right_body = new MyCylinder(scene, 32, 4);
	this.h_fin = new MyPrism(scene, 4, 4);
	this.v_fin = new MyPrism(scene, 4, 4);
	this.top_fin = new MyPrism(scene, 4, 4);
	this.propeller_left = new MyPrism(scene, 4, 4);
	this.propeller_right = new MyPrism(scene, 4, 4);
	this.propeller_left_axis = MyLamp(scene, 32, 24);
	this.propeller_right_axis = MyLamp(scene, 32, 24);
*/
	this.bodyAppearance = new CGFappearance(scene); // Criar nova textura
	this.bodyAppearance.setAmbient(0,0,0,1);
	this.bodyAppearance.setDiffuse(0.9,0.9,0.9,1);
	this.bodyAppearance.setSpecular(0.3,0.3,0.3,1);
	this.bodyAppearance.setShininess(50);

	this.body1Appearance = new CGFappearance(scene); // Criar nova textura
	this.body1Appearance.setAmbient(0,0,0,1);
	this.body1Appearance.setDiffuse(0.9,0.9,0.9,1);
	this.body1Appearance.setSpecular(0.3,0.3,0.3,1);
	this.body1Appearance.setShininess(50);
	this.body1Appearance.loadTexture("..\\resources\\images\\column.png");
}

MySubmarine.prototype = Object.create(CGFobject.prototype);
MySubmarine.prototype.constructor=MySubmarine;

MySubmarine.prototype.displaySubmarine = function () {
	this.scene.pushMatrix();

		this.scene.pushMatrix();
			this.scene.scale(0.73, 0.94, 4.08);

			this.body1Appearance.apply();
			this.main_body.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
			this.scene.scale(0.73, 0.94, 0.46);
			this.scene.rotate(180 * this.radunit, 0, 1, 0);

			this.bodyAppearance.apply();
			this.front_body.display();
		this.scene.popMatrix();

	this.scene.popMatrix();
};
