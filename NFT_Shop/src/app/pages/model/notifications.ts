import {User} from "./user";
import {NFTSold} from "./NFTSold";

export class Notifications {
    id: number;
    sender: User;
    recipient: User;
    nft: NFTSold;
}
