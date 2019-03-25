const vsSource = `
    attribute vec3 aVertexPosition;
    attribute vec2 aTextureCoord;
    attribute vec3 aNormal;
   
   

    uniform mat4 uModelViewMatrix;
    uniform mat4 uProjectionMatrix;
    uniform mat4 mView;
    
    varying highp vec2 vTextureCoord;
    varying vec3 vNormal;

    void main(void) {

      vTextureCoord = aTextureCoord;
      vNormal = (uModelViewMatrix * vec4(aNormal,0.0)).xyz;

      gl_Position = uProjectionMatrix * mView * uModelViewMatrix * vec4(aVertexPosition,1.0);
      
    }
  `;