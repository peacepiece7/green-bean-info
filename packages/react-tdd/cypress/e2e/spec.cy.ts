describe('My First Test', () => {
  beforeEach(() => {
    cy.intercept('GET', /(mostPopular)/g, {
      fixture: 'popular.json',
    })
    cy.intercept('GET', /(search)/g, {
      fixture: 'search.json',
    })
    cy.viewport(1200, 800)
    cy.visit('/')
  })

  it('renders', () => {
    cy.findByText('Youtube').should('exist')
  })

  it('shows popular video first', () => {
    cy.findByText('Popular Video').should('exist')
  })

  it('shows popular video first', () => {
    cy.findByPlaceholderText('Search...').type('bts')
    cy.findByRole('button').click()
    cy.findByText('Search Result1').should('exist')
  })

  it('goes to detail page', () => {
    cy.findAllByRole('listitem').first().click()
    cy.findByText('Popular Video').should('exist')
    cy.findByText('Search Result1').should('exist')
  })
})
