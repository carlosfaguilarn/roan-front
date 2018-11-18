export class Proyecto {
    public id: string;
    public titulo: string;
    public descripcion: string;
    public tipo: string;
    public cliente: string;
    public ubicacion: string;
    public id_encargado: string;

    constructor(id:string, titulo:string, descripcion:string, tipo:string, cliente:string, ubicacion:string, id_encargado:string){
        this.id = id;
        this.titulo = titulo;
        this.descripcion = descripcion;
        this.tipo = tipo;
        this.cliente = cliente;
        this.ubicacion = ubicacion;
        this.id_encargado = id_encargado;
    }
}