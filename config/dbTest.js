const mongoose = require("mongoose");

const dbUrl = `mongodb+srv://travelAdmin:DMtUGpoQ8HB18R92@cluster0.3sopro2.mongodb.net/test?retryWrites=true&w=majority`;

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
