class Terrain{
    constructor(heightmap,textureSrc)
    {   
        this.heightmap = heightmap;
        this.heights = [];

        this.positions = [];
        this.indices = [];
        this.textureCoords = [];
        this.normals = [];

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
        for (var i = 0; i < this.heightmap.length ;++i)
        {
        
            for (var j = 0; j < this.heightmap.length ;++j)
            {
                
                this.positions[pointer] = i*size;
                this.positions[pointer+1] = this.heights[i][j]*height;
                this.positions[pointer+2] = j*size;
                
                
                pointer += 3;
            }
        }
        
        let tmp = [];
        pointer = 0;
        for (var i = 0; i < this.heightmap.length; ++i)
        {
            
            for (var j = 0; j < this.heightmap.length; ++j)
            {
                tmp[pointer] = this.CalculateNormals(i,j);
                pointer++;
            }
        }
        
        pointer = 0;
        for (var i = 0; i < tmp.length; ++i)
        {
            
            this.normals[pointer] = tmp[i][0];
            this.normals[pointer+1] = tmp[i][1];
            this.normals[pointer+2] = tmp[i][2];

            pointer+=3;
        }
        

        pointer = 0;
        for (var i = 0; i < this.heightmap.length - 1;++i)
        {
        
            for (var j = 0; j < this.heightmap.length - 1;++j)
            {
                
                let start = i * (this.heightmap.length) + j;
                
               
                 
                this.indices[pointer] = start;
                this.indices[pointer+1] = start +1;
                this.indices[pointer+2] = start + this.heightmap.length;

                this.indices[pointer+3] = start +1;
                this.indices[pointer+4] = start +1 + this.heightmap.length;
                this.indices[pointer+5] = start + this.heightmap.length;
                
                pointer += 6;
                 
            }
               
        }
        pointer = 0;
        for (var i = 0; i < this.heightmap.length;++i)
        {
        
            for (var j = 0; j < this.heightmap.length;++j)
            {
                this.textureCoords[pointer++] = [i/this.heightmap.length];
                this.textureCoords[pointer++] = [j/this.heightmap.length];
            }
        }
       
        
    }
    
    CalculateNormals(i,j){
        let heightL 
        let heightR 
        let heightD 
        let heightU 

        if (i == 0 || j == 0 || i == this.heights.length - 1 || j == this.heights.length - 1)
        {
            return [0, 2, 0];
        }
        else
        {   
            heightL = this.heights[i-1][j];
            heightR = this.heights[i+1][j];
            heightD = this.heights[i][j-1];
            heightU = this.heights[i][j+1];

      
            return [heightL - heightR, 2, heightD - heightU];
        }
    }

    Init(gl){
        
        this.mesh = new MeshNoModel(this.positions,this.indices,this.textureCoords,this.normals,this.textureSrc);
        
        this.mesh.Init(gl);
        
    }

    Draw(gl,programInfo,camera){
        this.mesh.Draw(gl,programInfo,this.transf.GetModelViewMatrix(),camera.GetProjectionMatrix(),camera.GetViewMatrix());
    }

    Move(){
        this.transf.Transform(this.transform.move,this.transform.rotate,this.transform.scale);
    };


}