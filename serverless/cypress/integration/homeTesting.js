describe("Homepage Navigation", () => {
  it("should find calculator and category headings", () => {
    // Start from the index page
    cy.visit("/");

    // The new page should contain an h1 with the heading from the page
    cy.get("h1").contains("Are you carbon neutral?");
  });
});

describe("Homepage content", () => {
  it("should find calculator and category headings", () => {
    // Start from the index page
    cy.visit("/");

    // check the page for expected content
    cy.get("p").contains("Carbon Neutrality is important..");
    cy.get("h1").contains("Newest Carbon Projects");
    cy.get("h1").contains("Meet the team");
  });
});

//navigate to the about us page
describe("Navigation to about us", () => {
  it("should navigate to the about page", () => {
    // Start from the index page
    cy.visit("/");

    cy.get("button.navbar-toggler.collapsed").click(); // Click on button
    // Find a link with an href attribute containing "about" and click it
    cy.get('a[href*="about"]').click();

    // The new url should include "/about"
    cy.url().should("include", "/about");
  });
});

describe("Homepage content", () => {
  it("should find calculator and category headings", () => {
    // Start from the index page
    cy.visit("/about");

    // The new page should contain an h1 with expected content
    cy.get("h1").contains("We're ZC30");
    cy.get("p").contains(
      "We at zero carbon 30 aim to get everyone's carbon use to 0"
    );
    cy.get("h1").contains("Meet the team");
  });
});
