export class Servicio {
    public id: string;
    public descripcion: string;
    public tipo: string;
    public imagen: string;

    constructor(id:string, descripcion:string, tipo:string, imagen:string){
        this.id = id;
        this.descripcion = descripcion;
        this.tipo = tipo;
        this.imagen = imagen;
    }
}