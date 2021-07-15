import express from "express";
import connectDB from "./config/db.js";
import Employee from "./routes/employeeRoute.js";
import globalError from "./controllers/errorController.js";
import logger from "./utils/logger.js";
import AppError from "./utils/appError.js";
import httpLogger from "./utils/httpLogger.js";
import logReqRes from "./utils/logReqRes.js";
import bodyParser from "body-parser";
import morganBody from "morgan-body";
import winston from "./utils/winston.js";



const app = express();
app.use(express.json());
// app.use(httpLogger);
// app.use(logReqRes);
connectDB();

app.use(bodyParser.json());
morganBody(app, {
  // .. other settings
  noColors: true,
  stream: winston.stream,
});


app.use("/api", Employee);

app.all('*', (req,res,next)=>{
    next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalError);


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
    logger.info(`Server is running on ${PORT}`);
});