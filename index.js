const fs = require('fs');
const http = require('http');
const path = require('path');


const server =  http.createServer(function(req, res) {
    console.log('URL page:' + req.url);

    if(req.method==="GET")
    {   

        if(req.url==='/')
        {
            res.writeHead(200,{'Content-Type':'text/html; charset=utf-8'})
            fs.readFile(path.join(__dirname,'view','calc.html'), 
                        'utf-8', 
                        (err, data) => {
                            if(err)
                             throw err;
                             res.end(data);
                        })
        }
        
    }
    if(req.method==="POST")
    {
        const body = [];
        res.writeHead(200,{'Content-Type':'text/html; charset=utf-8'})

        req.on('data', data => {
            body.push(Buffer.from(data))
            
        })  
        
        req.on('end', ()=>
        {
            const param = body.toString().split("&");
            a=param[0].split("=")[1];
            op=param[1].split("=")[1];
            b=param[2].split("=")[1];
            let ans=0;
            
            if(op==='%2B')
            {
                ans=parseInt(a)+parseInt(b);
                
            }
            else if(op==='-')
            {
                ans=parseInt(a)-parseInt(b);
            }
            else if(op==='*')
            {
                ans=parseInt(a)*parseInt(b);
            }
            else if(op==='%2F')
            {
                ans=parseInt(a)/parseInt(b);
            }
            else if(op==='%25')
            {
                ans=parseInt(a)%parseInt(b);
            }
            if(isNaN(ans))
            {
                ans = "Все поля должны быть заполнены";
            }
            

            fs.readFile(path.join(__dirname,'view','calc.html'), 
                        'utf-8', 
                        (err, data) => {
                            if(err)
                             throw err;
                            res.end(data+`${ans}</div></form>`);
                        })


        })


    }


})

server.listen(3212,'localhost');
console.log('Server listening on port 3212'); 