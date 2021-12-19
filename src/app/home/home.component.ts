import { Component, OnInit } from '@angular/core';
import { environment } from '@env/environment';
import { $ } from 'protractor';
import { finalize } from 'rxjs/operators';

import { ShortenerService } from './shortener.service';

interface URLCard {
  hostname: string;
  long_url: string;
  short_url: string;
  created_At: number;
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
  }

  showURL(url: string) {
    this.isLoading = true;
    try {
      //llamada de servicio
      this.shortenerService.postURL(url).subscribe((result: any) => {
        this.isLoading = false;
        console.log(result);
        this.URLCard.push({
          hostname: result.url.match(
            /^((http[s]?|ftp):\/)?\/?([^:\/\s]+)((\/\w+)*\/)([\w\-\.]+[^#?\s]+)(.*)?(#[\w\-]+)?$/
          )[3],
          long_url: result.url,
          short_url: environment.serverUrl + '/' + result.code,
          //created_at:new Date(result.created_at).toUTCString()
          created_at: result.created_at,
        });
        //this.toastSuccess();
        this.inputURL = '';
      });
    } finally {
      this.isLoading = false;
      //this.toastFails();
    }
    console.log(url);
    var newURL = '<ion-label color="primary">' + url + '</ion-label><br>';
    //$("#resultURL").append(str);
  }
}
