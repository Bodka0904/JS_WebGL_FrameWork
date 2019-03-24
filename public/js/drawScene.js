class Transform {
    constructor(){
        
        this.modelViewMatrix = mat4.create();
    
    }

    Transform(pos,rot,scale){
        
        this.modelViewMatrix = mat4.create();

    
        mat4.translate(this.modelViewMatrix,     
            this.modelViewMatrix,     
            pos);
        mat4.rotate(this.modelViewMatrix,  
            this.modelViewMatrix, 
           rot[0],   
           [1,0,0]);   
        mat4.rotate(this.modelViewMatrix,  
            this.modelViewMatrix, 
           rot[1],   
           [0,1,0]);
        mat4.rotate(this.modelViewMatrix,  
            this.modelViewMatrix, 
           rot[2],   
           [0,0,1]);

        mat4.scale(this.modelViewMatrix,
            this.modelViewMatrix,
            scale);
       
    };

    GetModelViewMatrix(){
        return this.modelViewMatrix;
    }

};

class Camera{
    constructor(fieldOfView,aspect,zNear,zFar,distance)
    {
        this.fieldOfView = fieldOfView;
        this.aspect = aspect;
        this.zNear = zNear;
        this.zFar = zFar;
        this.projectionMatrix = mat4.create();
        this.viewMatrix = mat4.create();
        this.distance = distance;
        this.position = [0,0,distance];
        this.rotation = [0,0,0];
        
      
        
    }
    
    UpdateCamera(){
        this.projectionMatrix = mat4.create();

        mat4.lookAt(this.viewMatrix,this.position,[0,0,0],[0,1,0]);
        mat4.perspective(this.projectionMatrix,
            this.fieldOfView,
            this.aspect,
            this.zNear,
            this.zFar);

            
       
        mat4.rotate(this.projectionMatrix,
                this.projectionMatrix,
                this.rotation[1],
                [0,1,0]);
        mat4.rotate(this.projectionMatrix,
                this.projectionMatrix,
                this.rotation[0],
                [1,0,0]);
        mat4.rotate(this.projectionMatrix,
                this.projectionMatrix,
                this.rotation[2],
                [0,0,1]);

        mat4.translate(this.projectionMatrix,
                this.projectionMatrix,
                this.position);
        
        
        
             
          

    };
    Move(pos)
    {

        this.position[0] -= pos[0];
        this.position[1] -= pos[1];
        this.position[2] -= pos[2];
        
    }
    Rotate(rot)
    {
        this.rotation[0] += rot[0];
        this.rotation[1] += rot[1];
        this.rotation[2] += rot[2];
      
    }
    Follow(position,distance)
    {
        this.position[0] = (-Math.sin(this.rotation[1]) * distance) + position[0];
        this.position[2] = (-Math.cos(this.rotation[1]) * distance) + position[2]; 
        
    }

    GetProjectionMatrix(){
        return this.projectionMatrix;
    }
    GetViewMatrix(){
        return this.viewMatrix;
    }
   


};

class Shader{
    constructor(vsSource,fsSource) {
        this.vsSource = vsSource;
        this.fsSource = fsSource;
        
    };

    
    LoadShader(gl,type,source){
        const shader = gl.createShader(type);
        gl.shaderSource(shader, source);
  
        gl.compileShader(shader);
  
        if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
            alert('An error occurred compiling the shaders: ' + gl.getShaderInfoLog(shader));
            gl.deleteShader(shader);
            
            return null;
        };
  
        return shader;
    };


    InitShaderProgram(gl){
        const vertexShader = this.LoadShader(gl,gl.VERTEX_SHADER, this.vsSource);
        const fragmentShader = this.LoadShader(gl,gl.FRAGMENT_SHADER, this.fsSource);

        const shaderProgram = gl.createProgram();
        gl.attachShader(shaderProgram, vertexShader);
        gl.attachShader(shaderProgram, fragmentShader);
        gl.linkProgram(shaderProgram);

        if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
            alert('Unable to initialize the shader program: ' + gl.getProgramInfoLog(shaderProgram));
            return null;
          }
        
          return {
              program: shaderProgram,
              attribLocations: {
                vertexPosition: gl.getAttribLocation(shaderProgram, 'aVertexPosition'),
                textureCoord: gl.getAttribLocation(shaderProgram, 'aTextureCoord'),

              },
              uniformLocations:{
                projectionMatrix: gl.getUniformLocation(shaderProgram, 'uProjectionMatrix'),
                modelViewMatrix: gl.getUniformLocation(shaderProgram, 'uModelViewMatrix'),
                uSampler: gl.getUniformLocation(shaderProgram, 'uSampler'),
                viewMatrix: gl.getUniformLocation(shaderProgram, 'mView'),
              },
            };
    };
    
    

    
    
};

class Render{
    constructor(positions,indices,textureCoords) 
    {
        this.positions = positions;
        this.indices = indices;
        this.textureCoords = textureCoords;
        
        
    };

    LoadTextures(gl,textureSrc){
        const texture = gl.createTexture();
        gl.bindTexture(gl.TEXTURE_2D, texture);

        const level = 0;
        const internalFormat = gl.RGBA;
        const width = 1;
        const height = 1;
        const border = 0;
        const srcFormat = gl.RGBA;
        const srcType = gl.UNSIGNED_BYTE;
        const pixel = new Uint8Array([0, 0, 255, 255]);  // opaque blue
        gl.texImage2D(gl.TEXTURE_2D, level, internalFormat,
                    width, height, border, srcFormat, srcType,
                    pixel);
              
    
        const image = new Image();
        image.onload = function(){
            gl.bindTexture(gl.TEXTURE_2D, texture);
            gl.texImage2D(gl.TEXTURE_2D, level, internalFormat,
                          srcFormat, srcType, image);
                        
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR); 
        };
        image.src = textureSrc;

        return texture;
    };

    InitBuffers(gl){
        //Position Buffer Data
        const positionBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
        gl.bufferData(gl.ARRAY_BUFFER,
            new Float32Array(this.positions),
            gl.STATIC_DRAW);
            
            
        //Index Buffer Data
        
        const indexBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER,
            new Uint16Array(this.indices), 
            gl.STATIC_DRAW);

        //Texture Buffer Data
        const textureCoordBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, textureCoordBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.textureCoords),
                gl.STATIC_DRAW);


        return {
            position: positionBuffer,
            textureCoord: textureCoordBuffer,
            indices: indexBuffer,
            
        };

    };

    Draw(gl,programInfo,buffers,texture,modelViewMatrix,projectionMatrix,viewMatrix){
        gl.clearColor(0.0, 0.5, 0.7, 1.0);  // Clear to black, fully opaque
        gl.clearDepth(1.0);                 // Clear everything
        gl.enable(gl.DEPTH_TEST);           
        gl.depthFunc(gl.LEQUAL);            // Near things obscure far things
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    
        
        //Position Buffer
        {
            const numComponents = 3;  // pull out 3 values per iteration
            const type = gl.FLOAT;    
            const normalize = false;  
            const stride = 0;         // how many bytes to get from one set of values to the next                 
            const offset = 0;         // how many bytes inside the buffer to start from
  
  
            gl.bindBuffer(gl.ARRAY_BUFFER, buffers.position);
            gl.vertexAttribPointer(
                programInfo.attribLocations.vertexPosition,
                numComponents,
                type,
                normalize,
                stride,
                offset);
            gl.enableVertexAttribArray(
                programInfo.attribLocations.vertexPosition);

        }
        //Texture Buffer
        {
            const num = 2; // every coordinate composed of 2 values
            const type = gl.FLOAT; // the data in the buffer is 32 bit float
            const normalize = false; // don't normalize
            const stride = 0; // how many bytes to get from one set to the next
            const offset = 0; // how many bytes inside the buffer to start from
            gl.bindBuffer(gl.ARRAY_BUFFER, buffers.textureCoord);
            gl.vertexAttribPointer(
                programInfo.attribLocations.textureCoord, 
                num, 
                type, 
                normalize, 
                stride, 
                offset);
            gl.enableVertexAttribArray(programInfo.attribLocations.textureCoord);
        }
       
        //Bind Texture
        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, texture);
        


        //Indices
        
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffers.indices);
        

        gl.useProgram(programInfo.program);

        gl.uniform1i(programInfo.uniformLocations.uSampler, 0);
        gl.uniformMatrix4fv(
            programInfo.uniformLocations.projectionMatrix,
            false,
            projectionMatrix);
        gl.uniformMatrix4fv(
            programInfo.uniformLocations.modelViewMatrix,
            false,
            modelViewMatrix);
        gl.uniformMatrix4fv(
            programInfo.uniformLocations.viewMatrix,
            false,
            viewMatrix,
        )

        



            
        {
            const vertexCount = this.indices.length;
            const type = gl.UNSIGNED_SHORT;
            const offset = 0;
            gl.drawElements(gl.TRIANGLES, vertexCount, type, offset);
        }
    }
};
