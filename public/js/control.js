///////////////////KEYBOARD CONTROL/////////////////////
////            transform schema = {                ////
//                      move:move,                    //
//                      rotate:rotate,                //
//                      scale:scale,}                              //
////////////////////////////////////////////////////////


function control(transform,speed){
    window.addEventListener("keydown",checkKeyPress, false);
    
    
    function checkKeyPress(key){

        if (key.keyCode == "37"){ //LEFT ARROW
            transform.rotate[1] += speed;
            
        }   
        if (key.keyCode == "39"){ //RIGHT ARROW
            transform.rotate[1] += -speed;
        }
        if (key.keyCode == "38"){ //UP ARROW
            
            //3D VELOCITY MOVEMENT
            let onePercent = (Math.abs(Math.cos(transform.rotate[1])) + Math.abs(Math.sin(transform.rotate[1]))) / 100 
            let z = (Math.cos(transform.rotate[1]) / onePercent);
            let x = (Math.sin(transform.rotate[1]) / onePercent);

            transform.move[2] += speed * Math.cos(transform.rotate[1]) - ((speed * Math.sin(transform.rotate[0]) / 100) * z);
            transform.move[0] += speed * Math.sin(transform.rotate[1]) - ((speed * Math.sin(transform.rotate[0]) / 100) * x);
            transform.move[1] -= speed * Math.sin(transform.rotate[0]);
            ////////////////////////

        }
        if (key.keyCode == "40"){ //DOWN ARROW
            transform.move[2] -= speed * Math.cos(transform.rotate[1]);
            transform.move[0] -= speed * Math.sin(transform.rotate[1]);
            transform.move[1] += speed * Math.sin(transform.rotate[0]);
        }
           
       
        

        if(key.keyCode == "32") //SPACE
        {   
            
        }


        if (key.keyCode == "65") //A
        {
            
        } 
        if (key.keyCode == "68") //D
        {
            
        }
        


        if(key.keyCode == "98") //2
        {
            transform.rotate[0] -= speed;
            
        }
        if(key.keyCode == "104") //8
        {
            transform.rotate[0] += speed;
        }


  
    };

};

