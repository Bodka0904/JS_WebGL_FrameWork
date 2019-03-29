class Sphere{
    constructor(SPHERE_DIV,size,textureSrc)
    {
        this.SPHERE_DIV = SPHERE_DIV;
        this.vertices = [];
        this.indices = [];
        this.textureCoords = [];
        this.normals = [];

        this.radius;
        this.size = size;
        this.textureSrc = textureSrc;


        this.mesh;
        this.transf = new Transform();
        let move = [0,0,0];
        let rotate = [0,0,0];
        let scale = [1,1,1];
        this.transform = {
            move: move,
            rotate: rotate,
            scale: scale,
        };
    }

    CreateSphere(){
        let ai,si,ci;
        let aj,sj,cj;
        let p1,p2;

        for (var j = 0; j <= this.SPHERE_DIV; ++j)
        {
            aj = j * Math.PI / this.SPHERE_DIV;
            sj = Math.sin(aj);
            cj = Math.cos(aj);
            for (let i = 0; i <= this.SPHERE_DIV;++i)
            {
                ai = i * 2 * Math.PI / this.SPHERE_DIV;
                si = Math.sin(ai);
                ci = Math.cos(ai);

                this.textureCoords.push(aj / 360);
                this.textureCoords.push((ai +90)/180);

                this.vertices.push((si*sj) * this.size);
                this.vertices.push(cj * this.size);
                this.vertices.push((ci*sj) * this.size);

                this.normals.push(0.5);
                this.normals.push(0.5);
                this.normals.push(0.5);
            }
        }

        for(var j = 0; j < this.SPHERE_DIV; ++j)
        {
            for(var i = 0;i< this.SPHERE_DIV;++i)
            {
                p1 = j * (this.SPHERE_DIV + 1) + i;
                p2 = p1 + (this.SPHERE_DIV + 1);

                this.indices.push(p1);
                this.indices.push(p2);
                this.indices.push(p1 + 1);

                this.indices.push(p1 +1);
                this.indices.push(p2);
                this.indices.push(p2 + 1);
            }
        }

        this.mesh = new MeshNoModel(this.vertices,this.indices,this.textureCoords,this.normals,this.textureSrc);
    }

    Init(gl){
        this.mesh.Init(gl);
    }

    Draw(gl,programInfo,camera){
       
        this.mesh.Draw(gl,programInfo,this.transf.GetModelViewMatrix(),camera.GetProjectionMatrix(),camera.GetViewMatrix());
    }

    Move(){
        this.transf.Transform(this.transform.move,this.transform.rotate,this.transform.scale);
    }

    GetRadius(){
         let xarray = [];

         for (var i = 0 ; i < this.vertices.length;i+=3)
         {
             xarray.push(this.vertices[i]);
         }
         
         let MaxX = Math.max(...xarray);
         let MinX = Math.min(...xarray);

         this.radius = (Math.abs(MaxX) + Math.abs(MinX)) / 2;
    }

    Collision(position,radius){

        
        if (Math.pow(this.transform.move[0] - position[0],2) + Math.pow(this.transform.move[1] - position[1],2) + Math.pow(this.transform.move[2] - position[2],2) <= Math.pow(this.radius - radius + 2,2))
        {
            return true;
        }
    }
        
        
    

}
