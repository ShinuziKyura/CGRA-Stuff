/*
 * Custom class for ease of representation and animation of submarine fins
 * Not suitable for use elsewhere
 */

function MySubmarineFin(scene, type_fin = 0) {
	CGFobject.call(this, scene);

    this.radunit = Math.PI / 180.0;
    this.type_fin = type_fin;

    this.fin = new MyPrism(scene, 4, 4, 0, 0);
    this.left_fin = new MyTrapezoid(scene, 0, -1, 0);
    this.right_fin = new MyTrapezoid(scene, -1, 0, 0);
}

MySubmarineFin.prototype = Object.create(CGFobject.prototype);
MySubmarineFin.prototype.constructor = MySubmarineFin;

MySubmarineFin.prototype.displayFin = function () {
    this.scene.pushMatrix();
        if (this.type_fin == 0)
        {
			this.scene.scale(3.28, 0.08, 0.325); // 1.64 / 0.707 / 0.707 , 0.23 * 2 * 0.707
            this.scene.rotate(90 * this.radunit, 0, 1, 0);
            this.scene.rotate(45 * this.radunit, 0, 0, 1);
        }
        else
        {
			this.scene.scale(2.071, 0.04, 0.325); // 1.035 / 0.707 / 0.707
			this.scene.rotate(90 * this.radunit, 0, 1, 0);
			this.scene.rotate(45 * this.radunit, 0, 0, 1);
        }

        this.fin.display();
    this.scene.popMatrix();
    this.scene.pushMatrix();
        if (this.type_fin == 0)
        {
			this.scene.scale(0.46, 0.113, 0.46);
			this.scene.rotate(90 * this.radunit, 0, 1, 0);
			this.scene.translate(0, 0, -1);
        }
        else
        {
			this.scene.scale(0.46, 0.057, 0.46);
            this.scene.rotate(90 * this.radunit, 0, 1, 0);
            this.scene.translate(0, 0, -1);
        }

        this.left_fin.display();
    this.scene.popMatrix();
    this.scene.pushMatrix();
        if (this.type_fin == 0)
        {
            this.scene.scale(0.46, 0.113, 0.46);
            this.scene.rotate(90 * this.radunit, 0, -1, 0);
            this.scene.translate(0, 0, -8.13);
        }
        else
        {
			this.scene.scale(0.46, 0.057, 0.46);
			this.scene.rotate(90 * this.radunit, 0, -1, 0);
			this.scene.translate(0, 0, -5.5);
        }

        this.right_fin.display();
    this.scene.popMatrix();
}
