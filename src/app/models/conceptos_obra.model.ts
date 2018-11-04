export class ConceptoObra{
    public descripcion: string;
    public inicio: string;
    public finalizacion: string;
    public evidencias: string;
    public costo: string;

    constructor(descripcion:string, inicio:string, finalizacion:string, evidencias:string, costo:string){
        this.descripcion = descripcion;
        this.inicio = inicio;
        this.finalizacion = finalizacion;
        this.evidencias = evidencias;
        this.costo = costo;
    }
}