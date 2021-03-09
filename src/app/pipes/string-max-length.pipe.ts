import { stringify } from '@angular/compiler/src/util';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'stringMaxLength'
})
export class StringMaxLengthPipe implements PipeTransform {

  transform(value: string, length: number): string {

    let suffix = value.substr(-3, 3);

    if (value.length > length) {
      return value.substr(0, length) + '...' + suffix;
    }

    return value;    
  }

}
