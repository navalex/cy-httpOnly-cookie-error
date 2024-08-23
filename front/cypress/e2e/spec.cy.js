describe('template spec', () => {
  it('passes', () => {
    cy.visit("")

    // click button inside #cookieCreate div
    cy.get('#cookieCreate button').click()

    // wait for the response
    cy.get('#cookieCreate code').should('be.visible')

    // click button inside #cookieCheck div
    cy.get('#cookieCheck button').click()

    // wait for the response
    cy.get('#cookieCheck code').should('be.visible')
  })
})