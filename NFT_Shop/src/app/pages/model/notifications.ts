import {User} from "./user";
import {NFTSold} from "./NFTSold";

export class Notifications {
    id: number;

    recipient: User;
    nft: NFTSold;
}
