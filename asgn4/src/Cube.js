class Cube {
    constructor() {
        this.type = "cube";
        this.color = [1.0,1.0,1.0,1.0];
        this.matrix = new Matrix4();
        this.textureNum = 0;
    }

    render() {
        var rgba = this.color;

        gl.uniform1i(u_whichTexture, this.textureNum);
        gl.uniform4f(u_FragColor, rgba[0], rgba[1], rgba[2], rgba[3]);
        gl.uniformMatrix4fv(u_ModelMatrix, false, this.matrix.elements);

        drawTriangle3DUVNormal([0.0, 0.0, 1.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0], [0, 0, 1, 1, 1, 0], [1, 0, 0, 1, 0, 0, 1, 0, 0]);
        drawTriangle3DUVNormal([0.0, 0.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0, 0.0], [0, 0, 0, 1, 1, 1], [1, 0, 0, 1, 0, 0, 1, 0, 0]);

        drawTriangle3DUVNormal([0.0, 1.0, 0.0, 1.0, 1.0, 1.0, 1.0, 1.0, 0.0], [0, 0, 1, 1, 1, 0], [0, -1, 0, 0, -1, 0, 0, -1, 0]);
        drawTriangle3DUVNormal([0.0, 1.0, 0.0, 0.0, 1.0, 1.0, 1.0, 1.0, 1.0], [0, 0, 0, 1, 1, 1], [0, -1, 0, 0, -1, 0, 0, -1, 0]);

        drawTriangle3DUVNormal([0.0, 0.0, 1.0, 1.0, 0.0, 0.0, 1.0, 0.0, 1.0], [0, 0, 1, 1, 1, 0], [0, 1, 0, 0, 1, 0, 0, 1, 0]);
        drawTriangle3DUVNormal([0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0], [0, 0, 0, 1, 1, 1], [0, 1, 0, 0, 1, 0, 0, 1, 0]);

        drawTriangle3DUVNormal([0.0, 0.0, 0.0, 1.0, 1.0, 0.0, 1.0, 0.0, 0.0], [0, 0, 1, 1, 1, 0], [0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0]);
        drawTriangle3DUVNormal([0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 1.0, 1.0, 0.0], [0, 0, 0, 1, 1, 1], [0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0]);

        drawTriangle3DUVNormal([1.0, 0.0, 1.0, 0.0, 1.0, 1.0, 0.0, 0.0, 1.0], [0, 0, 1, 1, 1, 0], [0,0,-1,0,0,-1,0,0,-1]);
        drawTriangle3DUVNormal([1.0, 0.0, 1.0, 1.0, 1.0, 1.0, 0.0, 1.0, 1.0], [0, 0, 0, 1, 1, 1], [0,0,-1,0,0,-1,0,0,-1]);

        drawTriangle3DUVNormal([1.0, 0.0, 0.0, 1.0, 1.0, 1.0, 1.0, 0.0, 1.0], [0, 0, 1, 1, 1, 0], [-1, 0, 0, -1, 0, 0, -1, 0, 0]);
        drawTriangle3DUVNormal([1.0, 0.0, 0.0, 1.0, 1.0, 0.0, 1.0, 1.0, 1.0], [0, 0, 0, 1, 1, 1], [-1, 0, 0, -1, 0, 0, -1, 0, 0]);
        
    }

    // Doesn't work for some reason ughhhhh
    //renderFast() {
        /*

        */


    //}
}
