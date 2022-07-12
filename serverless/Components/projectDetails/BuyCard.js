import ProgressB from "./ProgressB";
import {PayPalButtons, PayPalScriptProvider} from "@paypal/react-paypal-js";
import React, {useState} from 'react';
import PaymentGateway from "../payment/PaymentGateway";
import {signIn, useSession} from "next-auth/react";

const BuyCard = (props) => {
    const [tonnesBuying, setTonnesBuying] = useState(1);
    const [displayPaymentGateway, setDisplayPaymentGateway] = useState(false);
    let paymentDiv;
    const remainingSupply = Number(props.detailsProps.balance)
    const projectId = props.detailsProps.id
    const {data: session} = useSession();

    const showPaymentGateway = () => {

        if (tonnesBuying <= 0.1) {
            alert("Cannot purchase less than 0.1 Tokens")
            setTonnesBuying(0.1)
        } else if (tonnesBuying > remainingSupply) {
            alert("Cannot exceed maximum supply")
            setTonnesBuying(remainingSupply)
            // setDisplayPaymentGateway(true)
        } else {
            setDisplayPaymentGateway(true)
        }
    }

    const hidePaymentGateway = () => {
        setDisplayPaymentGateway(false)
    }
    if (session) {
        if (!displayPaymentGateway) {
            paymentDiv = (
                <div>
                    <p className="font-bold">
                        How many tonnes of carbon would you like to buy?
                    </p>
                    <input
                        className="w-full form-control border border-solid border-gray-300 rounded block px-6 py-2.5 mb-3"
                        type="number"
                        placeholder="tonnes"
                        value={tonnesBuying}
                        onChange={(e) => handleTonnesChanged(e)}
                        min={0}
                        max={remainingSupply}
                    />

                    <button onClick={showPaymentGateway}
                            type="button"
                            className="mb-2 w-full inline-block px-6 py-2.5 bg-green-500 text-white font-medium
                    text-s leading-normal uppercase rounded shadow-md hover:bg-green-800 hover:shadow-lg
                    focus:bg-green-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-green-800
                    active:shadow-lg duration-150 ease-in-out capitalize"
                    >
                        Purchase
                    </button>
                </div>
            )
        } else {
            paymentDiv = (
                <div>
                    <p className="font-bold">
                        Purchasing: {tonnesBuying} tCO2e
                    </p>
                    <p className="font-bold">
                        Total To Pay: £{(props.detailsProps.cptgbp * tonnesBuying)}
                    </p>
                    <button onClick={hidePaymentGateway}
                            type="button"
                            className="mb-2 w-full inline-block px-6 py-2.5 bg-green-500 text-white font-medium
                    text-s leading-normal uppercase rounded shadow-md hover:bg-green-800 hover:shadow-lg
                    focus:bg-green-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-green-800
                    active:shadow-lg duration-150 ease-in-out capitalize"
                    >
                        Change Purchase Amount
                    </button>
                    <PaymentGateway orderDetails={(props.detailsProps.cptgbp * tonnesBuying)}
                                    tonnesBuying={tonnesBuying} projectId={projectId}></PaymentGateway>
                </div>
            )
        }
    } else {
        paymentDiv = (
            <button
                className="btn btn-secondary capitalize"
                style={{marginTop: "30px", background: "#57BC90"}}
                onClick={() => signIn()}
            >
                Sign in to purchase offset
            </button>
        )
    }

    function handleTonnesChanged(event) {
        //If enters too much
        //alert "too high"
        const amount = event.target.value;


        if (amount > remainingSupply) {
            console.log(remainingSupply)
            alert("Cannot purchase more than remaining supply")
            setTonnesBuying(remainingSupply)
        } else {
            console.log(remainingSupply)

            setTonnesBuying(event.target.value)
        }
    }


    return (
        <div className="w-96  px-4">
            <div
                className="
               bg-white
               rounded-xl
               relative
               z-10
               overflow-hidden
               border border-black border-opacity-20
               shadow-pricing
               py-10
               px-8
               sm:p-12
               lg:py-10 lg:px-6
               xl:p-12

               bg-white rounded-xl transform
             duration-300 shadow-lg
             hover:shadow-2xl hover:font-bold"
            >
                <h2 className="font-bold  mb-1 text-[34px] text-green-600 pb-3 ">
                    £{props.detailsProps.cptgbp}
                    <span className="text-base text-body-color text-black  font-medium">
            / tCo2e
          </span>
                </h2>
                <p className="font-semibold text-gray-400">
                    {" "}
                    Total Supply: {props.detailsProps.totalsupply}{" "}
                </p>
                <p className="font-semibold text-gray-400">
                    {" "}
                    Available Supply: {remainingSupply}{" "}
                </p>

                {paymentDiv}            </div>
        </div>
    );
}

export default BuyCard;
