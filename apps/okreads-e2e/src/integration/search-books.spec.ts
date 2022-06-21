describe('When: Use the search feature', () => {
  let countBefore;
  beforeEach(() => {
    cy.startAt('/');
    cy.get('tmo-total-count').then(($elem) => {
      countBefore = $elem.text();
      cy.log(countBefore, $elem.text())
    })
  });

  it('Then: I should be able to search books by title', () => {
    cy.get('input[type="search"]').type('javascript');

    cy.get('form').submit();

    cy.get('[data-testing="book-item"]').should('have.length.greaterThan', 1);
  });

  xit('Then: I should see search results as I am typing', () => {
    // TODO: Implement this test!
  });


  it('Then: I should undo addition of book to reading list', () => {
    cy.get('input[type="search"]').type('javascript');
    cy.get('form').submit();
    cy.get(':nth-child(1) > .book--content > .book--content--info > :nth-child(5) > .mat-focus-indicator').click();
    cy.get('.mat-simple-snackbar-action > .mat-focus-indicator').click();
    cy.get('tmo-total-count').should('contain.text', countBefore);
  });
});
