export class Image {

    id: number;
    content: string;
    tags: string;
    description: string;

    constructor(){
        this.id = 0;
        this.content = '';
        this.tags = '';
        this.description = '';
    }

    toString(): string {
        const str = '"id":"' + this.id + '",' +
        '"content":"'+ this.content + '",' +
        '"tags":"'+ this.tags + '",' +
        '"description":"' + this.description + '"'; 
        return str;
    }
}
