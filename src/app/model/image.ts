export class Image {

    id: number;
    chemin: string;
    description: string;

    constructor(){
        this.id = 0;
        this.chemin = '';
        this.description = '';
    }

    toString(): string {
        const str = '"id":"' + this.id + '",' +
        '"chemin":"' + this.chemin + '",' +
        '"description":"' + this.description + '"'; 
        return str;
    }
}
