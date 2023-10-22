const mongoose = require("mongoose");

const dbUrl = `mongodb+srv://travelAdmin:DMtUGpoQ8HB18R92@cluster0.3sopro2.mongodb.net/produzione?retryWrites=true&w=majority`;

// Opzioni di connessione
const dbOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

// Connessione al database
mongoose.connect(dbUrl, dbOptions);

const db = mongoose.connection;

db.on("error", (error) => {
  console.error("Errore di connessione al database:", error);
});

db.once("open", () => {
  console.log("Connessione al database stabilita con successo");
});

// Esporta l'istanza di Mongoose (opzionale)
module.exports = mongoose;
