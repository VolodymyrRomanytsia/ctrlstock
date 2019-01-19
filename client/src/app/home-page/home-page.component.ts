import { Component, OnInit, ViewChild, AfterViewInit, ElementRef, OnDestroy } from '@angular/core';
import { AuthServise } from '../core/services/auth.service';
import { MaterialService, MaterialInstance } from '../core/classes/material.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
  
})

export class HomePageComponent implements OnInit, AfterViewInit, OnDestroy{

  @ViewChild('parallax') parallaxRef: ElementRef;

  parallax: MaterialInstance

  constructor(private auth: AuthServise) { }

  ngAfterViewInit() {
    this.parallax = MaterialService.parallax(this.parallaxRef)
  }
       
  ngOnDestroy() {
    this.parallax.destroy()
  }

  ngOnInit() {
  }
  


  isAuthenticated(){
    return this.auth.isAuthenticated()
  }
}
