export class Cliente { 
    public name: string;
    public telefono: string;
    public direccion: string;
    public email: string; 
    constructor(name:string, telefono:string,direccion:string, email:string){
        this.name = name;
        this.telefono = telefono;
        this.direccion = direccion;
        this.email = email; 
    }
}