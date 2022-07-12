import styles from "../../../styles/Calculator.module.css";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import UserList from "./UserList";
import CalculatorCategory from "./CalculatorCategory";
import { useState } from "react";
import {
  createUserCalculator,
  getCalculatorCategories,
  getCalculatorInputs,
  getCalculatorTypes,
  saveCalculatorCategories,
  saveCalculatorInputs,
  saveCalculatorType,
  updateCalculatorCategories,
  updateCalculatorInputs,
  updateCalculatorType,
} from "../../../services/CalculatorService";
import { useRouter } from "next/router";

const EditCalculatorOverview = (data) => {
  const router = useRouter();
  const [details, setDetails] = useState(data.details);
  const [users, setUsers] = useState(data.users);
  const [categories, setCategories] = useState(data.categories);
  const [inputs, setInputs] = useState(data.inputs);
  const [categoryId, setCategoryId] = useState();
  const [inputId, setInputId] = useState();
  const [overviewShowing, setOverviewShowing] = useState(true);
  const [showCategory, setShowCategory] = useState(false);
  const [save, setSave] = useState(false);

  function handleEdit() {
    setOverviewShowing(false);
    setShowCategory(true);
  }

  function handleReturnToOverview() {
    setOverviewShowing(true);
    setShowCategory(false);
  }

  function handleNameChange(event) {
    let temp;
    temp = { id: details.id, name: event.target.value, public: details.public };
    setDetails(temp);
  }

  function handleVisibilityChange(event) {
    let temp;
    temp = {
      id: details.id,
      name: details.name,
      public: event.target.value === "true",
    };
    setDetails(temp);
  }

  const getUserListCallback = async (users) => {
    setUsers(users);
  };

  return (
    <div className={styles.containerMargin5}>
      {overviewShowing === true && (
        <div className={styles.main}>
          <div className={styles.pageContentMain}>
            <Form style={{ padding: "5%" }}>
              <Form.Group controlId="form.Name">
                <Form.Label style={{ width: "100%", fontSize: "25px" }}>
                  Calculator Name
                </Form.Label>
                <Form.Control
                  data-testid="nameInput"
                  type="text"
                  placeholder="Enter name"
                  size="lg"
                  onChange={(e) => handleNameChange(e)}
                  value={details ? details.name : ""}
                />
              </Form.Group>
              <Form.Group
                controlId="form.Visibility"
                style={{ marginTop: "20px" }}
              >
                <Form.Label style={{ width: "100%", fontSize: "25px" }}>
                  Calculator Visibility
                </Form.Label>
                <div key={`default-radio`} className="mb-3">
                  <Form.Check
                    type="radio"
                    id={`public`}
                    label={`Public`}
                    checked={details ? details.public : false}
                    name="visibility"
                    data-testid="publicCheck"
                    value={true}
                    onClick={(e) => handleVisibilityChange(e)}
                  />
                  <Form.Check
                    type="radio"
                    id="private"
                    label="Private"
                    checked={details ? !details.public : true}
                    name="visibility"
                    data-testid="privateCheck"
                    value={false}
                    onClick={(e) => handleVisibilityChange(e)}
                  />
                </div>
              </Form.Group>
              <UserList
                details={details}
                users={users}
                data-testid="userList"
                getUserListCallback={getUserListCallback}
              />
              <div style={{ width: "100%", textAlign: "center" }}>
                <Button
                  style={{ width: "125px", marginTop: "40px" }}
                  variant="secondary"
                  size="lg"
                  type="submit"
                  data-testid="next_btn"
                  onClick={(e) => handleEdit()}
                  className={styles.button}
                >
                  Next
                </Button>
              </div>
            </Form>
          </div>
        </div>
      )}
      {showCategory === true && (
        <CalculatorCategory
          type={details}
          categories={categories}
          inputs={inputs}
          users={users}
          handleBackpress={handleReturnToOverview}
        />
      )}
    </div>
  );
};

export default EditCalculatorOverview;
