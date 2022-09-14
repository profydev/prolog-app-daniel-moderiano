import mockProjects from "../fixtures/projects.json";

describe("Project List", () => {
  beforeEach(() => {
    // setup request mock
    cy.intercept("GET", "https://prolog-api.profy.dev/project", {
      fixture: "projects.json",
    }).as("getProjects");

    // open projects page
    cy.visit("http://localhost:3000/dashboard");

    // wait for request to resolve
    cy.wait("@getProjects");
  });

  context("desktop resolution", () => {
    beforeEach(() => {
      cy.viewport(1025, 900);
    });

    it("renders the projects", () => {
      const languageNames = ["React", "Node.js", "Python"];
      const statusNames = ["Critical", "Warning", "Stable"];

      // get all project cards
      cy.get("main")
        .find("li")
        .each(($el, index) => {
          // check that project data is rendered
          cy.wrap($el).contains(mockProjects[index].name);
          cy.wrap($el).contains(languageNames[index]);
          cy.wrap($el).contains(mockProjects[index].numIssues);
          cy.wrap($el).contains(mockProjects[index].numEvents24h);
          cy.wrap($el).contains(statusNames[index]);
          cy.wrap($el)
            .find("a")
            .should("have.attr", "href", "/dashboard/issues");
        });
    });
  });
});

describe("Project page loading spinner", () => {
  it("shows the loading spinner while loading projects and then hide it once loaded", () => {
    // setup request mock
    cy.intercept("GET", "https://prolog-api.profy.dev/project", {
      fixture: "projects.json",
      delay: 1000,
    }).as("getProjects");

    // open projects page
    cy.visit("http://localhost:3000/dashboard");

    // check spinner is present during loading state
    cy.get("[data-cy='spinner']").should("be.visible");

    // wait for request to resolve
    cy.wait("@getProjects");

    // check spinner has disappeared once data has loaded
    cy.get("[data-cy='spinner']").should("not.exist");
  });
});

describe("Project error page", () => {
  it("shows the error message on failed request", () => {
    // setup request mock to deliver a server error
    cy.intercept("GET", "https://prolog-api.profy.dev/project", {
      forceNetworkError: true,
    }).as("getServerFailure");

    // open projects page
    cy.visit("http://localhost:3000/dashboard");

    // check error message is now visible
    cy.get("main")
      // Timeout must be manually increased to allow for React Query retries
      .contains(/there was a problem/i, { timeout: 10000 })
      .should("exist");
  });

  it("retries request when clicking 'Try Again' button, and hides error page on successful request", () => {
    // setup request mock to deliver a server error
    cy.intercept("GET", "https://prolog-api.profy.dev/project", {
      forceNetworkError: true,
    }).as("getServerFailure");

    // open projects page
    cy.visit("http://localhost:3000/dashboard");

    // Wait for error msg to click retry button
    cy.get("main")
      // Timeout must be manually increased to allow for React Query retries
      .contains(/try again/i, { timeout: 10000 })
      .click();

    // Re-intercept but this time return succesful response
    cy.intercept("GET", "https://prolog-api.profy.dev/project", {
      fixture: "projects.json",
    }).as("getProjects");

    // wait for request to resolve
    cy.wait("@getProjects");

    // check error message has disappeared
    cy.get("main")
      .contains(/there was a problem/i)
      .should("not.exist");

    // check that projects now exist in the DOM
    cy.get("[data-cy='projectList']").should("exist");
  });
});
