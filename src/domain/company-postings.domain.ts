export interface CompanyPosting {
  companyName: string;
  freight: {
    weightPounds: number;
    equipmentType: string;
    fullPartial: string;
    lengthFeet: number;
  };
}

export interface CompanyPostingFilters {
  equipmentType?: string;
  fullPartial?: string;
}

export interface CompanyPostingCreateInput {
  companyName: string;
  freight: {
    weightPounds: number;
    equipmentType: string;
    fullPartial: string;
    lengthFeet: number;
  };
}
