import loki from 'lokijs';
import { Company } from '../repositories/company.model';

export class CompanyDB {
  private db: loki;

  constructor() {
    this.db = new loki('companies.db');
    const companies: Collection<Company> =
      this.db.addCollection<Company>('companies');

    [
      { id: '1', name: 'ACCELERATE SHIPPING' },
      { id: '2', name: 'BARTER SHIPPING' },
      { id: '3', name: 'BLINK SHIPPING' },
      { id: '4', name: 'COMMAND SHIPPING' },
      { id: '5', name: 'CORE SHIPPING' },
      { id: '6', name: 'EXPERT SHIPPING' },
      { id: '7', name: 'EXPRESS SHIPPING' },
      { id: '8', name: 'FINEST SHIPPING' },
      { id: '9', name: 'KART SHIPPING' },
      { id: '10', name: 'LIFT SHIPPING' },
      { id: '11', name: 'LIMITLESS SHIPPING' },
      { id: '12', name: 'MEASURED SHIPPING' },
      { id: '13', name: 'OPTIMUM SHIPPING' },
      { id: '14', name: 'PROGRESS SHIPPING' },
      { id: '15', name: 'PROPEL SHIPPING' },
      { id: '16', name: 'RELY SHIPPING' },
      { id: '17', name: 'RUSH SHIPPING' },
      { id: '18', name: 'SECURE SHIPPING' },
      { id: '19', name: 'SHEER SHIPPING' },
      { id: '20', name: 'SHIPPINGADORA' },
      { id: '21', name: 'SHIPPINGADRI' },
      { id: '22', name: 'SHIPPINGLUX' },
      { id: '23', name: 'SUPREME SHIPPING' },
      { id: '24', name: 'TRUE SHIPPING' },
      { id: '25', name: 'TOTAL SHIPPING' },
      { id: '26', name: 'TRIUMPH SHIPPING' },
      { id: '27', name: 'TURBO SHIPPING' },
      { id: '28', name: 'UNLEASH SHIPPING' },
      { id: '29', name: 'VANGUARD SHIPPING' },
    ].forEach((company) => {
      companies.insert(company);
    });
  }

  getCompanyCompanyCollection(): Collection<Company> {
    return this.db.getCollection('companies');
  }

  getCompanyById(id: string): Company | undefined {
    const companies: Collection<Company> = this.db.getCollection('companies');
    const result = companies.findOne({ id: id });
    // TODO: Handle null result
    return result as Company;
  }
}
