function MySubmarine(scene) {
	CGFobject.call(this, scene);

	this.radunit = Math.PI / 180.0;

	var texture1 = "..\\resources\\images\\rust.jpg";

	this.speed = 0.05;

	this.main_body = new MyCylinder(scene, 32, 4, 0);
	this.front_body = new MyLamp(scene, 32, 24);
	this.rear_body = new MyLamp(scene, 32, 24);
	this.top_body = new MyCylinder(scene, 32, 4, 0);
	this.propeller_left_body = new MyCylinder(scene, 32, 4, 0); // wont work as is
	this.propeller_right_body = new MyCylinder(scene, 32, 4, 0);
	this.h_fin = new MyPrism(scene, 4, 4);
	this.v_fin = new MyPrism(scene, 4, 4);
	this.top_fin = new MyPrism(scene, 4, 4);
/*	this.propeller_left = new MyPrism(scene, 4, 4);
	this.propeller_right = new MyPrism(scene, 4, 4);
	this.propeller_left_axis = MyLamp(scene, 32, 24);
	this.propeller_right_axis = MyLamp(scene, 32, 24);
*/

}

MySubmarine.prototype = Object.create(CGFobject.prototype);
MySubmarine.prototype.constructor=MySubmarine;

MySubmarine.prototype.displaySubmarine = function () {

	this.scene.pushMatrix();

		this.scene.pushMatrix();
			this.scene.scale(0.73, 0.94, 4.08);

			this.main_body.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
			this.scene.scale(0.73, 0.94, 0.46);
			this.scene.rotate(180 * this.radunit, 0, 1, 0);

			this.front_body.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
			this.scene.scale(0.73, 0.94, 0.46);
			this.scene.translate(0, 0, 8.87);

			this.rear_body.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
			this.scene.scale(0.6, 2, 0.64);
			this.scene.translate(0, 0.8, 2.2);
			this.scene.rotate(90 * this.radunit, 1, 0, 0);

			this.top_body.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
			this.scene.scale(0.3, 0.3, 0.3);
			this.scene.translate(-3.17, -1.6, 12.55);

			this.propeller_left_body.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
			this.scene.scale(0.3, 0.3, 0.3);
			this.scene.translate(3.17, -1.6, 12.55);

			this.propeller_right_body.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
			this.scene.scale(1.2, 0.05, 0.4);
			this.scene.translate(0, 25, 3);
			this.scene.rotate(45 * this.radunit, 0, 0, 1);

			this.top_fin.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
			this.scene.scale(1.6, 0.08, 0.4);
			this.scene.translate(0, 1, 10);
			this.scene.rotate(45 * this.radunit, 0, 0, 1);

			this.h_fin.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
		this.scene.rotate(90 * this.radunit, 0, 0, 1);
			this.scene.scale(1.6, 0.1, 0.4);
			this.scene.translate(0, 1, 10);
			this.scene.rotate(45 * this.radunit, 0, 0, 1);


			this.v_fin.display();
		this.scene.popMatrix();
		
	this.scene.popMatrix();
};
