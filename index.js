import express from 'express';
import db from './model/index.js';
import { routeProduto } from './routes/produto.routes.js';
import { routePraca } from './routes/praca.routes.js';
import cors from "cors";

export const app = express();

app.use(cors({
    // origin: "https://pracar2.vercel.app",
    origin: "http://localhost:3000",
    methods: "GET, POST, PATCH",
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
    optionsSuccessStatus:  204
}))

app.use(express.json());
app.use(express.urlencoded({extended:true}))

db.connection.sync()
.then(()=>{
    console.log("Re-sync db.");
})
.catch(err=>{
    console.log("Failed to sync db.", err.message);
})


app.get('/',(_,response)=>{
    response.status(200).json({mensage:"Hi, this server is on..."})
})

routeProduto(app)
routePraca(app)

const host = process.env.PGHOST;
const port = 5000;


app.listen(port,()=>{
    console.log(`Server working in https://${host}:${port}`)
})
