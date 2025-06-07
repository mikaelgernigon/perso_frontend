import { Image } from './image';

export class User {
    id: number;
    nickname: string;
    email: string;
    photoProfil: Image;
    description: string;
    createdAt: Date;
    emailVerified: boolean;
    userId: string;
    isSocial: boolean;



    constructor() {
        this.id = 0;
        this.nickname = '';
        this.email = '';
        this.photoProfil = new Image();
        this.description = '';
        this.createdAt = new Date();
        this.emailVerified = false;
        this.userId = '';
        this.isSocial = false;
    }

    toString(): string {
        const str = '"id":"' + this.id + '",' +
        '"nickname":"' +this.nickname + '",' +
        '"email":"'+ this.email + '",' +
        '"photoProfil":{' + this.photoProfil.toString() + '},' +
        '"description":"' + this.description + '",' +
        '"createdAt":"' + this.createdAt + '",' +
        '"emailVerified":"' + this.emailVerified + '",' +
        '"userId":"' + this.userId + '",' +
        '"isSocial":"' + this.isSocial + '",' + ']';
        return str;
    }
}
