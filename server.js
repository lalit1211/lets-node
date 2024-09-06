const http = require("http");
const fs = require("fs");
const url = require("url");






const server = http.createServer((req, res) => {

    const path = url.parse(req.url, true);
    let products = JSON.parse( fs.readFileSync("./product.json", {encoding: "utf-8",}));
    let id = path.query.id;





// ,                             getting the products                                            
	if (req.method === "GET" && path.pathname === "/products"
	) {


        if(id == undefined){
            res.write(JSON.stringify(products));
        }else{
        
            let product = products.find((product, index)=>{
                return Number(product.id)=== Number(id);
            })

            if(product != undefined){
                res.write(JSON.stringify(product)); 
            }else{
                res.write(JSON.stringify({message: "product not found."}));
            }   
            
        }
	}
//``````````````````````````````````````````````````````````````````````````````````````````````````````````




// ,                                       deleting the products                                                          
    else if(req.method === 'DELETE' && path.pathname === "/products"){

        if (id!=undefined && id !==-1) {
            let deleteProductIndex = products.findIndex(
				(product) => {
					return (
						Number(product.id) === Number(id)
					);
				},
			);

			console.log(deleteProductIndex);

			if (deleteProductIndex !== -1) {
				let deleteProduct = products.splice(
					deleteProductIndex,
					1,
				);
				console.log("delete ==>", deleteProduct);

				let data = fs.writeFile(
					"./product.json",
					JSON.stringify(products),
					(err)=>{
						if (!err) {
							res.write(
								JSON.stringify({
									message:
										"product deleted successfully",
									deleteProduct,
								}),
							);
							res.end();
						}else{
							res.write(JSON.stringify({
								message: 'while deleting error ocurred.'
							}))
							res.end()
						}
					}
				);

			}else{
				res.write(JSON.stringify({
					message: "product not found."
				}))
				res.end()
			}
			

			
        } else {
            res.write(JSON.stringify({
                message: "please provide valid id to delete."
            }))
			res.end();
        }
        
        
    }
// ` ...............................................................................................





// ,                          adding new product                                    
else if(req.method ==='POST' && path.pathname ==='/products'){
	
	let data =""
	req.on("data", (chunks)=>{
		data += chunks;
	})

	req.on("end", ()=>{
		let dataObj = JSON.parse(data)
		products.push(dataObj)


		fs.writeFileSync("./product.json", JSON.stringify(products), (err)=>{
			if(err === null){
				res.write(JSON.stringify({
					message: "product added"
				}))
				res.end()
			}else{
				res.write(JSON.stringify({
					message: "some problem in deleting."
				}))
				res.end()
			}
		})
		
		
	})

}
// `````````````````````````````````````````````````````````````````````````````````







// 	// ,                      updating the products                                 
// 	else if(req.method === 'PUT' && path.pathname === '/products'){
		
// 		let data = []
// 		req.on("data", (chunks)=>{
// 			data.push(chunks.toString());
// 		})

// 		req.once("end", ()=>{
// 			console.log(JSON.parse(data));

// 			try {
// 				if(id){
// 					console.log(id);
// 					res.end("id hai")
// 				}
// 			} catch (error) {
				
// 			}
			
// 		})
		

		

// 	}
// //` ...............................................................................................................






// ,                      404 not found path handling                                

else{
	res.write("404 not found");
	res.end();
}

    res.end();
});

server.listen(8000, () => {
	console.log("Server is running.");
});









// [
// 	{ "id": 1, "name": "Iphone 11", "price": 41000 },
// 	{ "id": 2, "name": "Samsung s23 ultra", "price": 88000 },
// 	{" id": 3, "name": "OnePlus nord", "price": 45000 }
// ]