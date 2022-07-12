import React, {useContext} from "react";
// import {ViewContext} from "../Contexts/ViewContext";
import Link from 'next/link'
// import ProgressBar from "@ramonak/react-progress-bar";


const Card = (props) => {
    // const project = props.project
    // const {setView} = useContext(ViewContext);
    // const {view} = useContext(ViewContext);
    // const {setEditPrj} = useContext(ViewContext);

    // function changeView() {
    //     setEditPrj(project)
    //     setView('edit')
    // }

    // storing input name

    // console.log(project)

    // console.log(project)


    return (
        <div className='m-2'>
            <div className="w-full h-full border border-gray-500 m-2
            overflow-hidden rounded-lg shadow-md bg-white border-gray-200 text-gray-600 hover:shadow-xl hover:scale-104 transition duration-200 ease-in-out">
                <div className='relative'>
                    <div className=" rounded-lg ">
                        <img
                            src={props.projectImg}
                            alt="uploaded cover image"
                            className="w-full object-cover  h-48 sm:h-48 rounded-lg ">

                        </img>

                    </div>
                    <div>
                        <div className=' text-xl text-black ml-2 mt-3 font-bold '>{props.projectName}  </div>
                    </div>

                    <div
                        className=" font-semibold ml-2  underline flex items-center text-sm text-gray-600 truncate capitalize">
                        {/*location*/}
                        {props.city} , {props.county}, {props.country}
                    </div>

                    <div className="text-gray-600 ml-2 mt-2 no-underline flex items-center font-semibold text-xs text-gray-600 ">
                        {/*total supply*/}
                        Tonnes purchased: <span className='text-gray-600 ml-2'> {props.owned} CO2e</span>
                    </div>

                    <div className=' flex items-center '>

                        <div>
                            <div className=" flex items-center  rounded-full">

                                <div
                                    className=' ml-2 no-underline flex items-center text-xs text-gray-600 font-semibold  capitalize'>Total Carbon Supply:  {props.totalSupply} /tC02e
                                </div>
                                {/*<div className='w-[150px] ml-1'><*/}
                                {/*    ProgressBar baseBgColor={'grey'} labelSize={'10px'}*/}
                                {/*                                             height={'15px'} bgColor={'#2D3B4F'}*/}
                                {/*                                             completed={widthPercentage}/></div>*/}


                            </div>
                        </div>
                        <div
                            className=" absolute   bottom-[95px] w-[100px] py-1 text-center font-light">

                            {props.remainingSupply > '0' && <div className='bg-gray-700 py-1 text-black text-center font-light'>
                                <span className='text-white text font-light text-sm p-1'> {props.remainingSupply} tonnes left</span>
                            </div>}

                            {props.remainingSupply === '0' && <div className='bg-red-500 text-white text font-bold text-sm'>
                                SOLD OUT
                            </div>}
                        </div>
                    </div>
                </div>

                <div className="flex justify-end">


                    <Link href={"./projects/" + props.id}>
                        <a className='mt-3 no-underline mb-3 mr-5 bg-green-500  justify-center font-bold capitalize text-xs px-4 py-2
                         rounded shadow hover:shadow-md hover:bg-green-400 mr-1 ease-linear transition-all duration-150'
                        >
                              <span className='text-white
                              '>More Details</span>
                        </a>
                    </Link>

                </div>


            </div>
        </div>

    )
}

export default Card;
