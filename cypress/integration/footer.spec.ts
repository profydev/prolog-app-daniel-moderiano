// Importing directly from package.json should be safe as we are in a testing env not a client side prod env.
import { version } from "package.json";

describe("Footer", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/dashboard");
  });

  it("contains correct links", () => {
    // check that each link a) is present and b) contains the correct href.
    // do not click the links as these pages do not yet exist, and doing so will remove the footer
    cy.get("footer").contains("Docs").should("have.attr", "href", "/docs");
    cy.get("footer").contains("API").should("have.attr", "href", "/api");
    cy.get("footer").contains("Help").should("have.attr", "href", "/help");
    cy.get("footer")
      .contains("Community")
      .should("have.attr", "href", "/community");
  });

  it("shows current version", () => {
    cy.get("footer").contains(`${version}`);
  });
});
