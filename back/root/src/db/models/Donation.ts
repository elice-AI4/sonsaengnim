import { IDonationModel, IDonation } from "../../models";
import { Donation } from "../schemas/donation";

class MongoDonationModel implements IDonationModel {
  public async createDonation(donationData: IDonation) {
    const donation = await Donation.create(donationData);
    return donation;
  }

  public async findDonation(name: string) {
    const foundDonation = await Donation.findOne({ name }).lean();
    return foundDonation;
  }
}

export { MongoDonationModel };
