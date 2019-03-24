//////////RESIZE//////////
const canvas = document.querySelector("#glCanvas");
const gl = canvas.getContext("webgl");

//////////SETUP BUFFERS AND WINDOW//////////////
let transform;
let camera;
let shader;
let render;
let player;

let buffers;
let programInfo;


let texture;
function setup(){
    if (gl === null) {
        alert("Unable to initialize WebGL. Your browser or machine may not support it.");
        return;
      }
      // Set clear color to black, fully opaque
      gl.clearColor(0.5, 0.5, 0.0, 1.0);
      // Clear the color buffer with specified clear color
      gl.clear(gl.COLOR_BUFFER_BIT);

     

    
     
    
    
    transform = new Transform();
    camera = new Camera(45 * Math.PI / 180,gl.canvas.clientWidth / gl.canvas.clientHeight,0.1,100,-10);
    shader = new Shader(vsSource,fsSource);
    player = new Player(monkeyHead,'/textures/SusanTexture.png');
    
    programInfo = shader.InitShaderProgram(gl);
    player.Init(gl);
};

