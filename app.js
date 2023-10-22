const express = require("express");
const app = express();
const userRoutes = require("./routes/userRoutes"); // Assicurati che il percorso sia corretto
const productRoutes = require("./routes/productRoutes"); // Assicurati che il percorso sia corretto
const orderRoutes = require("./routes/orderRoutes"); // Assicurati che il percorso sia corretto

const mongoose = require("./config/db"); // Includi il file di connessione al database

app.use(express.json());

// Altri middleware e configurazioni

// Utilizza il router per le rotte degli utenti
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use((req, res, next) => {
  res.status(404).send("api not founded");
});
// Altri middleware e configurazioni

const port = process.env.PORT || 3001;

app.listen(port, () => {
  console.log(`Server in ascolto sulla porta ${port}`);
});
module.exports = app; // Esporta l'istanza di Express
