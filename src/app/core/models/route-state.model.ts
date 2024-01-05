export class RouteState {
    constructor(){
        this.id = Math.floor(Math.random()*90000) + 10000;
        this.path = "";
        this.title = "";
    }
    id: number;
    path: string;
    data: any;
    title: string;
}
