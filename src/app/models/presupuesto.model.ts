export class Presupuesto {
    public id: string;
    public descripcion: string;
    public proyecto_id: string;
    public cliente: string;
    public url: string;
    public proyecto: string;


    constructor(id:string, descripcion:string, proyecto_id:string, cliente: string, url: string, proyecto: string){
        this.id = id;
        this.descripcion = descripcion;
        this.proyecto_id = proyecto_id;
        this.cliente = cliente;
        this.url = url;
        this.proyecto = proyecto;
    }
}