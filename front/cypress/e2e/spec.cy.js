describe('template spec', () => {
    it('passes', () => {
        cy.intercept("GET", "**/*", req => {
            req.on("response", res => {
                // Loguer les en-têtes Set-Cookie
                const setCookieHeader = res.headers["set-cookie"]
                if (setCookieHeader) {
                    console.log("COOKIIIIIIIES Set-Cookie:", setCookieHeader)
                }
            })
        })

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



1