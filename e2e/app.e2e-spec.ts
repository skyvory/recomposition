import { RecompositionPage } from './app.po';

describe('recomposition App', function() {
  let page: RecompositionPage;

  beforeEach(() => {
    page = new RecompositionPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
