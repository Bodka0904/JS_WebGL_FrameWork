class Terrain{
    constructor(heightmap,size,height,textureSrc)
    {   
        this.heightmap = heightmap;
        this.heights = [];

        this.positions = [];
        this.indices = [];
        this.textureCoords = [];
        this.normals = [];

        this.size = size;
        this.height = height;

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

    LoadHeightMap(){
      
         
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
                
                this.positions[pointer] = i*this.size;
                this.positions[pointer+1] = this.heights[i][j]*this.height;
                this.positions[pointer+2] = j*this.size;
                
                
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
    fmod(a,b) 
    { 
        return Number((a - (Math.floor(a / b) * b)).toPrecision(8)); 
    };
    Collision(move)
    {
        let gridSquareSize = this.size;

        let gridX = Math.round(move[0] / gridSquareSize);
        let gridZ = Math.round(move[2] / gridSquareSize);

        let xCoord = this.fmod(move[0],gridSquareSize) / gridSquareSize;
        let zCoord = this.fmod(move[2],gridSquareSize) / gridSquareSize;
        
        let answer;

        if (gridX >= this.heights.length - 1 || gridZ >= this.heights.length - 1 || gridX < 0 || gridZ < 0)
        {
            answer = move[1];
        }
        else
        {
            if(xCoord <= 1 - zCoord)
            {

                answer = this.BaryCentric([0,(this.heights[gridX][gridZ] * this.height) + this.transform.move[1],0],[1,(this.heights[gridX+1][gridZ] * this.height)+this.transform.move[1],0],
                                            [0,(this.heights[gridX][gridZ+1] * this.height) + this.transform.move[1],1],[xCoord,zCoord]);
            }
            else
            {
                answer = this.BaryCentric([1,(this.heights[gridX+1][gridZ] * this.height) + this.transform.move[1],0],[1,(this.heights[gridX+1][gridZ+1] * this.height)+this.transform.move[1],1],
                                            [0,(this.heights[gridX][gridZ+1] * this.height) + this.transform.move[1],1],[xCoord,zCoord]);
            }
        }
        if (move[1] < answer)
        {
            
            move[1] = answer;
        }
       
        

    }

    BaryCentric(p1,p2,p3,pos)
    {
        let det = ((p2[2] - p3[2]) * (p1[0] - p3[0])) + ((p3[0] - p2[0]) * (p1[2] - p3[2]));
        let l1 = ((p2[2] - p3[2]) * (pos[0] - p3[0]) + (p3[0] - p2[0]) * (pos[1] - p3[2])) / det;
	    let l2 = ((p3[2] - p1[2]) * (pos[0] - p3[0]) + (p1[0] - p3[0]) * (pos[1] - p3[2])) / det;
        let l3 = 1 - l1 - l2;
        
        return l1 * p1[1] * l2 * p2[1] + l3 * p3[1];
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