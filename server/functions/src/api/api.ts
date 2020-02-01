import * as functions from "firebase-functions";
import * as Express from "express";
import * as bodyParser from "body-parser";
import * as helmet from "helmet";
import * as cors from "cors";

import apiRoutes from './v1';

const app = Express();
app.use(cors());
app.use(helmet());
app.use(bodyParser.json());

app.use(apiRoutes);

export const server = functions.https.onRequest(app);