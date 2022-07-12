import AdminCard from "./AdminCard";
import React, {useContext} from "react";
import BlankCard from "./BlankCard";
import {ViewContext} from "../../../Contexts/ViewContext";


const CurrentProject = (props) => {

    const allProjects = props.projects
    const {setView} = useContext(ViewContext);
    const {view} = useContext(ViewContext);

    function changeView() {
        console.log("hello")
        setView('current projects')
        console.log(view)
    }

     return   (
            <div>
                <div>
                    <h4 className='font-semibold text-xl py-6 capitalize font-serif text-gray-700 text-2xl px-10 '>
                        Current Projects
                    </h4>
                </div>


                <div className="flex overflow-x-scroll pb-10 scrollbar-thin scrollbar-track-transparent hover:scrollbar-track-gray-100 scrollbar-thumb-rounded-md scrollbar-thumb-transparent hover:scrollbar-thumb-blue-300">
                    <div onClick={()=> setView('create project')}>
                        <BlankCard onClick={changeView()}/>
                    </div>

                    <div className="flex flex-nowrap lg:ml-5 md:ml-5 ml-5 ">
                        {allProjects.map((project) => (
                            // <ProjectCard project={project} key={project.name} />
                            <AdminCard project={project} viewtype={'admin'} />

                        ))}
                    </div>
                </div>
            </div>)

}

export default CurrentProject;
