import { IDonation } from "./IDonation";

export interface IDonationModel {
  createDonation(donationModel: IDonation): Promise<IDonation>;
}
