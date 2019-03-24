class Player{
    constructor(model,textureSrc)
    {
        this.mesh = new Mesh(model,textureSrc);
        this.transf = new Transform();
        let move = [0,0,0];
        let rotate = [0,0,0];
        this.transform = {
            move: move,
            rotate: rotate,
        };
        
    }
    Init(gl){
        this.mesh.Init(gl);
    }

    Draw(gl,programInfo,camera){
       
        this.mesh.Draw(gl,programInfo,this.transf.GetModelViewMatrix(),camera.GetProjectionMatrix(),camera.GetViewMatrix());
    }

    Move(){
        this.transf.Transform(this.transform.move,this.transform.rotate,[1,1,1]);
    }
    

}