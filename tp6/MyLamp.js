/**
 * MyLamp
 * @constructor
 */
 function MyLamp(scene, slices, stacks, bases = 1) {
 	CGFobject.call(this,scene);

	this.slices = slices;
	this.stacks = stacks;
    this.bases = bases;

 	this.initBuffers();
 };

 MyLamp.prototype = Object.create(CGFobject.prototype);
 MyLamp.prototype.constructor = MyLamp;

 MyLamp.prototype.initBuffers = function() {
   var deg_rad = Math.PI / 180;

   var angle = 360.0 / this.slices;
   var base_vertice = (this.slices + 1) * (this.stacks + 1);

   var texCoordS = 1 / this.slices;
   var texCoordT = 1 / this.stacks;

   var eval;

   this.vertices = [];
   for (i = 0; i <= this.stacks; ++i)
   {
       for (j = 0; j <= this.slices; ++j)
       {
           this.vertices.push(Math.cos(deg_rad * j * angle) * Math.sqrt(1 - Math.pow(i / this.stacks, 2)));
           this.vertices.push(Math.sin(deg_rad * j * angle) * Math.sqrt(1 - Math.pow(i / this.stacks, 2)));
           this.vertices.push(i / this.stacks);
       }
   }
   if (this.bases == 1)
   {
       for (i = 0; i < this.slices; ++i)
       {
           this.vertices.push(Math.cos(deg_rad * i * angle));
           this.vertices.push(Math.sin(deg_rad * i * angle));
           this.vertices.push(0);
       }
       this.vertices.push(0);
       this.vertices.push(0);
       this.vertices.push(0);
   }

   this.indices = [];
   for (i = 0; i < this.stacks; ++i)
   {
       for (j = 0; j < this.slices; ++j)
       {
           this.indices.push(i * (this.slices + 1) + j);
           this.indices.push(i * (this.slices + 1) + j + 1);
           this.indices.push(i * (this.slices + 1) + j + this.slices + 1);

           this.indices.push(i * (this.slices + 1) + j + 1);
           this.indices.push(i * (this.slices + 1) + j + this.slices + 2);
           this.indices.push(i * (this.slices + 1) + j + this.slices + 1);

           if (this.bases == 0)
           {
               this.indices.push(i * (this.slices + 1) + j + this.slices + 1);
               this.indices.push(i * (this.slices + 1) + j + this.slices + 2);
               this.indices.push(i * (this.slices + 1) + j + 1);

               this.indices.push(i * (this.slices + 1) + j + this.slices + 1);
               this.indices.push(i * (this.slices + 1) + j + 1);
               this.indices.push(i * (this.slices + 1) + j);
           }
       }
   }
   if (this.bases == 1)
   {
       for (i = base_vertice; i < base_vertice + this.slices; ++i)
       {
           this.indices.push((eval = (i + 1) % (base_vertice + this.slices)) == 0 ? base_vertice : eval);
           this.indices.push(i);
           this.indices.push((this.vertices.length / 3) - 1);
       }
   }

   this.normals = [];
   for (i = 0; i <= this.stacks; ++i)
   {
       for (j = 0; j <= this.slices; ++j)
       {
           this.normals.push(Math.cos(deg_rad * j * angle) * Math.sqrt(1 - Math.pow(i / this.stacks, 2)));
           this.normals.push(Math.sin(deg_rad * j * angle) * Math.sqrt(1 - Math.pow(i / this.stacks, 2)));
           this.normals.push(i / this.stacks);
       }
   }
   if (this.bases == 1)
   {
       for (i = 0; i < this.slices; ++i)
       {
           this.normals.push(0);
           this.normals.push(0);
           this.normals.push(-1);
       }
       this.normals.push(0);
       this.normals.push(0);
       this.normals.push(-1);
   }

   if (this.bases == 0)
   {
       this.texCoords = [];
       for (i = 0; i <= this.stacks; ++i)
       {
           for (j = 0; j <= this.slices; ++j)
           {
               this.texCoords.push(j * texCoordS);
               this.texCoords.push(i * texCoordT);
           }
       }
   }

   this.primitiveType = this.scene.gl.TRIANGLES;
   this.initGLBuffers();
 };
