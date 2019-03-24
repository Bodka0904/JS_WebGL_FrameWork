class Mesh{
    constructor(model,textureSrc)
    {
        this.model = model;
        this.textureSrc = textureSrc;
        this.buffers;
        this.texture;
        this.render = new Render(this.model.meshes[0].vertices,[].concat.apply([],this.model.meshes[0].faces),this.model.meshes[0].texturecoords[0]);

    }
    
    
    Init(gl){

        this.buffers = this.render.InitBuffers(gl);
        this.texture = this.render.LoadTextures(gl,this.textureSrc)
    }

    Draw(gl,programInfo,modelViewMatrix,cameraProjectionMatrix,cameraViewMatrix,cameraWorldMatrix){
        this.render.Draw(gl,programInfo,this.buffers,this.texture,modelViewMatrix,cameraProjectionMatrix,cameraViewMatrix,cameraWorldMatrix);
        
    }
};