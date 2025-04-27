import express from "express";
import fs from "fs";

const router = express.Router();

const USUARIS_PATH = ".json/usuarioss.json";

// Leer el archivo de usuarios
const readData = () => JSON.parse(fs.readFileSync(USUARIS_PATH));

// Escribir cambios en el archivo de usuarios
const writeData = (data) => fs.writeFileSync(USUARIS_PATH, JSON.stringify(data, null, 2));

// Mostrar todos los usuarios
router.get("/", (req, res) => {
  const user = { name: "Iago" };
  const htmlMessage = `
    <p>Consulta los usuarios</p>
    <a href="http://localhost:3012/">Torna enrere</a>
  `;
  const data = readData();
  res.render("usuaris/usuaris", { user, data, htmlMessage });
});

// Mostrar un usuario específico por ID
router.get("/:id", (req, res) => {
  const data = readData();
  const id = parseInt(req.params.id);
  const user = { name: "Iago" };
  const usuari = data.usuaris.find((u) => u.id === id);
  res.render("usuaris/usuariDetall", { usuari, user });
});

// Mostrar formulario para modificar un usuario
router.get("/put/:id", (req, res) => {
  const data = readData();
  const id = parseInt(req.params.id);
  const user = { name: "Iago" };
  const usuari = data.usuaris.find((u) => u.id === id);
  res.render("usuaris/modificarUsuari", { usuari, user });
});

// Actualizar un usuario
router.put("/put/:id", (req, res) => {
  const data = readData();
  const id = parseInt(req.params.id);
  const userIndex = data.usuaris.findIndex((u) => u.id === id);

  if (userIndex === -1) {
    return res.status(404).json({ message: "Usuari no trobat" });
  }

  data.usuaris[userIndex] = {
    ...data.usuaris[userIndex],
    ...req.body,
  };

  writeData(data);
  res.json({ message: "Usuari actualitzat correctament" });
});



export default router;