const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const dbUrl = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/test?retryWrites=true&w=majority`;

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

db.once("open", async () => {
  console.log("Connessione al database stabilita con successo");
  await db.dropDatabase();
});

// Esporta l'istanza di Mongoose (opzionale)
exports.mongoose = mongoose;
