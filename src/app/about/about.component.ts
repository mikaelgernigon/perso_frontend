import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
@Component({
  selector: 'app-about',
  imports: [RouterOutlet, RouterLink],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent {

   activeClass(id: string): void {
   let listMenus: string[] = ['cont-1', 'cont-2', 'cont-3'];
    let inactiveMenus: string[]|null = listMenus.filter(function(element: string, index: number, array: string[]){
      return (element != id);
    });
    for(const item of inactiveMenus) {
      let elem: HTMLElement|null = document.getElementById(item);
      elem?.classList.remove('activeLink');
    }
    let elem: HTMLElement|null = document.getElementById(id);
    elem?.classList.add('activeLink');
  }
}
