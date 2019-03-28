class Mesh{
    constructor(model,textureSrc)
    {
        this.model = model;
        this.textureSrc = textureSrc;
        this.buffers;
        this.texture;
        this.render = new Render(this.model.meshes[0].vertices,[].concat.apply([],this.model.meshes[0].faces),this.model.meshes[0].texturecoords[0],this.model.meshes[0].normals);

    }
    
    Init(gl){

        this.buffers = this.render.InitBuffers(gl);
        this.texture = this.render.LoadTextures(gl,this.textureSrc)
    }

    Draw(gl,programInfo,modelViewMatrix,cameraProjectionMatrix,cameraViewMatrix,cameraWorldMatrix){
        this.render.Draw(gl,programInfo,this.buffers,this.texture,modelViewMatrix,cameraProjectionMatrix,cameraViewMatrix,cameraWorldMatrix);
        
    }
    GetSphereRadius(){
        let xarray = [];

         for (var i = 0 ; i < this.model.meshes[0].vertices.length;i+=3)
         {
             xarray.push(this.model.meshes[0].vertices[i]);
         }
         
         let MaxX = Math.max(...xarray);
         let MinX = Math.min(...xarray);

         return (Math.abs(MaxX) + Math.abs(MinX)) / 2;
    }
};

class MeshNoModel{
    constructor(vertices,indices,texturecoords,normals,textureSrc)
    {
        this.vertices = vertices;
        this.indices = indices;
        this.texturecoords = texturecoords;
        this.normals = normals;
        this.textureSrc = textureSrc;

        this.render = new Render(this.vertices,this.indices,this.texturecoords,this.normals);
    }
    
    Init(gl){

        this.buffers = this.render.InitBuffers(gl);
        this.texture = this.render.LoadTextures(gl,this.textureSrc)
    }

    Draw(gl,programInfo,modelViewMatrix,cameraProjectionMatrix,cameraViewMatrix,cameraWorldMatrix){
        this.render.Draw(gl,programInfo,this.buffers,this.texture,modelViewMatrix,cameraProjectionMatrix,cameraViewMatrix,cameraWorldMatrix);
        
    }

    GetSphereRadius(){
        let xarray = [];

         for (var i = 0 ; i < this.vertices.length;i+=3)
         {
             xarray.push(this.vertices[i]);
         }
         
         let MaxX = Math.max(...xarray);
         let MinX = Math.min(...xarray);

         return (Math.abs(MaxX) + Math.abs(MinX)) / 2;
    }
}