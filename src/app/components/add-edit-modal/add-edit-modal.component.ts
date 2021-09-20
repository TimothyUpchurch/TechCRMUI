import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { SharedService } from 'src/app/shared.service';
import { CustomerType } from 'src/app/interfaces/customerType';
import { ProductType } from 'src/app/interfaces/productType';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-edit-modal',
  templateUrl: './add-edit-modal.component.html',
  styleUrls: ['./add-edit-modal.component.css']
})
export class AddEditModalComponent implements OnInit {
  @Input() headerColumns:string[] = [];
  @Input() databaseColumns:string[] = [];
  @Input() buttonText:string = "";
  @Input() updatedData:any = {};
  @Input() parentComponent:string = "";

  @Output() addDataDB:EventEmitter<any> = new EventEmitter();
  @Output() updateDataDB:EventEmitter<any> = new EventEmitter();

  customers:any[] = [];
  products:any[] = [];
  productTypes:any[] = [];
  formData:any[] = [];
  
  constructor(private service:SharedService, private router: Router) {}

  customerName = "";
  productName = "";
  purchaseDate = "";
  productType = "";

  ngOnInit(): void {
    this.service.getCustomers().subscribe(data => {
      this.customers = data;
    })

    this.service.getProducts().subscribe(data => {
      this.products = data;
    })

    this.service.getProductTypes().subscribe(data => {
      this.productTypes = data;
    })
  }

  addData(val:any){
    if(this.parentComponent == 'Customers'){
      if(this.validatecustomer(val)){
        let customerAdd:CustomerType = {
          firstName: val.firstName,
          lastName: val.lastName,
          age: val.age,
          sex: val.sex,
          email: val.email
        }
        this.addDataDB.emit(customerAdd);
        this.hideForm();
      }
    }
    else if(this.parentComponent == 'Products'){
      if(this.validateProduct(val)){
        let productAdd:ProductType = {
          productId: this.updatedData.productId,
          productName: val.productName,
          productTypeId: val.productType,
          stock: val.stock,
          price: val.price
        }
        this.addDataDB.emit(productAdd);
        this.hideForm();
      }
    }
  }

  updateData(val:any){
    if(this.parentComponent == 'Customers'){
      if(this.validatecustomer(val)){
        // create new customer
        let customerUpdate:CustomerType = {
          customerId: this.updatedData.customerId,
          firstName: val.firstName,
          lastName: val.lastName,
          age: val.age,
          sex: val.sex,
          email: val.email
        }
        this.updateDataDB.emit(customerUpdate);
        this.hideForm();
      }
    }
    else if(this.parentComponent == 'Products'){
      // validate
      if(this.validateProduct(val)){
        let productUpdate:ProductType = {
          productId: this.updatedData.productId,
          productName: val.productName,
          productTypeId: val.productType,
          stock: val.stock,
          price: val.price
        }
        this.updateDataDB.emit(productUpdate);
        this.hideForm();
      }
      console.log(val);
    }
  }

  hideForm(){
    let backdrop = document.getElementById("formBackdrop");
    
    if(backdrop != null){
      backdrop.style.display = "none";
    }
  }

  addPurchase(){
    let dateVal;
    let purchaseDate = <HTMLDataElement>document.getElementById("purchaseDateInput");
    if(purchaseDate){
      dateVal = purchaseDate.value;
    }
    
    if(this.customerName && this.productName && dateVal){
      let purchase = {
        customerId: this.customerName,
        productId: this.productName,
        datePurchased: dateVal
      }
      this.addDataDB.emit(purchase);
      this.hideForm();

      // reset fields
      purchaseDate.value = "";
    }
    else{
      alert("All fields require a value")
    }

  }

  validateEmail(email:any) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  validatecustomer(val:any):boolean{
    if(val.firstName == undefined || val.lastName == undefined || val.age == undefined || val.sex == undefined || val.email == undefined){
      alert("Please fill out all values")
      return false;
    }
    else if(val.firstName == "" || val.lastName == "" || val.age == "" || val.sex == "" || val.email == ""){
      alert("Please fill out all values")
      return false;
    }
    else if(isNaN(val.age)){
      alert("Age must be a number...")
      return false;
    }
    else if(val.sex.toString().length != 1){
      alert("Enter in 'F' or 'M' in the sex field...")
      return false;
    }
    else if(!this.validateEmail(val.email)){
      alert("Enter a valid email...")
      return false;
    }
    return true;
  }

  validateProduct(val:any):boolean{
    if(val.productName == undefined || val.productType == undefined || val.stock == undefined || val.price == undefined){
      alert("Please fill out all values")
      return false;
    }
    else if(val.productName == "" || val.productType == "" || val.stock == "" || val.price == ""){
      alert("Please fill out all values")
      return false;
    }
    else if(isNaN(val.stock)){
      alert("Stock must be a number...")
      return false;
    }
    else if(val.stock < 1){
      alert("Stock must be a positive number...")
      return false;
    }
    else if(isNaN(val.price)){
      alert("Price must be a number...")
      return false;
    }
    return true;
  }
}
