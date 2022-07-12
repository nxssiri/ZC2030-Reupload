import React, {useContext} from "react";
import {ViewContext} from "../Contexts/ViewContext";
import Link from 'next/link'
import ProgressBar from "@ramonak/react-progress-bar";


const Card = (props) => {
    const project= props.project
    const {setView} = useContext(ViewContext);

    const {setEditPrj} = useContext(ViewContext);

    // function changeView() {
    //     setEditPrj(project)
    //     setView('edit')
    // }
        // storing input name

    console.log(project)
    const widthPercentage = `${((project.balance/project.totalsupply)*100).toPrecision(3)}%`
    console.log(project)



    return(
            <div className="   border border-gray-500
            overflow-hidden rounded-lg shadow-md bg-white hover:shadow-xl hover:scale-104 transition duration-200 ease-in-out">
                <div className='relative'>
                    <div className=" rounded-lg ">
                    <img
                        src={project.projectimage1}
                        alt="uploaded cover image"
                        className="w-full object-cover  h-full rounded-lg ">

                    </img>

                    </div>
                    <div>

                    </div>


                    <div className=' flex items-center '>
                        {/*<div>*/}
                        {/*    <h5 className='font-sans text-xs '>Remaining  </h5>*/}
                        {/*    <h5 className='font-sans text-xs'> supply</h5>*/}
                        {/*</div>*/}
                        <div>
                            <div className=" flex items-center  rounded-full">

                                <div className=' ml-2 no-underline flex items-center text-xs text-gray-600 font-semibold  capitalize'>Available Carbon Supply:</div>
                                <div className='w-[150px] ml-1'> <ProgressBar baseBgColor={'grey'} labelSize={'10px'} height={'15px'} bgColor={'#2D3B4F'} completed={widthPercentage} /> </div>


                            </div>
                        </div>

                        <div className=" absolute   bottom-[95px] py-1 text-center ">
                            <div className='text-white text font-bold text-sm'>
                                <div className=' text-xl  ml-2 mt-3 text-white font-bold '>{project.projectname}  </div>
                            </div>
                        </div>


                </div>


                </div>

                <div className="flex justify-end">



                    <Link  href={"./projects/" + props.project.id}>
                        <a className='mt-3 no-underline mb-3 mr-5 bg-logo-green  justify-center font-bold capitalize text-xs px-4 py-2
                         rounded shadow hover:shadow-md hover: mr-1 ease-linear transition-all duration-150'
                            >
                              <span className='text-white
                              '>More Details</span>
                        </a>
                    </Link>

                </div>



            </div>

    )

}



export default Card;