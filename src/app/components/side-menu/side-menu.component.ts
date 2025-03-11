import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

interface MenuItem {
  label: string;
  link: string;
}

@Component({
  selector: 'app-side-menu',
  standalone: true,
  imports: [RouterLink, 
    RouterModule,
    MatToolbarModule,
    MatMenuModule,
    MatButtonModule,
    MatIconModule,
    CommonModule],
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
