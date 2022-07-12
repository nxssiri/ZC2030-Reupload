// describe("Navigation", () => {
//   it("should navigate to add calculator page and create a calculator", () => {
//     // Redirect to addCalculator page
//     cy.visit("/admin/addCalculator");
//
//     // Find input and type testing
//     cy.get(`input[data-testid="nameInput"]`).type("Testing");
//
//     // Press button
//     cy.get("button.Calculator_button__JEwS9.btn.btn-secondary.btn-lg").click(); // Click on button
//
//     // Press button
//     cy.get(
//       "button#button-addon2.Calculator_buttonAdd__XjB51.btn.btn-outline-secondary.btn-md"
//     ).click();
//
//     // Find category and type value
//     cy.get("input#category-name.form-control.form-control-lg").type(
//       "Category 1"
//     );
//
//     // Press button
//     cy.get(
//       "button#button-addon2.Calculator_buttonAdd__XjB51.btn.btn-outline-secondary.btn-md"
//     ).click();
//
//     // Find input and type values
//     cy.get(`input#input-1.form-control`).type("value");
//     cy.get(`input#input-2.form-control`).type(2);
//     cy.get(`input#input-3.form-control`).type("unit");
//
//     // Press button
//     cy.get("button.Calculator_button__JEwS9.btn.btn-secondary.btn-lg").click();
//
//     // Press button
//     cy.get("button.Calculator_button__JEwS9.btn.btn-secondary.btn-lg").click();
//
//     // Press confirmation button
//     cy.get("button.btn.btn-success").click();
//   });
// });
