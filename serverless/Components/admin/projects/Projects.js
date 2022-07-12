import {React, useContext} from "react";

import CreateProject from "./CreateProject";
import {ViewContext} from "../../../Contexts/ViewContext";


import CurrentProject from "./CurrentProject";
import EditProject from "./EditProject";

const Projects= (props) => {

    const allProjects= props.projects
    const {setView} = useContext(ViewContext);
    const {view} = useContext(ViewContext);

    const {editPrj} = useContext(ViewContext);

    console.log(view)



    return(

        <div>
            <div className=" border shadow border-gray-800 w-[100%] rounded  ">

                <div className="flex justify-between mb-2" >
                    <h3 className='font-bold py-6 capitalize font-serif text-gray-700 text-2xl px-10 '>
                        Admin project Dashboard
                    </h3>

                    <div>
                        <button onClick={() => setView('current projects')} className='mt-4 p-4 mr-10 bg-blue-500 hover:bg-blue-700 text-white font-bold capitalize text-xs px-4 p-1 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150'>
                            Current projects</button>

                    </div>


                    </div>

                <div className=''>

                    { view === 'current projects' ? <CurrentProject projects={allProjects}/> : view === 'create project' ? <CreateProject /> : view === 'edit' ? <EditProject projects={editPrj}/> : "loading ..."}

                </div>


            </div>


        </div>

    )

}


export default Projects;