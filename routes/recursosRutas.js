import express from "express";
import fs from "fs";

const router = express.Router();

// Función para leer el archivo JSON de recursos
const readDataRecursos = () => {
    return JSON.parse(fs.readFileSync('.json/recursos.json'));
};


// GET todos los recursos
router.get("/", (req, res) => {
    const data = readDataRecursos();
    const user = { name: "Iago" };
    const htmlMessage = ` <p>Consulta los recursos</p>
                         <a href="http://localhost:3006/">Torna enrere</a>`;
    res.render("recursos/recursos", { user, data, htmlMessage });
});

// GET recurso por ID
router.get("/:id",(req,res)=>{
    const data=readDataRecursos();
    const id=parseInt(req.params.id);
    const user={name:"Iago"};
    const recurso =data.recursos.find((recurso)=>recurso.id===id);
    res.render("recursos/recursoDetall", {recurso, user});
});


// GET recurso id para modificar
router.get("/put/:id", (req, res) => {
    const data=readDataRecursos();
    const user={name:"Iago"};
    const id=parseInt(req.params.id);
    const recurso =data.recursos.find((recurso)=>recurso.id===id);
    res.render("recursos/modificarRecurso", {recurso, user});

});


// PUT actualizar recurso especifico
router.put("/put/:id", (req, res) => {
    const data = readDataRecursos();
    const body= req.body;
    const id = parseInt(req.params.id);

    const recursoIndex = data.recursos.findIndex((r) => r.id === id);

    data.recursos[recursoIndex] = { 
        ...data.recursos[recursoIndex],
         ...req.body 
        };

    writeRecurso(data);
    res.json({ message: "Recurso actualizado correctamente" });
});

export default router;
