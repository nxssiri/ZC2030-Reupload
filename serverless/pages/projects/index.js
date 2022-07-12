import Card from "../../Components/Card";
import { getListedProjectsList } from "../../services/ProjectService";
import React from "react";

export default function Projects(props) {
  const allProjects = props.allProjects;
  console.log(allProjects[1])
  return (
      <div>
        <svg className='absolute w-full h-full' id="visual" viewBox="0 0 900 600" width="900" height="600" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg" version="1.1">
          <rect x="0" y="0" width="900" height="600" fill="#FFFFFF"/>
          <path d="M0 128L13.7 163.7C27.3 199.3 54.7 270.7 82 268.8C109.3 267 136.7 192 163.8 208.3C191 224.7 218 332.3 245.2 388.3C272.3 444.3 299.7 448.7 327 403.8C354.3 359 381.7 265 409 233.5C436.3 202 463.7 233 491 258.3C518.3 283.7 545.7 303.3 573 300.2C600.3 297 627.7 271 654.8 290.8C682 310.7 709 376.3 736.2 391.8C763.3 407.3 790.7 372.7 818 323.3C845.3 274 872.7 210 886.3 178L900 146" fill="none" stroke-linecap="round" stroke-linejoin="miter" stroke="#77C9D4" stroke-width="12"/>
        </svg>

        <div className='flex h-5/6'>
          <div className="m-auto z-20 justify-between w-full">
            <div className='z-50 justify-center'>
              <div className='hidden sm:block'>
                <div className="py-12 px-36">

                  <div className="  gap-4  ">

                    <div>
                      <h2 className='font-semibold text-3xl py-6 px-10 capitalize font-serif text-gray-700 '>
                        ZeroCarbon Projects
                      </h2>
                      <p className='text-sm text-gray-500 px-10'>
                        Showing {allProjects.length} projects
                      </p>
                    </div>

                    <div className=" grid lg:grid-cols-3 gap-10  ">

                      {allProjects.map((project) => (
                          <Card className='mt-5' project={project} />
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className='block sm:hidden px-0'>
                <div className="py-12">

                  <div className="  gap-4  ">

                    <div>
                      <h2 className='font-semibold text-3xl py-6 px-10 capitalize font-serif text-gray-700 '>
                        ZeroCarbon Projects
                      </h2>
                      <p className='text-sm text-gray-500 px-10'>
                        Showing {allProjects.length} projects
                      </p>
                    </div>

                    <div className=" grid lg:grid-cols-3 gap-10  ">

                      {allProjects.map((project) => (
                          <Card className='mt-5' project={project} />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
  );
}

export async function getServerSideProps() {
  const projectsRes = await getListedProjectsList();
  const allProjects = projectsRes.data;

  return {
    props: { allProjects },
  };
}
