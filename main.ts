/// <reference no-default-lib="true" />
/// <reference lib="dom" />
/// <reference lib="dom.iterable" />
/// <reference lib="dom.asynciterable" />
/// <reference lib="deno.ns" />
import { Sequelize } from "npm:@sequelize/core";
import { MariaDbDialect } from "npm:@sequelize/mariadb";
import "$std/dotenv/load.ts";

import { start } from "$fresh/server.ts";
import manifest from "./fresh.gen.ts";
import config from "./fresh.config.ts";
console.log('aaaaaaaaaaaa')

import { Account } from "$models";
console.log(Deno.env.get("db_name"))
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
    models: [Account],
});

try {
    await sequelize.authenticate();
    await sequelize.sync();
    console.log("Connection has been established successfully.");
    await start(manifest, config);
} catch (error) {
    console.error("Unable to connect to the database:", error);
    process.exit()
}

