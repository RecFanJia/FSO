describe('blog app', function() {
    beforeEach(function() {
      cy.request('POST', 'http://localhost:3001/api/testing/reset')
      cy.visit('http://localhost:5173')
    })
    it('Login form is shown', function() {
      // Check if the login form is visible
      cy.contains('login').click()
      cy.get('input[name="Username"]').should('be.visible')
      cy.get('input[name="Password"]').should('be.visible')
      cy.get('#login-button').should('be.visible')
    })
  })
  //beforeEach(function() {
  //  cy.request('POST', 'http://localhost:3001/api/testing/reset')
  //  const user = {
  //    name: 'FanJia',
  //    username: 'RecFanJia',
  //    password: '2301335'
  //  }
  //  cy.request('POST', 'http://localhost:3001/api/users/', user)
  //  cy.visit('http://localhost:5173')
  //})
//
//
  //it('user can log in', function() {
  //  cy.visit('http://localhost:5173')
  //  cy.contains('login').click()
  //  cy.get('input[name="Username"]').type('RecFanJia')
  //  cy.get('input[name="Password"]').type('2301335')
  //  cy.get('#login-button').click()
//
  //  cy.contains('FanJia logged-in')
  //})
//
  //describe('when logged in', function() {
  //  beforeEach(function() {
  //    cy.visit('http://localhost:5173')
  //    cy.contains('login').click()
  //    cy.get('input[name="Username"]').type('RecFanJia')
  //    cy.get('input[name="Password"]').type('2301335')
  //    cy.get('#login-button').click()
  //  })
  //
  //  it('a new blog can be created', function() {
  //    cy.contains('create new blog').click()
  //    cy.get('input[name="Title"]').type('TestBlog')
  //    cy.get('input[name="Author"]').type('cypress')
  //    cy.get('input[name="Url"]').type('cypress.io')
  //    cy.contains('create').click()
  //    cy.contains('A new blog "TestBlog" by cypress added')
  //  })
  //}) 


