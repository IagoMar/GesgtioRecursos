import express from "express";
import bodyParser from "body-parser";
import recursoRoutes from "./routes/recursosRutas.js";
import usuarisRoutes from "./routes/usuariosRutas.js";
import reserveRoutes from "./routes/reservasRutas.js"; 
import notificacionsRoutes from "./routes/notificacionesRutas.js";


const app = express();

app.use(bodyParser.json());
app.use(express.static("public"));
app.set("view engine", "ejs");
app.set("views", "./views");

// Rutas para recursos y usuarios
app.use("/recursos", recursoRoutes);
app.use("/usuaris", usuarisRoutes);
app.use("/notificacions", notificacionsRoutes);
app.use("reserves", reserveRoutes);

// Ruta para la página principal
app.get("/", (req, res) => {
    res.render("home"); // Renderiza la vista index.ejs
});

// Inicia el servidor
app.listen(3012, () => {
    console.log("Servidor está escuchando en el puerto 3012...");
});
