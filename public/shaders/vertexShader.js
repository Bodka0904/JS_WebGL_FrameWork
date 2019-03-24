const vsSource = `
    attribute vec4 aVertexPosition;
    attribute vec2 aTextureCoord;
   
   

    uniform mat4 uModelViewMatrix;
    uniform mat4 uProjectionMatrix;
    uniform mat4 mView;
    
    varying highp vec2 vTextureCoord;

    void main(void) {
      gl_Position = uProjectionMatrix * mView * uModelViewMatrix * aVertexPosition;
      vTextureCoord = aTextureCoord;
    }
  `;