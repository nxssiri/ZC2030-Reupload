describe("Navigation", () => {
  it("should navigate to the admin page", () => {
    // Start from the index page
    cy.visit("admin/adminDashboard");

    // The new page should contain an h1 with "Admin management"
    cy.get("h1").contains("Admin Management");

    // The new page should contain an h1 with "User Management"
    cy.get("h1").contains("User Management");
  });
});
