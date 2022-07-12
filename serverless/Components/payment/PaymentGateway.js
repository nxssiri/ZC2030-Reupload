import React from "react";
import {PayPalButtons, PayPalScriptProvider} from "@paypal/react-paypal-js";
import {transferCarbonFromFarm} from "../../services/ProjectService";

export default function PaymentGateway(props) {
    const orderDetails = props.orderDetails
    const projectId = props.projectId
    const tonnesBuying = props.tonnesBuying

    return (

        <div>
            {/*Paypal Button*/}
            <PayPalScriptProvider
                options={{
                    "client-id": "AXEtfxC428uLLJR3HGUzT5ZywDHc3XeGG_ZUdXN41yspvFPvl1fLmcvNYHJlgQdLW5L6elWYHIMxQ1RQ",
                    currency: "GBP"
                }}>

                <PayPalButtons
                    createOrder={(data, actions) => {
                        return actions.order.create({
                            purchase_units: [
                                {
                                    amount: {
                                        currency_code: "GBP",
                                        value: `${orderDetails}`,
                                    },
                                },
                            ],
                        });
                    }}
                    onApprove={(data, actions) => {
                        return actions.order.capture().then((details) => {
                            //Call an API
                            //Send transfer token request and add to database
                            //Once transferred remove from database
                            const name = details.payer.name.given_name;
                            const today  = new Date();
                            const date = today.toLocaleDateString("en-US");
                            const data = [tonnesBuying,date, orderDetails, details.id];
                            transferCarbonFromFarm(data,projectId)
                            alert(`Transaction completed by ${name}`);

                        });
                    }}
                />
            </PayPalScriptProvider>

        </div>

    );
}
