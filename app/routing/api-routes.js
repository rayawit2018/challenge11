const fs =require("fs");

var uniqid= require("uniqid");

// routing

module.exports =function(app){
    app.get("/api/notes", (req,res)=>{
        console.log(" Get notes request");

        let data= fs.readFileSync("/app/data/db.json");
        res.json(JSON.parse(data));
    });

    // post request

    app.post("/api/notes", (req,res)=>{
        const newNote={
            ...req.body,
            id:uniqid(),
        };
        console.log("post new note");

        let data =fs.readFileSync("./app/data/db.json");

        const dataJSON = JSON.parse(data);

        dataJSON.push(newNote);

        // write notes to db.json file
        fs.writeFile( "./app/data/db.json",JSON.stringify(dataJSON),
            (err,text)=>{
                if(err){
                  console.error(err);
                  return;
                }
                console.log(text);
            }
        );
        console.log( "added new note");

        // send json data
        res.json(data);
    });

    // delete request

    app.delete("/api/notes/:id", (req,res)=>{

        let data= fs.readFileSync("./app/data/db.json");
        const dataJSON = JSON.parse(data);

        const newNotes= dataJSON.filter((note)=>{
            return note.id !==req.params.id;
        });

        fs.writeFile("./app/data/db.json",JSON.stringify(newNotes),(err,text)=>{
            if(err){
                console.error(err);
                return;
            }
        });

    });
};


      