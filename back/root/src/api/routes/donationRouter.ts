import { Router, Request, Response, NextFunction } from "express";
import { IDonation } from "../../models";
import { MongoDonationModel } from "../../db";
import { DonationService } from "../../services";

// import checkLogin from "../middlewares/checkLogin";

const donationRouter = Router();
const donationService = new DonationService(new MongoDonationModel());

donationRouter.post("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const name: string = req.body.name;
    let currentPoint: number | undefined = parseInt(req.body.currentPoint, 10);

    if (Number.isNaN(currentPoint)) {
      currentPoint = undefined;
    }

    let goalPoint: number | undefined = parseInt(req.body.goalPoint, 10);

    if (Number.isNaN(goalPoint)) {
      goalPoint = undefined;
    }

    const donation: IDonation = await donationService.createDonation(name, currentPoint, goalPoint);
    res.status(201).json(donation);
  } catch (error) {
    res.statusCode = 400;
    next(error);
  }
});

donationRouter.get("/:name", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const name: string = req.params.name;
    const foundDonation: IDonation = await donationService.findDonation(name);
    res.status(200).json(foundDonation);
  } catch (error) {
    res.statusCode = 400;
    next(error);
  }
});

export { donationRouter };
