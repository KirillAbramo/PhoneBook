import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(data: Array<any>, name: string): any {
    if (!name) { return data; }
    if (!data) { return []; }
    return data.filter(c => (c.contactName.toLowerCase().indexOf(name.toLowerCase()) !== -1) ||
      (c.contactLastName.toLowerCase().indexOf(name.toLowerCase()) !== -1) ||
      c.contactPhone.indexOf(name) !== -1)

  }


}
