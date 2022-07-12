import ShowWallet from "../Components/User/ShowWallet";
import Image from "@material-tailwind/react/Image";
import {getSession} from "next-auth/react";
import {getZCTBalance} from "../services/ZCTService";
import {
    fetchBlockchainTransactionsByAddress,
    fetchProjectsByAddress,
    fetchTransactionsByAddress
} from "../services/ProjectService";

export default function Wallet(props) {
  const logo = "/cz2030_logo.png";
  const balance = props.balance;
  const transactions = props.transactions;
  const projects = props.projects;
  const blockchainTxs = props.blockchainTxs;
  return (
    <div>
      <div className="relative block h-[450px] bg-green-300 ">
        <Image
          className=" h-[450px]"
          src="/background.jpg"
          alt="Profile picture"
          raised
          rounded
        />
      </div>

      <div>
        <section className="relative py-16 bg-gray-100">
          <div className="container max-w-7xl px-4 mx-auto">
            <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-2xl -mt-64">
              <div className="px-6">
                <ShowWallet balance={balance} transactions={transactions} projects={projects} blockchainTxs={blockchainTxs}/>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
    const session = await getSession(context);
    let balance = 0;
    let transactions = []
    let allProjects = []
    let projects = []
    let blockchainTxs = []
    if (session){
        balance = await getZCTBalance(`0x${session.user.walletAddress}`)
        transactions = (await fetchTransactionsByAddress(session.user.id)).data;
        allProjects = (await fetchProjectsByAddress(session.user.id)).data;
        blockchainTxs = (await fetchBlockchainTransactionsByAddress(session.user.walletAddress)).data;
    }

    for (let i = 0; i < allProjects.length; i++){
        let isDuplicate = projects.some(item => item.project.id === allProjects[i]?.project?.id)
        if (isDuplicate){

        } else {
            projects.push(allProjects[i])
        }
    }
    // console.log("111")
    // console.log(projects[0].project.publicAddress)
    // console.log(blockchainTxs)

    return {props:{balance: balance, transactions:transactions, projects:projects, blockchainTxs: blockchainTxs}}
}