import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser'

@Component({
  selector: 'app-sample-component',
  templateUrl: './sample-component.component.html',
  styleUrls: ['./sample-component.component.scss']
})
export class SampleComponentComponent implements OnInit {
  title = 'your title'
  constructor(private titleService:Title) { 
    this.titleService.setTitle($localize`${this.title}`)
  }

  ngOnInit(): void {
  }

}
