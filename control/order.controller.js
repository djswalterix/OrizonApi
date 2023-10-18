const Order = require("../model/order.model");

exports.createOrder = async (req, res) => {
  try {
    const { productID, userID } = req.body;
    console.log(productID + "|" + userID);
    if (productID || userID) {
      const newOrder = new Order({ userID, productID });
      const order = await newOrder.save();
      res.status(201).json(order);
    } else {
      if (!productID || !userID) {
        throw new Error("ProductId and userID not provided");
      } else if (!productID) {
        throw new Error("ProductId  not provided");
      } else {
        throw new Error("userID  not provided");
      }
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: " unable to create order." });
  }
};

exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("userID", "name surname email")
      .populate("productID", "name");

    // Modifica il formato dei dati per renderlo più comprensibile
    const formattedOrders = orders.map((order) => ({
      _id: order._id,
      user: {
        name: order.userID.name,
        surname: order.userID.surname,
        email: order.userID.email,
      },
      product: {
        name: order.productID.name,
      },
      createdAt: order.createdAt,
      updatedAt: order.updatedAt,
      __v: order.__v,
    }));

    res.json(formattedOrders);
  } catch (error) {
    res.status(500).json({ error: "Unable to retrieve orders." });
  }
};

exports.getAllOrdersbyDate = async (req, res) => {
  try {
    const { date } = req.params;
    const targetDate = new Date(date);

    const orders = await Order.find({
      createdAt: {
        $gte: targetDate,
        $lt: new Date(targetDate.getTime() + 86400000),
      },
    })
      .populate("userID")
      .populate("productID"); // Popola i campi associati

    const formattedOrders = orders.map((order) => ({
      _id: order._id,
      user: {
        name: order.userID.name,
        surname: order.userID.surname,
        email: order.userID.email,
      },
      product: {
        name: order.productID.name,
      },
      createdAt: order.createdAt,
      updatedAt: order.updatedAt,
      __v: order.__v,
    }));

    res.json(formattedOrders);
  } catch (error) {
    res.status(500).json({ error: "Unable to retrieve orders." });
  }
};
exports.getOrderByUser = async (req, res) => {
  try {
    const { userId } = req.params;
    if (!userId) {
      return res.status(404).json({ error: "User not found." });
    }
    const orders = await Order.find({ userID: userId })
      .populate("userID", "name surname email")
      .populate("productID", "name");

    // Verifica se 'orders' è vuoto
    if (!orders || orders.length === 0) {
      return res.status(404).json({ error: "No orders found for this user." });
    }

    // Modifica il formato dei dati per renderlo più comprensibile
    const formattedOrders = orders.map((order) => ({
      _id: order._id,
      user: {
        name: order.userID.name,
        surname: order.userID.surname,
        email: order.userID.email,
      },
      product: {
        name: order.productID.name,
      },
      createdAt: order.createdAt,
      updatedAt: order.updatedAt,
      __v: order.__v,
    }));

    res.json(formattedOrders);
  } catch (error) {
    res.status(500).json({ error: error + " unable to retrieve orders" });
  }
};

exports.getOrdersByUserAndDate = async (req, res) => {
  try {
    const { userId, date } = req.params;
    if (!userId) {
      return res.status(404).json({ error: "User not found." });
    }

    const targetDate = new Date(date);
    const orders = await Order.find({
      userID: userId,
      createdAt: {
        $gte: targetDate,
        $lt: new Date(targetDate.getTime() + 86400000),
      },
    })
      .populate("userID", "name surname email")
      .populate("productID", "name");

    // Verifica se 'orders' è vuoto
    if (!orders || orders.length === 0) {
      return res.status(404).json({
        error: "No orders found for this user on the specified date.",
      });
    }

    // Modifica il formato dei dati per renderlo più comprensibile
    const formattedOrders = orders.map((order) => ({
      _id: order._id,
      user: {
        name: order.userID.name,
        surname: order.userID.surname,
        email: order.userID.email,
      },
      product: {
        name: order.productID.name,
      },
      createdAt: order.createdAt,
      updatedAt: order.updatedAt,
      __v: order.__v,
    }));

    res.json(formattedOrders);
  } catch (error) {
    res.status(500).json({ error: error + " unable to retrieve orders" });
  }
};

exports.updateOrder = async (req, res) => {
  try {
    const orderId = req.params.id;
    const updates = req.body;
    const order = await Order.findOne({ _id: orderId });

    if (!order) {
      return res.status(404).json({ error: "Order not found." }); // Modifica il messaggio di errore
    }

    // update
    if (updates.userId) {
      order.userID = updates.userId;
    }

    if (updates.productID) {
      order.productID = updates.productID;
    }

    // Save
    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } catch (error) {
    res.status(500).json({ error: error + " Unable to update the order." });
  }
};
exports.deleteOrder = async (req, res) => {
  try {
    const order = await Order.findOneAndDelete({ _id: req.params.id });
    if (!order) {
      return res.status(404).json({ error: error + " Order not found." });
    }
    res.json(order);
  } catch (error) {
    res.status(500).json({ error: error + " Unable to delete the order." });
  }
};
