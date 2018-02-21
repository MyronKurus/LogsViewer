import {Pipe, PipeTransform} from '@angular/core';

@Pipe({name: 'enums'})
export class EnumKeysPipe implements PipeTransform {
  transform(value, args:string[]) : any {
    let keys = [];
    for (var member in value) {
        keys.push({key: member.toUpperCase(), value: value[member]});
    }
    return keys;
  }
}