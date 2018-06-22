import { Injectable, Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'userFilterByUserName'
})
@Injectable()
export class UserFilterByUserName implements PipeTransform {
    transform(items: any[], field: string, value: string): any[] {
        if (!items) return [];
        return items.filter(it => it[field] !== value);
    }
}