const express = require("express");
const router = express.Router();
const productController = require("../control/product.controller"); // Assicurati che il percorso sia corretto

// Rotta per creare un nuovo prodotto
router.post("/", productController.createProduct);

// Rotta per ottenere tutti gli utenti
router.get("/", productController.getAllProducts);

// Rotta per ottenere un prodotto per nome;
router.get("/:name", productController.getProductByName);

// Rotta per aggiornare un prodotto per nome
router.put("/:name", productController.updateProduct);

// Rotta per eliminare un prodotto per nome
router.delete("/:name", productController.deleteProduct);

module.exports = router;
