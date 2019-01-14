import { Component, OnInit, ContentChild, ElementRef, AfterContentInit, ViewChild, AfterViewInit } from '@angular/core';
import { AuthServise } from '../core/services/auth.service';

import { MaterialService } from '../core/classes/material.service';


@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
})
export class HomePageComponent implements OnInit, AfterViewInit {

  @ViewChild('parallax') parallaxRef: ElementRef

  constructor(private auth: AuthServise) { }

  ngAfterViewInit() {
    MaterialService.parallax(this.parallaxRef)
  }

  ngOnInit() {
  }

  isAuthenticated(){
    return this.auth.isAuthenticated()
  }
}
