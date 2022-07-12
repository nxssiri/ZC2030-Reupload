// test/pages/index.test.js

import React from "react";
// Using render and screen from test-utils.js instead of
// @testing-library/react
import { render } from "../test-utils";
// import Home from "../../pages/index";

/**
 * @jest-environment jsdom
 */

test("use jsdom in this test file", () => {
  const element = document.createElement("div");
  expect(element).not.toBeNull();
});

// test("should render the heading", () => {
//     render(<Home />);
// });
//
// describe("Home", () => {
//   it("should render the heading", () => {
//     render(<Home/>);
//
//     const heading = screen.getByText(/Welcome/i);
//
//     // we can only use toBeInTheDocument because it was imported
//     // in the jest.setup.js and configured in jest.config.js
//     expect(heading).toBeInTheDocument();
//   });

// });
