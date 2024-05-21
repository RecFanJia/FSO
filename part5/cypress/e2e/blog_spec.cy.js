describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')

    // Create a new user
    const user = {
      name: 'FanJia',
      username: 'RecFanJia',
      password: '2301335'
    }
    cy.request('POST', 'http://localhost:3001/api/users/', user)
  
    // Visit the application
    cy.visit('http://localhost:5173')
  })

  it('5.17 Login form is shown', function() {
    // Check if the login form is visible
    cy.contains('login').click()
    cy.get('input[name="Username"]').should('be.visible')
    cy.get('input[name="Password"]').should('be.visible')
    cy.get('#login-button').should('be.visible')
  })

  describe('Login', function() {
    it('5.18a succeeds with correct credentials', function() {
      cy.contains('login').click()
      cy.get('input[name="Username"]').type('RecFanJia')
      cy.get('input[name="Password"]').type('2301335')
      cy.get('#login-button').click()
      // Verify correct login
      cy.get('.notification')
        .should('be.visible')
        .and('contain', 'Welcome FanJia')
      cy.contains('FanJia logged-in').should('be.visible')

      // Verify that the notification is green
      cy.get('.notification')
        .should('have.css', 'color', 'rgb(0, 128, 0)')
    })

    it('5.18b fails with wrong credentials', function() {
      cy.contains('login').click()
      cy.get('input[name="Username"]').type('RecFanJia')
      cy.get('input[name="Password"]').type('wrongnumber')
      cy.get('#login-button').click()
      // Verify failed login
      cy.get('.error')
        .should('be.visible')
        .and('contain', 'Wrong username or password')

      // Verify that the notification is red
      cy.get('.error')
        .should('have.css', 'color', 'rgb(255, 0, 0)')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() { 
      cy.login({ username: 'RecFanJia', password: '2301335' })
    })

    it('5.19 a new blog can be created', function() {
      // Ensure the "create new blog" button is visible and clickable
      cy.contains('create new blog').should('be.visible').click()
      
      // Fill the form for creating a new blog
      cy.get('input[name="Title"]').type('TestTitle')
      cy.get('input[name="Author"]').type('TestAuthor')
      cy.get('input[name="Url"]').type('TestUrl')
      
      // Submit the form
      cy.contains('create').click()
      
      // Verify the blog is created
      cy.contains('TestTitle').should('be.visible')
    })
  })
})
