export class Image {

    id: number;
    chemin: string;
    description: string;
    userId: string;
    constructor(){
        this.id = 0;
        this.chemin = '';
        this.description = '';
        this.userId = '';
    }

    toString(): string {
        const str = '"id":"' + this.id + '",' +
        '"chemin":"' + this.chemin + '",' +
        '"description":"' + this.description + '"' +
        '"userId":"' + this.userId + '"';
        return str;
    }
}
