import message from "../fixtures/message.json";

describe("Shows a message only once", () => {
  it("shows the message only once", () => {
    cy.visit("/");
    cy.get("textarea").type(message.content);
    cy.get("button").click();
    cy.get('*[data-testid="messageId"]').then((messageEl) => {
      const messageId = messageEl.text();
      cy.visit(`/m/${messageId}`);
      cy.contains(message.content);
      cy.reload();
      cy.contains("message has already been read");
    });
  });
});
