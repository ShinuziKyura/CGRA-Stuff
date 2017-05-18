/**
 * MyPrism
 * @constructor
 */
 function MyPrism(scene, slices, stacks, stack_offset = 0, bases = 1) {
 	CGFobject.call(this,scene);

	this.slices = slices;
	this.stacks = stacks;
    this.stack_offset = stack_offset;
    this.bases = bases

 	this.initBuffers();
 };

 MyPrism.prototype = Object.create(CGFobject.prototype);
 MyPrism.prototype.constructor = MyPrism;

 MyPrism.prototype.initBuffers = function() {
    var deg_rad = Math.PI / 180;

    var angle = 360.0 / this.slices;
    var normal_angle = angle / 2;

    var delta_offset = this.stack_offset / this.stacks;

    var base_vertice = 2 * this.slices * (this.stacks + 1);

    var texCoordS = 1 / this.slices;
    var texCoordT = 1 / this.stacks;

    this.vertices = [];
    for (i = 0; i <= this.stacks; ++i)
    {
        this.vertices.push(1 - i * delta_offset); // for i = 0, indices = 0
        this.vertices.push(0);
        this.vertices.push(i / this.stacks);
        for (j = 1; j < this.slices; ++j)
        {
            this.vertices.push(Math.cos(deg_rad * j * angle) - Math.cos(deg_rad * j * angle) * i * delta_offset); // for i,j = 0, indices = 1
            this.vertices.push(Math.sin(deg_rad * j * angle) - Math.sin(deg_rad * j * angle) * i * delta_offset);
            this.vertices.push(i / this.stacks);
            this.vertices.push(Math.cos(deg_rad * j * angle) - Math.cos(deg_rad * j * angle) * i * delta_offset); // for i,j = 0, indices = 2
            this.vertices.push(Math.sin(deg_rad * j * angle) - Math.sin(deg_rad * j * angle) * i * delta_offset);
            this.vertices.push(i / this.stacks);
        }
        this.vertices.push(1 - i * delta_offset); // for i = 0, indices = 11
        this.vertices.push(0);
        this.vertices.push(i / this.stacks);
    }
    if (this.bases == 1)
    {
        for (i = 0; i < this.slices; ++i)
        {
            this.vertices.push(Math.cos(deg_rad * i * angle));
            this.vertices.push(Math.sin(deg_rad * i * angle));
            this.vertices.push(0);
        }
        for (i = 0; i < this.slices; ++i)
        {
            this.vertices.push(Math.cos(deg_rad * i * angle) - Math.cos(deg_rad * i * angle) * this.stack_offset);
            this.vertices.push(Math.sin(deg_rad * i * angle) - Math.sin(deg_rad * i * angle) * this.stack_offset);
            this.vertices.push(1);
        }
        this.vertices.push(0);
        this.vertices.push(0);
        this.vertices.push(0);
        this.vertices.push(0);
        this.vertices.push(0);
        this.vertices.push(1);
    }

    this.indices = [];
    this.slices *= 2;
    for (i = 0; i < this.stacks; ++i)
    {
        for (j = 0; j < this.slices; j += 2)
        {
            this.indices.push(i * this.slices + j);
            this.indices.push(i * this.slices + j + 1);
            this.indices.push(i * this.slices + j + this.slices);

            this.indices.push(i * this.slices + j + 1);
            this.indices.push(i * this.slices + j + 1 + this.slices);
            this.indices.push(i * this.slices + j + this.slices);
        }
    }
    this.slices /= 2;
    if (this.bases == 1)
    {
        for (i = base_vertice; i < base_vertice + this.slices; ++i)
        {
            this.indices.push(((i + 1) % (base_vertice + this.slices) == 0) ? base_vertice : i + 1);
            this.indices.push(i);
            this.indices.push((this.vertices.length / 3) - 2);
        }
        base_vertice += this.slices;
        for (i = base_vertice; i < base_vertice + this.slices; ++i)
        {
            this.indices.push(i);
            this.indices.push(((i + 1) % (base_vertice + this.slices) == 0) ? base_vertice : i + 1);
            this.indices.push((this.vertices.length / 3) - 1);
        }
    }

 	this.normals = [];
    for (i = 0; i <= this.stacks; ++i)
    {
        for (j = 0; j < this.slices; ++j)
        {
            this.normals.push(Math.cos(deg_rad * normal_angle));
            this.normals.push(Math.sin(deg_rad * normal_angle));
            this.normals.push(0);

            this.normals.push(Math.cos(deg_rad * normal_angle));
            this.normals.push(Math.sin(deg_rad * normal_angle));
            this.normals.push(0);

            normal_angle += angle;
        }
        normal_angle = angle / 2;
    }
    if (this.bases == 1)
    {
        for (i = -this.slices; i < this.slices; ++i)
        {
            this.normals.push(0);
            this.normals.push(0);
            this.normals.push(i < 0 ? -1 : 1);
        }
        this.normals.push(0);
        this.normals.push(0);
        this.normals.push(-1);
        this.normals.push(0);
        this.normals.push(0);
        this.normals.push(1);
    }

    if (this.bases == 0)
    {
        this.texCoords = [];
        for (i = 0; i <= this.stacks; ++i)
        {
            this.texCoords.push(j * texCoordS);
            this.texCoords.push(i * texCoordT);
            for (j = 1; j < this.slices; ++j)
            {
                this.texCoords.push(j * texCoordS);
                this.texCoords.push(i * texCoordT);
                this.texCoords.push(j * texCoordS);
                this.texCoords.push(i * texCoordT);
            }
            this.texCoords.push(j * texCoordS);
            this.texCoords.push(i * texCoordT);
        }
    }

 	this.primitiveType = this.scene.gl.TRIANGLES;
 	this.initGLBuffers();
 };
