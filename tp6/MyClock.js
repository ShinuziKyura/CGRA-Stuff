/**
 * MyClock
 * @constructor
 */
 function MyClock(scene, slices = 12, stacks = 1) {
 	CGFobject.call(this, scene);

    this.radunit = Math.PI / 180.0;
    this.prevTime = Math.floor(new Date().getTime() / 1000.0);

    this.hAngle = 105.375; // 90 + 15.375 (second-resolution progression)
    this.mAngle = 184.5; // 180 + 4.5 (second-resolution progression)
    this.sAngle = 270.0;

    this.faceAppearance = new CGFappearance(scene);
    this.faceAppearance.setAmbient(0,0,0,1);
    this.faceAppearance.setDiffuse(0.9,0.9,0.9,1);
    this.faceAppearance.setSpecular(0.3,0.3,0.3,1);
    this.faceAppearance.setShininess(50);
    this.faceAppearance.loadTexture("..\\resources\\images\\clock.png");

    this.bodyAppearance = new CGFappearance(scene);
    this.bodyAppearance.setAmbient(0.9,0.9,0.9,1);
    this.bodyAppearance.setDiffuse(1.0,1.0,1.0,1);
    this.bodyAppearance.setSpecular(0.0,0.0,0.0,1);
    this.bodyAppearance.setShininess(1);

    this.handAppearance = new CGFappearance(scene);
    this.handAppearance.setAmbient(0,0,0,1);
    this.handAppearance.setDiffuse(0.1,0.1,0.1,1);
    this.handAppearance.setSpecular(0.0,0.0,0.0,1);
    this.handAppearance.setShininess(1);

    this.redhandAppearance = new CGFappearance(scene);
    this.redhandAppearance.setAmbient(0,0,0,1);
    this.redhandAppearance.setDiffuse(0.9,0.0,0.0,1);
    this.redhandAppearance.setSpecular(0.0,0.0,0.0,1);
    this.redhandAppearance.setShininess(1);

    this.slices = slices;
    this.stacks = stacks;

 	this.cylinder = new MyCylinder(scene, slices, stacks);
    this.semisphere = new MyLamp(scene, 32, 20);
    this.seconds = new MyClockHand(scene);
    this.minutes = new MyClockHand(scene);
    this.hours = new MyClockHand(scene);

    this.initBuffers();
 };

 MyClock.prototype = Object.create(CGFobject.prototype);
 MyClock.prototype.constructor = MyClock;

 MyClock.prototype.initBuffers = function() {
    var angle = 360.0 / this.slices;

    this.vertices = [];
    this.texCoords = [];
    for (i = 0; i < this.slices; ++i)
    {
        this.vertices.push(Math.cos(this.radunit * i * angle));
        this.vertices.push(Math.sin(this.radunit * i * angle));
        this.vertices.push(0);
        this.texCoords.push((Math.cos(this.radunit * i * angle) + 1) / 2);
        this.texCoords.push((-Math.sin(this.radunit * i * angle) + 1) / 2);
    }
    this.vertices.push(0);
    this.vertices.push(0);
    this.vertices.push(0);
    this.texCoords.push(0.5);
    this.texCoords.push(0.5);

 	this.indices = [];
    for (i = 0; i < this.slices; ++i)
    {
        this.indices.push(i);
        this.indices.push((i + 1) % this.slices);
        this.indices.push((this.vertices.length / 3) - 1);
    }

 	this.normals = [];
    for (i = 0; i <= this.slices; ++i)
    {
        this.normals.push(0);
        this.normals.push(0);
        this.normals.push(1);
    }

 	this.primitiveType = this.scene.gl.TRIANGLES;
 	this.initGLBuffers();
 };

 MyClock.prototype.displayClock = function() {
     this.scene.pushMatrix();
         this.scene.scale(1, 1, 0.2);
         this.bodyAppearance.apply();
         this.cylinder.display();
     this.scene.popMatrix();

     this.scene.pushMatrix();
         this.scene.translate(0, 0, 0.2);
         this.scene.scale(0.032, 0.032, 0.016);
         this.handAppearance.apply();
         this.semisphere.display();
     this.scene.popMatrix();

    this.scene.pushMatrix();
        this.scene.translate(0, 0, 0.201);
        this.faceAppearance.apply();
        this.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
        this.hours.setAngle(this.hAngle);
        this.scene.translate(0, 0, 0.203);
        this.scene.scale(4, 0.4, 1);
        this.handAppearance.apply();
        this.hours.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
        this.minutes.setAngle(this.mAngle);
        this.scene.translate(0, 0, 0.204);
        this.scene.scale(2, 0.8, 1);
        this.handAppearance.apply();
        this.minutes.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
        this.seconds.setAngle(this.sAngle);
        this.scene.translate(0, 0, 0.205);
        this.scene.scale(1, 0.8, 1);
        this.redhandAppearance.apply();
        this.seconds.display();
    this.scene.popMatrix();
 };

 MyClock.prototype.updateClock = function(currTime) {
    if (Math.floor(Math.floor(currTime /= 1000.0) - this.prevTime) > 0)
    {
        this.hAngle += (30.0 / 3600.0);
        this.hAngle %= 360;
        this.hours.setAngle(this.hAngle);

        this.mAngle += (6.0 / 60.0);
        this.mAngle %= 360;
        this.minutes.setAngle(this.mAngle);

        this.sAngle += 6.0;
        this.sAngle %= 360;
        this.seconds.setAngle(this.sAngle);

        this.prevTime = Math.floor(currTime);
    }
 };
