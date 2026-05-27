
class Camera {
    constructor() {
        this.fov = 60;
        this.eye = new Vector3([0,0,0]);
        this.at = new Vector3([0,0,-1]);
        this.up = new Vector3([0,1,0]);

        this.viewMatrix = new Matrix4();
        this.viewMatrix.setLookAt(
            this.eye.elements[0], this.eye.elements[1], this.eye.elements[2],
            this.at.elements[0], this.at.elements[1], this.at.elements[2],
            this.up.elements[0], this.up.elements[1], this.up.elements[2]
        );
        
        this.projectMatrix = new Matrix4();
        this.projectMatrix.setPerspective(this.fov, canvas.width/canvas.height, 0.1, 1000);

        /*
        FROM ASGN3 INSTRUCTIONS:
        - fov (field of view - float), initialize it to 60.
        - eye (Vector3), initialize it to (0,0,0).
        - at (Vector3), initialize it to (0,0,-1).
        - up (Vector3), initialize it to (0,1, 0).  
        - viewMatrix (Matrix4), initialize it with viewMatrix.setLookAt(eye.elements[0], ... at.elements[0], ..., up.elements[0], ...). 
        - projectionMatrix (Matrix4), initialize it with projectionMatrix.setPerspective(fov, canvas.width/canvas.height, 0.1, 1000)
        */
    }

    moveForward() {
        /*
        NOTES FROM TA VID:
        - create new vector3
        - set it equal to set(at);
        - subtract eye from f: sub(eye);
        - normalize using normalize();
        - scale by desired "speed" mul(speed)
        - add forward vector to both eye and center
        */
        let forward = new Vector3();
        forward.set(this.at);
        forward.sub(this.eye);
        forward.normalize();
        forward.mul(0.5);
        this.eye.add(forward);
        this.at.add(forward);
    }

    moveBackward() {
        let backward = new Vector3();
        backward.set(this.eye);
        backward.sub(this.at);
        backward.normalize();
        backward.mul(0.5);
        this.eye.add(backward);
        this.at.add(backward);
    }

    moveLeft() {
        let left = new Vector3();
        left.set(this.at);
        left.sub(this.eye);
        left.normalize();
        let l = Vector3.cross(this.up, left);
        l.mul(0.5);
        this.eye.add(l);
        this.at.add(l);
    }

    moveRight() {
        let right = new Vector3();
        right.set(this.at);
        right.sub(this.eye);
        right.normalize();
        let r = Vector3.cross(right, this.up);
        r.mul(0.5);
        this.eye.add(r);
        this.at.add(r);
    }

    panLeft() {
        let panL = new Vector3();
        panL.set(this.at);
        panL.sub(this.eye);

        let rotateL = new Matrix4();
        rotateL.setRotate(5, this.up.elements[0], this.up.elements[1], this.up.elements[2]);
        
        let PL = rotateL.multiplyVector3(panL);
        PL.normalize();
        this.at.set(this.eye);
        this.at.add(PL);
    }

    panRight() {
        let panR = new Vector3();
        panR.set(this.at);
        panR.sub(this.eye);

        let rotateR = new Matrix4();
        rotateR.setRotate(-5, this.up.elements[0], this.up.elements[1], this.up.elements[2]);
        
        let PR = rotateR.multiplyVector3(panR);
        PR.normalize();
        this.at.set(this.eye);
        this.at.add(PR);
    }
}
