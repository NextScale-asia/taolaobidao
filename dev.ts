#!/usr/bin/env -S deno run -A --watch=static/,routes/

import dev from "$fresh/dev.ts";
import config from "./fresh.config.ts";
import { Sequelize } from "npm:@sequelize/core";
import { MariaDbDialect } from "npm:@sequelize/mariadb";

import "$std/dotenv/load.ts";
import { Account, Session } from "$models";

const sequelize = new Sequelize({
    dialect: MariaDbDialect,
    database: Deno.env.get("db_name"),
    user: Deno.env.get("db_user"),
    password: Deno.env.get("db_pass"),
    host: Deno.env.get("db_host"),
    port: 3306,
    showWarnings: true,
    connectTimeout: 5000,
    pool: {
        idle: Infinity,
        maxUses: Infinity,
        max: 10000,
        min: 0,
        acquire: 30000,
    },
    logging: console.log,
    models: [Account, Session],
});

try {
    await sequelize.authenticate();
    await sequelize.sync({alter: true});
    console.log("Connection has been established successfully.");
    await dev(import.meta.url, "./main.ts", config);
} catch (error) {
    console.error("Unable to connect to the database:", error);
    process.exit()
}
