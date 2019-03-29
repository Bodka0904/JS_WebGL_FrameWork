
function main() {
   
    setup();       
    control(player.transform,0.1);
            
    sphere.CreateSphere();
    sphere.Init(gl);
    sphere.GetRadius();

   
    function rend() {
        
        shader.Clear(gl);
        player.Fly(0.1)
        camera.Move(player.transform.move);
        
        camera.UpdateCamera();
       
     
        player.Bounce(sphere);
        player.Move();
        
        player.Draw(gl,programInfo,camera);


        sphere.Draw(gl,programInfo,camera);

       
////////////////////////////////////////////////////
        requestAnimationFrame(rend);
    };
    requestAnimationFrame(rend);

}



