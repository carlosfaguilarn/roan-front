import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(items:any, term:any): any {
    if(term === undefined){
      return items;
    }
    return items.filter(function(item){
        if(item.descripcion){
            return item.descripcion.toLowerCase().startsWith(term.toLowerCase());
        }else{
            return item.nombre.toLowerCase().startsWith(term.toLowerCase());
        }
        
    })
  }
}
