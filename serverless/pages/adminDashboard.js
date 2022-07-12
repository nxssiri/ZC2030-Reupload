
import {getUserData, getAdminData, } from "../services/adminService";
import AccountDashboard from "../Components/admin/AdminPages/accountDashboard";
import ShowCalculators from "../Components/admin/AdminPages/showCalculators";
import {getCalculatorTypes, getCalculatorTypesForUser, getPublicCalculatorTypes} from "../services/CalculatorService";
import {  useState, useMemo } from 'react';
import Sidebar from "../Components/admin/projects/Sidebar";
import {getProjectsList} from "../services/ProjectService";
import AdminProjectsLayout from "../Components/admin/projects/adminProjectsLayout";
import {DashboardViewContext} from "../Contexts/DashboardViewContext";

import {getSession} from "next-auth/react";

export default function adminDashboard(props) {


    const allProjects = props.allProjects;

    const [dashboardView, setDashboardView] = useState('projects');
    const value = useMemo(
        () => ({ dashboardView, setDashboardView }),
        [dashboardView]
    );
    // function showUserPage() {
    //     setCalculatorVisibility(false);
    //     setUserVisibility(true);
    // }
    //
    // function showCalculatorPage() {
    //     setUserVisibility(false);
    //     setCalculatorVisibility(true);
    // }

  return (
    <DashboardViewContext.Provider value={value} >
        <div className=" flex ">
            {/*<AdminSidebar/>*/}
            {/*<AdminSidebar/>*/}
            <Sidebar/>

            {/*users*/}
            {dashboardView === 'users'&&
            <AccountDashboard users={props.users} admins={props.admins} />}

            {/*calculator*/}
            {dashboardView ===  'calculator' &&
            <ShowCalculators types={props.types} />}

            {/*projects*/}
            { dashboardView ===  'projects' &&
            <AdminProjectsLayout projects={allProjects}/>}

        </div>

      </DashboardViewContext.Provider >
        );
}

// This gets called at build time
export async function getServerSideProps(context) {

    const session = await getSession(context);

  // Adds all users types in a list
  const userRes = await getUserData();
  const users = userRes.data;

  //gets project data
  const projectsRes = await getProjectsList();
  const allProjects = projectsRes.data;


    // Adds all admins types in a list
  const adminRes = await getAdminData();
  const admins = adminRes.data;

  const data = [session]
    const typesRes = await getCalculatorTypes(data)
    const types = typesRes.data



  // Pass post data to the page via props
  return { props: { allProjects, users, admins, types } };
}
