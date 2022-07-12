import {useContext} from "react";
import {ViewContext} from "../../../Contexts/ViewContext";
import {DashboardViewContext} from "../../../Contexts/DashboardViewContext";




export default function  Sidebar ()  {


    const {dashboardView,setDashboardView} = useContext(DashboardViewContext);
    const {setView} = useContext(DashboardViewContext);
    const {view} = useContext(DashboardViewContext);

    const handleChange = (view) => {
        console.log("hello"+ view)
        setDashboardView(view)
        console.log("success"+dashboardView)}

    function changeView(view) {
        console.log("hello")
        setDashboardView(view)
        console.log(view)
    }

    return(
        <div className="min-h-screen flex items-center justify-center">
            <div
                className="flex flex-col left-0 w-14 hover:w-64 md:w-64 bg-green-500 h-full text-white transition-all duration-300 border-none z-10 sidebar rounded">
                <div className="overflow-y-auto overflow-x-hidden flex flex-col justify-between flex-grow">
                    <ul className="flex flex-col py-4 space-y-1">
                        <li>
                            <div
                                className="relative flex flex-row items-center h-11 focus:outline-none text-white-600 hover:text-white-800 pr-6">
            <span className="inline-flex justify-center items-center ml-4">

            </span>
                                <span className="text-bold tracking-wide truncate">
                    <h6>Zero Carbon dashboard</h6>
            </span>
                            </div>
                        </li>

                        <li  onClick={()=> handleChange('projects')} className="md:px-4 cursor-pointer">
                            <div
                               className="active relative flex flex-row items-center h-11 focus:outline-none  hover:bg-green-700 rounded-lg text-white-600 hover:text-white-800 pr-6">
                                <span   className="inline-flex cursor-pointer justify-center items-center ml-4">
                                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                                       xmlns="http://www.w3.org/2000/svg">
                                    <path stroke-linecap="round" strokeLinejoin="round" strokeWidth="2"
                                          d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6">
                                    </path>
                                  </svg>
                                </span>
                                <span className="ml-2 text-sm tracking-wide truncate">Projects</span>
                            </div>
                        </li>

                        <li onClick={()=> handleChange('calculator')} className="md:px-4 cursor-pointer">
                            <div
                               className="relative flex flex-row items-center h-11 focus:outline-none rounded-lg hover:bg-green-700 text-white-600 hover:text-white-800 pr-6">
                                <span className="inline-flex justify-center items-center ml-4">
                                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24"
                                       stroke="currentColor">
                                    <path stroke-linecap="round" strokeLinejoin="round" strokeWidth="2"
                                          d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"/>
                                  </svg>
                                </span>
                                <span className="ml-2 text-sm tracking-wide truncate">Calculator</span>
                            </div>
                        </li>

                        <li  className="md:px-4 cursor-pointer ">
                            <div
                                                       className="relative flex flex-row items-center h-11 focus:outline-none rounded-lg hover:bg-green-700 text-white-600 hover:text-white-800 pr-6">
                                    <span className="inline-flex justify-center items-center ml-4">
                                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24"
                                           stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                              d="M9 14l6-6m-5.5.5h.01m4.99 5h.01M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l3.5-2 3.5 2 3.5-2 3.5 2zM10 8.5a.5.5 0 11-1 0 .5.5 0 011 0zm5 5a.5.5 0 11-1 0 .5.5 0 011 0z"/>
                                      </svg>
                                    </span>
                                <span className="ml-2 text-sm tracking-wide truncate">Payments</span>
                            </div>
                        </li>

                        <li  className="md:px-4 cursor-pointer" onClick={() => setDashboardView('users')} >
                            <div className="relative flex flex-row items-center h-11 focus:outline-none rounded-lg hover:bg-green-700 text-white-600 hover:text-white-800 pr-6">
                                    <span className="inline-flex justify-center items-center ml-4">

                                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                                        <path fill-rule="evenodd"
                                              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z"
                                              clip-rule="evenodd"/>
                                      </svg>

                                    </span>
                                <span className="ml-2 text-sm tracking-wide truncate">Users</span>
                            </div>
                        </li>


                        <li className="md:px-4">
                            <div
                               className="relative flex flex-row items-center h-11 focus:outline-none rounded-lg hover:bg-green-700 text-white-600 hover:text-white-800 pr-6">
                                <span className="inline-flex justify-center items-center ml-4">
                                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                                       xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                          d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z">
                                    </path>
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                                  </svg>
                                </span>
                                <span className="ml-2 text-sm tracking-wide truncate">Settings</span>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>

    )
}