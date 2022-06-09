import {NFT} from "./NFT";

export class User {
    username: string;
    password: string;
    image: string;
    email: string;
    bio: string;
    cashart: number;
    nft_created_count: number;
    gallery: NFT[];
    public_gallery: NFT[];
}
