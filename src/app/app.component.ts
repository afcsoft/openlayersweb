import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private http: HttpClient) { }
  httpdata;
  ngOnInit() {
    this.http.get("/api/test")
    .subscribe((data) => this.displaydata(data));     
 }
 displaydata(data) {this.httpdata = data;}
  name='Open Layers';
  title = 'angulartest';
}
