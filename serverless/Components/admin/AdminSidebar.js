import styles from "../../styles/AdminSidebar.module.css";
import Link from "next/link";
import { MdAccountBox } from "react-icons/md";
import { ImCalculator } from "react-icons/im";
import { AiFillProject } from "react-icons/ai";

export default function adminSidebar() {
  return (
      <div className="w-60 h-full shadow-md bg-white px-1 absolute">
          <ul className="relative">
              <li className="relative">
                  <a className="flex items-center text-sm py-4 px-6 h-12 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:text-gray-900 hover:bg-gray-100 transition duration-300 ease-in-out"
                     href="#!" data-mdb-ripple="true" data-mdb-ripple-color="dark">Users</a>
              </li>
              <li className="relative">
                  <a className="flex items-center text-sm py-4 px-6 h-12 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:text-gray-900 hover:bg-gray-100 transition duration-300 ease-in-out"
                     href="" data-mdb-ripple="true" data-mdb-ripple-color="dark">Calculators</a>
              </li>
              <li className="relative">
                  <a className="flex items-center text-sm py-4 px-6 h-12 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:text-gray-900 hover:bg-gray-100 transition duration-300 ease-in-out"
                     href="#!" data-mdb-ripple="true" data-mdb-ripple-color="dark">Projects</a>
              </li>
          </ul>
      </div>
  );
}
