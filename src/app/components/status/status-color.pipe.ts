import { Pipe, PipeTransform } from '@angular/core';
import { StatusColor } from './status-color';

@Pipe({
  name: 'statusColor',
  standalone: true,
})
export class StatusColorPipe implements PipeTransform {
  transform(value: (...args: any[]) => StatusColor, ...args: any[]): StatusColor {
    return value(...args);
  }
}
