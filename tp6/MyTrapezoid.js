/**
 * MyTrapezoid
 * @constructor
 */
 function MyTrapezoid(scene, left_offset, right_offset, bases = 1) {
 	CGFobject.call(this,scene);

	this.left_offset = left_offset;
    this.right_offset = right_offset;
    this.bases = bases

 	this.initBuffers();
 };

 MyTrapezoid.prototype = Object.create(CGFobject.prototype);
 MyTrapezoid.prototype.constructor = MyTrapezoid;

 MyTrapezoid.prototype.initBuffers = function() {
    this.vertices = [
        0.5 + this.right_offset, -0.5, 0,
        0.5 + this.right_offset, 0.5, 0,
        0.5 + this.right_offset, 0.5, 0,
        -0.5 - this.left_offset, 0.5, 0,
        -0.5 - this.left_offset, 0.5, 0,
        -0.5 - this.left_offset, -0.5, 0,
        -0.5 - this.left_offset, -0.5, 0,
        0.5 + this.right_offset, -0.5, 0,
        0.5, -0.5, 1,
        0.5, 0.5, 1,
        0.5, 0.5, 1,
        -0.5, 0.5, 1,
        -0.5, 0.5, 1,
        -0.5, -0.5, 1,
        -0.5, -0.5, 1,
        0.5, -0.5, 1
    ];
    if (this.bases == 1)
    {
        this.vertices.push(0.5 + this.right_offset, -0.5, 0,
                            0.5 + this.right_offset, 0.5, 0,
                            -0.5 - this.left_offset, 0.5, 0,
                            -0.5 - this.left_offset, -0.5, 0,
                            0.5, -0.5, 1,
                            0.5, 0.5, 1,
                            -0.5, 0.5, 1,
                            -0.5, -0.5, 1);
    }

    this.indices = [
        0, 1, 8,
        1, 9, 8,
        2, 3, 10,
        3, 11, 10,
        4, 5, 12,
        5, 13, 12,
        6, 7, 14,
        7, 15, 14
    ];
    if (this.bases == 1)
    {
        this.indices.push(19, 17, 16,
                            19, 18, 17,
                            20, 21, 23,
                            21, 22, 23);
    }

 	this.normals = [
        Math.cos(45 * this.right_offset), 0, Math.sin(45 * this.right_offset),
        Math.cos(45 * this.right_offset), 0, Math.sin(45 * this.right_offset),
        0, 1, 0,
        0, 1, 0,
        -Math.cos(45 * this.left_offset), 0, Math.sin(45 * this.left_offset),
        -Math.cos(45 * this.left_offset), 0, Math.sin(45 * this.left_offset),
        0, -1, 0,
        0, -1, 0,
        Math.cos(45 * this.right_offset), 0, Math.sin(45 * this.right_offset),
        Math.cos(45 * this.right_offset), 0, Math.sin(45 * this.right_offset),
        0, 1, 0,
        0, 1, 0,
        -Math.cos(45 * this.left_offset), 0, Math.sin(45 * this.left_offset),
        -Math.cos(45 * this.left_offset), 0, Math.sin(45 * this.left_offset),
        0, -1, 0,
        0, -1, 0
    ];
    if (this.bases == 1)
    {
        this.normals.push(0, 0, -1,
                            0, 0, -1,
                            0, 0, -1,
                            0, 0, -1,
                            0, 0, 1,
                            0, 0, 1,
                            0, 0, 1,
                            0, 0, 1);
    }

    if (this.bases == 0)
    {
        this.texCoords = [
            0, 0,
            0.25, 0,
            0.25, 0,
            0.5, 0,
            0.5, 0,
            0.75, 0,
            0.75, 0,
            1, 0,
            0, 1,
            0.25, 1,
            0.25, 1,
            0.5, 1,
            0.5, 1,
            0.75, 1,
            0.75, 1,
            1, 1
        ];
    }

 	this.primitiveType = this.scene.gl.TRIANGLES;
 	this.initGLBuffers();
 };
