import {Component, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private http: HttpClient) {

  }

  private body: any = {
    amount: '92.00',
    currency: 'BRL',
    paymentType: 'DB',
    authentication: {
      userId: '8a8294174d2e4980014d3403230d09ab',
      password: 'qtJ2awEnBA',
      entityId: '8a8294174d2e4980014d340322fa09a7'
    }

  };

  ngOnInit() {
    this.callingAllPagoWebservice();
  }

  callingAllPagoWebservice() {
    const body = new HttpParams()
      .set('amount', '92.00')
      .set('currency', 'BRL')
      .set('paymentType', 'DB')
      .set('authentication.userId', '8a8294174d2e4980014d3403230d09ab')
      .set('authentication.password', 'qtJ2awEnBA')
      .set('authentication.entityId', '8a8294174d2e4980014d340322fa09a7');

    this.http
      .post('http://localhost:3000/test/api/allpago', body, {
        headers: new HttpHeaders().set('authorizationwrapper', 'a0f2a3c1dcd5b1cac71bf0c03f2ff1bd')
          .append('Content-Type', 'application/x-www-form-urlencoded'),
      })
      .subscribe(resp => {
        console.log(resp);
      });
  }
}
