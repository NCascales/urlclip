import { Component, OnInit } from '@angular/core';
import { environment } from '@env/environment';
import { $ } from 'protractor';
import { finalize } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';
import { ShortenerService } from './shortener.service';

interface URLCards {
  hostname: string;
  long_url: string;
  short_url: string;
  created_at: number;
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
  //URLCard: any;
  URLCard: URLCards[] = [];

  constructor(private shortenerService: ShortenerService, private translateService: TranslateService) {}

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
          created_at: result.created_at,
        });
        this.inputURL = '';
      });
    } finally {
      this.isLoading = false;
    }
    console.log(url);
  }
}
