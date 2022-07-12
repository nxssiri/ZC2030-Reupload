import { FiFacebook, FiGlobe } from "react-icons/fi";
import {FcCalendar} from "react-icons/fc";
import React, { useState } from 'react';
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';


const AboutProject = (props) => {

  const [open, setOpen] = useState(false);

  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);

  return (
    <>

      <div>
        <h2 className="flex justify-between items-center py-3 w-full font-medium text-left text-gray-900 rounded-t-xl border-b border-gray-200 dark:border-gray-700 dark:text-white">
          <span>About This Project</span>
        </h2>
      </div>

      <div className="flex  items-center">
        {/*//profile picture*/}
        <div className="">
          <img
            src="https://mdbcdn.b-cdn.net/img/new/avatars/1.webp"
            className="rounded-full h-16 shadow-lg"
            alt="Avatar"
          />
        </div>

        {/*//name*/}
        <div className=" mt-6 px-2">
          <div>
            <h6 className=" capitalize">John Doe</h6>
          </div>
          <div>
            <p className="text-gray-500 capitalize">
              {" "}
              {props.detailsProps.type}
            </p>
          </div>
        </div>

        {/*//socials*/}
        <div className="flex px-10">
          <a href="https://google.com" target="_blank">
            <span className="text-xl font-bold block uppercase  tracking-wide hover:text-gray-500 text-gray-400 cursor-pointer   ">
              <FiGlobe />
            </span>
          </a>

          <a href="https://facebook.com" target="_blank">
            <span className="text-xl font-bold block uppercase tracking-wide ml-6 hover:text-blue-500 text-blue-400  cursor-pointer">
              <FiFacebook />
            </span>{" "}
          </a>
        </div>
      </div>

      <div className="">
        {/*Date*/}
        <div className="mt-2 flex items-center text-sm text-gray-500">
          <FcCalendar
            className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400 text-green-500"
            aria-hidden="true"
          />
          {props.detailsProps.datefounded}
        </div>
        <div className="border-b border-[#F2F2F2] w-20 pt-2 g"></div>
      </div>

      {/*Description*/}

      <div className="mt-6 ">
        <p className="text-gray-500 line-clamp-4 ">
          {" "}
          {props.detailsProps.description}
        </p>
      </div>

      {/*modal*/}
      <div className=" border-b border-gray-200">
        <button onClick={onOpenModal}>
        <p className="text-gray-500 line-clamp-4 underline font-bold text-green-600 ">
          {" "}
          Show more >
        </p>
        </button>
      </div>
      <div style={{fontFamily: "sans-serif",
        textAlign: "center"}}>
        <Modal open={open} onClose={onCloseModal} center>
          <h2>Description</h2>
          <p className="text-gray-500 ">
            {" "}
            {props.detailsProps.description}
          </p>
        </Modal>
      </div>
    </>
  );
};

export default AboutProject;
