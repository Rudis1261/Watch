import { Pipe, PipeTransform } from '@angular/core';
import { BbcodesService} from './bbcodes.service';

@Pipe({
  name: 'bbcodeStrip'
})
export class BbcodeStripPipe implements PipeTransform {

	codes: Array<any>;
	constructor(private BBS: BbcodesService) {
		this.codes = this.BBS.getBBcodes();
	}

  transform(value: any, args?: any): any {
  	this.codes.forEach((code, key) => {
			value = value.replace(code.regex, code.simple);
		});
    return value;
  }
}
