import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-filter-data',
  templateUrl: './filter-data.component.html',
  styleUrls: ['./filter-data.component.css']
})
export class FilterDataComponent implements OnInit {
  searchFilter:string = "";

  @Input() placeholderText:string = ""; 
  @Output() passFilter:EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  // pass search filter up to data-table
  passSearchFilter(){
    this.passFilter.emit(this.searchFilter);
  }

  clearSearchFilter(){
    this.searchFilter = "";
  }

}
