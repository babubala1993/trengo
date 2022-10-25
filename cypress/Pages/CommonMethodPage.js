export class CommonMethodPage {
    waitForPageLoad(){
        cy.get('.main-nav-desktop-placeholder').should('be.visible')
    }
}
