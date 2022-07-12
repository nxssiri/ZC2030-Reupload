import React, {useContext} from "react";
import {ViewContext} from "../../../Contexts/ViewContext";


const Card = (props) => {
    const project= props.project
    const {setView} = useContext(ViewContext);
    const {setEditPrj} = useContext(ViewContext);
    const viewType = props.viewtype
    console.log(viewType)
    // function changeView() {
    //     setEditPrj(project)
    //     setView('edit')
    // }
        // storing input name

    console.log(project)

    console.log(project)



    return(
        <div className="h-full inline-block px-3 border-gray-300 border-dashed">


            <div className=" p-3 h-full mt-1 flex justify-center border-2 border-gray-300 border-dashed rounded-md w-80 static h-100 max-w-xs hover:cursor-pointer border-gray-300 border-dashed overflow-hidden rounded-lg shadow-md bg-white hover:shadow-xl hover:scale-104 transition duration-200 ease-in-out">

                    <div className=" ">
                        <div className="space-y-1 text-center">
                            <div className=" mt-3 mb-3 mr-5 bg-green-500  justify-center text-white font-bold capitalize text-xs px-4 py-2
                         rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                                type="button" >
                                Create Project
                            </div>
                            <svg className="h-full mx-auto w-full text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                                <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>

                        </div>
                    </div>

            </div>
        </div>

    )

}



export default Card;