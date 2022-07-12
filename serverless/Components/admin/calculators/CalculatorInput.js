import { useState } from "react";
import {
  Alert,
  Button,
  Form,
  FormControl,
  FormLabel,
  InputGroup,
  Modal,
} from "react-bootstrap";
import styles from "../../../styles/Calculator.module.css";
import { CgAddR } from "react-icons/cg";
import { AiOutlineDelete } from "react-icons/ai";
import {
  deleteCalculatorCategory,
  deleteCalculatorInput,
} from "../../../services/CalculatorService";
import { useRouter } from "next/router";

const CalculatorInput = (data) => {
  const type = data.type;
  const [optionSelected, setOptionSelected] = useState(0);
  const [input, setInput] = useState(data.input);
  const [name, setName] = useState();
  const [factor, setFactor] = useState();
  const [unit, setUnit] = useState();
  const inputTitles = ["name", "factor", "unit"];
  const [category, setCategory] = useState([data.category]);
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState();
  const [idToRemove, setIdToRemove] = useState("");
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const handleClose = () => setShowModal(false);

  function handleOpen(id, index) {
    setIdToRemove(id);
    setOptionSelected(index);
    setShowModal(true);
  }

  // "Add" button handler
  function handleAdd() {
    if (input === undefined) {
      setInput([""]);
    } else if (input.length < 3) {
      setInput([...input, []]);
    } else {
      setErrorMsg("You reached the maximum number of inputs.");
      setError(true);
    }
  }

  // onChange handler
  function handleChange(e, indexCategory, indexInput, inputField) {
    let InputClone = [...input]; // Input clone data

    switch (inputField) {
      case "name":
        InputClone[indexCategory] = {
          id: input[indexCategory].id,
          name: e.target.value,
          factor: input[indexCategory].factor,
          unit: input[indexCategory].unit,
        };
        setInput(InputClone);
        break;
      case "factor":
        InputClone[indexCategory] = {
          id: input[indexCategory].id,
          name: input[indexCategory].name,
          factor: Number(e.target.value),
          unit: input[indexCategory].unit,
        };
        setInput(InputClone);
        break;
      case "unit":
        InputClone[indexCategory] = {
          id: input[indexCategory].id,
          name: input[indexCategory].name,
          factor: input[indexCategory].factor,
          unit: e.target.value,
        };
        setInput(InputClone);
        break;
    }
  }

  // onChange handler
  function handleCategoryChange(e, index) {
    let categoryClone = [...category];
    categoryClone[index] = { id: category[0]?.id, name: e.target.value };
    setCategory(categoryClone);
  }

  function handleSave() {
    if (input === undefined) {
      setErrorMsg("You might have forgotten to add an input");
      setError(true);
    }
    for (let i = 0; i < input?.length; i++) {
      let num = i + 1;
      if (input[i].name === undefined) {
        setErrorMsg("You might have forgotten to add a value on Input " + num);
        setError(true);
        break;
      } else if (category[0].name === undefined) {
        setErrorMsg(
          "You might have forgotten to add a value on Category Name "
        );
        setError(true);
        break;
      } else {
        data.calculatorInputData(data.optionSelected, input, category[0]);
      }
    }
  }

  // "Delete" button handler
  async function handleDelete() {
    if (idToRemove !== "") {
      await deleteCalculatorInput(type.id, category.id, idToRemove);
      const temp = [...input];
      temp.splice(optionSelected, 1);
      setInput(temp);
      setShowModal(false);
    } else {
      const temp = [...category];
      temp.splice(optionSelected, 1);
      setInput(temp);
      setShowModal(false);
    }
  }

  return (
    <div>
      <Form>
        {error === true && (
          <Alert variant="danger" onClose={() => setError(false)} dismissible>
            <Alert.Heading>We have a little problem.</Alert.Heading>
            <p>{errorMsg}</p>
          </Alert>
        )}
        <Form.Group className="mt-5">
          <Form.Label style={{ fontSize: "25px" }} htmlFor="category-name">
            Category
          </Form.Label>
          <Form.Control
            aria-labelledby={`category-name`}
            id={`category-name`}
            size="lg"
            type="text"
            placeholder="E.g Category 1"
            value={category[0]?.name}
            onChange={(e) => handleCategoryChange(e, 0)}
          />
        </Form.Group>
        {input?.map((inputVal, i) => (
          <div key={i}>
            <Form.Group className="mt-5">
              <FormLabel
                htmlFor={`input-${i + 1}`}
                className="mt-4"
                style={{ width: "50%", fontSize: "25px" }}
              >
                Input {i + 1}
              </FormLabel>
              <Button
                className="mt-4"
                style={{ float: "right" }}
                variant="danger"
                onClick={(e) => handleOpen(inputVal.id, i)}
              >
                Delete
                <AiOutlineDelete size={18} style={{float: "right", marginLeft:"8px", marginTop:"3px"}} />
              </Button>
            </Form.Group>

            {inputTitles.map((inputTitle, b) => (
              <div key={b}>
                <InputGroup
                  style={{ width: "100%" }}
                  size="lg"
                  className="mt-2"
                >
                  <InputGroup.Text>{inputTitle}</InputGroup.Text>
                  <FormControl
                    id={`input-${b + 1}`}
                    value={input[i][inputTitle]}
                    aria-labelledby={`input-${b + 1}`}
                    placeholder={`Enter a value:`}
                    onChange={(e) => handleChange(e, i, b, inputTitle)}
                  />
                </InputGroup>
              </div>
            ))}
          </div>
        ))}
        <Button
          type={"button"}
          className={styles.buttonAdd}
          variant="outline-secondary"
          id="button-addon2"
          size={"md"}
          style={{ width: "100%", marginTop: "10px" }}
          onClick={(e) => handleAdd(e)}
        >
          <div className='flex flex-row justify-center items-center'>
            <p className='mt-[12px]'> Add</p>
            <CgAddR className='mt-[0px] mx-2'/>
          </div>
        </Button>
      </Form>
      <div style={{ width: "100%", textAlign: "center" }}>
        <Button
          style={{ width: "125px", marginTop: "40px" }}
          variant="secondary"
          size="lg"
          type="submit"
          className={styles.button}
          data-testid="next_btn"
          onClick={(e) => handleSave()}
        >
          Save
        </Button>
      </div>

      {input !== undefined && (
        <Modal
          show={showModal}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>
              Delete input {`"${input[optionSelected]?.name}"`}?
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            You'll lose all Results collected from this category.
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Cancel
            </Button>
            <Button variant="danger" onClick={handleDelete}>
              Yes, delete it
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
};

export default CalculatorInput;
