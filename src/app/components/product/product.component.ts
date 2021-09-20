import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/shared.service';
import { ProductType } from 'src/app/interfaces/productType';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  constructor(private service:SharedService) { }

  databaseColumns:any[] = ['productName', 'productType', 'stock', 'price', 'dateAdded'];
  headerColumns:any[] = ['Name', 'Type', 'Stock', 'Price',  'Date Updated', 'Options'];
  productsList:any = [];

  componentName:string = "Products";

  ngOnInit(): void {
    this.refreshProducts();
  }

  refreshProducts(){
    let products:any = [];

    this.service.getProducts().subscribe(data => {
      data.forEach(d => {
        let product = {
          productId: d.productId,
          productName: d.productName,
          productTypeId: d.productTypeId,
          stock: d.stock,
          price: d.price,
          productType: d.productType.productType,
          dateAdded: d.dateAdded.slice(0,10)
        }
        products.push(product);
      })
      this.productsList = products;
    })
  }

  deleteProduct(product:any){
    if(confirm(`Are you sure you want to delete ${product.productName}?`)){
      this.service.deleteProduct(product.productId).subscribe(() => {
        this.refreshProducts();
      })
    }
  }

  addProduct(product:any){
    let time = Date.now();
    let date = new Date(time);

    let productAdd:ProductType = {
      productName: product.productName,
      stock: product.stock,
      price: product.price,
      productTypeId: product.productTypeId,
      dateAdded: date.toUTCString()
    }

    this.service.addProduct(productAdd).subscribe(() => {
      this.refreshProducts();
    })
  }

  updateProduct(product:any){
    let time = Date.now();
    let date = new Date(time);

    let formatProduct = {
      productId: product.productId,
      productName: product.productName,
      stock: product.stock,
      price: product.price,
      productTypeId: product.productTypeId,
      dateAdded: date.toUTCString()
    }
    this.service.updateProduct(formatProduct, product.productId).subscribe(() => {
      this.refreshProducts();
    })
  }

}
