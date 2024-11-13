#!/usr/bin/env -S deno run -A --watch=static/,routes/

import dev from "$fresh/dev.ts";
import config from "./fresh.config.ts";

import "$std/dotenv/load.ts";
import { createRequire } from 'https://deno.land/std@0.177.0/node/module.ts';
const require = createRequire(import.meta.url);
const mongoose = require('mongoose');

await mongoose.connect(Deno.env.get("cb_connect_string"));

if (mongoose.connection.readyState) {
    await dev(import.meta.url, "./main.ts", config);
}
