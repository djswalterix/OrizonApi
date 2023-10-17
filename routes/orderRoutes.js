const express = require("express");
const router = express.Router();
const orderController = require("../control/order.controller"); // Assicurati che il percorso sia corretto

// Rotta per creare un nuovo prodotto
router.post("/", orderController.createOrder);

// Rotta per ottenere tutti gli ordini
router.get("/", orderController.getAllOrders);

// Rotta per ottenere tutti gli ordini
router.get("/all/:date", orderController.getAllOrdersbyDate);

// Rotta per ottenere gli ordini per utente;
router.get("/:user", orderController.getOrderByUser);

// Rotta per ottenere gli ordini per utente filtrati per data
router.get("/:user/:date", orderController.getOrdersByUserAndDate);

// Rotta per aggiornare un ordine per id
router.put("/:id", orderController.updateOrder);

// Rotta per eliminare un prodotto per id
router.delete("/:id", orderController.deleteOrder);
