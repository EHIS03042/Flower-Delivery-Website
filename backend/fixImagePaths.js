    // const mongoose = require("mongoose");
    // const Flower = require("./models/flowerModel");

    // mongoose.connect("mongodb+srv://<tolulopemcsmith:EBRh7YQGAHJQqqGt@backend.nxaplmr.mongodb.net/>", { useNewUrlParser: true, useUnifiedTopology: true });

    // async function cleanImagePaths() {
    // try {
    //     const flowers = await Flower.find({ image: { $regex: "^/uploads/" } });

    //     for (let flower of flowers) {
    //     flower.image = flower.image.replace("/uploads/", ""); // keep only filename
    //     await flower.save();
    //     console.log(`Updated: ${flower.name}`);
    //     }

    //     console.log(" All image paths cleaned.");
    //     process.exit();
    // } catch (err) {
    //     console.error(err);
    //     process.exit(1);
    // }
    // }

    // cleanImagePaths();

    // const mongoose = require("mongoose");
    // const Flower = require("./models/flowerModel");
    // require("dotenv").config();

    // async function cleanImagePaths() {
    // try {
    //     const conn = await mongoose.connect(process.env.MONGO_URI, {
    //     useNewUrlParser: true,
    //     useUnifiedTopology: true,
    //     });

    //     console.log(" Connected to:", conn.connection.name);

    //     const count = await Flower.countDocuments();
    //     console.log(" Flower documents in DB:", count);

    //     const flowers = await Flower.find({ image: { $regex: "^/uploads/" } });
    //     console.log(" Found with /uploads/:", flowers.length);

    //     for (let flower of flowers) {
    //     flower.image = flower.image.replace("/uploads/", ""); // strip prefix
    //     await flower.save();
    //     console.log(` Fixed: ${flower.name}`);
    //     }

    //     console.log(" Cleanup finished.");
    //     process.exit();
    // } catch (err) {
    //     console.error(" Error:", err);
    //     process.exit(1);
    // }
    // }

    // cleanImagePaths();

        const mongoose = require("mongoose");
    const Flower = require("./models/flowerModel");
    require("dotenv").config();

    async function checkConnection() {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        });

        console.log(" Connected to MongoDB");
        console.log("Database name:", conn.connection.name);
        console.log("Host:", conn.connection.host);
        console.log("Port:", conn.connection.port);

        const flowers = await Flower.find({ image: /uploads/ });
        console.log("Found documents with 'uploads' in path:", flowers.length);

        flowers.forEach(f => {
        console.log("Before:", f.image, " → After:", f.image.replace("/uploads/", ""));
        });

        process.exit();
    } catch (err) {
        console.error(" Error:", err);
        process.exit(1);
    }
    }

    checkConnection();
