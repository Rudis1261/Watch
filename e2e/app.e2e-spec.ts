import { WatchPage } from './app.po';

describe('watch App', function() {
  let page: WatchPage;

  beforeEach(() => {
    page = new WatchPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
