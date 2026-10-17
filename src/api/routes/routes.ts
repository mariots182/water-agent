import { Router } from "express";
import exampleRoutes from "./example/example.routes";

const router = Router();

router.use("/example", exampleRoutes);

router.get("/health", (_req, res) => {
  res.status(200).json({ health: "ok" });
});

export default router;
