export interface Posting {
  companyId: string;
  freight: {
    weightPounds: number;
    equipmentType: string;
    fullPartial: string;
    lengthFeet: number;
  };
}
