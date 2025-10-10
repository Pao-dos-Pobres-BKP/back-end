export const DonationsRaisedByPeriodData = {
  DAILY: "DAILY",
  WEEKLY: "WEEKLY",
  MONTHLY: "MONTHLY"
} as const;

export type DonationsRaisedByPeriodData =
  (typeof DonationsRaisedByPeriodData)[keyof typeof DonationsRaisedByPeriodData];

export interface RaisedByPeriodDataItem {
  label: string;
  amount: number;
}

export interface DonationsRaisedByPeriodResult {
  rangeDate: {
    startDate: Date;
    endDate: Date;
  };
  daily?: {
    data: RaisedByPeriodDataItem[];
  };
  weekly?: {
    data: RaisedByPeriodDataItem[];
  };
  monthly?: {
    data: RaisedByPeriodDataItem[];
  };
}

export const monthNames = [
  "Janeiro",
  "Fevereiro",
  "Março",
  "Abril",
  "Maio",
  "Junho",
  "Julho",
  "Agosto",
  "Setembro",
  "Outubro",
  "Novembro",
  "Dezembro"
];
