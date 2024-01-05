export class CustomMenuItem {
    constructor() {
        this.Label = null;
        this.Icon = null;
        this.RouterLink = null;
        this.Children = null;
        this.IsChildVisible = false;
        this.url=null;
    }
    Label?: string | null;
    Icon?: string | null;
    RouterLink: string | null;
    Children: CustomMenuItem[] | null;
    IsChildVisible: boolean;
    url?: string | null;
}