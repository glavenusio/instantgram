import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router'
import { DataService } from '../service/data.service';

@Injectable({
  providedIn: 'root'
})

export class DataServiceResolver implements Resolve<any>{
  constructor(private dataService: DataService) { }

  resolve(route: ActivatedRouteSnapshot) {
    let id = route.paramMap.get('id');
    return this.dataService.getData(id)
  }
}
