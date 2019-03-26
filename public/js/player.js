class Player{
    constructor(model,textureSrc)
    {
        this.mesh = new Mesh(model,textureSrc);
        this.transf = new Transform();
        let move = [0,2,0];
        let rotate = [0,0,0];
        let scale = [1,1,1];
        this.transform = {
            move: move,
            rotate: rotate,
            scale: scale,
        };
        
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
    

}