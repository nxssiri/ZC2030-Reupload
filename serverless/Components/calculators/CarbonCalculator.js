import styles from "../../styles/Calculator.module.css";
import { Button, Form, InputGroup, ToggleButton } from "react-bootstrap";
import ProgressBar from "./ProgressBar";
import { useState } from "react";
import { saveCalculatorResult } from "../../services/CalculatorService";
import {useRouter} from "next/router";

const CarbonCalculator = (data) => {
  const type = data.type;
  const value = data.value;
  const categories = data.category;
  const categoriesCount = data.categoriesCount;
  const inputs = data.input;
  const results = data.data.results;
  const userId = data.userId;
  const router = useRouter();

  // console.log(type)
  // console.log(categories)
  // console.log(inputs)
  // User Input value
  const [inputValue, setInputValue] = useState();

  // Stores step number - Step-1: Calculator Categories, Step 2: Calculator Inputs, Step 3: Input Number
  const [step, setStep] = useState(1);

  // Step-1: selected value from choices
  const [step1Value, setStep1Value] = useState(0);

  // Step-2: selected value from choices
  const [step2Value, setStep2Value] = useState(0);

  // Calculator result
  const [result, setResult] = useState(0);

  // Checked/Unchecked
  const [checked, setChecked] = useState([false, false, false]);

  // Handles calculation
  function handleCalculation(input) {
    const value = input * inputs[step1Value][step2Value].factor;
    setInputValue(input);
    setResult(value);
  }

  // Handles checks
  function handleChecked(i) {
    switch (i) {
      // Option 1
      case 0:
        setChecked([true, false, false]);
        break;
      // Option 2
      case 1:
        setChecked([false, true, false]);
        break;
      // Option 3
      case 2:
        setChecked([false, false, true]);
        break;
    }
  }

  // "Next" button
  function handleBtn() {
    setStep(step + 1);
    setChecked([false, false, false]);
  }

  // "Reset" button
  function handleReset() {
    router.reload()
  }

  // Save calculator result
  function saveCalculator() {
    const data = [result, inputValue, userId];
    if (userId != null) {
      saveCalculatorResult(
        type.id,
        categories[step1Value].id,
        inputs[step1Value][step2Value].id,
        data
      ).then((res) => {
        console.log("Data added successfully", res.data);
      });
    }
  }

  return (
    <main className={styles.main}>
      <div className={styles.pageContentMain}>
        <h2 className={styles.h2} data-testid="calculator_heading">
          {type?.name} Calculator
        </h2>
        <div className={styles.calculatorContainer}>
          <div className={styles.calculatorBody}>
            {step === 1 && (
              <>
                <h3 className={styles.h3} data-testid="category_heading">
                  Select a Category:
                </h3>
                <div className={styles.formDiv}>
                  {categories?.map((category, i) => (
                    <ToggleButton
                      className={styles.form}
                      id={`toggle-check-${i}`}
                      type="radio"
                      checked={checked[i]}
                      variant="secondary"
                      value={i}
                      onChange={(e) => {
                        setStep1Value(e.target.value), handleChecked(i);
                      }}
                      data-testid={`category-${i}`}
                    >
                      {category.name}
                    </ToggleButton>
                  ))}
                </div>
              </>
            )}
            {step === 2 && (
              <>
                <h3 className={styles.h3} data-testid="category_heading">
                  Select a Category:
                </h3>
                <div className={styles.formDiv}>
                  {inputs[step1Value]?.map((input, i) => (
                    <ToggleButton
                      className={styles.form}
                      variant="secondary"
                      id={`toggle-check-${i}`}
                      type="radio"
                      checked={checked[i]}
                      value={i}
                      onChange={(e) => {
                        setStep2Value(e.target.value), handleChecked(i);
                      }}
                    >
                      {input.name}
                    </ToggleButton>
                  ))}
                </div>
              </>
            )}
            {step === 3 && (
              <>
                <h3
                  className={styles.h3}
                  style={{ width: "60%" }}
                  data-testid="category_heading"
                >
                  Enter a value:
                </h3>
                <div className={styles.formDiv} style={{ paddingLeft: "1rem" }}>
                  <InputGroup
                    className={styles.form}
                    style={{
                      paddingLeft: "1.5rem",
                      border: "solid 0px #a5a5af",
                      height: "50px",
                      width: "90%",
                    }}
                  >
                    <Form.Control
                      aria-label="Input Box"
                      type="number"
                      placeholder={"In " + inputs[step1Value][step2Value].unit}
                      onChange={(e) => {
                        handleCalculation(e.target.value);
                      }}
                    />
                    <InputGroup.Text>
                      {inputs[step1Value][step2Value].unit}
                    </InputGroup.Text>
                  </InputGroup>
                </div>
              </>
            )}
            <div className={styles.btnContainer}>
              {step < 3 && (
                <Button
                  style={{ width: "125px", marginTop: "20px" }}
                  variant="secondary"
                  size="lg"
                  type="submit"
                  className={styles.button}
                  data-testid="next_btn"
                  onClick={(e) => handleBtn(e)}
                >
                  Next
                </Button>
              )}
              {step === 3 && (
                <Button
                  style={{ width: "125px", marginTop: "20px" }}
                  variant="secondary"
                  size="lg"
                  type="submit"
                  className={styles.button}
                  data-testid="next_btn"
                  onClick={(e) => {
                    setStep(step + 1), saveCalculator(), setInputValue(e);
                  }}
                >
                  Next
                </Button>
              )}
            </div>
            {step === 4 && (
              <>
                <h3
                  className={styles.h3}
                  style={{ width: "60%" }}
                  data-testid="category_heading"
                >
                  Result:
                </h3>
                <div className={styles.formDiv} style={{ paddingLeft: "2rem" }}>
                  <h3
                    className={styles.form}
                    style={{
                      border: "solid 0px #a5a5af",
                      height: "60px",
                      background: "#d8f5ebc9",
                      paddingTop: "10px",
                    }}
                  >
                    {result}{" "}
                    <span style={{ fontSize: "13px" }}>
                      CO2/e
                    </span>
                  </h3>
                  <Button
                    style={{ width: "125px", marginTop: "20px" }}
                    variant="secondary"
                    size="lg"
                    type="submit"
                    className={styles.button}
                    data-testid="next_btn"
                    onClick={(e) => handleReset(e)}
                  >
                    Reset
                  </Button>
                </div>
              </>
            )}
          </div>
          <div className={styles.progressBarBody}>
            <div style={{ width: "max-content" }}>
              <h3 style={{ fontSize: "25px" }}>Progress Bar</h3>
              <ProgressBar
                value={value}
                type={type}
                categories={categories}
                categoriesCount={categoriesCount}
                results={results}
                data-testid="category1_heading"
                userId={userId}
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default CarbonCalculator;
