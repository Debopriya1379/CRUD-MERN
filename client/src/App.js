import { useState,useEffect } from 'react';
import Axios from 'axios'
import './App.css';

function App() {

  const [foodName,setFoodName] = useState("")
  const [days , setDays] = useState(0)
  const [foodList , setFoodList] = useState([])
  const [newFood , setNewFood] = useState("")

  useEffect(() => {
    Axios.get("http://localhost:3001/read").then((response)=>{
      // console.log(response)
      setFoodList(response.data)
    })
  }, []);

  const AddFood =()=>{
    // console.log(foodName+days)
    Axios.post("http://localhost:3001/insert",{
      foodName : foodName, 
      days : days
    }).then((res)=>{
      console.log(res)
    })
  };

  const updateFood =(id)=>{
    Axios.put("http://localhost:3001/update",{
      newFood : newFood,
      id : id
    })
  };

  const deleteFood=(id)=>{
    Axios.delete(`http://localhost:3001/delete/${id}`)
  }
  return (
    <div className="App">
      <h1>CRUD WITH MERN</h1>
      <label htmlFor="">Food Name</label>
      <input type="text" onChange={(e)=>{setFoodName(e.target.value)}} />
      <label htmlFor="">Day since Eat</label>
      <input type="number" onChange={(e)=>{setDays(e.target.value)}} />
      <button onClick={AddFood}>Add</button>
      <h1>Food List</h1>
      <div className="Content">
      {foodList.map((val,key)=>{
        return <div className="Fooditem" key={key}>
           <h1>{val.FoodName}</h1> 
           <h1>{val.days}</h1>
           <input type="text" placeholder="Food Name" onChange={(e)=>{setNewFood(e.target.value)}} />
           <button onClick={()=> updateFood(val._id)}>Update</button>
           <button onClick={()=>deleteFood(val._id)}>Delete</button>
           </div>
      })}
      </div>
    </div>
  );
}

export default App;
