/**
 * MyQuad
 * @param gl {WebGLRenderingContext}
 * @constructor
 */
function MyQuad(scene, slices) {
	CGFobject.call(this, scene);

	this.slices = slices;

	this.initBuffers();
}

MyQuad.prototype = Object.create(CGFobject.prototype);
MyQuad.prototype.constructor=MyQuad;

MyQuad.prototype.initBuffers = function () {
	var deg_rad = Math.PI / 180;

	var angle = 360.0 / this.slices;

	this.vertices = [];
	for (i = 0; i < this.slices; ++i)
	{
		this.vertices.push(Math.cos(deg_rad * i * angle));
		this.vertices.push(Math.sin(deg_rad * i * angle));
		this.vertices.push(0);
	}
	this.vertices.push(0);
	this.vertices.push(0);
	this.vertices.push(0);

	this.indices = [];
	for (i = 0; i < this.slices; ++i)
	{
		this.indices.push(i);
		this.indices.push((i + 1) % this.slices);
		this.indices.push((this.vertices.length / 3) - 1);
	}

	this.normals = [];
	for (i = 0; i < this.slices; ++i)
	{
		this.normals.push(0);
		this.normals.push(0);
		this.normals.push(1);
	}
	this.normals.push(0);
	this.normals.push(0);
	this.normals.push(1);

	this.texCoords = [];
	for (i = 0; i < this.slices; ++i)
	{
		this.texCoords.push((Math.cos(deg_rad * i * angle) + 1) / 2);
		this.texCoords.push((-Math.sin(deg_rad * i * angle) + 1) / 2);
	}
    this.texCoords.push(0.5);
    this.texCoords.push(0.5);

	this.primitiveType=this.scene.gl.TRIANGLES;
	this.initGLBuffers();
};
