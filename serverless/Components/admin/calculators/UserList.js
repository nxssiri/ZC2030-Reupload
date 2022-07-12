import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import { useState } from "react";
import styles from "../../../styles/Calculator.module.css";
import { CgAddR } from "react-icons/cg";
import { deleteUsersCalculator } from "../../../services/CalculatorService";
import { useRouter } from "next/router";

const UserList = (data) => {
  const details = data.details;
  const [users, setUsers] = useState(data.users);
  const [showModal, setShowModal] = useState(false);
  const handleClose = () => setShowModal(false);
  const [idToDelete, setIdToDelete] = useState(null);
  const [optionSelected, setOptionSelected] = useState();
  const router = useRouter();

  function handleAdd() {
    setUsers([...users, { id: "", email: "" }]);
  }

  function handleChange(event, index) {
    let temp = [...users];
    temp[index] = { id: users[index].id, name: event.target.value };
    setUsers(temp);
    data.getUserListCallback(temp);
  }

  function handleOpen(id, index) {
    setIdToDelete(id);
    setOptionSelected(index);
    setShowModal(true);
  }

  async function handleDelete() {
    if (idToDelete === "") {
      const temp = [...users];
      temp.splice(optionSelected, 1);
      setUsers(temp);
      setShowModal(false);
    } else {
      await deleteUsersCalculator(idToDelete, details.id);
      router.reload();
    }
  }

  if (details?.public) {
    return null;
  } else {
    return (
      <div>
        <Form.Group controlId="form.Users">
          <Form.Label>Users that can access the calculator:</Form.Label>
          {users?.map((user, i) => (
            <div key={i} className="mt-2">
              <Row>
                <Col>
                  <Form.Control
                    type="text"
                    placeholder="Enter email"
                    value={user.email}
                    disabled={user.id !== ""}
                    onChange={(e) => handleChange(e, i)}
                  />
                </Col>
                <Col>
                  <Button onClick={(e) => handleOpen(user.id, i)}>
                    Remove
                  </Button>
                </Col>
              </Row>
            </div>
          ))}
        </Form.Group>
        <Button
          type={"button"}
          className={styles.buttonAdd}
          variant="outline-secondary"
          id="button-addon2"
          size={"md"}
          style={{ width: "100%", marginTop: "10px" }}
          onClick={(e) => handleAdd()}
        >
          <div className='flex flex-row justify-center items-center'>
            <p className='mt-[12px]'> Add User</p>
            <CgAddR className='mt-[0px] mx-2'/>
          </div>
        </Button>
        <Modal
          show={showModal}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>
              Remove user {`"${users ? [optionSelected].email : ""}"`}?
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            The user won't be allowed to access the calculator
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Cancel
            </Button>
            <Button variant="danger" onClick={handleDelete}>
              Yes, remove
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
};

export default UserList;
