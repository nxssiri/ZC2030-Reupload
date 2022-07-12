import { signIn, signOut, useSession } from "next-auth/react";
import { IoMdWallet } from "react-icons/io";
import Link from "next/link";
import router from "next/router";

function LoginPage() {
  const { data: session } = useSession();

  if (session) {
    return (
      <div className="flex ">
        <br/>
          { session.user.role != 'ADMIN' &&
        <button className=" mt-4 -ml-1 flex items-center text-sm font-medium  mr-6 text-white bg-blue-500 hover:bg-blue-700  font-medium rounded-lg text-sm px-3 py-1 text-center mr-2 mb-2">
          <IoMdWallet className="" />

          <Link href="/wallet">
            <a className="text-white no-underline ">
              <span className="ml-1">Wallet</span>
            </a>
          </Link>
        </button>}

          { session.user.role === 'ADMIN' &&
          <button className=" mt-4 -ml-1 flex items-center text-sm font-medium  mr-6 text-white bg-blue-500 hover:bg-blue-700  font-medium rounded-lg text-sm px-3 py-1 text-center mr-2 mb-2">
              <IoMdWallet className="" />

              <Link href="/adminDashboard">
                  <a className="text-white no-underline ">
                      <span className="ml-1">AdminDashboard</span>
                  </a>
              </Link>
          </button>}

        <button
          className=" mt-4 -ml-1 flex items-center text-sm font-medium text-white bg-green-500 hover:bg-green-400  font-medium rounded-lg text-sm px-2 py-2.5 text-center mr-2 mb-2 "
          onClick={() =>{ router.push('/');
            signOut(null)}
          }
        >
          <span className="ml-1">Sign out</span>
        </button>
      </div>
    );
  }
  return (
    <>
      {/*TODO: Remove In-Line Styling - Mix Bootstrap and External Styling?*/}
      <button
        className=" mt-4 -ml-1 flex items-center text-sm font-medium text-white bg-green-500 hover:bg-green-400  font-medium rounded-lg text-sm px-2 py-2.5 text-center mr-2 mb-2"
        onClick={() => signIn()}
      >
        Sign in
      </button>
    </>
  );
}
export default LoginPage;
