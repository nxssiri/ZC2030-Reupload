import { render } from "../test-utils";
import React from "react";
import { ProgressBar } from "react-bootstrap";

const data = [
  {
    id: "1",
    name: "Individual",
    category: ["Food", "Transport", "Energy"],
    results: [14, 56, 89],
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

test("Should render Progress Bar component with [0] data", () => {
  render(<ProgressBar category={data[0].category} results={data[0].results} />);

  const { container } = render(
    <ProgressBar category={data[0].category} results={data[0].results} />
  );
  const categories = container.querySelector("div");

  expect(categories).toBeInTheDocument();
});
