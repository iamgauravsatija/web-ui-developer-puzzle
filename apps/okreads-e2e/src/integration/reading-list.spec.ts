describe('When: I use the reading list feature', () => {
  const dayjs = require('dayjs')

  beforeEach(() => {
    cy.startAt('/');
  });

  it('Then: I should see my reading list', () => {
    cy.get('[data-testing="toggle-reading-list"]').click();

    cy.get('[data-testing="reading-list-container"]').should(
      'contain.text',
      'My Reading List'
    );
  });
  
  it('Then: Mark book as read', () => {
    
    cy.get('[data-cy="reading-list-item--read-checkbox"]').click();
    cy.get('[data-cy="reading-list-item--read-checkbox"] input').should('be.checked');
    
    cy.log(dayjs().format('MMM DD, YYYY'))
    cy.get('em').should('contain.text', 'Finished: ' +  dayjs().format('MMM DD, YYYY'));

    
  });

});
