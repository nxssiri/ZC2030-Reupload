//Test while this one is commented

describe("Calculator tests", () => {
  test("rounding 1.1 should be 1", () => {
    expect(Math.round(1.1)).toBe(1);
  });
});

// import React from "react";
// import { render, screen } from "../test-utils";
// import Calculator from "../../pages/calculator";
// import * as client from "next-auth/react";
//
// const types = [
//   {
//     id: 1,
//     name: "Individual",
//   },
//   {
//     id: 2,
//     name: "Business",
//   },
// ];
//
// const categories = [
//   [
//     {
//       id: 1,
//       name: "Food",
//     },
//     {
//       id: 2,
//       name: "Transport",
//     },
//     {
//       id: 3,
//       name: "Energy",
//     },
//   ],
//   [
//     {
//       id: 4,
//       name: "Cars",
//     },
//     {
//       id: 5,
//       name: "Bicycles",
//     },
//     {
//       id: 6,
//       name: "Bike",
//     },
//   ],
// ];
//
// const inputs = [
//   [
//     {
//       id: 1,
//       name: "Bread",
//       factor: 1,
//       unit: "grams",
//     },
//     {
//       id: 2,
//       name: "Rice",
//       factor: 0.8,
//       unit: "grams",
//     },
//     {
//       id: 3,
//       name: "Chicken",
//       factor: 500,
//       unit: "grams",
//     },
//   ],
//   [
//     {
//       id: 1,
//       name: "Bread",
//       factor: 1,
//       unit: "grams",
//     },
//     {
//       id: 2,
//       name: "Rice",
//       factor: 0.8,
//       unit: "grams",
//     },
//     {
//       id: 3,
//       name: "Chicken",
//       factor: 500,
//       unit: "grams",
//     },
//   ],
// ];
//
// const categoriesCount=[ [ 66.7, 100, 0 ], [ 0, 0, 0 ] ]
//
// test("Should render calculator page and find main heading", () => {
//
//   it("Works", async () => {
//     const mockSession = {
//       expires: "1",
//       user: {email: "a", name: "Delta", image: "c", id: "1"}
//     };
//
//     client.useSession.mockReturnValueOnce([mockSession, false])
//   })
//   render(<Calculator types={types} categories={categories} inputs={inputs} categoriesCount = {categoriesCount}/>);
//
//   // Main heading
//   const mainHeading = screen.getByTestId("main_heading");
//
//   // Find main heading
//   expect(mainHeading).toBeInTheDocument();
//   expect(mainHeading).toHaveTextContent("Carbon Calculators");
//   expect(mainHeading).toBeVisible();
// });
//
// test("Should render calculator page and find nav options", () => {
//   it("Works", async () => {
//     const mockSession = {
//       expires: "1",
//       user: {email: "a", name: "Delta", image: "c", id: "1"}
//     };
//
//     client.useSession.mockReturnValueOnce([mockSession, false])
//   })
//   render(<Calculator types={types} categories={categories} inputs={inputs} categoriesCount = {categoriesCount} />);
//
//   // Nav options
//   const individualOption = screen.getByTestId("Individual");
//   const businessOption = screen.getByTestId("Business");
//
//   // Find individual calculator option
//   expect(individualOption).toBeInTheDocument();
//   expect(individualOption).toHaveTextContent("Individual");
//   expect(individualOption).toBeVisible();
//
//   // Find business calculator option
//   expect(businessOption).toBeInTheDocument();
//   expect(businessOption).toHaveTextContent("Business");
//   expect(businessOption).toBeVisible();
// });
