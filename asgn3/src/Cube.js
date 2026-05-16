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

        // Front
        drawTriangle3DUV([0.0, 0.0, 0.0,  1.0, 1.0, 0.0,  1.0, 0.0, 0.0], [0,0,     1,1,     1,0]);
        drawTriangle3DUV([0.0, 0.0, 0.0,  0.0, 1.0, 0.0,  1.0, 1.0, 0.0], [0,0,     0,1,     1,1]);

        
        gl.uniform4f(u_FragColor, rgba[0]*0.9, rgba[1]*0.9, rgba[2]*0.9, rgba[3]);


        gl.uniform4f(u_FragColor, rgba[0]*0.85, rgba[1]*0.85, rgba[2]*0.85, rgba[3]);
        

        drawTriangle3DUV([1.0, 0.0, 1.0,  0.0, 1.0, 1.0,  0.0, 0.0, 1.0], [0,0,     1,1,     1,0]);
        drawTriangle3DUV([1.0, 0.0, 1.0,  1.0, 1.0, 1.0,  0.0, 1.0, 1.0], [0,0,     0,1,     1,1]);

        // face to the right
        //gl.uniform1i(u_whichTexture, this.textureNum[2]);
        gl.uniform4f(u_FragColor, rgba[0]*0.95, rgba[1]*0.95, rgba[2]*0.95, rgba[3]);
        drawTriangle3DUV([1.0, 0.0, 0.0,  1.0, 1.0, 1.0,  1.0, 0.0, 1.0], [0,0,     1,1,     1,0]);
        drawTriangle3DUV([1.0, 0.0, 0.0,  1.0, 1.0, 0.0,  1.0, 1.0, 1.0], [0,0,     0,1,     1,1]);

        // face to the left
        //gl.uniform1i(u_whichTexture, this.textureNum[3]);
        gl.uniform4f(u_FragColor, rgba[0]*0.9, rgba[1]*0.9, rgba[2]*0.9, rgba[3]);
        drawTriangle3DUV([0.0, 0.0, 1.0,  0.0, 1.0, 0.0,  0.0, 0.0, 0.0], [0,0,     1,1,     1,0]);
        drawTriangle3DUV([0.0, 0.0, 1.0,  0.0, 1.0, 1.0,  0.0, 1.0, 0.0], [0,0,     0,1,     1,1]);

        // top face
        //gl.uniform1i(u_whichTexture, this.textureNum[4]);
        gl.uniform4f(u_FragColor, rgba[0]*0.7, rgba[1]*0.7, rgba[2]*0.7, rgba[3]);
        drawTriangle3DUV([0.0, 1.0, 0.0,  1.0, 1.0, 1.0,  1.0, 1.0, 0.0], [0,0,     1,1,     1,0]);
        drawTriangle3DUV([0.0, 1.0, 0.0,  0.0, 1.0, 1.0,  1.0, 1.0, 1.0], [0,0,     0,1,     1,1]);

        // bottom face
        //gl.uniform1i(u_whichTexture, this.textureNum[5]);
        gl.uniform4f(u_FragColor, rgba[0]*0.8, rgba[1]*0.8, rgba[2]*0.8, rgba[3]);
        drawTriangle3DUV([0.0, 0.0, 1.0,  1.0, 0.0, 0.0,  1.0, 0.0, 1.0], [0,0,     1,1,     1,0]);
        drawTriangle3DUV([0.0, 0.0, 1.0,  0.0, 0.0, 0.0,  1.0, 0.0, 0.0], [0,0,     0,1,     1,1]);
    }

    // Doesn't work for some reason ughhhhh
    renderFast() {
        var rgba = this.color;

        gl.uniform1i(u_whichTexture, this.textureNum);
        gl.uniform4f(u_FragColor, rgba[0], rgba[1], rgba[2], rgba[3]);
        gl.uniformMatrix4fv(u_ModelMatrix, false, this.matrix.elements);

        var allverts = [];

        allverts = allverts.concat( [0.0, 0.0, 0.0,  1.0, 1.0, 0.0,  1.0, 0.0, 0.0] );
        allverts = allverts.concat( [0.0, 0.0, 0.0,  0.0, 1.0, 0.0,  1.0, 1.0, 0.0] );
        // Front
        //drawTriangle3DUV([0.0, 0.0, 0.0,  1.0, 1.0, 0.0,  1.0, 0.0, 0.0], [0,0,     1,1,     1,0]);
        //drawTriangle3DUV([0.0, 0.0, 0.0,  0.0, 1.0, 0.0,  1.0, 1.0, 0.0], [0,0,     0,1,     1,1]);

        
        gl.uniform4f(u_FragColor, rgba[0]*0.9, rgba[1]*0.9, rgba[2]*0.9, rgba[3]);


        gl.uniform4f(u_FragColor, rgba[0]*0.85, rgba[1]*0.85, rgba[2]*0.85, rgba[3]);
        

        allverts = allverts.concat( [1.0, 0.0, 1.0,  0.0, 1.0, 1.0,  0.0, 0.0, 1.0] );
        allverts = allverts.concat( [1.0, 0.0, 1.0,  1.0, 1.0, 1.0,  0.0, 1.0, 1.0] );
        //drawTriangle3DUV([1.0, 0.0, 1.0,  0.0, 1.0, 1.0,  0.0, 0.0, 1.0], [0,0,     1,1,     1,0]);
        //drawTriangle3DUV([1.0, 0.0, 1.0,  1.0, 1.0, 1.0,  0.0, 1.0, 1.0], [0,0,     0,1,     1,1]);

        // face to the right
        //gl.uniform1i(u_whichTexture, this.textureNum[2]);
        gl.uniform4f(u_FragColor, rgba[0]*0.95, rgba[1]*0.95, rgba[2]*0.95, rgba[3]);
        allverts = allverts.concat( [1.0, 0.0, 0.0,  1.0, 1.0, 1.0,  1.0, 0.0, 1.0] );
        allverts = allverts.concat( [1.0, 0.0, 0.0,  1.0, 1.0, 0.0,  1.0, 1.0, 1.0] );
        //drawTriangle3DUV([1.0, 0.0, 0.0,  1.0, 1.0, 1.0,  1.0, 0.0, 1.0], [0,0,     1,1,     1,0]);
        //drawTriangle3DUV([1.0, 0.0, 0.0,  1.0, 1.0, 0.0,  1.0, 1.0, 1.0], [0,0,     0,1,     1,1]);

        // face to the left
        //gl.uniform1i(u_whichTexture, this.textureNum[3]);
        gl.uniform4f(u_FragColor, rgba[0]*0.9, rgba[1]*0.9, rgba[2]*0.9, rgba[3]);
        allverts = allverts.concat( [0.0, 0.0, 1.0,  0.0, 1.0, 0.0,  0.0, 0.0, 0.0] );
        allverts = allverts.concat( [0.0, 0.0, 1.0,  0.0, 1.0, 1.0,  0.0, 1.0, 0.0] );
        //drawTriangle3DUV([0.0, 0.0, 1.0,  0.0, 1.0, 0.0,  0.0, 0.0, 0.0], [0,0,     1,1,     1,0]);
        //drawTriangle3DUV([0.0, 0.0, 1.0,  0.0, 1.0, 1.0,  0.0, 1.0, 0.0], [0,0,     0,1,     1,1]);

        // top face
        //gl.uniform1i(u_whichTexture, this.textureNum[4]);
        gl.uniform4f(u_FragColor, rgba[0]*0.7, rgba[1]*0.7, rgba[2]*0.7, rgba[3]);
        allverts = allverts.concat( [0.0, 1.0, 0.0,  1.0, 1.0, 1.0,  1.0, 1.0, 0.0] );
        allverts = allverts.concat( [0.0, 1.0, 0.0,  0.0, 1.0, 1.0,  1.0, 1.0, 1.0] );
        //drawTriangle3DUV([0.0, 1.0, 0.0,  1.0, 1.0, 1.0,  1.0, 1.0, 0.0], [0,0,     1,1,     1,0]);
        //drawTriangle3DUV([0.0, 1.0, 0.0,  0.0, 1.0, 1.0,  1.0, 1.0, 1.0], [0,0,     0,1,     1,1]);

        // bottom face
        //gl.uniform1i(u_whichTexture, this.textureNum[5]);
        gl.uniform4f(u_FragColor, rgba[0]*0.8, rgba[1]*0.8, rgba[2]*0.8, rgba[3]);
        allverts = allverts.concat( [0.0, 0.0, 1.0,  1.0, 0.0, 0.0,  1.0, 0.0, 1.0] );
        allverts = allverts.concat( [0.0, 0.0, 1.0,  0.0, 0.0, 0.0,  1.0, 0.0, 0.0] );
        //drawTriangle3DUV([0.0, 0.0, 1.0,  1.0, 0.0, 0.0,  1.0, 0.0, 1.0], [0,0,     1,1,     1,0]);
        //drawTriangle3DUV([0.0, 0.0, 1.0,  0.0, 0.0, 0.0,  1.0, 0.0, 0.0], [0,0,     0,1,     1,1]);
        drawTriangle3D(allverts);

    }
}
