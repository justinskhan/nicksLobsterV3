require("dotenv").config();
const express = require("express");
const { MongoClient, ObjectId } = require("mongodb");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors()); //helps with react calling api

//connections via uri and dbname
const uri = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017";
const dbName = process.env.MONGODB_DB_NAME || "nicks-lobster";

let db;
const client = new MongoClient(uri);

async function connectToDatabase() {
  try {
    await client.connect();
    db = client.db(dbName);
    console.log(`✅ Connected to MongoDB database: ${dbName}`);
  } catch (err) {
    console.error("❌ MongoDB connection failed", err);
    process.exit(1);
  }
}
//first connection to db 
connectToDatabase();

//ensuring that we are properly connected to the correct db
app.get("/", (req, res) => {
  res.send("Nick's Lobster backend is running with MongoDB!");
});

// Menu Section

//new way to get all the items no longer in front end
app.get("/menuitems", async (req, res) => {
  try {
    const collection = db.collection("menuitems");

    const items = await collection
      .find({})
      .sort({ id: 1 })
      .project({ _id: 0 }) 
      .toArray();

    res.json(items);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching menu items");
  }
});

//we find items using the id assigned to each item
app.get("/menuitems/:id", async (req, res) => {
  try {
    const numericId = Number(req.params.id);
    const collection = db.collection("menuitems");

    const item = await collection.findOne({ id: numericId }, { projection: { _id: 0 } });

    if (!item) return res.status(404).send("Menu item not found");
    res.json(item);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching menu item");
  }
});

//Order Section

//post for order creations
app.post("/orders", async (req, res) => {
  try {
    const order = req.body;
    console.log("Incoming order payload:", order);

    const collection = db.collection("orders");

    //this ensures each order gets a unique number using the date.now 
    const orderWithNumber = {
      ...order,
      orderNumber: Date.now(),
    };

    const result = await collection.insertOne(orderWithNumber);

    console.log("Order inserted with _id:", result.insertedId);

    res
      .status(201)
      .json({
        message: "Order created",
        orderId: result.insertedId,
        orderNumber: orderWithNumber.orderNumber,
      });
  } catch (err) {
    console.error("Error in POST /orders:", err);
    res.status(500).send("Error creating order");
  }
});

//collecting all orders after being placed
app.get("/orders", async (req, res) => {
  try {
    const collection = db.collection("orders");
    const orders = await collection.find({}).toArray();
    res.json(orders);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching orders");
  }
});

//starting our server
const port = process.env.PORT || 3006;
app.listen(port, () => {
  console.log(`🚀 Server running on http://localhost:${port}`);
});