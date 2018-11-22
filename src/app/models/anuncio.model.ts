export class Anuncio {
    public id: string;
    public descripcion: string;
    public servicio_id: string;
    public img: string; 

    constructor(id:string, descripcion:string, img:string, servicio_id: string){
        this.id = id;
        this.descripcion = descripcion;
        this.servicio_id = servicio_id;
        this.img = img; 
    }
}