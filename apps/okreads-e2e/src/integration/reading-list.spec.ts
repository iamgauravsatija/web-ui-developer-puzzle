describe('When: I use the reading list feature', () => {
  let countBefore;
  beforeEach(() => {
    cy.startAt('/');
    cy.get('tmo-total-count').then(($elem) => {
      countBefore = $elem.text();
      cy.log(countBefore, $elem.text())
    })
    if( Number(countBefore) < 1){
      cy.get('input[type="search"]').type('javascript');
      cy.get('form').submit();
      cy.get(':nth-child(1) > .book--content > .book--content--info > :nth-child(5) > .mat-focus-indicator').click();
      cy.get('tmo-total-count').then(($elem) => {
        countBefore = $elem.text();
        cy.log(countBefore, $elem.text())
      })
    }
  });

  it('Then: I should see my reading list', () => {
    cy.get('[data-testing="toggle-reading-list"]').click();

    cy.get('[data-testing="reading-list-container"]').should(
      'contain.text',
      'My Reading List'
    );
  });

  it('Then: I should undo removal of book to reading list', () => {
    cy.get('[data-testing="toggle-reading-list"]').click();
    cy.get(':nth-child(1) > :nth-child(3) > .mat-focus-indicator').click();
    cy.get('.mat-simple-snackbar-action > .mat-focus-indicator').last().click();
    cy.get('h2 > .mat-focus-indicator').click();
    cy.get('tmo-total-count').should('contain.text', countBefore);
  });
});
