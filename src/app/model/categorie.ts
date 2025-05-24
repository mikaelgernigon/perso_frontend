export class Categorie {
    id: number;
    label: string;

    constructor(){
        this.id = 0;
        this.label = '';
    }

    toString(): string {
        const str = '"id":"' + this.id + '",' +
        '"label":"' + this.label + '"';
        return str;
    }
}
