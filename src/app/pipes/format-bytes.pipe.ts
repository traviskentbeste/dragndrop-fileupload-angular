import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatBytes'
})
export class FormatBytesPipe implements PipeTransform {

  transform(value: number): string {
    if ( (value / 1000) < 1000) {
      return (Math.round(((value / 1000) + Number.EPSILON) * 100) / 100 + " KB");
    } else if ( (value / 1000 / 1000) < 1000) {
      return (Math.round(((value / 1000 / 1000) + Number.EPSILON) * 100) / 100 + " MB");
    }

    return value + " Bytes";
  }

}
