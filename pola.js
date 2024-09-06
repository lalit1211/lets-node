const http = require("http");
const fs = require("fs");
const url = require("url");

const server = http.createServer((req, res) => {
        const path = url.parse(req.url, true);
		let products = JSON.parse(
			fs.readFileSync("./product.json", {
				encoding: "utf-8",
			}),
		);
		let id = path.query.id;


        if (req.method === "PUT" && 	path.pathname === "/products") {
			console.log();
		}

})

server.listen(8000, ()=>{
    console.log("Server is running.");
    
})