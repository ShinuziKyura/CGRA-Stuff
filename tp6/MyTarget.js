function MyTarget(scene, x, y, z) {
	CGFobject.call(this, scene);

    this.radunit = Math.PI / 180.0;

    this.x = x;
    this.y = y;
    this.z = z;
    this.y_angle = 0;

    this.buoy_head_top = new MyLamp(scene, 32, 16, 0);
    this.buoy_head_bot = new MyCylinder(scene, 32, 4, 0, 0);
    this.base_head = new MyQuad(scene, 32);
    this.buoy_body_top = new MyCylinder(scene, 32, 4, 0, 0);
    this.base_body = new MyQuad(scene, 32);
    this.buoy_body_bot = new MyCylinder(scene, 32, 4, 0.5, 0);
    this.base_bot = new MyQuad(scene, 32);
    this.buoy_bot = new MyLamp(scene, 32, 16, 0);
}

MyTarget.prototype = Object.create(CGFobject.prototype);
MyTarget.prototype.constructor = MyTarget;

MyTarget.prototype.displayTarget = function () {
    this.y_angle = (this.y_angle + 1) % 360;
    this.y += Math.sin(this.y_angle * this.radunit) / 50.0;
    this.scene.translate(this.x, this.y, this.z);
    this.scene.pushMatrix();
        this.scene.pushMatrix();
            this.scene.rotate(90 * this.radunit, 1, 0, 0);
            this.buoy_bot.display();
            this.base_bot.display();
        this.scene.popMatrix();
        this.scene.pushMatrix();
            this.scene.rotate(90 * this.radunit, -1, 0, 0);
            this.scene.scale(0.5, 0.5, 1);
            this.buoy_body_bot.display();
        this.scene.popMatrix();
        this.scene.pushMatrix();
            this.scene.rotate(90 * this.radunit, -1, 0, 0);
            this.scene.scale(0.375, 0.375, 0.1);
            this.scene.translate(0, 0, 10);
            this.buoy_body_top.display();
            this.scene.rotate(180 * this.radunit, 1, 0, 0);
            this.base_body.display();
        this.scene.popMatrix();
        this.scene.pushMatrix();
            this.scene.rotate(90 * this.radunit, -1, 0, 0);
            this.scene.scale(0.125, 0.125, 0.125);
            this.scene.translate(0, 0, 8.75);
            this.buoy_head_bot.display();
            this.scene.scale(3, 3, 1);
            this.base_head.display();
        this.scene.popMatrix();
        this.scene.pushMatrix();
            this.scene.rotate(90 * this.radunit, -1, 0, 0);
            this.scene.scale(0.125, 0.125, 0.125);
            this.scene.translate(0, 0, 9.75);
            this.buoy_head_top.display();
        this.scene.popMatrix();
    this.scene.popMatrix();
}
