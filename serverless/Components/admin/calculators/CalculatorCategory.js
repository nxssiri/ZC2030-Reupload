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
import { FaEdit } from "react-icons/fa";
import { CgAddR } from "react-icons/cg";
import { AiFillDelete } from "react-icons/ai";
import { useState } from "react";
import CalculatorInput from "./CalculatorInput";
import {
  createUserCalculator,
  deleteCalculatorCategory,
  deleteCalculatorInputs,
  deleteUsersCalculator,
  getCalculatorCategories,
  getUserByEmail,
  saveCalculatorCategories,
  saveCalculatorInputs,
  saveCalculatorType,
  updateCalculatorCategories,
  updateCalculatorInputs,
  updateCalculatorType,
} from "../../../services/CalculatorService";
import { useRouter } from "next/router";
import {useSession} from "next-auth/react";

const CalculatorCategory = (data) => {
  const router = useRouter();
  const [optionSelected, setOptionSelected] = useState(0);
  const [showInput, setShowInput] = useState(false);
  const [details, setDetails] = useState(data.type);
  const [users, setUsers] = useState(data.users);
  const [categories, setCategories] = useState(data.categories);
  const [inputs, setInputs] = useState(data.inputs);
  const [categoryId, setCategoryId] = useState();
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState();
  const handleBackPress = data.handleBackpress;
  const [idToRemove, setIdToRemove] = useState("");

  // Modal variables
  const [showModal, setShowModal] = useState(false);
  const [modalTitle, setModalTitle] = useState();
  const [modalMessage, setModalMessage] = useState();
  const [modalBtnMessage, setModalBtnMessage] = useState();
  const [modalVariantColor, setModalVariantColor] = useState();
  const [isSaveHandler, setIsSaveHandler] = useState(false);
  const handleClose = () => setShowModal(false);
  const session = useSession();

  // "Save" handler button
  async function handleSave() {
    let type;
    const usersToSave = await verifyUsers();
    if (usersToSave !== -1) {
      if (details.id === undefined || details.id === "") {
        type = (await saveCalculatorType([details.name, details.public])).data;
      } else {
        await updateCalculatorType([details.id, details.name, details.public]);
        type = details;
      }
      await saveUsers(type, usersToSave);
      await saveCategories(type);
      const categoryData = await getCalculatorCategories(type.id);
      setCategories(categoryData.data);
      for (let i = 0; i < categoryData.data.length; i++) {
        await saveInputs(categoryData.data[i].id, i, type);
      }
      await router.replace("http://localhost:3000/admin/showCalculators");
      setShowModal(false);
    }
  }

  async function saveUsers(type, usersToSave) {
    await createUserCalculator(type.id, usersToSave);
  }

  async function verifyUsers() {
    const usersToSave = [];
    for (let i = 0; i < users.length; i++) {
      if (users[i].id === "") {
        const user = (await getUserByEmail(encodeURI(users[i].name))).data;
        if (user[0] === undefined) {
          setErrorMsg(`Could not find user: '${users[i].name}'`);
          setError(true);
          setShowModal(false);
          return -1;
        } else {
          usersToSave.push(user[0].id);
        }
      }
    }
    return usersToSave;
  }

  // Save or Update Categories
  const saveCategories = async (type) => {
    for (let i = 0; i < categories.length; i++) {
      if (categories[i].id === undefined) {
        const data = [type.id, categories[i].name];
        await saveCalculatorCategories(type.id, data);
      } else {
        const data = [type.id, categories[i].name, categories[i].id];
        await updateCalculatorCategories(type.id, data);
      }
    }
  };

  // // Save or Update Inputs
  const saveInputs = async (category_id, index, type) => {
    for (let b = 0; b < inputs[index].length; b++) {
      const newCategoryId = categoryId + 1;

      if (inputs[index][b].id === undefined) {
        if (category_id === undefined) {
          const data = [
            newCategoryId,
            inputs[index][b].name,
            inputs[index][b].factor,
            inputs[index][b].unit,
          ];
          await saveCalculatorInputs(type.id, newCategoryId, data);
        } else {
          const data = [
            category_id,
            inputs[index][b].name,
            inputs[index][b].factor,
            inputs[index][b].unit,
          ];
          await saveCalculatorInputs(type.id, category_id, data);
        }
      } else {
        if (category_id === undefined) {
          const data = [
            newCategoryId,
            inputs[index][b].name,
            inputs[index][b].factor,
            inputs[index][b].unit,
          ];
          await saveCalculatorInputs(type.id, newCategoryId, data);
        } else {
          const data = [
            category_id,
            inputs[index][b].name,
            inputs[index][b].factor,
            inputs[index][b].unit,
            inputs[index][b].id,
          ];
          await updateCalculatorInputs(type.id, category_id, data);
        }
      }
    }
  };

  // Receives data back from CalculatorInput
  const getCalculatorInputData = async (
    optionSelected,
    newInput,
    newCategory
  ) => {
    let InputClone = [...inputs]; // Input clone data
    InputClone[optionSelected] = newInput;
    await setInputs(InputClone);

    let CategoryClone = [...categories]; // Category clone data
    CategoryClone[optionSelected] = newCategory;
    await setCategories(CategoryClone);

    setShowInput(false);
  };

  // "Add" button handler
  function handleAdd(input) {
    if (categories.length < 3) {
      setCategories([...categories, input]);
      setOptionSelected(categories.length);
      setShowInput(true);
    } else {
      setErrorMsg("You reached the maximum number of categories.");
      setError(true);
    }
  }

  // onChange handler
  function handleChange(e, index) {
    let categoryClone = [...categories];
    categoryClone[index] = { id: index, name: e.target.value };
    setCategories(categoryClone);
  }

  // "Edit" button handler
  function handleEdit(i) {
    setOptionSelected(i);
    setShowInput(true);
  }

  // "Delete" button handler
  async function handleDelete() {
    if (idToRemove !== "") {
      const data = [session]
      await deleteCalculatorCategory(details.id, idToRemove,data);
      const temp = [...categories];
      temp.splice(optionSelected, 1);
      setCategories(temp);
      setShowModal(false);
    } else {
      const temp = [...categories];
      temp.splice(optionSelected, 1);
      setCategories(temp);
      setShowModal(false);
    }
  }

  // Modal handler
  async function handleOpen(id, index, isSave) {
    if (isSave === true) {
      setModalTitle("Save Type, Categories, and Inputs?");
      setModalMessage("You will save all types, categories and inputs added");
      setModalBtnMessage("Yes, save them");
      setModalVariantColor("success");
      setIsSaveHandler(true);
      setShowModal(true);
    } else {
      setModalTitle(`Delete category "${categories[optionSelected]?.name}"?`);
      setModalMessage(
        "You'll lose all Inputs and Results collected from this category."
      );
      setModalBtnMessage("Yes, delete it");
      setModalVariantColor("danger");
      setIdToRemove(id);
      setOptionSelected(index);
      setIsSaveHandler(false);
      setShowModal(true);
    }
  }

  return (
    <div className={styles.main} style={{ width: "100%" }}>
      <div
        className={styles.pageContentMain}
        style={{ backgroundColor: "white", padding: "3%" }}
      >
        {showInput === false && (
          <Form>
            {error === true && (
              <Alert
                variant="danger"
                onClose={() => setError(false)}
                dismissible
              >
                <Alert.Heading>We have a little problem.</Alert.Heading>
                <p>{errorMsg}</p>
              </Alert>
            )}
            <Form.Group className="mb-4" controlId="exampleForm.ControlInput1">
              <Form.Label style={{ fontSize: "25px" }}>Type</Form.Label>
              <Form.Control
                size="lg"
                type="text"
                placeholder={details.name}
                disabled
              />
            </Form.Group>
            <FormLabel style={{ width: "100%", fontSize: "25px" }}>
              Categories
            </FormLabel>
            {categories?.map((category, i) => (
              <div key={i}>
                <InputGroup size="lg" className="mt-2">
                  <FormControl
                    id={`category-${i + 1}`}
                    placeholder={`E.g. Category ${i + 1}`}
                    aria-label={`category-${i + 1}`}
                    aria-labelledby={`category-${i + 1}`}
                    value={category.name}
                    onChange={(e) => handleChange(e, i)}
                    disabled
                    readOnly
                  />
                  <Button
                    variant="primary"
                    id="button-addon2"
                    onClick={(e) => handleEdit(i)}
                  >
                    Edit <FaEdit style={{float: "right", marginLeft:"8px", marginTop:"5px"}} size={20}/>
                  </Button>
                  <Button
                    variant="danger"
                    id="button-addon2"
                    onClick={(e) => handleOpen(category.id, i)}
                  >
                    <AiFillDelete size={20} />
                  </Button>
                </InputGroup>
              </div>
            ))}
            <Button
              type={"button"}
              className={styles.buttonAdd}
              variant="outline-secondary"
              id="button-addon2"
              size={"md"}
              style={{ width: "100%", marginTop: "10px" }}
              onClick={(e) => handleAdd("")}
            >
              <div className='flex flex-row justify-center items-center'>
                <p className='mt-[12px]'> Add</p>
                <CgAddR className='mt-[0px] mx-2'/>
              </div>
            </Button>
          </Form>
        )}
        {showInput === false && (
          <div style={{ width: "100%", textAlign: "center" }}>
            <Button
              style={{ width: "125px", marginTop: "40px" }}
              variant="secondary"
              size="lg"
              type="submit"
              className={styles.buttonBack}
              data-testid="next_btn"
              onClick={(e) => handleBackPress(e)}
            >
              Back
            </Button>
            <Button
              style={{ width: "125px", marginTop: "40px", marginLeft: "10px" }}
              variant="secondary"
              size="lg"
              type="submit"
              className={styles.button}
              data-testid="next_btn"
              onClick={(e) => handleOpen(null, null, true)}
            >
              Save
            </Button>
          </div>
        )}
        {showInput === true && (
          <div style={{ width: "100%" }}>
            <CalculatorInput
              category={categories[optionSelected]}
              input={inputs[optionSelected]}
              calculatorInputData={getCalculatorInputData}
              optionSelected={optionSelected}
              type={details}
            />
          </div>
        )}
      </div>
      {categories !== undefined && (
        <div>
          <Modal
            show={showModal}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
          >
            <Modal.Header closeButton>
              <Modal.Title>{modalTitle}</Modal.Title>
            </Modal.Header>
            <Modal.Body>{modalMessage}</Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Cancel
              </Button>
              <Button
                variant={modalVariantColor}
                onClick={() => (isSaveHandler ? handleSave() : handleDelete())}
              >
                {modalBtnMessage}
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      )}
    </div>
  );
};

export default CalculatorCategory;
