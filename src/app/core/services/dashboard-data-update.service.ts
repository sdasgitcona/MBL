import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class DashboardDataUpdateService {
    private subsidiaryIdSubject = new Subject<number>();

    // method to emit selected subsidiary id
    sendSubsidiaryId(id: number) {
        this.subsidiaryIdSubject.next(id);
    }

    // method to get notified of changes to the selected subsidiary id
    getSubsidiaryId() {
        return this.subsidiaryIdSubject.asObservable();
    }
}