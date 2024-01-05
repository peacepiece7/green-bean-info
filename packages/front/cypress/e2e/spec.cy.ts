describe('렌딩 페이지', () => {
  it('렌딩 페이지에 접속한다.', async () => {
    cy.visit('http://localhost:3000')

    cy.url().should('not.include', '/auth')

    cy.findAllByAltText('user profile').should('exist')
  })
})
