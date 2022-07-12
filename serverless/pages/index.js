import styles from "../styles/Home.module.css";
import ProjectCard from "../Components/ProjectCard";
import {getListedProjectsList} from "../services/ProjectService";
import Link from "next/link";
import router from "next/router";

const calculatorImg = "/calculator-logo.png";
const discoverImg = "/discover-logo2.png";
const purchaseImg = "/purchase-logo.png";
const offsetImg = "/offset-logo.png";
const profileImg = "/profile-default.png";
const treeBackground = "/compressedBackground.mp4";


export default function Home(props) {
    const allProjects = props.allProjects;
    return (
        <div className={styles.container}>
            <div className='overflow-hidden fixed z-0 h-full pb-96'>
                <div className='bg-black'>
                    <video autoPlay loop muted className={styles.video}>
                        <source src={treeBackground} type="video/mp4"/>
                    </video>
                </div>

            </div>
            <main className='flex flex-col relative'>
                <div className='p-5 w-full flex justify-between h-5/6'>
                    <div className=''>
                        <div className={styles.summaryHeader}>
                            <h1 className='text-white uppercase font-semibold text-5xl font-light pb-8 pl-5'>Are you
                                carbon neutral?</h1>
                        </div>
                        <p className={styles.summaryPara}>
                            Carbon Neutrality is important. We all need to play our part in taking action to achieve our
                            long term well-being goals for a
                            Sustainable planet. The seven well-being goals, agreed by the Senedd through the Well-being
                            of
                            Future Generations Act provide us with a comprehensive framework for action to meet the
                            needs
                            of the present without compromising the ability of future generations to meet their needs.
                        </p>
                    </div>

                    <div className='hidden sm:block text-black text-2xl flex flex-col mx-20 pr-40'>
                        <div className={styles.prompts}>
                            <img
                                className={styles.promptImages}
                                src={calculatorImg}
                                srcSet={calculatorImg}
                                alt="Calculator"
                            />
                            <p className={styles.promptText}>Calculate</p>
                        </div>

                        <div className={styles.prompts}>
                            <img
                                className={styles.promptImages}
                                src={discoverImg}
                                srcSet={discoverImg}
                                alt="Discover"
                            />
                            <p className={styles.promptText}>Discover</p>
                        </div>

                        <div className={styles.prompts}>
                            <img
                                className={styles.promptImages}
                                src={purchaseImg}
                                srcSet={purchaseImg}
                                alt="Calculate"
                            />
                            <p className={styles.promptText}>Purchase</p>
                        </div>

                        <div className={styles.prompts}>
                            <img
                                className={styles.promptImages}
                                src={offsetImg}
                                srcSet={offsetImg}
                                alt="Calculate"
                            />
                            <p className={styles.promptText}>Offset</p>
                        </div>
                    </div>
                </div>

                <div className='min-h-1/3 p-3 text-black bg-white w-full overflow-x-auto'>
                    <div className='px-0 block md:hidden'>
                        <div className={styles.projectsHeader}>
                            <h1 className='text-black uppercase font-extralight pb-8 pl-5'>Newest Carbon Projects</h1>
                        </div>
                        <div style={{display: "flex", flexDirection: "column", width: "100%", overflow: "scroll"}}>
                            {allProjects.map((project) => (
                                // <ProjectCard project={project} key={project.name} />
                                <div className='py-2'>
                                    <ProjectCard project={project} key={project.name}/>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className='px-32 hidden md:block'>
                        <div className={styles.projectsHeader}>
                            <h1 className='text-black uppercase font-extralight pb-8 pl-5'>Newest Carbon Projects</h1>
                        </div>
                        <div className='flex overflow-x-scroll pb-10 scrollbar-hide'
                             style={{display: "flex", flexDirection: "row", width: "100%", overflow: "scroll"}}>
                            {allProjects.map((project) => (
                                // <ProjectCard project={project} key={project.name} />
                                <div style={{width: "50rem"}}>
                                    <ProjectCard project={project} key={project.name}/>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className='flex border-t-[1px] border-gray-200 pb-8'>

                        <div className=" ">
                            <img
                                src={'/hand.svg'}
                                className="hidden sm:block rounded-xl h-100 md:w[500px] lg:w-[1000px] flex items-center mb-8 px-16 justify-center"
                                alt="The team"
                            />
                        </div>
                        <div className="pl-20 mr-20 items-center  flex">
                            <div className=' justify-center'>
                                <h3 id="heading" className="text-4xl text-black font-bold">
                                    Calculate Your Footprint Now
                                </h3>
                                <p className="pt-4 text-xl text-gray-500 ">
                                    {" "}
                                    Then choose which projects can help you offset your emissions!

                                    <br />
                                </p>

                                <div className="flex justify-center ">
                                    <br/>

                                    <button onClick={() =>{ router.push('/calculator');}}
                                        className=" mt-4 -ml-1 flex items-center text-sm font-medium
                                      mr-6 text-white bg-blue-500 hover:bg-blue-700  font-medium rounded-lg text-sm px-3 py-1 text-center mr-2 mb-2">
                                                <span className="ml-1 font-bold">Calculate</span>
                                    </button>

                                    <button
                                        className=" mt-4 ml-5  flex items-center text-sm font-medium text-white bg-green-500 hover:bg-green-400  font-medium rounded-lg text-sm px-4 py-2.5 text-center mr-2 mb-2 "
                                        onClick={() =>{ router.push('/projects');
                                        }
                                        }
                                    >
                                        <span className="ml-1 font-bold">Projects</span>
                                    </button>
                                </div>
                            </div>



                        </div>
                        {/*<p className="text-grey-400  px-9 text-xl">*/}
                        {/*  View our <a href="/calculator">Calculator</a> page to calculate your carbon footprint - then choose which <a href="/projects">Projects</a> can help you offset your emissions!*/}
                        {/*</p>*/}



                    </div>

                </div>



                <div className={styles.teamBackground}>
                    <div className="h-fit py-3">
                        <div className='hidden sm:block px-32'>
                            <h1 className="text-black uppercase font-extralight pb-8 pl-5">Who's involved?</h1>

                            <div className='overflow-scroll flex flex-row w-full scrollbar-hide'>
                                <div className="bg-white font-semibold text-center rounded-3xl border w-96 p-8 mx-2">
                                    <img className="mb-3 w-32 h-32 rounded-full shadow-lg mx-auto mx-2"
                                         src={'/peterTrott.jpg'}
                                         alt="CEO"/>
                                    <h1 className="text-lg text-gray-700"> Peter Trott </h1>
                                    <h3 className="text-sm text-gray-400 px-16"> CEO </h3>
                                </div>

                                <div className="bg-white font-semibold text-center rounded-3xl border w-96 p-8 mx-2">
                                    <img className="mb-3 w-32 h-32 rounded-full shadow-lg mx-auto mx-2"
                                         src={'/alfredB.jpg'}
                                         alt="CEO"/>
                                    <h1 className="text-lg text-gray-700"> Alfred Bwomezi </h1>
                                    <h3 className="text-sm text-gray-400 px-16"> CEO </h3>
                                </div>

                                <div className="bg-white font-semibold text-center rounded-3xl border w-96 p-8 mx-2">
                                    <img className="mb-3 w-32 h-32 rounded-full shadow-lg mx-auto mx-2"
                                         src={'/alun.jpg'}
                                         alt="CEO"/>
                                    <h1 className="text-lg text-gray-700"> Alun Jones </h1>
                                    <h3 className="text-sm text-gray-400 px-16"> CEO </h3>
                                </div>

                                <div className="bg-white font-semibold text-center rounded-3xl border w-96 p-8 mx-2">
                                    <img className="mb-3 w-32 h-32 rounded-full shadow-lg mx-auto mx-2"
                                         src={profileImg}
                                         srcSet={profileImg}
                                         alt="CEO"/>
                                    <h1 className="text-lg text-gray-700"> Tim Edwards </h1>
                                    <h3 className="text-sm text-gray-400 px-16"> CEO </h3>
                                </div>

                            </div>
                        </div>


                        <div className='block sm:hidden px-0'>
                            <h1 className="text-black uppercase font-extralight pb-8 pl-5">Who's involved?</h1>

                            <div className='overflow-scroll flex flex-row w-full'>

                                <div className="bg-white font-semibold text-center rounded-3xl border w-96 p-8 mx-2">
                                    <img className="mb-3 w-32 h-32 rounded-full shadow-lg mx-auto mx-2"
                                         src={'/peterTrott.jpg'}
                                         srcSet={profileImg}
                                         alt="CEO"/>
                                    <h1 className="text-lg text-gray-700"> Peter Trott </h1>
                                    <h3 className="text-sm text-gray-400 px-16"> CEO </h3>
                                </div>

                                <div className="bg-white font-semibold text-center rounded-3xl border w-96 p-8 mx-2">
                                    <img className="mb-3 w-32 h-32 rounded-full shadow-lg mx-auto mx-2"
                                         src={'/alfredB.jpg'}
                                         srcSet={profileImg}
                                         alt="CEO"/>
                                    <h1 className="text-lg text-gray-700"> Alfred Bwomezi </h1>
                                    <h3 className="text-sm text-gray-400 px-16"> CEO </h3>
                                </div>

                                <div className="bg-white font-semibold text-center rounded-3xl border w-96 p-8 mx-2">
                                    <img className="mb-3 w-32 h-32 rounded-full shadow-lg mx-auto mx-2"
                                         src={'/alun.jpg'}
                                         srcSet={profileImg}
                                         alt="CEO"/>
                                    <h1 className="text-lg text-gray-700"> Alun Jones </h1>
                                    <h3 className="text-sm text-gray-400 px-16"> CEO </h3>
                                </div>

                                <div className="bg-white font-semibold text-center rounded-3xl border w-96 p-8 mx-2">
                                    <img className="mb-3 w-32 h-32 rounded-full shadow-lg mx-auto mx-2"
                                         src={profileImg}
                                         srcSet={profileImg}
                                         alt="CEO"/>
                                    <h1 className="text-lg text-gray-700"> Tim Edwards </h1>
                                    <h3 className="text-sm text-gray-400 px-16"> CEO </h3>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

export async function getServerSideProps() {
    const projectsRes = await getListedProjectsList();
    const allProjects = projectsRes.data.slice(-5);

    return {
        props: {allProjects},
    };
}
