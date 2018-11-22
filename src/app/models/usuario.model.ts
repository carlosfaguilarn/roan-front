export class Usuario {
    public id: string;
    public name: string;
    public phone: string;
    public address: string;
    public email: string;
    public role: string;
    public id_rol: string;
    public img: string
    constructor(id:string, name:string, phone:string, address:string, email:string, rol:string, id_rol:string, img: string){
        this.id = id;
        this.name = name;
        this.phone = phone;
        this.email = email;
        this.email = email;
        this.role = rol;
        this.id_rol = id_rol;
        this.img = img;
    }
}