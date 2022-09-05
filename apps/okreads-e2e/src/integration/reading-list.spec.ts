import { format } from 'date-fns';

describe('When: I use the reading list feature', () => {
  let countBefore = 0;
  beforeEach(() => {
    cy.startAt('/');
    cy.get('tmo-total-count').then(($elem) => {
      countBefore = Number($elem.text());
      cy.log(countBefore.toString(), $elem.text());
    })
  });

  it("Then: I should be able to clear the reading list and add a book to empty reading list", () => {
    cy.get('tmo-total-count').then(($elem) => {
      countBefore = Number($elem.text());
      cy.log(countBefore.toString(), $elem.text());
    })
    if( countBefore > 0){
      cy.get('[data-testing="toggle-reading-list"]').click();
      for (let i = Number(countBefore); i>0; i--){
        if(Cypress.$('[data-testid=remove-book-from-reading-list]').length > 0 ){
          cy.get('[data-testid=remove-book-from-reading-list]').first().click();
        }
      }
      cy.get('[data-testid=reading-list-close-button]').click();
    }

    cy.get('input[type="search"]').type('javascript');
    cy.get('form').submit();
    cy.get(':nth-child(1) > .book--content > .book--content--info > :nth-child(5) > .mat-focus-indicator').click();
    cy.get('[data-testing="book-item"]').should('have.length.greaterThan', 1);
    cy.get('tmo-total-count').should('contain.text', 1);
  })

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
    let date = format(new Date(), 'MMM DD, YYYY');
    let regex = " 0";
    date = date.replace(regex, ' ');
    cy.log(date);
    cy.get('em').should('contain.text', 'Finished: ' +  date);
    
  });

  it('Then: Remove the book mark as read from reading list', () => {

    cy.get('[data-testing="toggle-reading-list"]').click();
    if(Cypress.$('[data-testid=remove-book-from-reading-list]').length > 0) {
      cy.get('[data-testid=remove-book-from-reading-list]').click();
    }
    cy.get('tmo-total-count').then(($elem) => {
      countBefore = Number($elem.text());
      cy.log(countBefore.toString(), $elem.text());
    });
    cy.get('tmo-total-count').should('contain.text', '');

  })


});
