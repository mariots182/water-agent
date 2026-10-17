import { Request, Response } from "express";
import ExampleService from "../../services/example.service";
import { HTTP } from "../../utils/consts";
import logger from "../../utils/logger";

const exampleService = new ExampleService();

const { OK, CREATED, UNAUTHORIZED, INTERNAL_SERVER_ERROR } = HTTP.STATUS_CODES;

export class ExampleController {
  static async postExample(req: Request, res: Response) {
    try {
      const response = await exampleService.postExample();

      return res.status(CREATED).json(response);
    } catch (error) {
      logger.error(`[ExampleController][postExample] ${error}`);
      return res
        .status(INTERNAL_SERVER_ERROR)
        .json({ message: "Error adding customer to establishment" });
    }
  }

  static async putExample(req: Request, res: Response) {
    try {
      const response = await exampleService.putExample();

      return res.status(OK).json(response);
    } catch (error) {
      logger.error(`[ExampleController][putExample] ${error}`);
      return res
        .status(INTERNAL_SERVER_ERROR)
        .json({ message: "Error updating example" });
    }
  }

  static async getExample(req: Request, res: Response) {
    try {
      const response = await exampleService.getExample();

      return res.status(OK).json(response);
    } catch (error) {
      logger.error(`[ExampleController][getExample] ${error}`);
      return res
        .status(INTERNAL_SERVER_ERROR)
        .json({ message: "Error getting example" });
    }
  }

  static async patchExample(req: Request, res: Response) {
    try {
      const response = await exampleService.patchExample();

      return res.status(OK).json(response);
    } catch (error) {
      logger.error(`[ExampleController][patchExample] ${error}`);
      return res
        .status(INTERNAL_SERVER_ERROR)
        .json({ message: "Error patching example" });
    }
  }

  static async deleteExample(req: Request, res: Response) {
    try {
      const response = await exampleService.deleteExample();

      return res.status(OK).json(response);
    } catch (error) {
      logger.error(`[ExampleController][deleteExample] ${error}`);
      return res
        .status(INTERNAL_SERVER_ERROR)
        .json({ message: "Error deleting example" });
    }
  }
}
