class Cube {
    constructor() {
        this.type = "cube";
        this.color = [1.0,1.0,1.0,1.0];
        this.matrix = new Matrix4();
    }

    render() {
        var rgba = this.color;

        gl.uniform4f(u_FragColor, rgba[0], rgba[1], rgba[2], rgba[3]);
        gl.uniformMatrix4fv(u_ModelMatrix, false, this.matrix.elements);

        // Front
        drawTriangle3D( [0.0,0.0,0.0, 1.0,1.0,0.0, 1.0,0.0,0.0] );
        drawTriangle3D( [0.0,0.0,0.0, 0.0,1.0,0.0, 1.0,1.0,0.0] );

        // Side 
        gl.uniform4f(u_FragColor, rgba[0]*.9, rgba[1]*.9, rgba[2]*.9, rgba[3]);

        drawTriangle3D( [0.0,1.0,0.0, 0.0,1.0,1.0, 1.0,1.0,1.0] );
        drawTriangle3D( [0.0,1.0,0.0, 1.0,1.0,1.0, 1.0,1.0,0.0] );

        // Back
        gl.uniform4f(u_FragColor, rgba[0]*0.95, rgba[1]*0.95, rgba[2]*0.95, rgba[3]);
        drawTriangle3D([0.0,0.0,1.0,  1.0,0.0,1.0,  1.0,1.0,1.0]);
        drawTriangle3D([0.0,0.0,1.0,  1.0,1.0,1.0,  0.0,1.0,1.0]);

        gl.uniform4f(u_FragColor, rgba[0]*0.7, rgba[1]*0.7, rgba[2]*0.7, rgba[3]);
        drawTriangle3D([0.0,0.0,0.0,  1.0,0.0,0.0,  1.0,0.0,1.0]);
        drawTriangle3D([0.0,0.0,0.0,  1.0,0.0,1.0,  0.0,0.0,1.0]);

  
        gl.uniform4f(u_FragColor, rgba[0]*0.8, rgba[1]*0.8, rgba[2]*0.8, rgba[3]);
        drawTriangle3D([1.0,0.0,0.0,  1.0,1.0,0.0,  1.0,1.0,1.0]);
        drawTriangle3D([1.0,0.0,0.0,  1.0,1.0,1.0,  1.0,0.0,1.0]);

  
        gl.uniform4f(u_FragColor, rgba[0]*0.85, rgba[1]*0.85, rgba[2]*0.85, rgba[3]);
        drawTriangle3D([0.0,0.0,0.0,  0.0,0.0,1.0,  0.0,1.0,1.0]);
        drawTriangle3D([0.0,0.0,0.0,  0.0,1.0,1.0,  0.0,1.0,0.0]);


    }

}