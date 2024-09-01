import express from "express";
import cors from "cors"
import { connectDB } from "./data/database.js";
import student from "./routes/student.js"
import teacher from "./routes/teacher.js"
import cookieParser from "cookie-parser";
import paymentRoutes from "./routes/paymentRoutes.js"
import productRoutes from "./routes/productRoutes.js"


const app = express();
app.use(cookieParser())
connectDB();
app.use(express.json());
 app.use(cors({
    origin:["http://localhost:3000"],
    methods:["GET","POST","PUT","DELETE"],
    credentials:true,
}))
 app.use(student);
 app.use(teacher);
 
app.use('/api/products', productRoutes);
app.use('/api/payment', paymentRoutes);


app.get("/",(req,res)=>{
    res.send("working")
})

app.listen(5000,()=>{
    console.log("server is working at port 5000")
})