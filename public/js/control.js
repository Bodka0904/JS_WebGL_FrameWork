///////////////////KEYBOARD CONTROL/////////////////////
////            transform schema = {                ////
//                      move:move,                    //
//                      rotate:rotate,                //
//                     }                              //
////////////////////////////////////////////////////////
let rotation = [0,0,0];

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
            transform.move[2] += speed * Math.cos(transform.rotate[1]);
            transform.move[0] += speed * Math.sin(transform.rotate[1]);


        }
        if (key.keyCode == "40"){ //DOWN ARROW
            transform.move[2] -= speed * Math.cos(transform.rotate[1]);
            transform.move[0] -= speed * Math.sin(transform.rotate[1]);

        }
           
       
        

        if(key.keyCode == "32") //SPACE
        {   
            
        }


        if (key.keyCode == "65") //A
        {
              rotation[2] = 0.005;
        } 
        if (key.keyCode == "68") //D
        {
           
        }
        


        if(key.keyCode == "98") //2
        {
            transform.rotate[0] -= speed;
        }
        if(key.keyCode == "104") //
        {
            transform.rotate[0] += speed;
        }


  
    };

};

