class Terrain{
    constructor(heightmap,textureSrc)
    {   
        this.heightmap = heightmap;
        this.heights = [];

        this.positions = [];
        this.indices = [];
        this.textureCoords = [];

        this.textureSrc = textureSrc;
           

        this.mesh;
        this.transf = new Transform();
        let move = [0,0,0];
        let rotate = [0,0,0];
        let scale = [50,50,50];
        this.transform = {
            move: move,
            rotate: rotate,
            scale: scale,
        };
    }

    LoadHeightMap(size,height){
      
         
        for (var i = 0; i < this.heightmap.length;++i)
        {
        
            let tmp = [];
            for (var j = 0; j < this.heightmap.length;++j)
            {
                tmp[j] = this.heightmap[i][j].R / 255;
    
                
            }
            this.heights[i] = tmp;
            
        }
        let pointer = 0;
        for (var i = 0; i < this.heightmap.length;++i)
        {
        
            for (var j = 0; j < this.heightmap.length;++j)
            {
                this.textureCoords[pointer] = [i/this.heightmap.length,j/this.heightmap.length];
                this.positions[pointer] = [i*size,this.heights[i][j]*height,j*size]; //TO DO positions save as array of single x,y,z,x,y,z not [x,y,z],[x,y,z]
                pointer++;

            }
        }

        let pointer2 = 0;
        
        for (var i = 0; i < this.heightmap.length - 1;++i)
        {
        
            for (var j = 0; j < this.heightmap.length - 1;++j)
            {
                
                let start = i * (this.heightmap.length) + j;
                
               
                 
                this.indices[pointer2++] = start;
                this.indices[pointer2++] = start +1;
                this.indices[pointer2++] = start + this.heightmap.length + 1;

                this.indices[pointer2++] = start +1;
                this.indices[pointer2++] = start +1 + this.heightmap.length +1;
                this.indices[pointer2++] = start + this.heightmap.length;

                
                 
            }
               
        }
       

    }

    Init(gl){
        this.mesh = new MeshNoModel(this.positions,this.indices,this.textureCoords,this.textureSrc);
        
        this.mesh.Init(gl);
        
    }

    Draw(gl,programInfo,camera){
        this.mesh.Draw(gl,programInfo,this.transf.GetModelViewMatrix(),camera.GetProjectionMatrix(),camera.GetViewMatrix());
    }

    Move(){
        this.transf.Transform(this.transform.move,this.transform.rotate,this.transform.scale);
    };


}