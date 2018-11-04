export class Cliente {
    public id: string;
    public nombre: string;
    public apellido: string;
    public telefono: string;
    public direccion: string;
    public email: string; 
    constructor(id:string, nombre:string, apellido:string, telefono:string,direccion:string, email:string){
        this.id = id;
        this.nombre = nombre;
        this.apellido = apellido;
        this.telefono = telefono;
        this.direccion = direccion;
        this.email = email; 
    }
}