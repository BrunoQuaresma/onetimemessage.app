const message = require("../fixtures/message.json")

describe('Create a message', () => {
  it('creates a message', () => {
    cy.visit('/')
    cy.get("textarea").type(message.content)
    cy.get("button").click()
    cy.contains("The link for your message is")
  })
})