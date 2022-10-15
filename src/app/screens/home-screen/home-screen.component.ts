import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit, LOCALE_ID, Inject } from '@angular/core';

@Component({
  selector: 'app-home-screen',
  templateUrl: './home-screen.component.html',
  styleUrls: ['./home-screen.component.scss']
})

export class HomeScreenComponent implements OnInit {
  siteLanguage: any = 'Español';
  siteLocale: string = 'es-ES';
  languageList = [
    { code: 'en-US', label: 'English' },
    { code: 'es-ES', label: 'Español' },
  ];

  constructor(@Inject(LOCALE_ID) public locale: string) { }

  ngOnInit(): void {
    console.log(this.locale)
    let currentLocale = this.languageList.find(element => element.code == this.locale);
    this.siteLanguage=currentLocale?.label
  }
 

}
