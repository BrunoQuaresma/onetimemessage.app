import message from "../fixtures/message.json";

describe("Shows a message only once", () => {
  it("shows the message only once", () => {
    cy.visit("/");
    cy.get('textarea[name="message"]').type(message.content);
    cy.get("button").click();
    cy.get('*[data-testid="link"]').then((linkEl) => {
      const messageLink = linkEl.text();
      cy.visit(messageLink);
      cy.contains(message.content);
      cy.reload();
      cy.contains("message has already been read");
    });
  });
});
