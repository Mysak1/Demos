import { Component } from '@angular/core';

@Component({
  selector: 'my-app',
  //template: `<h1>Angular</h1>`,
  template: `
  <ul>
   <li><a routerLink = "/">Home</a></li>
   <li><a routerLink = "/about">About</a></li>
  </ul>
  <hr/>
  <router-outlet></router-outlet>`
})

export class AppComponent  {
}
