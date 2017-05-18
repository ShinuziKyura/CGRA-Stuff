function MySubmarine(scene) {
	CGFobject.call(this, scene);

	this.radunit = Math.PI / 180.0;

	var texture1 = "..\\resources\\images\\rust.jpg";

	this.speed = 0.05;

	this.main_body = new MyCylinder(scene, 32, 4, 0);
	this.front_body = new MyLamp(scene, 32, 16, 0);
	this.rear_body = new MyLamp(scene, 32, 16, 0);
	this.top_body = new MyCylinder(scene, 32, 4, 0);
	this.top_body_base = new MyQuad(scene, 32);
	this.propeller_left_body = new MyCylinder(scene, 32, 4, 0); // wont work as is
	this.propeller_right_body = new MyCylinder(scene, 32, 4, 0);
	this.h_fin = new MyPrism(scene, 4, 4, 0, 0);
	this.v_fin = new MyPrism(scene, 4, 4, 0, 0);
	this.top_fin = new MyPrism(scene, 4, 4, 0, 0);
	this.h_left_fin = new MyTrapezoid(scene, 0, -1, 0);
	this.h_right_fin = new MyTrapezoid(scene, -1, 0, 0);
	this.v_top_fin = new MyTrapezoid(scene, 0, -1, 0);
	this.v_bot_fin = new MyTrapezoid(scene, -1, 0, 0);
	this.top_left_fin = new MyTrapezoid(scene, -1, 0, 0);
	this.top_right_fin = new MyTrapezoid(scene, 0, -1, 0);
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
			this.scene.scale(0.73, 0.94, 8.16); // on a 1,1,2 scale

			this.main_body.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
			this.scene.scale(0.73, 0.94, 0.92); // on a 1,1,2 scale
			this.scene.rotate(180 * this.radunit, 1, 0, 0);

			this.front_body.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
			this.scene.scale(0.73, 0.94, 0.92); // on a 1,1,2 scale
			this.scene.translate(0, 0, 8.86);

			this.rear_body.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
			this.scene.rotate(90 * this.radunit, 1, 0, 0);
			this.scene.scale(0.63, 0.88, 1.71); // 0.57 * 1.5 // on a 1,1,2 scale
			this.scene.translate(0, 3.636, -1.22);

			this.top_body.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
			this.scene.rotate(90 * this.radunit, -1, 0, 0);
			this.scene.scale(0.63, 0.88, 1.14); // on a 1,1,2 scale
			this.scene.translate(0, -3.636, 1.83);

			this.top_body_base.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
			this.scene.scale(0.4, 0.4, 0.46);
			this.scene.translate(-2.65, -1.2, 16.75);

			this.propeller_left_body.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
			this.scene.scale(0.4, 0.4, 0.46);
			this.scene.translate(2.65, -1.2, 16.75);

			this.propeller_right_body.display();
		this.scene.popMatrix();

 		// this no longer makes any sense, fuck the guy who invented this retarded implementation
		this.scene.pushMatrix();
			this.scene.scale(3.28, 0.08, 0.325); // 1.64 / 0.707 / 0.707 // 0.23 * 2 * 0.707
			this.scene.translate(-0.5, 1, 25.83);
			this.scene.rotate(90 * this.radunit, 0, 1, 0);
			this.scene.rotate(45 * this.radunit, 0, 0, 1);

			this.h_fin.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
			this.scene.scale(0.08, 3.28, 0.325); // 1.64 / 0.707 / 0.707 // 0.23 * 2 * 0.707
			this.scene.translate(0, 0.5, 25.83);
			this.scene.rotate(90 * this.radunit, 1, 0, 0);
			this.scene.rotate(45 * this.radunit, 0, 0, 1);

			this.v_fin.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
			this.scene.scale(2.071, 0.04, 0.325); // 1.035 / 0.707 / 0.707
			this.scene.translate(-0.5, 40, 10);
			this.scene.rotate(90 * this.radunit, 0, 1, 0);
			this.scene.rotate(45 * this.radunit, 0, 0, 1);

			this.top_fin.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
			this.scene.scale(0.46, 0.113, 0.46);
			this.scene.rotate(90 * this.radunit, 0, 1, 0);
			this.scene.translate(-18.25, 0.708, -4.566);

			this.h_left_fin.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
			this.scene.scale(0.46, 0.113, 0.46);
			this.scene.rotate(90 * this.radunit, 0, -1, 0);
			this.scene.translate(18.25, 0.708, -4.566);

			this.h_right_fin.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
			this.scene.scale(0.113, 0.46, 0.46);
			this.scene.rotate(90 * this.radunit, 0, 1, 0);
			this.scene.rotate(90 * this.radunit, 1, 0, 0);
			this.scene.translate(-18.25, 0, -4.566);

			this.v_top_fin.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
			this.scene.scale(0.113, 0.46, 0.46);
			this.scene.rotate(90 * this.radunit, 0, 1, 0);
			this.scene.rotate(90 * this.radunit, -1, 0, 0);
			this.scene.rotate(180 * this.radunit, 0, 0, 1);
			this.scene.translate(18.25, 0, -4.566);

			this.v_bot_fin.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
			this.scene.scale(0.46, 0.057, 0.46);
			this.scene.rotate(90 * this.radunit, 0, 1, 0);
			this.scene.translate(-7.065, 28.08, -3.25);

			this.top_left_fin.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
			this.scene.scale(0.46, 0.057, 0.46);
			this.scene.rotate(90 * this.radunit, 0, -1, 0);
			this.scene.translate(7.065, 28.08, -3.25);

			this.top_right_fin.display();
		this.scene.popMatrix();

	this.scene.popMatrix();
};
