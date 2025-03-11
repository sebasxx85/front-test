import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

interface MenuItem {
  label: string;
  link: string;
}

@Component({
  selector: 'app-side-menu',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './side-menu.component.html',
  styleUrl: './side-menu.component.scss',
})
export class SideMenuComponent {
  menu: MenuItem[] = [
    {
      label: 'Home',
      link: '/home',
    },
    {
      label: 'Create',
      link: '/create',
    },
  ];
}
