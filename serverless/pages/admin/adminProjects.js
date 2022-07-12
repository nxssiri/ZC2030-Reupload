import AdminSidebar from "../../Components/admin/AdminSidebar";
import AdminProjectsLayout from "../../Components/admin/projects/adminProjectsLayout";
import React from "react";
import {getProjectsList} from "../../services/ProjectService";
import Sidebar from "../../Components/admin/projects/Sidebar";

export default function adminProjects(props) {

    const allProjects = props.allProjects;

    return (
        <div className=" flex ">
            {/*<AdminSidebar/>*/}
            {/*<AdminSidebar/>*/}
            <Sidebar/>
            <AdminProjectsLayout projects={allProjects}/>

        </div>
    );
}

export async function getServerSideProps() {
    const projectsRes = await getProjectsList();
    const allProjects = projectsRes.data;


    return {
        props: {allProjects}
    };
}

