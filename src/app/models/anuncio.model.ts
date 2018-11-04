export class Anuncio {
    public id: string;
    public descripcion: string;
    public img: string; 

    constructor(id:string, descripcion:string, img:string){
        this.id = id;
        this.descripcion = descripcion;
        this.img = img; 
    }
}