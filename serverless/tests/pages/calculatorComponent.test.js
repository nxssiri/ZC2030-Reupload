import { render, screen } from "../test-utils";
import CarbonCalculator from "../../Components/calculators/CarbonCalculator";
import React from "react";
import ListOfCalculators from "../../Components/calculators/ListOfCalculators";

const types = [
  {
    id: 1,
    name: "Individual",
  },
  {
    id: 2,
    name: "Business",
  },
];

const categories = [
  [
    {
      id: 1,
      name: "Food",
    },
    {
      id: 2,
      name: "Transport",
    },
    {
      id: 3,
      name: "Energy",
    },
  ],
  [
    {
      id: 4,
      name: "Cars",
    },
    {
      id: 5,
      name: "Bicycles",
    },
    {
      id: 6,
      name: "Bike",
    },
  ],
];

const inputs = [
  [
    {
      id: 1,
      name: "Bread",
      factor: 1,
      unit: "grams",
    },
    {
      id: 2,
      name: "Rice",
      factor: 0.8,
      unit: "grams",
    },
    {
      id: 3,
      name: "Chicken",
      factor: 500,
      unit: "grams",
    },
  ],
  [
    {
      id: 1,
      name: "Bread",
      factor: 1,
      unit: "grams",
    },
    {
      id: 2,
      name: "Rice",
      factor: 0.8,
      unit: "grams",
    },
    {
      id: 3,
      name: "Chicken",
      factor: 500,
      unit: "grams",
    },
  ],
];

const data = [
  {
    id: "1",
    name: "Individual",
    category: ["Food", "Transport", "Energy"],
    results: [24, 56, 89],
  },
  {
    id: "2",
    name: "Business",
    category: ["Zoo", "Jungle", "Forest"],
    results: [1, 98, 32],
  },
  {
    id: "3",
    name: "Food",
    category: ["Football", "Rugby", "Basketball"],
    results: [10, 100, 33],
  },
  {
    id: "4",
    name: "Drinks",
    category: ["Water", "Vodka", "Sprite"],
    results: [95, 100, 100],
  },
  {
    id: "5",
    name: "University",
    category: ["Books", "Pencil", "Rubber"],
    results: [5, 89, 10],
  },
];

const categoriesCount = [
  [66.7, 100, 0],
  [0, 0, 0],
];

test("Should render CarbonCalculator component with [0] data and identifies category names", () => {
  render(
    <CarbonCalculator
      value={0}
      data={data}
      type={types[0]}
      category={categories[0]}
      input={inputs}
      results={0}
      categoriesCount={categoriesCount}
    />
  );

  const calculatorHeading = screen.getByTestId("calculator_heading");
  const category_1 = screen.getByTestId("category-0");
  const category_2 = screen.getByTestId("category-1");
  const category_3 = screen.getByTestId("category-2");

  // Identifies calculator heading, checks its content and is visible
  expect(calculatorHeading).toBeInTheDocument();
  expect(calculatorHeading).toHaveTextContent("Calculator");
  expect(calculatorHeading).toBeVisible();

  // Finds Category 1 name and is visible
  expect(category_1).toBeInTheDocument();
  expect(category_1).toHaveTextContent("Food");
  expect(category_1).toBeVisible();

  // Finds Category 1 name and is visible
  expect(category_2).toBeInTheDocument();
  expect(category_2).toHaveTextContent("Transport");
  expect(category_2).toBeVisible();

  // Finds Category 1 name and is visible
  expect(category_3).toBeInTheDocument();
  expect(category_3).toHaveTextContent("Energy");
  expect(category_3).toBeVisible();
});

test("Should render CarbonCalculator component with [4] data and identifies category names", () => {
  render(
    <CarbonCalculator
      value={0}
      data={data}
      type={types[1]}
      category={categories[1]}
      input={inputs}
      results={0}
      categoriesCount={categoriesCount}
    />
  );

  const calculatorHeading = screen.getByTestId("calculator_heading");
  const category_1 = screen.getByTestId("category-0");
  const category_2 = screen.getByTestId("category-1");
  const category_3 = screen.getByTestId("category-2");

  // Identifies calculator heading, checks its content and is visible
  expect(calculatorHeading).toBeInTheDocument();
  expect(calculatorHeading).toHaveTextContent("Calculator");
  expect(calculatorHeading).toBeVisible();

  // Finds Category 1 name and is visible
  expect(category_1).toBeInTheDocument();
  expect(category_1).toHaveTextContent("Cars");
  expect(category_1).toBeVisible();

  // Finds Category 1 name and is visible
  expect(category_2).toBeInTheDocument();
  expect(category_2).toHaveTextContent("Bicycles");
  expect(category_2).toBeVisible();

  // Finds Category 1 name and is visible
  expect(category_3).toBeInTheDocument();
  expect(category_3).toHaveTextContent("Bike");
  expect(category_3).toBeVisible();
});

test("Should render calculator component and find main heading and button", () => {
  render(
    <ListOfCalculators
      categories={categories}
      types={types}
      inputs={[inputs]}
      categoriesCount={categoriesCount}
    />
  );

  const categoryHeading = screen.getByTestId("category_heading");
  const nextButton = screen.getByTestId("next_btn");

  // Identifies category heading, checks its content and is visible
  expect(categoryHeading).toBeInTheDocument();
  expect(categoryHeading).toHaveTextContent("Select a Category:");
  expect(categoryHeading).toBeVisible();

  // Identifies button, checks its content and is visible
  expect(nextButton).toBeInTheDocument();
  expect(nextButton).toHaveTextContent("Next");
  expect(nextButton).toBeVisible();
});
