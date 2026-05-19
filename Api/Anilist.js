import express from "express"



const router = express.Router();

router.post("/anilist", async(req, res) => {
    try{
        const response = await fetch("https://graphql.anilist.co", {
            method: "POST",
            headers: {
                "Content-type" : "application/json",
                Accept: "application/json"
            },
            body: JSON.stringify(req.body)
        })
        const data = await response.json();

        res.json(data)
    } catch(error){
        console.log(error);
    
        res.status(500).json({
            message: "Anilist fetch failed"
        })
    }

});

export default router