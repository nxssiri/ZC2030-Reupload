import {getSession, useSession} from "next-auth/react";
import styles from "../../styles/Calculator.module.css";
import EditCalculatorOverview from "../../Components/admin/calculators/EditCalculatorOverview";

export default function addCalculator(props) {
    const types = props.types;
    const categories = props.categories;
    const inputs = props.inputs;
    const categoriesCount = props.categoriesCount;
    // const { data: session } = useSession();
    let userId = null;
    // if (session) {
    //     userId = session.user.id;
    // }
    const background3 = "/calculator_background_3.jpg";

    return (
        <div>
            <h1 data-testid="main_heading">Carbon Calculators</h1>
            <div
                className={styles.container}
                style={{backgroundImage: `url(${background3})`}}
            >
                <div className="container-md">
                    <h1 style={{paddingTop: "4%"}}>Create Calculator</h1>
                    <EditCalculatorOverview
                        details={{id: "", name: "", public: false}}
                        users={[]}
                        categories={[]}
                        inputs={[]}
                    />
                </div>
            </div>
        </div>
    )
}

// This gets called at build time
export async function getServerSideProps(context) {
    let categories = [];
    let categoriesCount = [];
    let inputs = [];
    let typeId = [];
    let categoryId = [];
    // const session = await getSession(context);
    // let userId = null;
    // if (session) {
    //     userId = session.user.id;
    // }

    // Adds all Calculator types in a list
    // const typesRes = await getCalculatorTypes();
    // const types = typesRes.data;

    // Adds the IDs of calculators in a list
    // types.map((type) => {
    //     typeId.push(type.id);
    // });

    // Add Calculator Categories into categories for every id of calculators
    // for (let i = 0; i < typeId.length; i++) {
    //     const res = await getCalculatorCategories(typeId[i]);
    //     const calculatorCategories = res.data;
    //     if (userId != null) {
    //         // categoriesCount.push(await calculatorCategories.map(it => getUserCategoryProgress(userId, it.id)))
    //         // categoriesCount.push((await getUserCategoryProgress("cl0h963z10006rwqni8sc891f", 1)).data.count)
    //         const temp = [];
    //         for (let j = 0; j < calculatorCategories.length; j++) {
    //             temp.push(
    //                 (
    //                     await getUserCategoryProgress(
    //                         "cl0h963z10006rwqni8sc891f",
    //                         calculatorCategories[j].id
    //                     )
    //                 ).data.count
    //             );
    //         }
    //         categoriesCount.push(temp);
    //     }
    //     categories.push(calculatorCategories);
    // }

    // Add Calculator Inputs for each calculator type
    // for (let i = 0; i < typeId.length; i++) {
    //     for (let b = 0; b < categories[i].length; b++) {
    //         categoryId = categories[i][b].id;
    //         const res = await getCalculatorInputs(typeId[i], categoryId);
    //         inputs.push(res.data);
    //     }
    // }

    // Pass post data to the page via props
    // return { props: { types, categories, inputs, categoriesCount } };
    return {props: {inputs}};
}
