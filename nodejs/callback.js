// function a(){
//     console.log('A');

// }

var a = function(){
    console.log('A');
} 

a();


function showfunc(callback){
    callback();
}

showfunc(a);