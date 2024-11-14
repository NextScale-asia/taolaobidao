#!/usr/bin/env -S deno run -A --watch=static/,routes/

import dev from "$fresh/dev.ts";
import config from "./fresh.config.ts";

import "$std/dotenv/load.ts";
import { createRequire } from "https://deno.land/std@0.177.0/node/module.ts";
const require = createRequire(import.meta.url);
const mongoose = require("mongoose");

await mongoose.connect(Deno.env.get("cb_connect_string"), {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 30000, // Increase timeout to 30 seconds
});
mongoose.set("bufferCommands", false);
mongoose.connection.on("connected", () => {
    console.log("Mongoose connected");
});

mongoose.connection.on("error", (err: any) => {
    console.error("Mongoose connection error:", err);
});

mongoose.connection.on("disconnected", () => {
    console.log("Mongoose disconnected");
});
console.log(mongoose.connection.readyState);
if (mongoose.connection.readyState) {
    await dev(import.meta.url, "./main.ts", config);
}
