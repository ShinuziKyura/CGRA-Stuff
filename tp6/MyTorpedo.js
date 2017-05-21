function MyTorpedo(scene, sub) {
	CGFobject.call(this, scene);

	this.radunit = Math.PI / 180.0;

	this.start_x = sub.pos_x;
	this.start_y = sub.pos_y - 1;
	this.start_z = sub.pos_z;
	this.start_rotation = sub.pos_rotation;

	this.pos_x = this.start_x;
	this.pos_y = this.start_y;
	this.pos_z = this.start_z;
	this.pos_rotation = 0;
	this.pos_angle = 0;

	this.target = sub.target;

	this.t = 0;
	this.delta = 16.667 / (sub.target_distance * 1000);

	this.torpedo_head = new MyLamp(scene, 32, 16, 0);
	this.torpedo_body = new MyCylinder(scene, 32, 16, 0, 0);
	this.torpedo_tail = new MyLamp(scene, 32, 16, 0);
	this.torpedo_h_fin = new MySubmarineFin(scene, 0);
	this.torpedo_v_fin = new MySubmarineFin(scene, 0);
}

MyTorpedo.prototype = Object.create(CGFobject.prototype);
MyTorpedo.prototype.constructor = MyTorpedo;

MyTorpedo.prototype.displayTorpedo = function () {
    this.scene.translate(this.pos_x, this.pos_y, this.pos_z);
	this.scene.pushMatrix();
		this.scene.rotate(this.pos_rotation, 0, 1, 0);
		this.scene.rotate(this.pos_angle, 1, 0, 0);
        this.scene.pushMatrix();
			this.scene.rotate(180 * this.radunit, 0, 1, 0);
			this.scene.scale(0.1, 0.1, 0.1);
            this.torpedo_tail.display();
        this.scene.popMatrix();
        this.scene.pushMatrix();
			this.scene.scale(0.1, 0.1, 0.8);
            this.torpedo_body.display();
        this.scene.popMatrix();
        this.scene.pushMatrix();
			this.scene.scale(0.1, 0.1, 0.1);
            this.scene.translate(0, 0, 8);
            this.torpedo_head.display();
        this.scene.popMatrix();
        this.scene.pushMatrix();
			this.scene.rotate(180 * this.radunit, 0, 1, 0);
			this.scene.scale(0.1, 0.1, 0.1);
			this.scene.translate(-1.64, 0, -0.3);
            this.torpedo_h_fin.displayFin();
        this.scene.popMatrix();
        this.scene.pushMatrix();
			this.scene.rotate(90 * this.radunit, 0, 0, 1);
			this.scene.rotate(180 * this.radunit, 0, 1, 0);
			this.scene.scale(0.1, 0.1, 0.1);
			this.scene.translate(-1.64, 0, -0.3);
            this.torpedo_v_fin.displayFin();
        this.scene.popMatrix();
	this.scene.popMatrix();
}

MyTorpedo.prototype.updateTorpedo = function(currTime)
{
	this.t += this.delta;

	var m1 = Math.pow(1 - this.t, 3);
	var m2 = 3 * this.t * Math.pow(1 - this.t, 2);
	var m3 = 3 * Math.pow(this.t, 2) * (1 - this.t);
	var m4 = Math.pow(this.t, 3);
	var p1 = {x: this.start_x, y: this.start_y, z: this.start_z};
	var p2 = {x: this.start_x + 6 * -Math.sin(this.start_rotation * this.radunit), y: this.start_y, z: this.start_z + 6 * -Math.cos(this.start_rotation * this.radunit)};
	var p3 = {x: this.target.pos_x, y: this.target.pos_y + 3, z: this.target.pos_z};
	var p4 = {x: this.target.pos_x, y: this.target.pos_y, z: this.target.pos_z};

	var old_pos_x = this.pos_x;
	var old_pos_y = this.pos_y;
	var old_pos_z = this.pos_z;

	this.pos_x = m1 * p1.x + m2 * p2.x + m3 * p3.x + m4 * p4.x;
	this.pos_y = m1 * p1.y + m2 * p2.y + m3 * p3.y + m4 * p4.y;
	this.pos_z = m1 * p1.z + m2 * p2.z + m3 * p3.z + m4 * p4.z;

	var delta_x = this.pos_x - old_pos_x;
	var delta_y = this.pos_y - old_pos_y;
	var delta_z = this.pos_z - old_pos_z;

	this.pos_rotation = delta_x / Math.abs(delta_x) * Math.acos(delta_z / Math.sqrt(Math.pow(delta_x, 2) + Math.pow(delta_z, 2)));
	this.pos_angle = Math.asin(-delta_y / Math.sqrt(Math.pow(delta_x, 2) + Math.pow(delta_y, 2) + Math.pow(delta_z, 2)));

	if (this.t >= 1)
		this.delta = 0;
}
