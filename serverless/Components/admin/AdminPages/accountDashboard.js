import styles from "../../../styles/AccountDashboard.module.css";
import Popup from "../../../Components/admin/Popup";
import {
  AiOutlineEdit,

} from "react-icons/ai";
import { MdDelete } from "react-icons/md";
import { IoMdRemoveCircle } from "react-icons/io";
import {

  updateRole,
  removeUser,
  updateUser,
} from "../../../services/adminService";

import { useState } from "react";
import router from "next/router";
import {toast} from "react-toastify";
import {DashboardViewContext} from "../../../Contexts/DashboardViewContext";
import {useContext} from "react";

export default function AccountDashboard(props) {
  const users = props.users;
  const admins = props.admins;
  // const adminJsonData = {
  //     Category1: [
  //         {
  //             id: "1",
  //             name: `peter`,
  //             email: 'peter@zc30.com',
  //         },
  //         {
  //             id: "2",
  //             name: `peter`,
  //             email: 'peter@zc30.com',
  //         },
  //         {
  //             id: "3",
  //             name: `alfred`,
  //             email: 'alfred@zc30.com',
  //         },
  //         {
  //             id: "4",
  //             name: `alfred`,
  //             email: 'alfred@zc30.com',
  //         },
  //     ]
  // };
  //
  // const userJsonData = {
  //     Category1: [
  //         {
  //             id: "1",
  //             name: `bob`,
  //             email: 'alfred@zc30.com',
  //             type: 'personal',
  //         },
  //         {
  //             id: "2",
  //             name: `tod`,
  //             email: 'alfred@zc30.com',
  //             type: 'business',
  //         },
  //         {
  //             id: "3",
  //             name: `hob`,
  //             email: 'alfred@zc30.com',
  //             type: 'business',
  //         },
  //         {
  //             id: "4",
  //             name: `lob`,
  //             email: 'alfred@zc30.com',
  //             type: 'school',
  //         },
  //
  //     ]
  // };

  // const adminData = Object.keys(adminJsonData).reduce((accumulator, iterator) => {
  //     return [...accumulator, ...adminJsonData[iterator]];
  // }, []);
  //
  // const userData = Object.keys(userJsonData).reduce((accumulator, iterator) => {
  //     return [...accumulator, ...userJsonData[iterator]];
  // }, [])

  const [adminVisibility, setAdminVisibility] = useState(false);
  const [userVisibility, setUserVisibility] = useState(false);

  const [adminEmail, setAdminEmail] = useState(``);

  const [userId, setUserId] = useState(``);
  const [userName, setUserName] = useState(``);
  const [userEmail, setUserEmail] = useState(``);
  const [userRole, setUserRole] = useState(``);
  const [userWallet, setUserWallet] = useState(``);

  const popupCloseHandler = (e) => {
    setAdminVisibility(e);
    setUserVisibility(e);
    setUserId("");
    setUserName("");
    setUserEmail("");
    setUserRole("");
    setUserWallet("");
  };

  // function newAdminAddFunc() {
  //   updateRole(["ADMIN", adminEmail]).then((res) => {
  //     console.log("Admin added successfully", res.data);
  //     setAdminEmail("");
  //   });
  // }

  const newAdminAddFunc = async () => {


    await updateRole(["ADMIN", adminEmail]).then(res => {
      if (res.status === 200)
        toast.success('Admin added successfully!', {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      setAdminEmail("");
      router.push('/adminDashboard');
      setDashboardView('users')
      console.log(dashboardView)
    } )
        .catch(err => {
          console.log(err);
        });

  }

  const removeAdminFunc = async (removalEmail) => {
    const data = ["PERSONAL", removalEmail];

    await updateRole(data).then(res => {
      if (res.status === 200)
        toast.warn('User deleted successfully!', {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      router.push('/adminDashboard');
      setDashboardView('users')
      console.log(dashboardView)
    } )
        .catch(err => {
          console.log(err);
        });

  }
  //
  // function removeUserFunc(removalID) {
  //   const data = [removalID];
  //   removeUser(data).then((res) => {
  //     console.log("User deleted successfully", res.data);
  //     // router.reload();
  //   });
  // }

  const removeUserFunc = async (removalID) => {
    const data = [removalID];


    await removeUser(data).then(res => {
      if (res.status === 200)
        toast.warn('User deleted successfully!', {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      router.push('/adminDashboard');
      setDashboardView('users')
      console.log(dashboardView)
    } )
        .catch(err => {
          console.log(err);
        });

  }

  function editUserFunc(id, name, email, role, publicAddress) {
    setUserId(id);
    setUserName(name);
    setUserEmail(email);
    setUserRole(role);
    setUserWallet(publicAddress);

    setUserVisibility(!userVisibility);
  }

 // function updateUserDetails() {
 //    const data = [userId, userName, userEmail, userRole, userWallet];
 //    updateUser(data).then((res) => {
 //      console.log("User updated successfully", res.data);
 //    });
 //  }
  const {dashboardView,setDashboardView} = useContext(DashboardViewContext);

  const updateUserDetails = async (e) => {
    const data = [userId, userName, userEmail, userRole, userWallet];
    e.preventDefault();

    await updateUser(data).then(res => {
      if (res.status === 200)
        toast.success('Success! User has been update', {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      router.push('/adminDashboard');
      setDashboardView('users')
      console.log(dashboardView)
    } )
        .catch(err => {
          console.log(err);
        });

  }

  return (
      <div className={styles.main}>
        <Popup
            onClose={popupCloseHandler}
            show={adminVisibility}
            title="New Admin"
        >
          <form className="w-full max-w-sm" onSubmit={newAdminAddFunc}>
            <div className="md:flex md:items-center mb-6">
              <div className="md:w-1/3">
                <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
                  New admins email
                </label>
              </div>
              <div className="md:w-2/3">
                <input
                    className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                    type="email" name="email" onChange={(e) => setAdminEmail(e.target.value)}/>
              </div>
            </div>
            <div className="md:flex md:items-center">
              <div className="md:w-1/3"/>
              <div className="md:w-2/3">
                <button
                    className="shadow bg-[#006975FF] hover:bg-[#006975D1] focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
                    type="submit">
                  Save
                </button>
              </div>
            </div>
          </form>
          {/*<form onSubmit={newAdminAddFunc} method="POST">*/}
          {/*  <input*/}
          {/*    id="email"*/}
          {/*    type="email"*/}
          {/*    required*/}
          {/*    onChange={(e) => setAdminEmail(e.target.value)}*/}
          {/*  />*/}
          {/*  <p />*/}
          {/*  <button>Submit</button>*/}
          {/*</form>*/}
        </Popup>

        <Popup
            className="w-2/5"
            onClose={popupCloseHandler}
            show={userVisibility}
            title="Edit user"
        >

          <form className="w-full max-w-sm" onSubmit={updateUserDetails}>
            <div className="md:flex md:items-center mb-6">
              <div className="md:w-1/3">
                <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
                  Name
                </label>
              </div>
              <div className="md:w-2/3">
                <input
                    className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                    type="text" value={userName} onChange={(e) => setUserName(e.target.value)}/>
              </div>
            </div>

            <div className="md:flex md:items-center mb-6">
              <div className="md:w-1/3">
                <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
                  Email
                </label>
              </div>
              <div className="md:w-2/3">
                <input
                    className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                    type="text" value={userEmail} onChange={(e) => setUserEmail(e.target.value)}/>
              </div>
            </div>

            <div className="md:flex md:items-center mb-6">
              <div className="md:w-1/3">
                <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
                  Role
                </label>
              </div>
              <select
                  className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                  onChange={(e) => setUserRole(e.target.value)}
                  value={userRole}>
                <option>PERSONAL</option>
                <option>ADMIN</option>
                <option>BUSINESS</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                </svg>
              </div>
            </div>

            <div>
              <h5>Wallet Address</h5>
              <p className="overflow-x-auto">{userWallet}</p>
            </div>
            <div className="md:flex md:items-center">
              <div className="md:w-1/3"/>
              <div className="md:w-2/3">
                <button
                    className="shadow bg-[#006975FF] hover:bg-[#006975D1] focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
                    type="submit">
                  Save
                </button>
              </div>
            </div>

          </form>

          {/*<form onSubmit={updateUserDetails} method="POST">*/}
          {/*  <h5>Name</h5>*/}
          {/*  <input*/}
          {/*    value={userName}*/}
          {/*    id="name"*/}
          {/*    type="text"*/}
          {/*    required*/}
          {/*    onChange={(e) => setUserName(e.target.value)}*/}
          {/*  />*/}
          {/*  <p />*/}
          {/*  <h5>Email</h5>*/}
          {/*  <input*/}
          {/*    value={userEmail}*/}
          {/*    id="email"*/}
          {/*    type="email"*/}
          {/*    required*/}
          {/*    onChange={(e) => setUserEmail(e.target.value)}*/}
          {/*  />*/}
          {/*  <p />*/}
          {/*  <h5>Role</h5>*/}
          {/*  <input*/}
          {/*    value={userRole}*/}
          {/*    id="type"*/}
          {/*    type="text"*/}
          {/*    required*/}
          {/*    onChange={(e) => setUserRole(e.target.value)}*/}
          {/*  />*/}
          {/*  <p />*/}
          {/*  <h5>Wallet Address</h5>*/}
          {/*  <p>{userWallet}</p>*/}
          {/*  <p />*/}
          {/*  <button>Save</button>*/}
          {/*</form>*/}
        </Popup>

        <div className={styles.container}>
          <div className={styles.titles}>
            <h1>Admin Management </h1>
            {/*<AiOutlinePlusSquare*/}
            {/*    className={styles.icons}*/}
            {/*    onClick={(e) => setAdminVisibility(!adminVisibility)}*/}
            {/*/>*/}
          </div>
          <div className={styles.listContainer}>
            <table className="table-fixed w-100 shadow-md rounded">
              <thead className="bg-[#77C9D480]">
              <tr>
                <th className="p-2 text-left font-bold w-1/4 overflow-x-auto">Name</th>
                <th className="p-2 text-left font-bold w-2/4 overflow-x-auto">Email</th>
                <th className="p-2 text-left font-bold overflow-x-auto">Remove</th>
              </tr>
              </thead>
              <tbody className={"divide-y divide-gray-300"}>
              {admins.map((name, i) => (
                  <tr key={"admins"} className={styles.tr}>
                    <td className="p-2 overflow-x-auto">{admins[i].name}</td>
                    <td className="p-2 overflow-x-auto">{admins[i].email}</td>
                    <td className="p-2 overflow-x-auto">
                      <IoMdRemoveCircle
                          onClick={(e) => removeAdminFunc(admins[i].email)}
                          className={styles.iconsBin}
                      />
                    </td>
                  </tr>
              ))}
              </tbody>
            </table>
          </div>

          <div className={styles.titles}>
            <h1>User Management </h1>
            {/*<AiOutlineSearch className={styles.icons}/>*/}
          </div>
          <div className={styles.listContainer}>
            <table className="table-auto w-100 shadow-md rounded-lg">
              <thead className="bg-[#77C9D480]">
              <tr>
                <th className="hidden sm:block p-2 text-left font-bold text-xs font-medium tracking-wider text-left text-gray-700 uppercase">ID</th>
                <th className="p-2 text-left font-bold text-xs font-medium tracking-wider text-left text-gray-700 uppercase">Name</th>
                <th className="p-2 text-left font-bold text-xs font-medium tracking-wider text-left text-gray-700 uppercase">Email</th>
                <th className="hidden sm:block p-2 text-left font-bold overflow-x-auto text-xs font-medium tracking-wider text-left text-gray-700 uppercase">Wallet Address</th>
                <th className="p-2 text-left font-bold w-24 text-xs font-medium tracking-wider text-left text-gray-700 uppercase">Role</th>
                <th className="p-2 text-left font-bold w-16 text-xs font-medium tracking-wider text-left text-gray-700 uppercase">Edit</th>
                <th className="p-2 text-left font-bold w-16 text-xs font-medium tracking-wider text-left text-gray-700 uppercase">Delete</th>
              </tr>
              </thead>
              <tbody className= "divide-y divide-gray-300 overflow-y-auto">
              {users.map((name, i) => (
                  <tr key={"users"} className={styles.tr}>
                    <td className="hidden sm:block p-2 overflow-x-auto text-m font-medium text-gray-900 whitespace-nowrap">{users[i].id}</td>
                    <td className="p-2 overflow-x-auto text-m font-medium text-gray-900 whitespace-nowrap">{users[i].name}</td>
                    <td className="p-2 overflow-x-auto text-m font-medium text-gray-900 whitespace-nowrap">{users[i].email}</td>
                    <td className="hidden sm:block p-2 overflow-x-auto text-m font-medium text-gray-900 whitespace-nowrap">{users[i].publicAddress}</td>
                    <td className="p-2 overflow-x-auto text-m font-medium text-gray-900 whitespace-nowrap">{users[i].role}</td>
                    <td className="p-2">
                      <AiOutlineEdit
                          className={styles.iconsEdit}
                          onClick={(e) =>
                              editUserFunc(
                                  users[i].id,
                                  users[i].name,
                                  users[i].email,
                                  users[i].role,
                                  users[i].publicAddress
                              )
                          }
                      />
                    </td>
                    <td className="p-2">
                      <MdDelete
                          onClick={(e) => removeUserFunc(users[i].id)}
                          className={styles.iconsBin}
                      />
                    </td>
                  </tr>
              ))}
              </tbody>
            </table>
          </div>

          {/*<div className={styles.listContainer}>*/}
          {/*<div className={styles.lists}>*/}
          {/*  <div key="{admins}" className={styles.items}>*/}
          {/*    <p className={styles.item}>Name</p>*/}
          {/*    <p className={styles.item}>Email</p>*/}
          {/*    <p className={styles.icons}>Remove</p>*/}
          {/*  </div>*/}
          {/*  {admins.map((name, i) => (*/}
          {/*    <div key="{admins}" className={styles.items}>*/}
          {/*      <p className={styles.item}>{admins[i].name}</p>*/}
          {/*      <p className={styles.item}>{admins[i].email}</p>*/}
          {/*      <IoMdRemoveCircle*/}
          {/*        onClick={(e) => removeAdminFunc(admins[i].email)}*/}
          {/*        className={styles.icons}*/}
          {/*      />*/}
          {/*    </div>*/}
          {/*  ))}*/}
          {/*</div>*/}
          {/*</div>*/}
          {/*<div className={styles.listContainer}>*/}
          {/*<div className={styles.lists}>*/}
          {/*  <div key="{users}" className={styles.items}>*/}
          {/*    <p className={styles.item}>ID</p>*/}
          {/*    <p className={styles.item}>Name</p>*/}
          {/*    <p className={styles.item}>Email</p>*/}
          {/*    <p className={styles.item}>Type</p>*/}
          {/*    <p className={styles.item}>Wallet Address</p>*/}
          {/*    <p className={styles.icons}>Edit</p>*/}
          {/*    <p className={styles.icons}>Delete</p>*/}
          {/*  </div>*/}
          {/*  {users.map((user, i) => (*/}
          {/*    <div key="{users}" className={styles.items}>*/}
          {/*      <p className={styles.item}>{users[i].id}</p>*/}
          {/*      <p className={styles.item}>{users[i].name}</p>*/}
          {/*      <p className={styles.item}>{users[i].email}</p>*/}
          {/*      <p className={styles.item}>{users[i].role}</p>*/}
          {/*      <p className={styles.item}>{users[i].ethWallet}</p>*/}
          {/*      <AiOutlineEdit*/}
          {/*        className={styles.icons}*/}
          {/*        onClick={(e) =>*/}
          {/*          editUserFunc(*/}
          {/*            users[i].id,*/}
          {/*            users[i].name,*/}
          {/*            users[i].email,*/}
          {/*            users[i].role,*/}
          {/*            users[i].ethWallet*/}
          {/*          )*/}
          {/*        }*/}
          {/*      />*/}
          {/*      <MdDelete*/}
          {/*        onClick={(e) => removeUserFunc(users[i].id)}*/}
          {/*        className={styles.icons}*/}
          {/*      />*/}
          {/*    </div>*/}
          {/*  ))}*/}
          {/*</div>*/}
          {/*</div>*/}
        </div>
      </div>
  );
}