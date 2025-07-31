import { Image } from './image';

export class User {
    id: number;
    username: string;
    email: string;
    idImage: number;
    description: string;
    createdAt: Date;
    emailVerified: boolean;
    userId: string;
    isSocial: boolean;
    bio: string;


    constructor() {
        this.id = 0;
        this.username = '';
        this.email = '';
        this.idImage = 0;
        this.description = '';
        this.createdAt = new Date();
        this.emailVerified = false;
        this.userId = '';
        this.isSocial = false;
        this.bio = '';
    }

    toString(): string {
        const str = '"id":"' + this.id + '",' +
        '"username":"' +this.username + '",' +
        '"email":"'+ this.email + '",' +
        '"idImage":' + this.idImage + ',' +
        '"description":"' + this.description + '",' +
        '"createdAt":"' + this.createdAt + '",' +
        '"emailVerified":"' + this.emailVerified + '",' +
        '"userId":"' + this.userId + '",' +
        '"isSocial":"' + this.isSocial + '",' +
        '"bio":"' + this.bio + '",' + ']';
        return str;
    }
}
