import { IDonationModel, IDonation } from "../../models";
import { Donation } from "../schemas/donation";

class MongoDonationModel implements IDonationModel {
  public async createDonation(donationData: IDonation) {
    const donation = await Donation.create(donationData);
    return donation;
  }
}

export { MongoDonationModel };
