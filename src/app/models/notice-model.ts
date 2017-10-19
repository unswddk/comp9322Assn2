import {License} from "./license-model";
import {User} from "./officer-model";

export class Notice {
  _nid: string;
  license: License;
  address: string;
  contact_mail: string;
  status: string;
  user: User;
  reason: string;
  amount: string;
  payDate: Date;
}
