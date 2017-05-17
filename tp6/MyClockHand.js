/**
 * MyClockHand
 * @param gl {WebGLRenderingContext}
 * @constructor
 */
function MyClockHand(scene) {
	CGFobject.call(this, scene);

	this.radunit = Math.PI / 180.0;

	this.initBuffers();
}

MyClockHand.prototype = Object.create(CGFobject.prototype);
MyClockHand.prototype.constructor=MyClockHand;

MyClockHand.prototype.initBuffers = function () {
	this.vertices = [
        -0.004, 1, 0, // 0
		0.004, 1, 0, // 1
		-0.004, 0, 0, // 2
        0.004, 0, 0 // 3
	];

	this.indices = [
        2, 1, 0,
		1, 2, 3
    ];

	this.normals = [
		0, 0, 1,
		0, 0, 1,
		0, 0, 1,
		0, 0, 1
	];

	this.primitiveType=this.scene.gl.TRIANGLES;
	this.initGLBuffers();
};

MyClockHand.prototype.setAngle = function(angle)
{
	this.scene.rotate(-angle * this.radunit, 0, 0, 1);
};
