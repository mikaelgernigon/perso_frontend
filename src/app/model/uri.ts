export class Uri {

    id: number;
    title: string;
    uri: string;

    constructor() {
        this.id = 0;
        this.title = '';
        this.uri = '';
    }

    toString(): string {
        const str = '"id":' + this.id + ',' +
        '"title":"' +this.title + '",' +
        '"uri":"' + this.uri + '"';
        return str;
    } 
}
