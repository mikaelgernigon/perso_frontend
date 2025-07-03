import { Image } from './image';

export class UserAdd {
    username: string;
    userId: string;
    email: string;
    bio: string;

    constructor() {
        this.username = '';
        this.userId='';
        this.email = '';
        this.bio = '';
    }

    toString(): string {
        const str = '"username":"' +this.username + '",' +
        '"userId":"'+ this.userId + '",' +
        '"email":"'+ this.email + '",' +
        '"bio":"' + this.bio + ']';
        return str;
    }
}
