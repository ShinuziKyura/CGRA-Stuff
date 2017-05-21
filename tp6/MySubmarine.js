var MAX_DISTANCE = 2147483647;

function MySubmarine(scene) {
	CGFobject.call(this, scene);

	this.radunit = Math.PI / 180.0;

	var texture1 = "..\\resources\\images\\rust.jpg";

	this.delta = 0;
	this.lastTime = 0;
	this.beginMove = 0;

	this.pos_x = -10;
	this.pos_y = 5;
	this.pos_z = 0;
	this.periscope_height = 0;

	this.forward = 0;
	this.backward = 0;
	this.left = 0;
	this.right = 0;
	this.up = 0;
	this.down = 0;
	this.periscope_up = 0;
	this.periscope_down = 0;

	this.h_fin_angle = 0;
	this.v_fin_angle = 0;
	this.prop_angle = 0;

	this.pos_rotation = 180;
	this.last_rotation = -1;
	this.rotation_speed_left = 0;
	this.rotation_speed_right = 0;
	this.pos_angle = 0;
	this.angle_speed_up = 0;
	this.angle_speed_down = 0;

	this.speed = 0;
	this.maxSpeed = 4.167;
	this.accel = 0;

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
	this.h_fin = new MySubmarineFin(scene, 0);
	this.v_fin = new MySubmarineFin(scene, 0);
	this.top_fin = new MySubmarineFin(scene, 1);
	this.propeller_left = new MySubmarineFin(scene, 0);
	this.propeller_right = new MySubmarineFin(scene, 0);
	this.propeller_counter_left = new MySubmarineFin(scene, 0);
	this.propeller_counter_right = new MySubmarineFin(scene, 0);
	this.propeller_left_axis = new MyLamp(scene, 32, 16, 0);
	this.propeller_right_axis = new MyLamp(scene, 32, 16, 0);

	this.target = null;
	this.target_distance = MAX_DISTANCE;
	this.torpedo = null;
	this.torpedo_active = 0;
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
			this.scene.translate(-1.64, 0, 8.39);
			this.scene.pushMatrix();
				this.scene.rotate(this.h_fin_angle * this.radunit, 1, 0, 0);

				this.h_fin.displayFin();
			this.scene.popMatrix();
		this.scene.popMatrix();

		this.scene.pushMatrix();
			this.scene.rotate(90 * this.radunit, 0, 0, 1);
			this.scene.translate(-1.64, 0, 8.39);
			this.scene.pushMatrix();
				this.scene.rotate(this.v_fin_angle * this.radunit, -1, 0, 0);

				this.v_fin.displayFin();
			this.scene.popMatrix();
		this.scene.popMatrix();

		this.scene.pushMatrix();
			this.scene.rotate(180 * this.radunit, 0, 1, 0);
			this.scene.translate(-1.035, 1.5, -3.29);

			this.top_fin.displayFin();
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

		this.scene.pushMatrix();
			this.scene.translate(-1.05, -.5, 7.95);
			this.scene.rotate(90 * this.radunit, 1, 0, 0);
			this.scene.pushMatrix();
				this.scene.rotate(this.prop_angle * this.radunit, 0, 1, 0);
				this.scene.scale(0.1, 0.3, .3);

				this.propeller_left.displayFin();
			this.scene.popMatrix();
		this.scene.popMatrix();

		this.scene.pushMatrix();
			this.scene.translate(-1.05, -.5, 7.95);
			this.scene.rotate(90 * this.radunit, -1, 0, 0);
			this.scene.rotate(180 * this.radunit, 0, 0, 1);
			this.scene.pushMatrix();
				this.scene.rotate(this.prop_angle * this.radunit, 0, 1, 0);
				this.scene.scale(0.1, 0.3, .3);

				this.propeller_counter_left.displayFin();
			this.scene.popMatrix();
		this.scene.popMatrix();

		this.scene.pushMatrix();
			this.scene.translate(1.05, -.5, 7.95);
			this.scene.rotate(90 * this.radunit, 1, 0, 0);
			this.scene.pushMatrix();
				this.scene.rotate(this.prop_angle * this.radunit, 0, 1, 0);
				this.scene.scale(0.1, 0.3, 0.3);

				this.propeller_right.displayFin();
			this.scene.popMatrix();
		this.scene.popMatrix();

		this.scene.pushMatrix();
			this.scene.translate(1.05, -.5, 7.95);
			this.scene.rotate(90 * this.radunit, -1, 0, 0);
			this.scene.rotate(180 * this.radunit, 0, 0, 1);
			this.scene.pushMatrix();
				this.scene.rotate(this.prop_angle * this.radunit, 0, 1, 0);
				this.scene.scale(0.1, 0.3, .3);

				this.propeller_counter_right.displayFin();
			this.scene.popMatrix();
		this.scene.popMatrix();

		this.scene.pushMatrix();

			this.scene.translate(1.05, -.5, 7.95);
			this.scene.scale(.09, .09, .09); // 0.57 * 1.5 // on a 1,1,2 scale
			this.scene.rotate(180 * this.radunit, 0, 1, 0);
			this.propeller_left_axis.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();

			this.scene.translate(-1.05, -.5, 7.95);
			this.scene.scale(.09, .09, .09); // 0.57 * 1.5 // on a 1,1,2 scale
			this.scene.rotate(180 * this.radunit, 0, 1, 0);
			this.propeller_right_axis.display();
		this.scene.popMatrix();

	this.scene.popMatrix();
};

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
	if (this.accel > 16.667)
		this.accel = 16.667;
	else
		this.accel += 1 / 600.0;
};

MySubmarine.prototype.decrementAcceleration = function () {
	if (this.accel < -8.333)
		this.accel = -8.333;
	else
		this.accel -= 1 / 600.0;
};

MySubmarine.prototype.rotateSubmarine = function(direction) {
	// 0 -> left
	if (direction == 0) {
   		this.pos_rotation += Math.sin(this.rotation_speed_left * this.radunit);
    	this.pos_rotation %= 360;
	}
	else {
		this.pos_rotation -= Math.sin(this.rotation_speed_right * this.radunit);
        if (this.pos_rotation < 0)
			this.pos_rotation += 360;
	}
};

MySubmarine.prototype.angleSubmarine = function(direction) {
	// 0 -> Up
	if (direction == 0) {
		this.pos_angle += Math.sin(this.angle_speed_up * this.radunit);
		if (this.pos_angle > 30)
			this.pos_angle = 30;
	}
	else {
		this.pos_angle -= Math.sin(this.angle_speed_down * this.radunit);
		if (this.pos_angle < -30)
			this.pos_angle = -30;
	}
};

MySubmarine.prototype.move = function(direction) {
	if (direction == 'front')
		this.forward = 1;
	if (direction == 'back')
		this.backward = 1;
	if (direction == 'left')
		this.left = 1;
	if (direction == 'right')
		this.right = 1;
	if (direction == 'up')
		this.up = 1;
	if (direction == 'down')
		this.down = 1;
	if (direction == 'p_up')
		this.periscope_up = 1;
	if (direction == 'p_down')
		this.periscope_down = 1;
}

MySubmarine.prototype.stop = function(direction) {
	if (direction == 'front')
		this.forward = 0;
	if (direction == 'back')
		this.backward = 0;
	if (direction == 'left')
		this.left = 0;
	if (direction == 'right')
		this.right = 0;
	if (direction == 'up')
		this.up = 0;
	if (direction == 'down')
		this.down = 0;
	if (direction == 'p_up')
		this.periscope_up = 0;
	if (direction == 'p_down')
		this.periscope_down = 0;
}

MySubmarine.prototype.updateSubmarine = function (currTime) { // fuse with display?
	this.delta = currTime - this.lastTime;
	if (this.delta >= 16.667) // 60 fps
	{
		if (this.forward == 1 && this.backward == 1)
		{
			this.forward = 0;
			this.backward = 0;
		}
		if (this.forward == 1) {
			if (this.beginMove == 0)
				this.beginMove = currTime;
			this.incrementAcceleration();
		}
		if (this.backward == 1) {
			if (this.beginMove == 0)
				this.beginMove = currTime;
			this.decrementAcceleration();
		}
		if (this.forward == 0 && this.backward == 0 && this.accel != 0) {
			this.accel = 0;
			this.beginMove = 0;
		}

		if (this.left == 1 && this.right == 1)
		{
			this.left = 0;
			this.right = 0;
		}
		if (this.left == 1)
		{
			if (this.rotation_speed_right != 0)
			{
				this.rotation_speed_right -= 1;
			}
			else
			{
				this.rotation_speed_left += 1;
				if (this.rotation_speed_left > 90)
					this.rotation_speed_left = 90;
				this.last_rotation = 0;
			}
			this.rotateSubmarine(this.last_rotation);
		}
		else
		{
			this.rotation_speed_left -= 1;
			if (this.rotation_speed_left < 0)
				this.rotation_speed_left = 0;
		}
		if (this.right == 1)
		{
			if (this.rotation_speed_left != 0)
			{
				this.rotation_speed_left -= 1;
			}
			else
			{
				this.rotation_speed_right += 1;
				if (this.rotation_speed_right > 90)
					this.rotation_speed_right = 90;
				this.last_rotation = 1;
			}
			this.rotateSubmarine(this.last_rotation);
		}
		else
		{
			this.rotation_speed_right -= 1;
			if (this.rotation_speed_right < 0)
				this.rotation_speed_right = 0;
		}
		if (this.right == 0 && this.left == 0 && this.last_rotation != -1)
		{
			this.rotateSubmarine(this.last_rotation);
			if (this.rotation_speed_left == 0 && this.rotation_speed_right == 0)
				this.last_rotation = -1;
		}

		if (this.up == 1 && this.down == 1)
		{
			this.up = 0;
			this.down = 0;
		}
		if (this.up == 1)
		{
			this.angle_speed_up += 1;
			if (this.angle_speed_up > 30)
				this.angle_speed_up = 30;
			this.angleSubmarine(0);
		}
		else {
			this.angle_speed_up -= 1;
			if (this.angle_speed_up < 0)
				this.angle_speed_up = 0;
		}
		if (this.down == 1)
		{
			this.angle_speed_down += 1;
			if (this.angle_speed_down > 30)
				this.angle_speed_down = 30;
			this.angleSubmarine(1);
		}
		else {
			this.angle_speed_down -= 1;
			if (this.angle_speed_down <= 0)
				this.angle_speed_down = 0;
		}
		if (this.up == 0 && this.down == 0 && this.pos_angle != 0)
		{
			if (this.pos_angle > 0)
				this.angle_speed_down = this.angle_speed_up;
			else
				this.angle_speed_up = this.angle_speed_down;
			this.pos_angle -= (this.pos_angle / 10.0);
		}

		if (this.periscope_up == 1) {
			this.incrementPeriscopeHeight();
		}
		if (this.periscope_down == 1) {
			this.decrementPeriscopeHeight();
		}

		this.speed += this.accel * (currTime - this.beginMove) / 1000;
		if (this.speed > this.maxSpeed)
			this.speed = this.maxSpeed;
		if (this.speed < -(this.maxSpeed / 2.0))
			this.speed = -(this.maxSpeed / 2.0);
		if (this.accel == 0 && this.speed != 0)
		{
//			this.speed -= (this.speed / 10.0); // Comment this line to obtain asked functionality
			if (this.speed < 0.001 && this.speed > -0.001)
				this.speed = 0;
		}

		this.pos_x += (this.speed / 5) * -Math.sin(this.pos_rotation * this.radunit);
	    this.pos_y += Math.sin(this.pos_angle * this.radunit);
		this.pos_z += (this.speed / 5) * -Math.cos(this.pos_rotation * this.radunit);

		this.h_fin_angle = -this.pos_angle;
		this.v_fin_angle = this.speed >= 0 ? 30 * Math.sin(this.rotation_speed_left * this.radunit) - 30 * Math.sin(this.rotation_speed_right * this.radunit) :
		 									30 * Math.sin(this.rotation_speed_right * this.radunit) - 30 * Math.sin(this.rotation_speed_left * this.radunit);
		this.prop_angle = (this.prop_angle + this.speed * 6) % 360;

		var min_index = null;
		var min_dist = MAX_DISTANCE;
		var tmp_dist = null;
		for (i = 0; i < this.scene.targets.length; ++i)
			if ((tmp_dist = Math.pow(this.scene.targets[i].pos_x - this.pos_x, 2) +
							Math.pow(this.scene.targets[i].pos_y - this.pos_y, 2) +
							Math.pow(this.scene.targets[i].pos_z - this.pos_z, 2)) < min_dist)
			{
				min_index = i;
				min_dist = tmp_dist;
			}
		if (min_dist != MAX_DISTANCE)
		{
			this.target = this.scene.targets[min_index];
			this.target_distance = Math.sqrt(min_dist);
		}

		if (this.torpedo_active == 1)
		{
			this.torpedo.updateTorpedo(currTime);
			if (this.torpedo.t >= 1)
			{
				this.torpedo = null;
				this.scene.torpedo_active = (this.torpedo_active = 0);
			}
		}

		this.lastTime = currTime;
	}
};

MySubmarine.prototype.activateTorpedo = function() {
	if (this.torpedo_active == 0)
	{
		this.scene.torpedo = (this.torpedo = new MyTorpedo(this.scene, this));
		this.scene.torpedo_active = (this.torpedo_active = 1);
	}
}
