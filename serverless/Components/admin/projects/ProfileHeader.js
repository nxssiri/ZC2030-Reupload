import {React, useContext} from "react";

import CreateProject from "./CreateProject";
import {ViewContext} from "../../../Contexts/ViewContext";


import CurrentProject from "./CurrentProject";
import EditProject from "./EditProject";

const ProfileHeader= (props) => {

    const allProjects= props.projects
    const {setView} = useContext(ViewContext);
    const {view} = useContext(ViewContext);

    const {editPrj} = useContext(ViewContext);

    console.log(view)



    return(


            <div className="bg-blue-500 md:w-8/12 h-[200px] lg:w-9/12 m-10  rounded  ">



            </div>

    )

}


export default ProfileHeader;