import { Component, OnInit, LOCALE_ID, Inject } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
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
