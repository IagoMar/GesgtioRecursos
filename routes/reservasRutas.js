import express from "express";
import fs from "fs";

const router = express.Router();

const RESERVAS_PATH = ".json/reservas.json";

// Leer todas las reservas desde el archivo JSON
const readDataReserves = () => JSON.parse(fs.readFileSync(RESERVAS_PATH));

// Guardar reservas actualizadas en el JSON
const writeDataReserves = (data) => fs.writeFileSync(RESERVAS_PATH, JSON.stringify(data, null, 2));

// Mostrar todas las reservas
router.get("/", (req, res) => {
  const data = readDataReserves();
  const user = { name: "Iago" };
  const htmlMessage = `
    <p>Consulta tus reservas</p>
    <a href="http://localhost:3012/">Torna enrere</a>
  `;
  res.render("reserves/reserves", { user, data, htmlMessage });
});



// Mostrar una reserva por ID
router.get("/:id", (req, res) => {
  const data = readDataReserves();
  const id = parseInt(req.params.id);
  const reserva = data.reserves.find((r) => r.id === id);
  res.render("reserves/reservaDetall", { reserva });
});

// Mostrar formulario para modificar reserva
router.get("/put/:id", (req, res) => {
  const data = readDataReserves();
  const id = parseInt(req.params.id);
  const reserva = data.reserves.find((r) => r.id === id);
  res.render("reserves/modificarReserves", { reserva });
});

// Actualizar una reserva
router.put("/put/:id", (req, res) => {
  const data = readDataReserves();
  const id = parseInt(req.params.id);
  const reservaIndex = data.reserves.findIndex((r) => r.id === id);

  if (reservaIndex === -1) {
    return res.status(404).json({ message: "Reserva no encontrada" });
  }

  data.reserves[reservaIndex] = {
    ...data.reserves[reservaIndex],
    ...req.body,
  };

  writeDataReserves(data);
  res.json({ message: "Reserva actualizada correctamente" });
});



export default router;