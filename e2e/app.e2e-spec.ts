import { NewSheferClientPage } from './app.po';

describe('new-shefer-client App', function() {
  let page: NewSheferClientPage;

  beforeEach(() => {
    page = new NewSheferClientPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
