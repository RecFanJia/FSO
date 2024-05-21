describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')

    // Create users
    const user1 = {
      name: 'FanJia',
      username: 'RecFanJia',
      password: '2301335'
    }
    const user2 = {
      name: 'LiShuo',
      username: 'RecLishuo',
      password: '2301335'
    }
    cy.request('POST', 'http://localhost:3001/api/users/', user1)
    cy.request('POST', 'http://localhost:3001/api/users/', user2)

    // Login as RecFanJia and create a blog
    cy.request('POST', 'http://localhost:3001/api/login', {
      username: 'RecFanJia',
      password: '2301335'
    }).then(({ body }) => {
      cy.request({
        method: 'POST',
        url: 'http://localhost:3001/api/blogs',
        body: {
          url: 'recfanjia.io',
          title: 'FanJia Blog',
          author: 'FanJia',
          likes: 0
        },
        headers: {
          'Authorization': `Bearer ${body.token}`
        }
      })
    })

    // Login as RecLishuo and create a blog
    cy.request('POST', 'http://localhost:3001/api/login', {
      username: 'RecLishuo',
      password: '2301335'
    }).then(({ body }) => {
      cy.request({
        method: 'POST',
        url: 'http://localhost:3001/api/blogs',
        body: {
          url: 'reclishuo.io',
          title: 'LiShuo Blog',
          author: 'LiShuo',
          likes: 0
        },
        headers: {
          'Authorization': `Bearer ${body.token}`
        }
      })
    })

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

    it('5.20 a blog can be liked (no matter who logged in)', function() {
      // Find the blog created by RecLishuo
      cy.contains('LiShuo Blog').parent().find('button').contains('view').click()
      
      // likes should be 0
      cy.contains('0 likes').should('be.visible')
      
      // click like button, likes should be 1
      cy.contains('like').click()
      cy.contains('1 likes').should('be.visible')
    })

    it('5.21a a blog can be deleted by creator', function() {
      // Find the blog created by RecFanJia
      cy.contains('FanJia Blog').parent().find('button').contains('view').click()
      
      // Click delete and delete successfully
      cy.contains('delete').click()
      
      // Verify the blog is deleted
      cy.contains('FanJia Blog').should('not.exist')
    })

    it('5.21b a blog cant be deleted by other users)', function() {
      // Find the blog created by RecLishuo
      cy.contains('LiShuo Blog').parent().find('button').contains('view').click()
      
      // Click delete
      cy.contains('delete').click()
      
      // Verify the blog is not deleted
      cy.contains('LiShuo Blog').should('be.visible')
    })
  })
})
