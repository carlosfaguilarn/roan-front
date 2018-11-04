export class Usuario {
    public id: string;
    public nombre: string;
    public apellido: string;
    public telefono: string;
    public direccion: string;
    public email: string;
    public role: string;
    public id_rol: string;

    constructor(id:string, nombre:string, apellido:string, telefono:string,direccion:string, email:string, rol:string, id_rol:string){
        this.id = id;
        this.nombre = nombre;
        this.apellido = apellido;
        this.telefono = telefono;
        this.direccion = direccion;
        this.email = email;
        this.role = rol;
        this.id_rol = id_rol;
    }
}