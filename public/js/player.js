class Player{
    constructor(model,textureSrc)
    {
        this.mesh = new Mesh(model,textureSrc);
        this.transf = new Transform();
        let move = [25,5,10];
        let rotate = [0,0,0];
        let scale = [1,1,1];
        this.transform = {
            move: move,
            rotate: rotate,
            scale: scale,
        };
        this.radius;
    }
    Init(gl){
        this.mesh.Init(gl);
        this.radius = this.mesh.GetSphereRadius();
    }

    Draw(gl,programInfo,camera){
       
        this.mesh.Draw(gl,programInfo,this.transf.GetModelViewMatrix(),camera.GetProjectionMatrix(),camera.GetViewMatrix());
    }

    Move(){
        this.transf.Transform(this.transform.move,this.transform.rotate,this.transform.scale);
    }
    Fly(speed){
        this.transform.move[2] += speed * Math.cos(this.transform.rotate[1]);
        this.transform.move[0] += speed * Math.sin(this.transform.rotate[1]);

        return true;
    }
    
    Bounce(sphere){
        if(sphere.Collision(this.transform.move,this.radius))
        {
            this.transform.rotate[0] = -this.transform.rotate[0];
            this.transform.rotate[1] = -this.transform.rotate[1];
            this.transform.rotate[2] = -this.transform.rotate[2];

            if (this.transform.move[0] > sphere.transform.move[0])
            {
                this.transform.move[0] += 0.1;

            }
            else
            {
                this.transform.move[0] == 0.1;

            }

            if (this.transform.move[1] > sphere.transform.move[1])
            {
                this.transform.move[1] += 0.1;
            }
            else
            {
                this.transform.move[1] -= 0.1;
            }

            if ( this.transform.move[2] > sphere.transform.move[2])
            {
                this.transform.move[2] += 0.1;
            }
            else
            {
                this.transform.move[2] -= 0.1;
            }
        }
    }
}