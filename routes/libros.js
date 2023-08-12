const express = require("express");
const router = express.Router();
//IMPORTAR LIBRERIA PARA VALIDAD SCOPES
const {requiredScopes} = require('express-oauth2-jwt-bearer');
const Libro = require("../models/Libro");
//obtener los libros

router.get("/", requiredScopes("read:productos"), async (req, res) => {
    try {
        const libros = await Libro.find();
        res.json(libros);
    } catch (error){
        res.status(500).json({error: "Error al obtener los libros"});
    }
});


//crear nuevo libro

router.post("/", requiredScopes("write:productos"), async (req, res) => {
    try {
        const nuevoLibro = new Libro(req.body);
        await nuevoLibro.save();
        res.json(nuevoLibro);
    } catch (error) {
        res.status(500).json({error: "Error al crear el Libro"});
    }
});
//actualizar
router.put("/:id", requiredScopes("write:productos"), async (req, res) =>{
    try {
        const Libro = await Libro.findByIdAndUpdate(req.params.id, req.body,
            {
                new: true,
            });
            response.json(Libro);
    } catch  (error) {
        res.status(500).json({ error: "Error al actualizar el Libro"});
    }
});

//Eliminar
router.delete("/:id", requiredScopes("write:productos"),  async (req, res) => {
    try {
        await Libro.findByIdAndDelete(req.params.id);
        res.json({ message: "Libro eliminado correctamente"});
    } catch (error) {
        res.status(500).json({error: "Error al eliminar el Libro"});
    }
});

module.exports = router;