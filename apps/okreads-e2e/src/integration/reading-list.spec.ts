describe('When: I use the reading list feature', () => {
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

  /*
  - Then: Mark book as read
    - click on "Want to Read"
    - To do: checkbox click mark as read
    - Assert: check if button is checked and disabled
    - Assert: check if date is current date
    - close the reading list
    - check if want to read has changed to "Finished" and disabled

    Find a way to get size of reading list
  */
  
  it('Then: Mark book as read', () => {

    cy.get(':nth-child(1) > .reading-list-item--checkbox-section').click();

    
  });

});
