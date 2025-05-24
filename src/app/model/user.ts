import { Image } from './image';
import { Uri } from './uri';
import { Categorie } from './categorie';

export class User {
    id: number;
    pseudo: string;
    nickname: string;
    email: string;
    photoProfil: Image;
    description: string;
    createdAt: Date;
    emailVerified: boolean;
    userId: string;
    isSocial: boolean;
    images: Image[];
    uris: Uri[];
    categories: Categorie[]


    constructor() {
        this.id = 0;
        this.nickname = '';
        this.pseudo = '';
        this.email = '';
        this.photoProfil = new Image();
        this.description = '';
        this.createdAt = new Date();
        this.emailVerified = false;
        this.userId = '';
        this.isSocial = false;
        this.images = [];
        this.uris = [];
        this.categories = [];
    }

    toString(): string {
        const str = '"id":"' + this.id + '",' +
        '"nickname":"' +this.nickname + '",' +
        '"pseudo":"'+ this.pseudo + '",' +
        '"email":"'+ this.email + '",' +
        '"photoProfil":{' + this.photoProfil.toString() + '},' +
        '"description":"' + this.description + '",' +
        '"createdAt":"' + this.createdAt + '",' +
        '"emailVerified":"' + this.emailVerified + '",' +
        '"userId":"' + this.userId + '",' +
        '"isSocial":"' + this.isSocial + '",' +
        '"images":[' +this.imagesToString() + '],' +
        '"uris":[' +this.urisToString() + '],' +
        '"categories":[' +this.categoriesToString() + ']';
        return str;
    }

    urisToString(): string {
        let str = '{';
        this.uris.forEach(elem =>
            str += elem.toString() + '},{'
        );
        str.length === 1 ? str = '' : str.substring(0, str.length-2);
        return str;
    }

    imagesToString(): string {
        let str = '{';
        this.images.forEach(elem =>
            str += elem.toString() + '},{'
        );
        str.length === 1 ? str = '' : str.substring(0, str.length-2); 
        return str;
    }

    categoriesToString(): string {
        let str = '{';
        this.categories.forEach(elem =>
            str += elem.toString() + '},{'
        );
        str.length === 1 ? str = '' : str.substring(0, str.length-2); 
        return str;
    }
}
