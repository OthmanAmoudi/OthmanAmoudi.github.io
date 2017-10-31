
var steps = [];
var userSteps = [];
var strictMode = false;
$(document).ready(function(){

disabelInterAction();

// var s1 = document.getElementsByClassName('s1');
// var s2 = document.getElementsByClassName('s2');
// var s3 = document.getElementsByClassName('s3');
// var s4 = document.getElementsByClassName('s4');
var square = document.getElementsByClassName('square');
var audioElement1 = document.getElementById('sound1');
var audioElement2 = document.getElementById('sound2');
var audioElement3 = document.getElementById('sound3');
var audioElement4 = document.getElementById('sound4');

$('.s1').on('click',()=>{   
    audioElement1.play();
    var id = $('.s1').prop('id');
    var num = parseInt(id[1]);
    userSteps.push(num);
    if(steps.length === userSteps.length){
        console.log('userStp: ',userSteps);
        console.log('steps: ',steps);
        disabelInterAction();
        if(checkUserInputs(steps,userSteps)){
            startGame(steps)            
        }else{
            if (strictMode){
            disabelInterAction();
            steps = [];
            userSteps = []; 
            $('.start').css('background-color','white');
            }                        
        }
    }  
    console.log('userSteps ',userSteps); 
})

$('.s2').on('click',()=>{   
    audioElement2.play();
    var id = $('.s2').prop('id');
    var num = parseInt(id[1]);
    userSteps.push(num);
    if(steps.length === userSteps.length){
        console.log('userStp: ',userSteps);
        console.log('steps: ',steps);
        disabelInterAction();
        if(checkUserInputs(steps,userSteps)){
            startGame(steps)            
        }else{
            if (strictMode){
                disabelInterAction();                
                steps = [];
                userSteps = []; 
                $('.start').css('background-color','white');
                }                         
        }
    }     
    console.log('userSteps ',userSteps); 
})

$('.s3').on('click',()=>{   
    audioElement3.play();
    var id = $('.s3').prop('id');
    var num = parseInt(id[1]);
    userSteps.push(num);
    if(steps.length === userSteps.length){
        console.log('userStp: ',userSteps);
        console.log('steps: ',steps);
        disabelInterAction();
        if(checkUserInputs(steps,userSteps)){
            startGame(steps)            
        }else{
            if (strictMode){
                disabelInterAction();
                steps = [];
                userSteps = []; 
                $('.start').css('background-color','white');
                }             
        }
    }     
    console.log('userSteps ',userSteps); 
})

$('.s4').on('click',()=>{   
    audioElement4.play();
    var id = $('.s4').prop('id');
    var num = parseInt(id[1]);
    userSteps.push(num);
    if(steps.length === userSteps.length){
        console.log('userStp: ',userSteps);
        console.log('steps: ',steps);
        disabelInterAction();
        if(checkUserInputs(steps,userSteps)){
            startGame(steps)             
        }else{
            if (strictMode){
                disabelInterAction();                
                steps = [];
                userSteps = []; 
                $('.start').css('background-color','white');
                }             
        }
    }     
    console.log('userSteps ',userSteps); 
})


// $('.square').on('click',()=>{
//     var id = $(square).val();
//     var attr = $('.square').attr('id');    
//     console.log('id',id,'attr',attr);
// })

var checked = false;

$("#toggle").on('click',()=>{
    if (checked == false){
       // console.log('on')
        enableInterAction();
        
        $('.stepsCount').text('--');      
        return checked = true;          
    }
    if (checked == true){ 
    // console.log('are you sure ?')   
    var conf = confirm("Are you sure? your steps will be lost!");
    conf;
    if (conf){
        checked = false;
        disabelInterAction();
        $('.stepsCount').text('');
        steps = []; 
       // console.log('sure')   
    }else{ 
        $('#toggle').prop('checked', true); // Checks it        
       // console.log('not sure')           
        return checked = true; 
        }
    }  
});

    $('.start').on('click',()=>{
       
            steps = [];
            startGame(steps);
            $('.start').css('background-color','rgb(207, 159, 0)');
        
    });

    $('.strict').on('click',()=>{
        
             if(strictMode == false){
                 strictMode = true;
                 $('.strict').css('background-color','red');
             }else{
                 strictMode = false;
                 $('.strict').css('background-color','white');                 
             }
         
     });

});

function startGame(steps){
    console.log('strict: ', strictMode);
    
    disabelInterAction();
    userSteps = [];
    var gen_sound = generate_sound();
    steps.push(gen_sound);
    console.log('steps: ',steps);
    $('.stepsCount').text(steps.length);
    var limit = steps.length;
    for (var i=0;i<=limit;i++) {
        (function(ind) {
           setTimeout(function(){
            makeAmove(ind);
               if(ind === limit){
                   console.log('the last one');
                   enableInterAction();
               }
           }, 1000 + (1000 * ind));
       })(i);
    }

}

function repeatSound(){
    disabelInterAction();
    console.log('continue with: ',steps);
    $('.stepsCount').text(steps.length);
    var limit = steps.length;
    for (var i=0;i<=limit;i++) {
        (function(ind) {
           setTimeout(function(){
            makeAmove(ind);
               if(ind === limit){
                   console.log('the last one(in repeat)');
                   console.log('userSteps ',userSteps); 
                   console.log('steps ',steps);
                   userSteps = []; 
                   enableInterAction();
               }
           }, 1000 + (1000 * ind));
       })(i);
    }

}


function makeAmove(index){

        playSound(steps[index]);

}

function generate_sound(){
    var randomSound = Math.floor((Math.random() * 4) + 1);
    return randomSound;    
}

function playSound(sound){
    var audioElement1 = document.getElementById('sound1');
    var audioElement2 = document.getElementById('sound2');
    var audioElement3 = document.getElementById('sound3');
    var audioElement4 = document.getElementById('sound4');
    console.log('sound', sound)
    if(sound === 1){
        audioElement1.play();
        activePosition(sound);        
    }
    if(sound === 2){
        audioElement2.play();
        activePosition(sound);        
    }
    if(sound === 3){
        audioElement3.play();
        activePosition(sound);        
    }
    if(sound === 4){
        audioElement4.play();
        activePosition(sound);        
    }
 
}

function activePosition(randomSound){
    var generate_square = '#s'+randomSound;
    var generate_highlited_square = 's'+randomSound+'high';
    // alert(generate_square);
    // alert(generate_highlited_square);
    $(generate_square).addClass(generate_highlited_square);
    setTimeout(()=>{
    $(generate_square).removeClass(generate_highlited_square);        
    },500);

}

function checkUserInputs(steps,inputs){
    Array.prototype.equals = function (array, strict) {
        if (!array)
            return false;
        if (arguments.length == 1)
            strict = true;
        if (this.length != array.length)
            return false;
        for (var i = 0; i < this.length; i++) {
            if (this[i] instanceof Array && array[i] instanceof Array) {
                if (!this[i].equals(array[i], strict))
                    return false;
            }
            else if (strict && this[i] != array[i]) {
                return false;
            }
            else if (!strict) {
                return this.sort().equals(array.sort(), true);
            }
        }
        return true;
    }
        
    if (steps.equals(inputs)){
        console.log('correct Input');
        console.log('generating new sound');                
        enableInterAction();   
        return true;
    }else{
        steps = [];
        userSteps = [];        
        $('.stepsCount').text('--');
        console.log('wrong Input');
        setTimeout(()=>{
        console.log('listen again');
           if(strictMode === true){
                steps = [];
                    startGame(steps);
                    console.log('bang: ',steps);
                } if (strictMode === false){
                    repeatSound();
                    console.log('tango');                    
                }               
            },2000);
             return false;
        }  

}

function disabelInterAction(){
    document.getElementById('start').style.pointerEvents = 'none';    
    document.getElementById('s1').style.pointerEvents = 'none';
    document.getElementById('s2').style.pointerEvents = 'none';
    document.getElementById('s3').style.pointerEvents = 'none';
    document.getElementById('s4').style.pointerEvents = 'none';
}

function enableInterAction(){
    document.getElementById('start').style.pointerEvents = 'auto';
    document.getElementById('s1').style.pointerEvents = 'auto';
    document.getElementById('s2').style.pointerEvents = 'auto';
    document.getElementById('s3').style.pointerEvents = 'auto';
    document.getElementById('s4').style.pointerEvents = 'auto'; 
}