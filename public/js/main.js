function main() {

    setup();
    control(player.transform,0.1);
    
   
    function rend() {
        
        
        //camera.Rotate([0,0,0]);
        //camera.Move([0,0,0]);
        camera.Rotate(rotation);
        camera.UpdateCamera();
        

        
        player.Move();
        player.Draw(gl,programInfo,camera);




        requestAnimationFrame(rend);
    };
    requestAnimationFrame(rend);

}



