/**
 * MyQuad
 * @param gl {WebGLRenderingContext}
 * @constructor
 */
function MyQuad(scene, min_s = 0, max_s = 1, min_t = 0, max_t = 1) {
	CGFobject.call(this, scene);

	this.initBuffers(min_s, max_s, min_t, max_t);
}

MyQuad.prototype = Object.create(CGFobject.prototype);
MyQuad.prototype.constructor=MyQuad;

MyQuad.prototype.initBuffers = function (min_s, max_s, min_t, max_t) {
	this.vertices = [
        -0.5, 0.5, 0, // 0
		0.5, 0.5, 0, // 1
		-0.5, -0.5, 0, // 2
        0.5, -0.5, 0 // 3
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

	this.texCoords = [
		min_s, min_t,
		max_s, min_t,
		min_s, max_t,
		max_s, max_t
	];

	this.primitiveType=this.scene.gl.TRIANGLES;
	this.initGLBuffers();
};
