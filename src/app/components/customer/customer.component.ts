import { Component, OnInit} from '@angular/core';
import { SharedService } from 'src/app/shared.service';
import { CustomerType } from '../../interfaces/customerType'

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {

  constructor(private service:SharedService) { }

  CustomersList:any=[];
  databaseColumns: string[] = ['customerId','firstName', 'lastName','age', 'sex', 'email', 'dateAdded','options'];
  headerColumns: string[] = ['Customer ID','First Name','Last Name','Age','Sex','Email','Date Updated','Options'];

  // Used to identify which component is using the add/edit modal
  componentName:string = "Customers";


  ngOnInit(): void {
    this.refreshCustomersList();
  }

  refreshCustomersList(){
    let customers:any = [];
    this.service.getCustomers().subscribe(data => {
      // this.CustomersList = data;
      data.forEach(d => {
        let customer = {
          customerId: d.customerId,
          firstName: d.firstName,
          lastName: d.lastName,
          age: d.age,
          sex: d.sex,
          email: d.email,
          dateAdded: d.dateAdded.slice(0,10)
        }
        customers.push(customer);
      })
      this.CustomersList = customers;
    })
  }

  deleteCustomer(customer:any){
    let customerDel:CustomerType = {
      customerId: customer.customerId,
      firstName: customer.firstName,
      lastName: customer.lastName,
      age: customer.age,
      sex: customer.sex,
      email: customer.email
    }
    if(confirm(`Are you sure you want to delete ${customer.firstName} ${customer.lastName} as a customer?`)){
      this.service.deleteCustomer(customerDel.customerId).subscribe(() => {
        this.refreshCustomersList();
      });
    }
  }
  
  addCustomer(customer:any){
    let time = Date.now();
    let date = new Date(time);
    let customerAdd:CustomerType = {
      firstName: customer.firstName,
      lastName: customer.lastName,
      age: customer.age,
      sex: customer.sex,
      email: customer.email,
      dateAdded: date.toUTCString()
    }
    this.service.addCustomer(customerAdd).subscribe(() => {
      this.refreshCustomersList();
    })
  }

  updatecustomerDB(customer:any){
    let time = Date.now();
    let date = new Date(time);
    let customerDel:CustomerType = {
      customerId: customer.customerId,
      firstName: customer.firstName,
      lastName: customer.lastName,
      age: customer.age,
      sex: customer.sex,
      email: customer.email,
      dateAdded: date.toUTCString()
    }
    this.service.updateCustomer(customerDel, customerDel.customerId).subscribe(() => {
      this.refreshCustomersList();
    });
  }
}
