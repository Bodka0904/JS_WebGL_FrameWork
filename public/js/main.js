

function main() {
   
    setup();
    control(player.transform,0.1);
    sphere.CreateSphere();
    sphere.Init(gl);
   
    function rend() {
        
        shader.Clear(gl);
        
        
        camera.Move(player.transform.move);
        
        camera.UpdateCamera();
       

        
       
        player.Move();
        player.Draw(gl,programInfo,camera);


        sphere.Draw(gl,programInfo,camera);
        requestAnimationFrame(rend);
    };
    requestAnimationFrame(rend);

}



