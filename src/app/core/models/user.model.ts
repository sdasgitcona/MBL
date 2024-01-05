export class User {
    constructor() {
        this.id=null;
        this.userId = null;
        this.username = null;
        this.password = null;
        this.email = null;
        this.image = null;
        this.imageMetadata = null;
        this.birthDate = null;
        this.token = null;
        this.type = null;
        this.roles = [];
        this.departmentName = null;
        this.firstTimeLogin=null;
        this.subsidiaryName=null;
        this.selectedAccess=null;
    }

    id:number|null;
    userId: number | null;
    username: string | null;
    password: string | null;
    email: string | null;
    image: string | null;
    imageMetadata:string | null;
    birthDate: Date | null;
    token: string | null;
    type: string | null;
    roles:any[]=[] ;
    departmentName: string | null;
    firstTimeLogin:boolean|null;
    subsidiaryName: string | null;
    selectedAccess: string | null;
}