const fs = require('fs');

// fs.readFile('./testt.txt', {encoding: "utf-8"}, (err, data)=>{
//     if(err==null){
//         console.log(data);
        
//     }else{
//         console.log("Some error ocurred", err);
        
//     }
// })
fs.writeFileSync("./test.txt" , "Hello guys.");
let data = fs.readFileSync('./test.txt', {encoding:"utf-8"}, (err, data)=>{
    console.log(data);
    
})
console.log(data);
