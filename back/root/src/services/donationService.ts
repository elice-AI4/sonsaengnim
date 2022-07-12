import { MongoDonationModel } from "../db";
import { IDonation } from "../models";

export class DonationService {
  constructor(private donationModel: MongoDonationModel) {}

  public async createDonation(name: string, currentPoint: number, goalPoint: number) {
    const donationData: IDonation = { name, currentPoint, goalPoint };
    const donation = await this.donationModel.createDonation(donationData);
    return donation;
  }
}
