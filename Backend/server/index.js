import cors from "cors";
import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import apiRoutes from "./routes/api.js";
import { attachUser } from "./middleware/auth.js";

const app = express();
const port = process.env.PORT || 5000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const frontendDistPath = path.resolve(__dirname, "../../Frontend/dist");

app.use(cors({ origin: "*" }));
app.use(express.json());
app.use(attachUser);
app.use("/api", apiRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(frontendDistPath));

  app.get("*", (req, res, next) => {
    if (req.path.startsWith("/api")) {
      return next();
    }

    return res.sendFile(path.join(frontendDistPath, "index.html"));
  });
}

app.listen(port, () => {
  console.log(`Crackers shop backend listening on port ${port}`);
});
