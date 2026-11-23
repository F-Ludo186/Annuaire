import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  imports: [MatButtonModule, MatIconModule, MatToolbarModule, RouterLink, RouterLinkActive],
  selector: 'app-mobile-nav',
  styleUrl: './mobile-nav.css',
  templateUrl: './mobile-nav.html',
})
export class MobileNav {}
