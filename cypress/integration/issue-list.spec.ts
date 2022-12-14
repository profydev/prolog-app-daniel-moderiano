import mockIssues1 from "../fixtures/issues-page-1.json";
import mockIssues2 from "../fixtures/issues-page-2.json";
import mockIssues3 from "../fixtures/issues-page-3.json";
import filteredIssuesStatus from "../fixtures/issues-filtered-status.json";
import filteredIssuesLevel from "../fixtures/issues-filtered-level.json";
import filteredIssuesProject from "../fixtures/issues-filtered-project.json";

describe("Issue List", () => {
  beforeEach(() => {
    // setup request mocks
    cy.intercept("GET", "https://prolog-api.profy.dev/project", {
      fixture: "projects.json",
    }).as("getProjects");
    cy.intercept("GET", "https://prolog-api.profy.dev/issue?page=1", {
      fixture: "issues-page-1.json",
    }).as("getIssues");
    cy.intercept("GET", "https://prolog-api.profy.dev/issue?page=2", {
      fixture: "issues-page-2.json",
    });
    cy.intercept("GET", "https://prolog-api.profy.dev/issue?page=3", {
      fixture: "issues-page-3.json",
    });
    cy.intercept(
      "GET",
      "https://prolog-api.profy.dev/issue?page=1&status=resolved",
      {
        fixture: "issues-filtered-status.json",
      }
    ).as("getFilteredByStatus");
    cy.intercept(
      "GET",
      "https://prolog-api.profy.dev/issue?page=1&level=error",
      {
        fixture: "issues-filtered-level.json",
      }
    ).as("getFilteredByLevel");
    cy.intercept(
      "GET",
      "https://prolog-api.profy.dev/issue?page=1&project=backend",
      {
        fixture: "issues-filtered-project.json",
      }
    ).as("getFilteredByProject");

    // open issues page
    cy.visit(`http://localhost:3000/dashboard/issues`);

    // wait for request to resolve
    cy.wait("@getProjects");
    cy.wait("@getIssues");

    // set button aliases
    cy.get("button", { timeout: 10000 }).contains("Previous").as("prev-button");
    cy.get("button").contains("Next").as("next-button");
  });

  context("desktop resolution", () => {
    beforeEach(() => {
      cy.viewport(1025, 900);
    });

    it("renders the issues", () => {
      cy.get("main")
        .find("tbody")
        .find("tr")
        .each(($el, index) => {
          const issue = mockIssues1.items[index];
          const firstLineOfStackTrace = issue.stack.split("\n")[1].trim();
          cy.wrap($el).contains(issue.name);
          cy.wrap($el).contains(issue.message);
          cy.wrap($el).contains(issue.numEvents);
          cy.wrap($el).contains(issue.numUsers);
          cy.wrap($el).contains(firstLineOfStackTrace);
        });
    });

    it("paginates the data", () => {
      // test first page
      cy.contains("Page 1 of 3");
      cy.get("@prev-button").should("have.attr", "disabled");

      // test navigation to second page
      cy.get("@next-button").click();
      cy.get("@prev-button").should("not.have.attr", "disabled");
      cy.contains("Page 2 of 3");
      cy.get("tbody tr:first").contains(mockIssues2.items[0].message);

      // test navigation to third and last page
      cy.get("@next-button").click();
      cy.get("@next-button").should("have.attr", "disabled");
      cy.contains("Page 3 of 3");
      cy.get("tbody tr:first").contains(mockIssues3.items[0].message);

      // test navigation back to second page
      cy.get("@prev-button").click();
      cy.get("@next-button").should("not.have.attr", "disabled");
      cy.contains("Page 2 of 3");
      cy.get("tbody tr:first").contains(mockIssues2.items[0].message);
    });

    it("persists page after reload", () => {
      cy.get("@next-button").click();
      cy.contains("Page 2 of 3");

      cy.reload();
      cy.contains("Page 2 of 3");
    });

    it("filters the issues by status", () => {
      cy.get("main").contains("Status").click();
      // Filter by status = resolved
      cy.get("[id$=option-0]").click();

      // Check the URL query params have been constructed correctly
      cy.url().should(
        "eq",
        "http://localhost:3000/dashboard/issues?status=resolved"
      );

      // Wait for the specific filtered request to resolve
      cy.wait("@getFilteredByStatus");

      cy.get("main")
        .find("tbody")
        .find("tr")
        .each(($el, index) => {
          const issue = filteredIssuesStatus.items[index];
          const firstLineOfStackTrace = issue.stack.split("\n")[1].trim();
          cy.wrap($el).contains(issue.name);
          cy.wrap($el).contains(issue.message);
          cy.wrap($el).contains(issue.numEvents);
          cy.wrap($el).contains(issue.numUsers);
          cy.wrap($el).contains(firstLineOfStackTrace);
        });
    });

    it("filters the issues by level", () => {
      cy.get("main").contains("Level").click();
      // Filter by level = error
      cy.get("[id$=option-2]").click();

      cy.url().should(
        "eq",
        "http://localhost:3000/dashboard/issues?level=error"
      );

      cy.wait("@getFilteredByLevel");

      cy.get("main")
        .find("tbody")
        .find("tr")
        .each(($el, index) => {
          const issue = filteredIssuesLevel.items[index];
          const firstLineOfStackTrace = issue.stack.split("\n")[1].trim();
          cy.wrap($el).contains(issue.name);
          cy.wrap($el).contains(issue.message);
          cy.wrap($el).contains(issue.numEvents);
          cy.wrap($el).contains(issue.numUsers);
          cy.wrap($el).contains(firstLineOfStackTrace);
        });
    });

    it("filters the issues by project name", () => {
      // Filter by project = "backend"
      cy.get("[data-cy='projectInput']").type("backend");

      // Wait for 1000 ms input debounce
      cy.wait(1100);

      cy.url().should(
        "eq",
        "http://localhost:3000/dashboard/issues?project=backend"
      );

      cy.wait("@getFilteredByProject");

      cy.get("main")
        .find("tbody")
        .find("tr")
        .each(($el, index) => {
          const issue = filteredIssuesProject.items[index];
          const firstLineOfStackTrace = issue.stack.split("\n")[1].trim();
          cy.wrap($el).contains(issue.name);
          cy.wrap($el).contains(issue.message);
          cy.wrap($el).contains(issue.numEvents);
          cy.wrap($el).contains(issue.numUsers);
          cy.wrap($el).contains(firstLineOfStackTrace);
        });
    });
  });
});
