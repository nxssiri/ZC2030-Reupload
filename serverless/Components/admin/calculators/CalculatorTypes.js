import { Button, Container, Modal, Nav } from "react-bootstrap";
import Link from "next/link";
import styles from "../../../styles/Calculator.module.css";
import { AiFillDelete } from "react-icons/ai";
import { deleteCalculatorType } from "../../../services/CalculatorService";
import router, { useRouter } from "next/router";
import {useContext, useState} from "react";
import {updateRole} from "../../../services/adminService";
import {toast} from "react-toastify";
import {DashboardViewContext} from "../../../Contexts/DashboardViewContext";

const CalculatorTypes = (data) => {
  const types = data.types;
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const handleClose = () => setShowModal(false);
  const [idToDelete, setIdToDelete] = useState(null);
  const {dashboardView,setDashboardView} = useContext(DashboardViewContext);
  const [optionSelected, setOptionSelected] = useState(0);

  // async function handleDelete() {
  //   await deleteCalculatorType(idToDelete);
  //   router.reload();
  // }

  function handleOpen(id) {
    setIdToDelete(id);
    setShowModal(true);
  }

  const handleDelete = async () => {

    await deleteCalculatorType(idToDelete).then(res => {
      if (res.status === 200)
        toast.warn('Calculator deleted successfully!', {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      setShowModal(false);
      router.push('/adminDashboard');
      setDashboardView('calculator')
      console.log(dashboardView)
    } )
        .catch(err => {
          console.log(err);
        });

  }

  return (
    <Container>
      <h1>
        Edit Calculators{" "}
        <Link href={`/admin/addCalculator`}>
          <Button variant="primary" size="lg">
            +
          </Button>
        </Link>
      </h1>

      <div className="flex flex-col">
        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block py-2 min-w-full sm:px-6 lg:px-8">
            <div className="overflow-hidden shadow-md sm:rounded-lg">
              <table className="min-w-full">
                <thead className="bg-[#77C9D480] dark:bg-gray-700">
                  <tr>
                    <th
                      scope="col"
                      className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400"
                    >
                      Name
                    </th>
                    <th scope="col" className="relative py-3 px-6">
                      <span className="sr-only">Edit</span>
                    </th>
                    <th scope="col" className="relative py-3 px-6">
                      <span className="sr-only">Remove</span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {types.map((it, i) => (
                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                      <td className="py-4 px-6 text-m font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        {it.name}
                      </td>
                      <td className="py-4 px-6 text-m font-medium text-right whitespace-nowrap">
                        <Link href={`/admin/editCalculator/${it.id}`}>
                          Edit
                        </Link>
                      </td>
                      <td className="py-4 px-6 text-m font-medium text-right whitespace-nowrap hover:cursor-pointer">
                        <span onClick={(e) => {handleOpen(it.id), setOptionSelected(i)}}>
                          <AiFillDelete size={20} />
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <Modal
        show={showModal}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            Delete type {`"${types[optionSelected]?.name}"`}?
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          You'll lose all Categories, Inputs and Results collected from this
          type.
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
    </Container>
  );
};

export default CalculatorTypes;
