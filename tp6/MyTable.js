/**
 * MyTable
 * @param gl {WebGLRenderingContext}
 * @constructor
 */
function MyTable(scene) {
	CGFobject.call(this,scene);

	this.tableAppearance = new CGFappearance(scene);
	this.tableAppearance.setAmbient(0.3,0.3,0.3,1);
	this.tableAppearance.setDiffuse(0.725,0.425,0.125,1);
	this.tableAppearance.setSpecular(0.725,0.215,0.1,1);
	this.tableAppearance.setShininess(10);
	this.tableAppearance.loadTexture("..\\resources\\images\\table.png");

	this.cube = new MyUnitCubeQuad(this.scene);
};

MyTable.prototype = Object.create(CGFobject.prototype);
MyTable.prototype.constructor=MyTable;

MyTable.prototype.displayTableTop = function () {
	this.scene.pushMatrix();
	this.scene.translate(0, 3.65, 0);
	this.scene.scale(5, 0.3, 3);

	this.tableAppearance.apply();
	this.cube.display();
	this.scene.popMatrix();
};

MyTable.prototype.displayTableLegs = function () {
	this.scene.pushMatrix();
	this.scene.translate(-2.3, 1.75, -1.3);
	this.scene.scale(0.3, 3.5, 0.3);
	this.cube.display();
	this.scene.popMatrix();
	this.scene.pushMatrix();
	this.scene.translate(2.3, 1.75, -1.3);
	this.scene.scale(0.3, 3.5, 0.3);
	this.cube.display();
	this.scene.popMatrix();
	this.scene.pushMatrix();
	this.scene.translate(-2.3, 1.75, 1.3);
	this.scene.scale(0.3, 3.5, 0.3);
	this.cube.display();
	this.scene.popMatrix();
	this.scene.pushMatrix();
	this.scene.translate(2.3, 1.75, 1.3);
	this.scene.scale(0.3, 3.5, 0.3);
	this.cube.display();
	this.scene.popMatrix();
};
