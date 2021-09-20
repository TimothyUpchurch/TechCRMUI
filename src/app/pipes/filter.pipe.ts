import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  // pass in the property to be searched as an argument. 
  // Ex: for customers it will be firstName, for products it will be productName 
  transform(value: Array<any>, search: string, searchBy: string): any {
    if(value && search){
      return value.filter(d => d[searchBy].toString().toLowerCase().indexOf(search.toLowerCase())>-1);
    }
    return value;
  }

}
