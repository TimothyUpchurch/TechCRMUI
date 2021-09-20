import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpClientModule} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  // readonly APIUrl = "https://localhost:44372/api/";
  readonly APIUrl = "https://techcrmapi.azurewebsites.net/api/";
  constructor(private http:HttpClient) { }
  httpHeaders = new HttpHeaders();

  loginSuccess = false;

  // Customers ------------------------------------
  getCustomers():Observable<any[]>{ 
    return this.http.get<any>(this.APIUrl+'customer', {headers: this.httpHeaders});
  }

  getCustomer(val:any){
    return this.http.get<any>(this.APIUrl+'customer/'+val);
  }

  addCustomer(val:any){
    return this.http.post(this.APIUrl+'customer/',val, {headers: this.httpHeaders});
  }

  updateCustomer(val:any, id:any){
    return this.http.put(this.APIUrl+'customer/'+`${id}`,val, {headers: this.httpHeaders});
  }

  deleteCustomer(val:any){
    return this.http.delete(this.APIUrl+'customer/'+val, {headers: this.httpHeaders});
  }

  // Purchases -------------------------------------
  getPurchases():Observable<any[]>{
    return this.http.get<any>(this.APIUrl+'purchase', {headers: this.httpHeaders});
  }

  addPurchase(val:any){
    return this.http.post(this.APIUrl+'purchase/',val, {headers: this.httpHeaders});
  }

  updatePurchase(val:any, id:any){
    return this.http.put(this.APIUrl+'purchase/'+`${id}`,val, {headers: this.httpHeaders});
  }

  deletePurchase(val:any){
    return this.http.delete(this.APIUrl+'purchase/'+val, {headers: this.httpHeaders});
  }

  // Products ----------------------------------------
  getProducts():Observable<any[]>{
    return this.http.get<any>(this.APIUrl+'product', {headers: this.httpHeaders});
  }

  getProduct(id:any){
    return this.http.get<any>(this.APIUrl+`product/${id}`, {headers: this.httpHeaders});
  }

  addProduct(val:any){
    return this.http.post(this.APIUrl+'product/',val, {headers: this.httpHeaders});
  }

  updateProduct(val:any, id:any){
    return this.http.put(this.APIUrl+'product/'+`${id}`, val, {headers: this.httpHeaders});
  }

  deleteProduct(val:any){
    return this.http.delete(this.APIUrl+'product/'+val, {headers: this.httpHeaders});
  }

  // ProductTypes ------------------------------------
  getProductTypes():Observable<any[]>{
    return this.http.get<any>(this.APIUrl+'productType', {headers: this.httpHeaders});
  }

  // Login
  login(val:any){
    const hdr = new HttpHeaders({
      'UserName': `${val.userName}`,
      'UserPassword': `${val.password}`
    })
    return this.http.get<any>(this.APIUrl+'user', {headers: hdr});
  };
    
  getToken(){
    var token = localStorage.getItem('token');  
    return token;
  }

  setHeaders(){
    this.httpHeaders = new HttpHeaders({
      'Authorization': `Bearer ${this.getToken()}`
    });

    this.loginSuccess = true;
  }
}
