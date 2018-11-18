export class Concepto{
    public descripcion: string;
    public costo: string;
    public inicio: string;
    public fin: string;
    public evidencia: string;
    public proyecto_id: string;

    constructor(descripcion:string, inicio:string, fin:string, evidencia:string, costo:string, proyecto_id: string){
        this.descripcion = descripcion;
        this.costo = costo;
        this.inicio = inicio;
        this.fin = fin;
        this.evidencia = evidencia;
        this.proyecto_id = proyecto_id;
    }
}