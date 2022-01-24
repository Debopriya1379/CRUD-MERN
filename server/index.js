const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const dotenv = require("dotenv");
dotenv.config()
const DATABASE_URL = process.env.DATABASE_URL

const FoodModel = require("./models/Food")

app.use(express.json());
app.use(cors());

// let datbaseURL = process.env.DATABASE_URL

mongoose.connect(
    DATABASE_URL,    {
        UseNewUrlParser : true,
    }
);

app.get("/read" ,async(req,res)=>{
    FoodModel.find({},(err,result)=>{
        if(err){
            res.send(err);
        }
        res.send(result)
    });
    // res.send(result)
});

app.post("/insert" ,async(req,res)=>{
    const foodName = req.body.foodName
    const days = req.body.days
    const food = new FoodModel({FoodName : foodName, days : days});
    try{
        await food.save();
        res.send("Data Inserted")
    }catch(err){
        console.log(err)
    }
});

// app.put("/update", async(req,res)=>{
//     const newFood = req.body.newFood
//     const id = req.body.id

//     try{
//        await FoodModel.findById(id,(err,updatedFood)=>{
//             updatedFood.FoodName= newFood
//             updatedFood.save()
//             res.send("Data Updated")
//         })
//     }catch(err){
//         console.log(err)
//     }
// });

app.put("/update", async(req,res)=>{
    const newFood = req.body.newFood
    const id = req.body.id

    try{
       await FoodModel.findByIdAndUpdate(id,{FoodName : newFood})  // mongoose funnction replaced by "findByIdAndUpdate"
    }catch(err){
        console.log(err)
    }
});

// app.delete("/delete/:id",async(req,res)=>{
//     const id = req.params.id
//     // res.send(id)
//     await FoodModel.findByIdAndRemove(id).exec();
//     res.send("Data Deleted")
// })

app.delete("/delete/:id",async(req,res)=>{
    const id = req.params.id
    // res.send(id)
    await FoodModel.findByIdAndDelete(id);          // mongoose funnction replaced by "findByIdAndDelete"
    res.send("Data Deleted")
})

app.listen(3001, ()=>{
    console.log("server listening on port 3001...")
})