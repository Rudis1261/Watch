import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer} from '@angular/platform-browser';
import { BbcodesService} from './bbcodes.service';

@Pipe({
  name: 'bbcode'
})
export class BbcodePipe implements PipeTransform {

	codes: Array<any>;
	constructor(private sanitizer: DomSanitizer, private BBS: BbcodesService) {
		this.codes = this.BBS.getBBcodes();
	}

  transform(value: any, args?: any): any {
    value = this.BBS.process(value);
    return this.sanitizer.bypassSecurityTrustHtml(value);
  }
}
