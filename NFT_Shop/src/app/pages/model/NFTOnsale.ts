import {NFT} from "./NFT";
import {User} from "./user";


class date {
}

export class NFTOnsale extends NFT{
    seller: User;
    onsale_date: Date;
    price: number;

}
