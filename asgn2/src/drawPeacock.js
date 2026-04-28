function drawPeacock() {    

    // Head and Face Stuff
    var head = new Cube();
    head.color = [0.0,0.0,1.0,1.0];
    head.matrix.setTranslate(-0.23,0.3,-0.35);
    head.matrix.rotate(-g_headAngle,1,0,0);
    var headCoord = new Matrix4(head.matrix);
    head.matrix.scale(0.4,0.4,-0.45);
    head.render();

    var leftEye = new Cube();
    leftEye.color = [0.0,0.0,0.0,1.0];
    leftEye.matrix = headCoord;
    leftEye.matrix.scale(0.05,0.05,0.05);
    leftEye.matrix.translate(1.75,4,-10);
    leftEye.render();

    var rightEye = new Cube();
    rightEye.color = [0.0,0.0,0.0,1.0];
    rightEye.matrix = headCoord;
    rightEye.matrix.translate(3.7,0,0);
    rightEye.render();

    /*
    var leftEye = new Cube();
    leftEye.color = [0.0,0.0,0.0,0.0];
    leftEye.matrix = headCoord;
    leftEye.matrix.scale(0.05,0.05,0.05);
    leftEye.matrix.translate(1.75,4,-10);
    leftEye.render();

    var rightEye = new Cube();
    rightEye.color = [1.0,0.0,0.0,1.0];
    rightEye.matrix.scale(0.05,0.05,0.05);
    rightEye.matrix.setTranslate(0.04,0.5,-0.84);
    //rightEye.matrix.translate(1.75,8,10);
    rightEye.render();

    var rightEye = new Cube();
    rightEye.color = [0.0,0.0,0.0,1.0];
    rightEye.matrix.setTranslate(0.04,0.5,-0.84);
    rightEye.matrix.scale(0.05,0.05,0.05);
    rightEye.render();
    */

    var TopBeak = new Cube();
    TopBeak.color = [1.0,0.7,0.0,1.0];
    TopBeak.matrix = headCoord;
    var TopBeakCoord = new Matrix4(TopBeak.matrix);
    TopBeak.matrix.scale(2,1,2.5);
    TopBeak.matrix.translate(-1.2,-2,-0.6);
    TopBeak.render();

    var BotBeak = new Cube();
    BotBeak.color = [1.0,0.7,0.0,1.0];
    BotBeak.matrix.setTranslate(0,0,0);
    BotBeak.matrix = TopBeakCoord;
    BotBeak.matrix.rotate(-270,1,0,0);
    BotBeak.matrix.rotate(-g_beakAngle,1,0,0);
    BotBeak.matrix.scale(2,2,0.5);
    BotBeak.matrix.translate(-1.2,-0.5,4.5);
    BotBeak.render();

    /*
    Original
    var TopBeak = new Cube();
    TopBeak.color = [1.0,0.7,0.0,1.0];
    TopBeak.matrix.setTranslate(-0.075,0.4,-0.95);
    TopBeak.matrix.scale(0.1,0.05,0.15);
    TopBeak.render();

    var BotBeak = new Cube();
    BotBeak.color = [1.0,0.7,0.0,1.0];
    BotBeak.matrix.setTranslate(-0.06,0.4,-0.8);
    BotBeak.matrix.rotate(180,1,0,0);
    BotBeak.matrix.rotate(-g_beakAngle,1,0,0);
    BotBeak.matrix.scale(0.07,0.03,0.1);
    BotBeak.render();
    */

    var neck = new Cube();
    neck.color = [0.15,0.3,1.0,1.0];
    neck.matrix.setTranslate(-0.125,0.05,-0.55);
    neck.matrix.rotate(-g_neck,1,0,0);
    var neckCoord = new Matrix4(neck.matrix);
    neck.matrix.scale(0.2,0.35,0.15);
    neck.render();

    // Body and Wing Stuff
    var chest = new Cube();
    chest.color = [0.2,0.8,1.0,1.0];
    chest.matrix.setTranslate(-0.2,-0.28,-0.2);
    chest.matrix.scale(0.35,0.35,-0.45);
    chest.render();

    var body = new Cube();
    body.color = [0.15,0.3,1.0,1.0];
    body.matrix.setTranslate(-0.35,-0.5,-0.5);
    body.matrix.scale(0.65,0.45,0.7);
    body.render();

    var leftShoulder = new Cube();
    leftShoulder.color = [0.15,0.3,1.0,1.0];
    leftShoulder.matrix.setTranslate(0.3,-0.12,-0.37);
    leftShoulder.matrix.scale(0.07,0.07,0.35);
    leftShoulder.render();

    var leftWingTop = new Cube();
    leftWingTop.color = [0.2,0.8,1.0,1.0];
    leftWingTop.matrix.setTranslate(0.3,-0.1,-0.05);
    leftWingTop.matrix.rotate(-65,0,0,1);
    //leftWingTop.matrix.rotate(20*Math.sin(g_seconds),0,0,1);
    leftWingTop.matrix.rotate(g_leftTopWing,0,0,1);
    var leftWingCoord = new Matrix4(leftWingTop.matrix);
    leftWingTop.matrix.scale(0.1,0.05,-0.3);
    leftWingTop.render();

    var leftWingBot = new Cube();
    leftWingBot.color = [0.2,0.7,1.0,1.0];
    leftWingBot.matrix = leftWingCoord;
    leftWingBot.matrix.scale(0.15,0.05,-0.45);
    leftWingBot.matrix.translate(0.66,0,-0.33);
    leftWingBot.render();

    var rightShoulder = new Cube();
    rightShoulder.color = [0.15,0.3,1.0,1.0];
    rightShoulder.matrix.setTranslate(-0.42,-0.12,-0.37);
    rightShoulder.matrix.scale(0.07,0.07,0.35);
    rightShoulder.render();

    var rightWingTop = new Cube();
    rightWingTop.color = [0.2,0.8,1.0,1.0];
    rightWingTop.matrix.setTranslate(-0.35,-0.1,-0.05);
    rightWingTop.matrix.rotate(155,0,0,1);
    //rightWingTop.matrix.rotate(20*Math.sin(-g_seconds),0,0,1);
    rightWingTop.matrix.rotate(-g_rightTopWing,0,0,1);
    var rightWingCoord = new Matrix4(rightWingTop.matrix);
    rightWingTop.matrix.scale(0.05,0.1,-0.3);
    rightWingTop.render();

    var rightWingBot = new Cube();
    rightWingBot.color = [0.2,0.7,1.0,1.0];
    rightWingBot.matrix = rightWingCoord;
    rightWingBot.matrix.scale(0.05,0.15,-0.45);
    rightWingBot.matrix.translate(0,0.67,-0.33);
    rightWingBot.render();

    /*
    var leftWingBot = new Cube();
    leftWingBot.color = [0.2,0.8,1.0,1.0];
    leftWingBot.matrix.setTranslate(0.3,-0.4,0.1);
    leftWingBot.matrix.scale(0.05,0.15,-0.45);
    leftWingBot.render();

    var rightWingTop = new Cube();
    rightWingTop.color = [0.2,0.8,1.0,1.0];
    rightWingTop.matrix.setTranslate(-0.4,-0.25,-0.05);
    rightWingTop.matrix.scale(0.05,0.1,-0.3);
    rightWingTop.render();

    var rightWingBot = new Cube();
    rightWingBot.color = [0.2,0.8,1.0,1.0];
    rightWingBot.matrix.setTranslate(-0.4,-0.4,0.1);
    rightWingBot.matrix.scale(0.05,0.15,-0.45);
    rightWingBot.render();
    */

    // Leg and Feet Stuff
    var leftLeg = new Cube();
    leftLeg.color = [1.0,0.0,1.0,0.7];
    leftLeg.matrix.setTranslate(0.05,-0.64,-0.25);
    leftLeg.matrix.scale(0.1,0.15,0.1);
    leftLeg.render();

    var rightLeg = new Cube();
    rightLeg.color = [1.0,0.0,1.0,0.7];
    rightLeg.matrix.setTranslate(-0.17,-0.64,-0.25);
    rightLeg.matrix.scale(0.1,0.15,0.1);
    rightLeg.render();

    var leftKnee = new Cube();
    leftKnee.color = [1.0,0.0,1.0,1.0];
    leftKnee.matrix.setTranslate(0.025,-0.69,-0.27);
    leftKnee.matrix.scale(0.15,0.07,0.15);
    leftKnee.render();

    var rightKnee = new Cube();
    rightKnee.color = [1.0,0.0,1.0,1.0];
    rightKnee.matrix.setTranslate(-0.195,-0.69,-0.27);
    rightKnee.matrix.scale(0.15,0.07,0.15);
    rightKnee.render();

    var leftLegB = new Cube();
    leftLegB.color = [1.0,0.0,1.0,0.7];
    leftLegB.matrix.setTranslate(0.05,-0.84,-0.25);
    leftLegB.matrix.scale(0.1,0.15,0.1);
    leftLegB.render();

    var rightLegB = new Cube();
    rightLegB.color = [1.0,0.0,1.0,0.7];
    rightLegB.matrix.setTranslate(-0.17,-0.84,-0.25);
    rightLegB.matrix.scale(0.1,0.15,0.1);
    rightLegB.render();

    var leftFoot = new Cube();
    leftFoot.color = [1.0,0.0,1.0,1.0];
    leftFoot.matrix.setTranslate(0.025,-0.89,-0.33);
    leftFoot.matrix.scale(0.15,0.05,0.2);
    leftFoot.render();

    var rightFoot = new Cube();
    rightFoot.color = [1.0,0.0,1.0,1.0];
    rightFoot.matrix.setTranslate(-0.195,-0.89,-0.33);
    rightFoot.matrix.scale(0.15,0.05,0.2);
    rightFoot.render();

    // Tail
    var TailBot = new Cube();
    TailBot.color = [0.0,1.0,0.1,1.0];
    TailBot.matrix.setTranslate(-0.55,-0.5,0.2);
    TailBot.matrix.scale(1.05,0.4,0.05);
    TailBot.render();

    var TailMid = new Cube();
    TailMid.color = [0.0,1.0,0.4,1.0];
    TailMid.matrix.setTranslate(-0.48,-0.1,0.2);
    TailMid.matrix.scale(0.9,0.5,0.05);
    TailMid.render();

    var TailTop = new Cube();
    TailTop.color = [0.0,1.0,0.8,1.0];
    TailTop.matrix.setTranslate(-0.39,0.4,0.2);
    TailTop.matrix.scale(0.7,0.35,0.05);
    TailTop.render();
}