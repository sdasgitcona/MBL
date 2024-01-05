import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { HistoryModel } from './model/history.model';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss'],
})
export class HistoryComponent implements OnInit {

  totalRecord: number = 0;

  @Input() data: HistoryModel[] = [];
  constructor() {}
  ngOnInit(): void {}
}
