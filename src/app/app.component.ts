import {Component, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
// import 'https://test.oppwa.com/v1/paymentWidgets.js?checkoutId=656FBAB30F4BD11D3F79FEB811D213F3.sbg-vm-tx01';
declare var wpwlOptions: any;
declare var $:any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private http: HttpClient) {}

  public checkoutId = '';
  public shopperResultUrl = 'http://localhost:4200/';
  public allPagoResponse;


  ngOnInit() {
    // wpwlOptions.locale = 'es'
    
    this.callingAllPagoWebservice();
    wpwlOptions = {
      locale: 'es',
      // onReady: function () {
      //   // console.log(something);
      //   console.log("this iframe is now ready");

      // },
      onReady: function () {
        console.log("this iframe is now ready");
        var numberOfInstallmentsHtml = '<div class="wpwl-label wpwl-label-custom" style="display:inline-block">Number of Installments</div>' +
          '<div class="wpwl-wrapper wpwl-wrapper-custom" style="display:inline-block">' +
          '<select name="recurring.numberOfInstallments"><option value="1">1</option><option value="3">3</option><option value="5">5</option></select>' +
          '</div>';
        $('form.wpwl-form-card').find('.wpwl-button').before(numberOfInstallmentsHtml);
      }
    }
    console.log(wpwlOptions);

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
      .subscribe((resp) => {
        console.log(resp);
        this.allPagoResponse = resp;
        this.loadScript();
      });
  }

  loadScript() {
    var isFound = false;
    var scripts = document.getElementsByTagName("script")
    for (var i = 0; i < scripts.length; ++i) {
      if (scripts[i].getAttribute('src') != null && scripts[i].getAttribute('src').includes("loader")) {
        isFound = true;
      }
    }

    if (!isFound) {
      var dynamicScripts = ["https://test.oppwa.com/v1/paymentWidgets.js?checkoutId="+this.allPagoResponse.id+""];

      for (var i = 0; i < dynamicScripts.length; i++) {
        let node = document.createElement('script');
        node.src = dynamicScripts[i];
        node.type = 'text/javascript';
        node.async = false;
        node.charset = 'utf-8';
        document.getElementsByTagName('head')[0].appendChild(node);
      }

    }
  }
}

