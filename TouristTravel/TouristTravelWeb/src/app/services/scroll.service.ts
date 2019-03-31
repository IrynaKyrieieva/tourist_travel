import { Injectable, HostListener } from '@angular/core';

import { ScrollToService, ScrollToConfigOptions } from '@nicky-lenaers/ngx-scroll-to';

@Injectable({
  providedIn: 'root'
})
export class ScrollService {
  constructor(private scrollToService: ScrollToService) { }

  public ScrollToOffsetOnly(id: string) {
    const menuHeight = document.getElementById('menu').offsetHeight;
    const config: ScrollToConfigOptions = {
      offset: -1 * menuHeight,
      target: id
    };
    this.scrollToService.scrollTo(config);
  }
}
