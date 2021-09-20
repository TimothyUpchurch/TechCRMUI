import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/shared.service';

@Component({
  selector: 'app-purchase',
  templateUrl: './purchase.component.html',
  styleUrls: ['./purchase.component.css']
})
export class PurchaseComponent implements OnInit {

  constructor(private service:SharedService) { }

  databaseColumns: any[] = ['firstName','lastName','email','datePurchased','productPurchased','amountSpent'];
  headerColumns: any[] = ['First Name','Last Name','Email','Date Purchased','Product Purchased','Amount Spent', 'Options']
  purchasesList:any = [];

  // Used to identify which component is using the add/edit modal
  componentName:string = "Purchases";

  ngOnInit(): void {
    this.refreshPurchasesList();
  }

  refreshPurchasesList(){
    let list:any = [];
    let date:string = '';
    this.service.getPurchases().subscribe(data => {
      // manipulate data here and get it in the correct format BEFORE passing it to the data-table component.
      data.forEach(d => {
        date = d.datePurchased
        let obj = {
          purchaseId: d.purchaseId,
          customerId: d.customerId,
          productId: d.productId,
          firstName: d.customer.firstName,
          lastName: d.customer.lastName,
          email: d.customer.email,
          datePurchased: date.slice(0,10),
          productPurchased: d.product.productName,
          amountSpent: d.product.price
        }
        // this.purchasesList.push(obj)
        list.push(obj);
      })     
      this.purchasesList = list;
    })
  }

  deletePurchase(purchase:any){
    if(confirm(`Are you sure you want to delete ${purchase.firstName}'s purchase?'`)){
      this.service.deletePurchase(purchase.purchaseId).subscribe(() => {
        this.refreshPurchasesList();
      });
    } 
  }

  addPurchase(purchase:any){
    let stock = 0;

    // Check the productid of the purchase to ensure stock does not equal zero
    this.service.getProduct(purchase.productId).subscribe(data => {
      stock = data.stock;
      
      if(stock > 0){
        this.service.addPurchase(purchase).subscribe(() => {
          this.refreshPurchasesList();
        })
      }
      else{
        alert("Cannot complete purchase. Insufficient stock...")
      }
    })
  }

  updatePurchase(purchase:any){
    let obj = 
    {
      purchaseId: purchase.purchaseId,
      customerId: purchase.customerId,
      productId: purchase.productId,
      datePurchased: purchase.datePurchased
    }
    this.service.updatePurchase(obj, obj.purchaseId).subscribe(() => {
      this.refreshPurchasesList();
    });
  }
}
