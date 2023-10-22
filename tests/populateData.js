const User = require("../model/user.model"); // Sostituisci con il percorso corretto
const Product = require("../model/product.model"); // Sostituisci con il percorso corretto
const mongoose = require("../config/dbTest"); // Includi il file di connessione al database

const usersData = [
  { name: "Alice", surname: "Rossi", email: "alice@example.com" },
  { name: "Bob", surname: "Verdi", email: "bob@example.com" },
  { name: "Charlie", surname: "Neri", email: "charlie@example.com" },
];

// Crea dati fittizi per i prodotti
// Crea dati fittizi per i prodotti
const productsData = [
  { name: "Venezia-Napoli" },
  { name: "Venezia-Londra" },
  { name: "Londra-Malpensa" },
];

// Funzione per inserire dati fittizi nel database
const populateData = async () => {
  try {
    // Inserisci utenti nel database
    await User.insertMany(usersData);

    // Inserisci prodotti nel database
    await Product.insertMany(productsData);

    console.log("Dati fittizi inseriti con successo!");
  } catch (error) {
    console.error("Errore durante l'inserimento dei dati fittizi:", error);
  } finally {
    // Chiudi la connessione al database
    mongoose.connection.close();
  }
};

// Chiama la funzione per inserire i dati fittizi
exports.populateData;
