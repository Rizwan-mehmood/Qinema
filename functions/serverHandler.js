import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./configs/db.js";
import { clerkMiddleware } from "@clerk/express";
import { functions, inngest } from "./inngest/index.js";
import { serve } from "inngest/express";
import ServerlessHttp from "serverless-http";
// Routes for Netlify Function path
const basePath = "/.netlify/functions/server";

const app = express();

connectDB();

app.use(express.json());
app.use(cors());
app.use(`${basePath}/inngest`, serve({ client: inngest, functions }));
app.use(clerkMiddleware());


app.get(`${basePath}/`, (_req, res) => {
    res.send("Server is live");
});

app.get(`${basePath}/status`, (_req, res) => {
    res.send("Server is live");
});


export const handler = ServerlessHttp(app);
