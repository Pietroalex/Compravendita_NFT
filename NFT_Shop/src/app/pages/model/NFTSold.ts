import {NFTOnsale} from "./NFTOnsale";
import {User} from "./user";

export class NFTSold extends NFTOnsale {

    buyer: User;
    purchase_date: Date;

}
