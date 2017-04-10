import { Injectable } from '@angular/core';

declare var document: any;
declare var hljs: any;

@Injectable()
export class BbcodesService {

	codes: Array<any>;
  entityMap: any;
  stopWords: any;
  indexMaxWords: Number;

  constructor() {
  	this.codes = [];

    this.indexMaxWords = Number(2);

    this.entityMap = {
      'php': 'phelepahnt',
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;',
      '/': '&#x2F;',
      '`': '&#x60;',
      '=': '&#x3D;',
    };

    this.stopWords = [
      'are', 'and', 'as', 'at', 'a', 'an', 'am',
      'be', 'by', 'but',
      'for',
      'has',
      'i', 'if', 'is', 'in', 'it', 'its',
      'my',
      'not',
      'or', 'on', 'of',
      'so',
      'to', 'the',
      'you',
      'we',
    ];

		// IMG
		this.codes.push({
			regex: /\[img\="?(.*?)"?\](.*?)\[\/img\]/g,
			type: 'image-width',
			replace: '<img src="$2" width="$1" />',
			simple: "$2",
      pre:'[img=500]',
      post: '[/img]',
      title: false,
      icon: 'images'
		});

		// IMG
		this.codes.push({
			regex: /\[img\](.*?)\[\/img\]/g,
			type: 'image',
			replace: '<img src="$1" />',
			simple: "$1",
      pre:'[img]',
      post: '[/img]',
      title: 'Img',
      icon: 'images'
		});

		// VIDEO
		this.codes.push({
			regex: /\[video\](.*?)\[\/video\]/g,
			type: 'video',
			replace: '<iframe class="bbcode video" width="420" height="315" src="$1" border="0" frame="0" style="border: none;"></iframe>',
			simple: "$1",
      pre:'[video]',
      post: '[/video]',
      title: 'Video',
      icon: 'video'
		});

		// VIDEO
		this.codes.push({
			regex: /\[video\=(.+),(.+)\](.*?)\[\/video\]/g,
			type: 'video-width',
			replace: '<iframe class="bbcode video" width="$1" height="$2" src="$3" border="0" frame="0" style="border: none;"></iframe>',
			simple: "$3",
      pre:'[video=500,350]',
      post: '[/video]',
      title: false,
      icon: 'video'
		});

		// URL
		this.codes.push({
			regex: /\[url\="?(.*?)"?\](.*?)\[\/url\]/g,
			type: 'named-url',
			replace: "<a href=\"$1\" target=\"_blank\">$2</a>",
			simple: "$1",
      pre:'[url=]',
      post: '[/url]',
      title: false,
      icon: 'link'
		});

    // URL
    this.codes.push({
      regex: /\[url\](.*?)\[\/url\]/g,
      type: 'url',
      replace: "<a href=\"$1\" target=\"_blank\">$1</a>",
      simple: "$1",
      pre:'[url]',
      post: '[/url]',
      title: 'Url',
      icon: 'link'
    });

		// HEADING
		this.codes.push({
			regex: /\[h1\](.*?)\[\/h1\]/g,
			type: 'header-1',
			replace: '<h3>$1</h3>',
			simple: "$1",
      pre:'[h1]',
      post: '[/h1]',
      title: 'H1',
      icon: 'header'
		});

		// HEADING
		this.codes.push({
			regex: /\[h2\](.*?)\[\/h2\]/g,
			type: 'header-2',
			replace: '<h4>$1</h4>',
			simple: "$1",
      pre:'[h2]',
      post: '[/h2]',
      title: 'H2',
      icon: 'header-2'
		});

		// BOLD
		this.codes.push({
			regex: /\[b\](.*?)\[\/b\]/g,
			type: 'bold',
			replace: '<b>$1</b>',
			simple: "$1",
      pre:'[b]',
      post: '[/b]',
      title: 'B',
      icon: 'bold'
		});

		// ITALIC
		this.codes.push({
			regex: /\[i\](.*?)\[\/i\]/g,
			type: 'italic',
			replace: '<i>$1</i>',
			simple: "$1",
      pre:'[i]',
      post: '[/i]',
      title: 'I',
      icon: 'italic'
		});

		// UNDERLINE
		this.codes.push({
			regex: /\[u\](.*?)\[\/u\]/g,
			type: 'underline',
			replace: '<u>$1</u>',
			simple: "$1",
      pre:'[u]',
      post: '[/u]',
      title: 'U',
      icon: 'underline'
		});

    // CODE
    this.codes.push({
      regex: /\[code\]([\s\S]+?)\[\/code\]/gm,
      type: 'code',
      replace: '<pre><code class="html">$1</code></pre>',
      simple: "$1",
      pre:'[code]',
      post: '[/code]',
      title: false,
      icon: 'code'
    });

		// CODE
		this.codes.push({
			regex: /\[code\="?(.*?)"?\]([\s\S]+?)\[\/code\]/gm,
			type: 'code2',
      replace: '<pre><code class="$1">$2</code></pre>',
			simple: "$2",
      pre:'[code=html]',
      post: '[/code]',
      title: 'Code2',
      icon: 'code'
		});

		// LEFT
		this.codes.push({
			regex: /\[left\](.*?)\[\/left\]/gm,
			type: 'left',
			replace: '<div class="pull-left">$1</div>',
			simple: "$1",
      pre:'[left]',
      post: '[/left]',
      title: 'Left',
      icon: 'align-left'
		});

		// RIGHT
		this.codes.push({
			regex: /\[right\](.*?)\[\/right\]/gm,
			type: 'right',
			replace: '<div class="pull-right">$1</div>',
			simple: "$1",
      pre:'[right]',
      post: '[/right]',
      title: 'Right',
      icon: 'align-right'
		});

		// CLEARFIX
		this.codes.push({
			regex: /\[clearfix\]/gm,
			type: 'cleafix',
			replace: '<div class="clearfix"></div>',
			simple: "$1",
      pre:'[clearfix]',
      post: '',
      title: 'Clearfix',
      icon: 'magic'
		});

		// List
		this.codes.push({
			regex: /\*\*\*(.*)/g,
			type: 'list',
			replace: '<ul class="bbcode"><li>$1</li></ul>',
			simple: "$1",
      pre:'*** ',
      post: '',
      title: 'Bullet',
      icon: 'list'
		});
  }

  getBBcodes() {
  	return this.codes;
  }

  stripHtmlTags(html) {
    if (!html) {
      return html;
    }
    var tmp = document.createElement("DIV");
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || "";
  }

  clean(string) {
    if (!string) {
      return string;
    }
   
    return String(string).replace(/\r?\n|\r/g, " ") // Remove new lines
                         .replace(/[^\w\s]+/gi, "") // Remove and non-alpha numerics
                         .replace(/\s\s+/g,  " ")   // Remove multiple space, by replacing with them with 1 space
                         .toLowerCase();            // Lower case it 
  }

  process(value) {
    this.codes.forEach((code, key) => {
      if (code.type == 'code' || code.type == 'code2') {
        var matches;
        while ((matches = code.regex.exec(value)) != null) {
          let seed = (code.type == 'code') ? matches[1]: matches[2];
          value = value.replace(seed, this.escapeHtml(seed));
        }
      }
      value = value.replace(code.regex, code.replace);
    });
    return value;
  }

  escapeHtml(string) {
    var that = this;
    return String(string).replace(/[&<>"'`=\/]/g, function(s) {
      return that.entityMap[s];
    });
  }

  highlight() {
    document.querySelectorAll('pre').forEach((block) => {
      hljs.highlightBlock(block);
    });
  }

  indexContent(string, structure, key) {
    if (!string) {
      return string;
    }

    // Clean all the things, make it lowercase text
    let processed = this.process(string);
    let stripped = this.stripHtmlTags(processed);
    let cleaned = this.clean(stripped);
    let words = cleaned.split(" ");   

    // Get rid of those pesky stop words
    words = words.filter(array => {
      if (this.stopWords.indexOf(array) == -1) { 
        return array; 
      }
    });

    if (!key) {
      let key = true;
    }

    if (!structure) {
      let structure = {};
    }

    // Build up the plain text indexes, grouping them by a maximum of 3 words at a time
    let complete = "";
    words.forEach((word) => {
      let part = "";
      word.split("").forEach((letter) => {
        complete += letter;
        part += letter;

        structure = this.fill(structure, part, key);
        structure = this.fill(structure, complete, key);
      });

      // Keep the last X words grouped
      let wordCount = complete.split(" ");
      if (wordCount.length && wordCount.length >= this.indexMaxWords) {
        wordCount.shift();
        complete = wordCount.join(" ");
        structure = this.fill(structure, complete, key);
      }

      complete += " ";
    });

    return structure;
  }

  fill(array, key, value) {
    if (!array || !array[key]) {
      array[key] = [value];
    } 

    if (array && array[key] && array[key].indexOf(value) == -1) {
      array[key].push(value);
    }

    return array;
  }
}
