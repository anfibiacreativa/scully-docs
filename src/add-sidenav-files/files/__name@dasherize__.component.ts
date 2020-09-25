import { Component, OnInit } from '@angular/core';
import { ScullyRoutesService } from '@scullyio/ng-lib';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {
  docs$: Observable<any> = this.scully.available$;

  constructor(
    private scully: ScullyRoutesService
  ) { }

  ngOnInit(): void {
    this.docs$.subscribe(docs => {
      console.log(docs);
    });
  }
}
