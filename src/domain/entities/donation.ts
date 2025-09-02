export class Donation {
  id: string;
  amount: number;
  periodicity?: string;
  impactArea?: string;
  campaignId?: string;
  donorId: string;
  createdAt: Date;
  status?: string;
}
