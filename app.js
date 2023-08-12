const express = require("express");
const librosRouter = require('./routes/libros');
const { auth } = require("express-oauth2-jwt-bearer");
const errorHandler = require('./middleware/errorHandler');



// Middleware con el Servidor de Autorización
const jwtCheck = auth({
    audience: "http://localhost:3000/api/productos",
    issuerBaseURL: "https://dev-utn-frc-iaew.auth0.com/",
    tokenSigningAlg: "RS256"
    });

const app = express();
app.use(express.json());


app.get("/", (req, res)=>{
    res.send("api de productos");
});

app.use("/libros", jwtCheck, librosRouter);
app.use(errorHandler);

app.listen(3000, () => {
    console.log("Servidor iniciado en el puerto 3000");
});