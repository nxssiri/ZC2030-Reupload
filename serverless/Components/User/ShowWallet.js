import Image from "@material-tailwind/react/Image";

const logo = "/cz2030_logo.png";
import Icon from "@material-tailwind/react/Icon";
import {FaEthereum} from "react-icons/fa";
import H6 from "@material-tailwind/react/Heading6";
import {useSession} from "next-auth/react";
import {data} from "autoprefixer";
import {useState, useEffect} from "react";
import Link from "next/link";
import TransactionRow from "../wallet/TransactionRow";
import WalletProjectCard from "../wallet/WalletProjectCard";

const ShowWallet = (props) => {
    const balance = props.balance;
    const transactions = props.transactions
    const projects = props.projects
    const blockchainTxs = props.blockchainTxs
    const {data: session} = useSession();
    const logo = "/cz2030_logo.png";
    const [view, setView] = useState("wallet");
    const setToWallet = () => {
        setView("wallet");
    };
    const setToHistory = () => {
        setView("history");
    };
    if (session) {

        return (
            <>
                <div className="flex flex-wrap justify-center">
                    <div className="w-full lg:w-3/12 px-4 lg:order-2 flex justify-center">
                        <div className="relative">
                            <div className="bg-white w-40 -mt-20 border rounded-full ">
                                <Image
                                    className="w-96"
                                    src={session?.user.image}
                                    alt="Profile picture"
                                    raised
                                    rounded

                                />
                            </div>
                        </div>
                    </div>

                    <div
                        className="w-full lg:w-4/12 px-4 lg:order-3 lg:self-center flex justify-center mt-10 lg:justify-end lg:mt-0">
                        {/*<div className="btn border-blue-500 " type="button">*/}
                        {/*    <Icon size="lg"/> Settings*/}
                        {/*</div>*/}
                    </div>

                    <div className="w-full lg:w-4/12 px-4 lg:order-1">
                        <div className=" flex justify-center py-4 lg:pt-4 pt-8">
                            <div className="mr-4 p-3 text-center ">
                                <div className="inline-flex rounded-md shadow-sm" role="group">
                                    <div
                                        className="py-2 px-4 text-sm font-medium text-gray-900 bg-white rounded-l-lg border border-gray-200  "
                                    >
                  <span className="text-xl font-bold block uppercase tracking-wide text-gray-900">
                    {balance}
                  </span>
                                        <span className="text-sm text-gray-700">
                    ZeroCarbon Credits
                  </span>
                                    </div>

                                    <div
                                        className="py-2 px-4 text-sm font-medium text-gray-900 bg-white rounded-r-md border border-gray-200   "
                                    >
                  <span className="text-xl font-bold block uppercase tracking-wide text-gray-900">
                    {projects.length}
                  </span>
                                        <span className="text-sm text-gray-700">Projects</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="text-center my-8">
                    <H6 color="gray">{session?.user.name}</H6>
                    <div className="mt-0 mb-2 text-gray-700  flex items-center justify-center gap-2">
                        <FaEthereum name="place" size=""/>
                        <span className="text-tahiti truncate ... text-cyan-400 ">
              <a
                  target="_blank"
                  className="nav-link text-gray-500 hover:text-gray-700 focus:text-gray-700 p-0"
                  href={"https://mumbai.polygonscan.com/token/0x26b82ef7812d5d2f4ca3bd8140fc5642702d9e0e?a=0x" + session?.user.walletAddress}
              >
                0x{session?.user.walletAddress}
              </a>
          </span>
                    </div>
                </div>
                <div className="flex justify-center gap-x-40 ">
                    <div className="mb-2 text-gray-700 flex items-center justify-center gap-2">
                        <button
                            className="font-medium text-center text-gray-500 rounded-t-lg border-b-2
                                                border-transparent hover:text-blue-700 hover:border-blue-700 "
                            aria-current="page"
                            onClick={() => setToWallet()}
                        >
                            Projects
                        </button>
                    </div>
                    <div className="mb-3 text-gray-700 text-center  gap-6">
          <span>
            <button
                className="font-medium text-center text-gray-500 rounded-t-lg border-b-2
                                              border-transparent hover:text-blue-700 hover:border-blue-700 "
                onClick={() => setToHistory()}
            >
              History
            </button>
          </span>
                    </div>
                </div>

                <div className="mb-10 py-2 border-t border-gray-200 text-center">
                    {/*//show create item*/}
                    <>
                        {view === "wallet" && (
                            // <AddTripButton addTrip={() => setState('add-trip') } />
                            <>

                                {/*Get the list of transactions from polyscan with our address*/}
                                {/*Map transactions to project in database*/}
                                {/*Output summary*/}

                                <div className='flex flex-col sm:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
                                    {projects.map((project, index) =>
                                        <WalletProjectCard
                                            key={index}
                                            projectName={project.project.projectname}
                                            projectImg={project.project.projectimage1}
                                            city={project.project.city}
                                            country={project.project.country}
                                            county={project.project.county}
                                            totalSupply={project.project.totalsupply}
                                            owned={blockchainTxs[`0x${project.project.publicAddress}`]}
                                            id={project.project_id}
                                            amountTonnes={project.amountTonnes}
                                            remainingSupply={project.project.remainingsupply}
                                        />
                                    )}
                                </div>

                            </>
                        )}
                    </>

                    {/*//show wallet*/}
                    <>
                        {view === "history" && (
                            <div className="container mx- justify-center">
                                <section className="w-full">
                                    <div className="flex flex-col justify-center h-full w-full">
                                        <div
                                            className="w-full mx-auto bg-white rounded-sm border border-zc30-green">
                                            <header className="px-5 py-4 border-b border-gray-100">
                                                <h2 className="font-semibold text-gray-800">Transaction History</h2>
                                            </header>
                                            <div className="p-3">
                                                <div className="overflow-x-auto">
                                                    <table className="table-auto w-full">
                                                        <thead
                                                            className="text-xs font-semibold uppercase text-gray-400 bg-gray-50">
                                                        <tr>
                                                            <th className="p-2 whitespace-nowrap">
                                                                <div className="font-semibold text-left">Name</div>
                                                            </th>
                                                            <th className="p-2 whitespace-nowrap">
                                                                <div className="font-semibold text-left">Tonnes</div>
                                                            </th>
                                                            <th className="p-2 whitespace-nowrap">
                                                                <div className="font-semibold text-left">Spent</div>
                                                            </th>
                                                            <th className="p-2 whitespace-nowrap">
                                                                <div className="font-semibold text-center">Date</div>
                                                            </th>
                                                            <th className="p-2 whitespace-nowrap">
                                                                <div className="font-semibold text-center">Status</div>
                                                            </th>
                                                        </tr>
                                                        </thead>
                                                        <tbody className="text-sm divide-y divide-gray-100">


                                                        {transactions.map((transaction, index) =>
                                                                <TransactionRow key={index} name={transaction.project.projectname} tonnes={transaction.amountTonnes} status={transaction.status} date={transaction.date} cost={transaction.amountGbp} imageurl={transaction.project.ownerpicture}/>
                                                        )}

                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </section>
                            </div>


                        )}
                    </>


                </div>
            </>
        );
    } else {
        return (<div>Error</div>)
    }
};

export default ShowWallet;
