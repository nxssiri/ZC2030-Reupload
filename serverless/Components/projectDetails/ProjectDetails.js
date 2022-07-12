import ProjectImageCard from "./ProjectImageCard";
import AboutProject from "./AboutProject";
import BuyCard from "./BuyCard";
import Map from "./Map";
import {MdLocationOn} from "react-icons/md";

function ProjectDetails(props) {

    const lat = props.detailsProps.latitude;
    const lng = props.detailsProps.longitude;
    const location = {lat, lng};
    const details = props.detailsProps;

  const imgs = [
    details.projectimage1,
    details.projectimage2,
    details.projectimage3,
    details.projectimage4,
    details.projectimage5
  ];

    return (
        <div className="lg:flex lg:items-center lg:justify-between container mx-auto ">
            <div className="flex-1 min-w-0">
                <main className="lg:w-[1000px] lg:mx-auto" >
                    {/*Name*/}
                    <div className=' mt-10'>
                        <h1 className="text-[42px] font-semibold leading-7 text-gray-900 sm:text-3xl capitalize sm:truncate">{props.detailsProps.projectname}</h1>

                            <div className="mt-1 flex flex-col sm:flex-row sm:flex-wrap sm:mt-0 sm:space-x-6">
                                <div className="mt-2 flex items-center text-sm text-gray-500 underline border-b mb-2 border-[#F2F2F2] capitalize">
                                    {/*location*/}
                                    <MdLocationOn className="flex-shrink-0 mr-1.5 h-5 w-5 text-red-400" aria-hidden="true" />
                                    {props.detailsProps.streetname} | {props.detailsProps.city} {props.detailsProps.county} {props.detailsProps.country}
                                </div>


                            </div>
                        </div>

                        <section>

                            <div className=" mt-3">

                                <div className='md:hidden'>
                                    <ul className='flex overflow-x-auto gap-6 snap-x snap-mandatory'>
                                        {imgs.map((image,index) => (
                                            <li  className='shrink-0 snap-center'>
                                                <ProjectImageCard key={index} img={image}/>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            <div className="hidden md:block  ">
                                <div className="grid-cols-4 space-y-2 md:space-y-0 md:grid md:gap-3  ">
                                    <div className=" w-full col-span-2 bg-yellow-600 row-span-2 rounded ">
                                        <img className='rounded-xl h-full object-cover hover:scale-105 transition duration-200 ease-in-out'
                                            src={details.projectimage1}
                                            alt="image"/>
                                    </div>
                                    <div className=" w-full   rounded ">
                                        <img className='rounded-xl h-full object-cover  hover:scale-105 transition duration-200 ease-in-out'
                                             src={details.projectimage2}
                                             alt="image"/>
                                    </div>
                                    <div className="w-full h-full rounded ">
                                        <img className='rounded-xl h-full object-cover hover:scale-105 transition duration-200 ease-in-out'
                                             src={details.projectimage3}
                                            alt="image"/>
                                    </div>
                                    <div className="w-full h-full rounded ">
                                        <img className='rounded-xl h-full object-cover hover:scale-105 transition duration-200 ease-in-out'
                                             src={details.projectimage4}
                                            alt="image"/>
                                    </div>
                                    <div className="w-full h-full rounded ">
                                        <img className ='rounded-xl h-full object-cover hover:scale-105 transition duration-200 ease-in-out'
                                             src={details.projectimage5}
                                            alt="image"/>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/*ABOUT Project*/}
                        <div className='mt-4 border-t border-[#F2F2F2] p-4'>
                            {/*BUY Carbon*/}
                            <div className="mt-1 md:hidden">
                                <div className=''>
                                    <h2 className="font-bold  mb-1 text-[34px] text-green-600 pb-3 ">
                                        £{props.detailsProps.cptgbp}
                                        <span className="text-base text-body-color text-black  font-medium">/ tCo2e
                                         </span>
                                        </h2>
                                        <p className='font-semibold text-gray-400'> Total Supply: {props.detailsProps.totalsupply} </p>
                                        <p className='font-semibold text-gray-400' > Available Supply: {props.detailsProps.remainingsupply} </p>
                                        <p className='font-bold'>How many tonnes of carbon would you like to buy?</p>
                                        <input className='w-full form-control border border-solid border-gray-300 rounded block px-6 py-2.5 mb-3' type="number" placeholder='/tonnes'/>
                                        <button type="button"
                                                className="mb-2 w-full inline-block px-6 py-2.5 bg-green-500 text-white font-medium
                                             text-xs leading-normal uppercase rounded shadow-md hover:bg-green-800 hover:shadow-lg
                                            focus:bg-green-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-green-800
                                              active:shadow-lg transition duration-150 ease-in-out">Buy Carbon
                                        </button>
                                    </div>
                                </div>
                                {/*Header*/}
                                <div className='flex'>
                                    <div className="w-full sm:w-2/3">
                                        <AboutProject detailsProps={details} />
                                    </div>
                                    <div className="hidden md:block w-2/5">
                                        <BuyCard detailsProps={details} />
                                    </div>
                                </div>
                                {/*Where are we based?*/}
                                <div>
                                    <h3 className='flex justify-between items-center py-3 w-full font-normal text-left text-gray-900 rounded-t-xl  '>
                                        <span>Where are we based ?</span>
                                    </h3>
                                    <div className="mt-2 flex items-center text-sm text-gray-500 border-b border-[#F2F2F2] capitalize">
                                        {/*location*/}
                                        <MdLocationOn className="flex-shrink-0 mr-1.5 h-5 w-5 text-red-400" aria-hidden="true" />
                                        {props.detailsProps.streetname} | {props.detailsProps.city} {props.detailsProps.county} {props.detailsProps.country}
                                    </div>
                                    <Map location={location} />
                                    <div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </main>
                </div>
        </div>
    )
}

export default ProjectDetails;
