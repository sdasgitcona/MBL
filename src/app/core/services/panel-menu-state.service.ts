import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PanelMenuStateService {
  private panelMenuState: any = null;

  constructor() { }

  // Cache the state of the panel menu
  cachePanelMenuState(state: any): void {
    this.panelMenuState = state;
  }

  // Get the cached state of the panel menu
  getCachedPanelMenuState(): any {
    return this.panelMenuState;
  }
}