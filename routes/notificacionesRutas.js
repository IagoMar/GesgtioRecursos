import express from "express";
import fs from "fs";

const router = express.Router();

// Función para leer y escribir el archivo de notificacions
const readData = () => JSON.parse(fs.readFileSync(".json/notificaciones.json"));
const writeData = (data) => fs.writeFileSync(".json/notificaciones.json", JSON.stringify(data, null, 2));

// GET página principal de notificacions
router.get("/", (req, res) => {
    const data = readData();
    const user = { name: "Iago" };  
    const htmlMessage = ` <p>Consulta tus notificaciones</p>
    <a href="http://localhost:3012/">Volver atras</a>`;  
    res.render("notificacions/notificacions", { user, data, htmlMessage });
});


// GET notificación por su ID
router.get("/:id", (req, res) => {
    const data = readData();
    const id = parseInt(req.params.id);
    const user={name:"Iago"};
    const notificacio = data.notificacions.find((n) => n.id === id);
    res.render("notificacions/notificacioDetall", {notificacio, user});

});

router.get("/put/:id", (req, res) => {
    const data = readData();
    const id = parseInt(req.params.id);
    const user={name:"Iago"};
    const notificacio = data.notificacions.find((n) => n.id === id);
    res.render("notificacions/modificarNotificacio", {notificacio, user});

});

// PUT actualizar notificación
router.put("/put/:id", (req, res) => {
    const data = readData();
    const body= req.body;
    const id = parseInt(req.params.id);
    const notificacioIndex = data.notificacions.findIndex((n) => n.id === id);

    data.notificacions[notificacioIndex] = {
         ...data.notificacions[notificacioIndex],
          ...req.body };

    writeData(data);
    res.json({ message: "Notificación actualizada " });
});


export default router;

