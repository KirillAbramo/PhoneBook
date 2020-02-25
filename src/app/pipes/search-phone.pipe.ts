import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchPhone'
})
export class SearchPhonePipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    return null;
  }

}
