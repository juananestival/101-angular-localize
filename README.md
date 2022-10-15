https://javascript.plainenglish.io/angular-translating-the-application-language-using-angular-localize-and-deploying-it-to-firebase-d2b127e64496

download https://poedit.net/
https://dev.to/batbrain9392/internationalization-with-angular-v10-693

https://medium.com/dailyjs/maintaining-multi-language-angular-applications-26b74df8d085
#  Create the app
1. Create an application with routing
2. Common steps
* material
* configure routes
* Home Screen 
* First component
* router outlet

```sh
ng new 101-angular-localize --style scss --routing true
ng add @angular/material
ng g c screens/HomeScreen
ng g c components/Header
ng g c components/sample-component
sudo npm -g i serve
```
```ts
import { HomeScreenComponent } from './screens/home-screen/home-screen.component'

const routes: Routes = [
  { path: 'home-screen', component: HomeScreenComponent },
  { path: '',   redirectTo: '/home-screen', pathMatch: 'full' }
];
```
#  Install and setup the localize package
1. Install
```sh
ng add @angular/localize
```

2. Edit the angular .json
When working in a typical project the angular.json chain will be:

-> root (the first open bracket)->projects->(name of the project)

Just below the name of the project. (at the **same level** than **project type** or **schematics**)

We will need:
* the locale in which source code is written (sourceLocale). We will use always english to write the source code. 
* the locales to be tranlated and where the translation file is:
    Note: you can choose json or xliff. Xliff has the advnagege that witn online editor you can translate easily
        http://xliff.brightec.co.uk/index.php
        https://poeditor.com/

* Now we will write the options. ->root (the first open bracket )->projects->(name of the project)->architect-> build -> options ->


```json
  "projects": {
    "101-angular-internacinalization": {
      "i18n":{
        "sourceLocale":"en-US",
        "locales": {"es-ES":"src/locale/messages.es.xlf"}
      },
      ...
      "architect": {
        "build": {
          "builder": "@angular-devkit/build-angular:browser",
          "options": {
            "localize":["es-ES"],

```

Take into account that ng serve "naked" will fail now. 

3. Prepare components
Edit templates
```html
<p i18n>for test sample-component works!</p>
<p i18n> for dates like {{"05/01/2022" | date}} use pipe</p>
<p i18n> for currencies like {{129 | currency}} use pipe</p>
<p i18n> for test of images</p>
<img alt="just me" i18n-alt src="../assets/yo.jpeg">
```

edit code 
```ts
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
```

4. Extract
```sh
ng extract-i18n --output-path src/locale
```
the folder locale is created
in json
```sh
ng extract-i18n --output-path src/locale --format json
```

In json we will see a file like
```json
{
  "locale": "en-US",
  "translations": {
    "8286437328803353698": "for test sample-component works!",
    "1586441093982144361": " for dates like {$INTERPOLATION} use pipe",
    "8230667035758312692": " for currencies like {$INTERPOLATION} use pipe",
    "3271070469815256851": " for test of images",
    "4323851768315885124": "just me",
    "1737753151350322492": "{$PH}"
  }
}
``` 
5. translate
Just create a copy and name it with the lang proper extension. Remeber the file name of the angular.json

Now ng serve will serve only the localized version (es)

Build the app
```sh
ng build --localize  
```
and serve it with a local server
```sh
serve dist/101-angular-internacinalization
```
Now you can call both url 
http://localhost:3000/en-US/home
http://localhost:3000/es-ES/home


# Inject a switcher
To setup a swither to set the language we will need to play with href to inject the locale into the route. 
The menu to show the langs will inject ther locale like this
```html
<mat-menu #anyname="matMenu">
  <a mat-menu-item href="/en-US">English</a>
  <a mat-menu-item href="/es-ES">Spanish</a>
</mat-menu>
```
We now the the while menu in angular will have a trigger in a button for example
```html
<ng-container>
    <mat-icon>language</mat-icon>
    <button mat-button [matMenuTriggerFor]="anyname">
        {{siteLanguage}}
         <mat-icon>arrow_drop_down</mat-icon>
    </button>
    <mat-menu #anyname="matMenu">
        <a mat-menu-item href="/en-US">English</a>
        <a mat-menu-item href="/es-ES">Spanish</a>
    </mat-menu>
 </ng-container>
 ```
Only with the change of href will work even if there is no additional code on the component class. 
However we will want to show current language. 
We can init a variable like siteLanguage with the default langutew
We can create an array with the options like languageList
The current locale can be inyected with LOCALE_ID, Inject in an import clause and in the constructor. 
Then the ngoninit can setup the setting



```ts
import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit, LOCALE_ID, Inject } from '@angular/core';

@Component({
  selector: 'app-home-screen',
  templateUrl: './home-screen.component.html',
  styleUrls: ['./home-screen.component.scss']
})

export class HomeScreenComponent implements OnInit {
  siteLanguage: any = 'Español';
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

```

