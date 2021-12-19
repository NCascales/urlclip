import { Component, OnInit } from '@angular/core';
import { environment } from '@env/environment';
import { $ } from 'protractor';
import { finalize } from 'rxjs/operators';

import { ShortenerService } from './shortener.service';

interface URLCard {
  long_url: string;
  short_url: string;
  created_At: string;
}
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  quote: string | undefined;
  isLoading = false;
  inputURL: any = '';
  URLCard: any;

  constructor(private shortenerService: ShortenerService) {}

  ngOnInit() {
    this.isLoading = true;
    /*
    this.quoteService
      .getRandomQuote({ category: 'dev' })
      .pipe(
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe((quote: string) => {
        this.quote = quote;
      });*/
  }

  showURL(url: string) {
    //llamada de servicio
    this.shortenerService.postURL(url).subscribe((result: any) => {
      console.log(result);
      this.URLCard.push({
        long_url: result.url,
        short_url: environment.serverUrl + '/' + result.code,
        created_at: new Date(result.created_at).toUTCString(),
      });
    });
    console.log(url);
    var newURL = '<ion-label color="primary">' + url + '</ion-label><br>';
    //$("#resultURL").append(str);
  }
}
