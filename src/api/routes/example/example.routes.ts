import { Router } from "express";
import { ExampleController } from "../../controllers/example.controller";

const router = Router();

router.post("/example", ExampleController.postExample);

router.put("/example", ExampleController.putExample);

router.get("/example", ExampleController.getExample);

router.patch("/example", ExampleController.patchExample);

router.delete("/example", ExampleController.deleteExample);

export default router;
