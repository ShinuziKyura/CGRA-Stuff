function MySubmarine(scene) {
	CGFobject.call(this, scene);

	this.radunit = Math.PI / 180.0;

	var texture1 = "..\\resources\\images\\rust.jpg";

	this.delta = 0;
	this.lastTime = 0;
	this.speed = 0.05;

	this.periscope_up = 0;
	this.periscope_down = 0;
	this.periscope_height = 0;

	this.pos_x = -10;
	this.pos_y = 5;
	this.pos_z = 0;

	this.forward = 0;
	this.back = 0;
	this.left = 0;
	this.right = 0;
	this.up = 0;
	this.down = 0;

	this.h_fin_angle = 0;
	this.v_fin_angle = 0;
	this.prop_angle = 0;

	this.v_angle = 0;

	this.pos_rotation = 180;

	this.speed = 0;
	this.rotation_speed = 0;
	this.last_rotation = -1;
	this.total_accel = 0;
	this.accel = 0.5;

	this.main_body = new MyCylinder(scene, 32, 4, 0, 0);
	this.front_body = new MyLamp(scene, 32, 16, 0);
	this.rear_body = new MyLamp(scene, 32, 16, 0);
	this.top_body = new MyCylinder(scene, 32, 4, 0, 0);
	this.top_body_base = new MyQuad(scene, 32);
	this.propeller_left_body = new MyCylinder(scene, 32, 4, 0, 0); // wont work as is
	this.propeller_right_body = new MyCylinder(scene, 32, 4, 0, 0);
	this.periscope_main = new MyCylinder(scene, 32, 4, 0, 0);
	this.periscope_top = new MyCylinder(scene, 32, 4, 0, 0);
	this.periscope_top_base = new MyQuad(scene, 32);
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

		this.scene.pushMatrix();
			this.scene.rotate(this.h_fin_angle * this.radunit, 1, 0, 0);
			this.scene.scale(3.28, 0.08, 0.325); // 1.64 / 0.707 / 0.707 // 0.23 * 2 * 0.707
			this.scene.translate(-0.5, 1, 25.83);
			this.scene.rotate(90 * this.radunit, 0, 1, 0);
			this.scene.rotate(45 * this.radunit, 0, 0, 1);

			this.h_fin.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
			this.scene.rotate(this.v_fin_angle * this.radunit, 0, 1, 0);
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
			this.scene.rotate(this.h_fin_angle * this.radunit, 1, 0, 0);
			this.scene.scale(0.46, 0.113, 0.46);
			this.scene.rotate(90 * this.radunit, 0, 1, 0);
			this.scene.translate(-18.25, 0.708, -4.566);

			this.h_left_fin.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
			this.scene.rotate(this.h_fin_angle * this.radunit, 1, 0, 0);
			this.scene.scale(0.46, 0.113, 0.46);
			this.scene.rotate(90 * this.radunit, 0, -1, 0);
			this.scene.translate(18.25, 0.708, -4.566);

			this.h_right_fin.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
			this.scene.rotate(this.v_fin_angle * this.radunit, 0, 1, 0);
			this.scene.scale(0.113, 0.46, 0.46);
			this.scene.rotate(90 * this.radunit, 0, 1, 0);
			this.scene.rotate(90 * this.radunit, 1, 0, 0);
			this.scene.translate(-18.25, 0, -4.566);

			this.v_top_fin.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
			this.scene.rotate(this.v_fin_angle * this.radunit, 0, 1, 0);
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

		this.scene.pushMatrix();
			this.scene.translate(0, 2, 2.8);
			this.scene.rotate(90 * this.radunit, 1, 0, 0);
			this.scene.scale(0.13, 0.13, -0.7 - this.periscope_height); // 0.57 * 1.5 // on a 1,1,2 scale

			this.periscope_main.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
			this.scene.translate(0, 2.6 + this.periscope_height, 2.3);
			this.scene.scale(0.13, 0.13, .6); // 0.57 * 1.5 // on a 1,1,2 scale

			this.periscope_top.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
			this.scene.rotate(180 * this.radunit, 0, 1, 0);
			this.scene.translate(0, 2.6 + this.periscope_height, -2.3);
			this.scene.scale(0.13, 0.13, 2.6); // 0.57 * 1.5 // on a 1,1,2 scale

			this.periscope_top_base.display();
		this.scene.popMatrix();

	this.scene.popMatrix();
};
/* // Repeated periscope functions
MySubmarine.prototype.decrementPeriscopeHeight = function () {
	if ( this.submarine.periscope_height > 0)
		this.submarine.periscope_height -= 0.1;
	else
		this.submarine.periscope_height = 0;
}

MySubmarine.prototype.incrementPeriscopeHeight = function () {
	if ( this.submarine.periscope_height < 5)
		this.submarine.periscope_height += 1;
	else
		this.submarine.periscope_height = 5;
}
*/
MySubmarine.prototype.decrementPeriscopeHeight = function () {
	if ( this.periscope_height > 0)
		this.periscope_height -= 0.1;
	else
		this.periscope_height = 0;
};

MySubmarine.prototype.incrementPeriscopeHeight = function () {
	if ( this.periscope_height < 1)
		this.periscope_height += 0.1;
	else
		this.periscope_height = 1;
};

MySubmarine.prototype.incrementAcceleration = function () {
	if (this.total_accel > 5)
		this.total_accel = 5;
	else
		this.total_accel += this.accel;
};

MySubmarine.prototype.decrementAcceleration = function () {
	if (this.total_accel < -5)
		this.total_accel = -5;
	else
		this.total_accel -= this.accel;
};

MySubmarine.prototype.rotateSubmarine = function(direction) {
	// 0 -> left
	if (direction == 0) {
   		this.pos_rotation += Math.sin(this.rotation_speed * this.radunit) * 10;
    	this.pos_rotation %= 360;
	}
	else {
		this.pos_rotation -= Math.sin(this.rotation_speed * this.radunit) * 10;
        if (this.pos_rotation < 0)
			this.pos_rotation += 360;
	}
};

MySubmarine.prototype.move = function(direction) {
	if (direction == 'front')
		this.forward = 1;
	if (direction == 'back')
		this.back = 1;
	if (direction == 'right')
		this.right = 1;
	if (direction == 'left')
		this.left = 1;
	if (direction == 'p_up')
		this.periscope_up = 1;
	if (direction == 'p_down')
		this.periscope_down = 1;
	if (direction == 'up')
		this.up = 1;
	if (direction == 'down')
		this.down = 1;
}

MySubmarine.prototype.stop = function(direction) {
	if (direction == 'front')
		this.forward = 0;
	if (direction == 'back')
		this.back = 0;
	if (direction == 'right')
		this.right = 0;
	if (direction == 'left')
		this.left = 0;
	if (direction == 'p_up')
		this.periscope_up = 0;
	if (direction == 'p_down')
		this.periscope_down = 0;
	if (direction == 'up')
		this.up = 0;
	if (direction == 'down')
		this.down = 0;
}

MySubmarine.prototype.update = function (currTime) {
	this.delta = currTime - this.lastTime;
	this.lastTime = currTime;
	var seconds = (this.delta / (1000));

	if (seconds > 1)
		seconds = 0;

	if (this.forward == 1) {
		this.incrementAcceleration();
	}
	if (this.back == 1) {
		this.decrementAcceleration();
	}
	if (this.left == 1) {
		this.rotation_speed += 1;
		this.last_rotation = 0;
		this.rotateSubmarine(this.last_rotation);
	}
	if (this.right == 1) {
		this.rotation_speed += 1;
		this.last_rotation = 1;
		this.rotateSubmarine(this.last_rotation);
	}
	if (this.periscope_up == 1) {
		this.incrementPeriscopeHeight();
	}
	if (this.periscope_down == 1) {
		this.decrementPeriscopeHeight();
	}
	if (this.right == 0 && this.left == 0 && this.rotation_speed > 0)
	{
		this.rotation_speed -= 1;
		this.rotateSubmarine(this.last_rotation);
	}
	if (this.forward == 0 && this.back == 0 && this.total_accel != 0) {
		this.total_accel = 0;
	}

	this.speed += this.total_accel / this.delta;
	if (this.speed > 5)
		this.speed = 5;
	if (this.speed < -5)
		this.speed = -5;
	if (this.total_accel == 0 && this.speed != 0)
	{
		this.speed -= (this.speed / 100.0);
		if (this.speed < 0.01 && this.speed > -0.01)
			this.speed = 0;
	}

	if (this.left == 1 && this.right == 0) {
		if (this.h_fin_angle > 5)
			this.h_fin_angle -= seconds * 1000 * this.radunit;
		else
			if (this.h_fin_angle < -5)
				this.h_fin_angle += seconds * 1000 * this.radunit;
	}

	this.pos_x += (this.speed / 5) * -Math.sin(this.pos_rotation * this.radunit);
    this.pos_z += (this.speed / 5) * -Math.cos(this.pos_rotation * this.radunit);
    this.pos_y += Math.tan(this.v_angle) * 100 *(this.speed / 10 * seconds);

	if (this.up == 1) {
		if (this.h_fin_angle < 45)
			this.h_fin_angle += seconds * 10000 *this.radunit;
		this.v_angle += this.radunit * (this.speed < 0 ? 1 : -1);
		this.up = 0;
	}

	if (this.down == 1) {
		if (this.h_fin_angle > -45)
			this.h_fin_angle -= seconds * 10000 *this.radunit;
		this.v_angle += this.radunit * (this.speed > 0 ? 1 : -1);
		this.down = 0;
	}
	console.log(this.v_angle);
};
