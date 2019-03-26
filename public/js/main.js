let test =0;

function main() {
   
    setup();
    control(player.transform,0.1);
  
    
    
       
        
   
    function rend() {
        
        shader.Clear(gl);
        test = 0.005;
        
        camera.Move(player.transform.move);
        
        camera.UpdateCamera();
       

        
        player.Move();
        player.Draw(gl,programInfo,camera);

        terrain.Move();
        terrain.Draw(gl,programInfo,camera);


        requestAnimationFrame(rend);
    };
    requestAnimationFrame(rend);

}



