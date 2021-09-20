import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.css']
})
export class DataTableComponent implements OnInit {

  @Input() databaseColumns:string[] = [];
  @Input() headerColumns:string[] = [];
  @Input() dataList:any[] = [];
  @Input() parentComponent:string = "";
  @Input() searchBy:string = "";
  @Input() searchByPlaceholder:string = "";

  @Output() deleteDataDB:EventEmitter<any> = new EventEmitter();
  @Output() addDataDB:EventEmitter<any> = new EventEmitter();
  @Output() updateDataDB:EventEmitter<any> = new EventEmitter();
  

  buttonText:string = "";
  updatedData:any = {};
  searchFilter:string = "";

  constructor() { }

  ngOnInit(): void {
  }

  delete(element:any){
    this.deleteDataDB.emit(element);
    this.removeSearchFilter();
  }

  add(element:any){
    this.addDataDB.emit(element);
    this.removeSearchFilter();
  }

  update(element:any){
    this.updateDataDB.emit(element);
    this.removeSearchFilter();
  }

  showAddEditModal(){
    let backdrop = document.getElementById("formBackdrop");
    if(backdrop != null){
      backdrop.style.display = "flex";
    }
  }

  showAddForm(){
    this.showAddEditModal();
    this.buttonText = "Add";
  }

  showUpdateForm(element:any){
    this.showAddEditModal();
    this.buttonText = "Update";
    this.updatedData = element;
  }

  passFilter(val:any){
    this.searchFilter = val;
  }

  removeSearchFilter(){
    this.searchFilter = "";
    let searchFilterInput = <HTMLInputElement>document.getElementById("searchFilter");
    if(searchFilterInput){
      searchFilterInput.value = "";
    }
  }
}
