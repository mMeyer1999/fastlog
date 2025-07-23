import express from 'express';
import {entriesRouter} from "./routes/entries.routes.ts";
import {errorHandler} from "./middlewares/errorHandler.middlewares.ts";

const app = express();
app.use(express.json());

app.use('/entries', entriesRouter);

// Error handling middleware
app.use(errorHandler);

export default app
