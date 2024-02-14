import cors from "cors";
import express from "express";
import helmet from "helmet";
import hpp from "hpp";
import { createServer } from "http";
import morgan from "morgan";
import "reflect-metadata";
import { errors } from "./config/errors.js";
import { db } from "./db.js";
import env from "./env.js";
import { requestIdMiddleware } from "./middlewares/requestId.js";
import AppError from "./models/error.js";
import benefitsRoutes from "./routes/benefitsRoutes.js";
import blogsRoutes from "./routes/blogsRoutes.js";
import booksRoutes from "./routes/booksRoutes.js";
import categoriesRoutes from "./routes/categoriesRoutes.js";
import lessonsRoutes from "./routes/lessonsRoutes.js";
import liveStreamsRoutes from "./routes/liveStreamsRoutes.js";
import { errorHandler } from "./utils/errorHandler.js";
import socialMediaRoutes from "./routes/socialMediaRoutes.js";
import interactionRoutes from "./routes/interactionRoutes.js";
import fileUpload from "express-fileupload";
import fs from "fs/promises";

(BigInt.prototype as any).toJSON = function () {
  return this.toString();
};
const app = express();
const http = createServer(app);

const setupExpressApp = async () => {
  app.enable("trust proxy");
  app.use(
    helmet({
      crossOriginEmbedderPolicy: false,
      crossOriginOpenerPolicy: false,
      crossOriginResourcePolicy: false,
    })
  );
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(hpp());
  app.use(
    cors({
      origin: true,
      allowedHeaders: ["Content-Type", "Authorization"],
      credentials: true,
    })
  );
  app.use(requestIdMiddleware);
  app.use(morgan("combined"));
  app.use(fileUpload());

  setupRouters();

  setupErrorHandlers();
  errorHandler.listenToErrorEvents();
};

const setupRouters = () => {
  app.get("/", (req, res) =>
    res.status(200).send("Everything is working great!")
  );

  app.use("/uploads", express.static("uploads"));

  app.use("/livestreams", liveStreamsRoutes);
  app.use("/categories", categoriesRoutes);
  app.use("/lessons", lessonsRoutes);
  // app.use("/authors", authorsRoutes);
  app.use("/benefits", benefitsRoutes);
  app.use("/books", booksRoutes);
  app.use("/blogs", blogsRoutes);
  app.use("/socialmedia", socialMediaRoutes);
  app.use("/interactions", interactionRoutes);

  app.post("/upload", async (req, res) => {
    if (!req.files || Object.keys(req.files).length === 0) {
      throw new AppError(400, 1024, "No files were uploaded.");
    }

    const file = req.files.file as fileUpload.UploadedFile;
    if (!file) throw new AppError(400, 1024, "No files were uploaded.");
    //make uploads dir if not exists using fs/promises
    await fs.mkdir("uploads", { recursive: true });

    file.mv(`uploads/${file.name}`, (err) => {
      if (err) return res.status(500).send(err);

      return res
        .status(200)
        .json({ success: true, path: `/uploads/${file.name}` });
    });
  });

  app.post("/search", async (req, res) => {
    const { type, query } = req.body;
    if (type == "lessons") {
      const data = await db.lesson.findMany({
        where: {
          title: {
            search: query,
          },
        },
        include: { category: true, subLessons: true },
      });
      return res.status(200).json(data);
    }
    if (type == "books") {
      const data = await db.book.findMany({
        where: {
          title: {
            search: query,
          },
        },
      });
      return res.status(200).json(data);
    }
    if (type == "blogs") {
      const data = await db.blog.findMany({
        where: {
          title: {
            search: query,
          },
        },
      });
      return res.status(200).json(data);
    }
    return res.status(200).json([]);
  });
};

const setupErrorHandlers = () => {
  app.use((req, res, next) => {
    next(errors.notFound);
  });

  app.use(
    async (
      error: unknown,
      req: express.Request,
      res: express.Response,
      next: express.NextFunction
    ) => {
      next(await errorHandler.handleError(error));
    }
  );

  app.use(
    async (
      error: AppError,
      req: express.Request,
      res: express.Response,
      next: express.NextFunction
    ) => {
      return res.status(error.statusCode).json({
        errorCode: error.errorCode,
        error: error.message,
        stack: process.env.NODE_ENV === "development" ? error.stack : undefined,
      });
    }
  );
};

const startServer = () => {
  console.log("Starting server..");
  const port = env.PORT;
  http.listen(port, () => {
    console.log("listening on *:" + port);
  });
};

const main = async () => {
  console.log("Environment: " + env.NODE_ENV);
  setupExpressApp();
  startServer();
};

main();
