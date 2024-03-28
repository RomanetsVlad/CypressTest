$testwebsite = 'https://www.demoblaze.com/index.html'
describe('Tets cases for Sign UP', () => {
    it('Sign up with wrong PASS', () => {
        cy.visit($testwebsite)
        cy.containes('Cart').click()
        //expect(true).to.equal(true)
    })
    it('Sign up with valid cred', () => {
        cy.visit($testwebsite)
        cy.containes('Cart').click()
        //expect(true).to.equal(true)
    })
})