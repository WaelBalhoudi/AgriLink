export class Hero{
    title !: string;
    subtitle !: string;
    imageUrl !: string;
    constructor(title:string,subtitle:string,imageUrl:string){
        this.title=title;
        this.subtitle=subtitle;
        this.imageUrl=imageUrl;
    }

}