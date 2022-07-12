import styles from "../styles/Calculator.module.css";
import {
  getCalculatorCategories,
  getCalculatorTypes,
  getCalculatorTypesForUser, getPublicCalculatorCategories, getPublicCalculatorInputs,
  getPublicCalculatorTypes,
  getUserCategoryProgress,
} from "../services/CalculatorService";
import ListOfCalculators from "../Components/calculators/ListOfCalculators";
import {getSession, signIn, useSession} from "next-auth/react";
import React from "react";

const background3 = "/calculator_background_3.jpg";

export default function Calculator(props) {
  const types = props.types;
  const categories = props.categories;
  const inputs = props.inputs;
  const categoriesCount = props.categoriesCount;
  const { data: session } = useSession();

  let userId = null;
  if (session) {
    userId = session.user.id;
  }

  return (
    <div className={styles.container}>
      <div className=''>
        <svg className='absolute w-full h-full z-0' id="visual" viewBox="0 0 900 600" width="900" height="600" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg" version="1.1">
          <rect x="0" y="0" width="900" height="600" fill="#ffffff"/>
          <defs>
            <linearGradient id="grad1_0" x1="33.3%" y1="100%" x2="100%" y2="0%">
              <stop offset="20%" stopColor="#77c9d4" stopOpacity="1"/>
              <stop offset="80%" stopColor="#77c9d4" stopOpacity="1"/>
            </linearGradient>
          </defs>
          <defs>
            <linearGradient id="grad1_1" x1="33.3%" y1="100%" x2="100%" y2="0%">
              <stop offset="20%" stopColor="#77c9d4" stopOpacity="1"/>
              <stop offset="80%" stopColor="#ffffff" stopOpacity="1"/>
            </linearGradient>
          </defs>
          <defs>
            <linearGradient id="grad2_0" x1="0%" y1="100%" x2="66.7%" y2="0%">
              <stop offset="20%" stopColor="#77c9d4" stopOpacity="1"/>
              <stop offset="80%" stopColor="#77c9d4" stopOpacity="1"/>
            </linearGradient>
          </defs>
          <defs>
            <linearGradient id="grad2_1" x1="0%" y1="100%" x2="66.7%" y2="0%">
              <stop offset="20%" stopColor="#ffffff" stopOpacity="1"/>
              <stop offset="80%" stopColor="#77c9d4" stopOpacity="1"/>
            </linearGradient></defs><g transform="translate(900, 600)">
          <path d="M-351.5 0C-331.9 -39.7 -312.3 -79.5 -298.4 -123.6C-284.5 -167.7 -276.3 -216.3 -248.6 -248.6C-220.9 -280.9 -173.6 -296.9 -129 -311.3C-84.3 -325.8 -42.1 -338.7 0 -351.5L0 0Z" fill="#bee4e9"/>
          <path d="M-175.8 0C-166 -19.9 -156.2 -39.7 -149.2 -61.8C-142.3 -83.9 -138.1 -108.1 -124.3 -124.3C-110.4 -140.4 -86.8 -148.4 -64.5 -155.7C-42.1 -162.9 -21.1 -169.3 0 -175.8L0 0Z" fill="#77c9d4"/>
        </g>
          <g transform="translate(0, 0)">
            <path d="M351.5 0C349 47.6 346.4 95.1 324.8 134.5C303.1 173.9 262.4 205.2 223.4 223.4C184.5 241.7 147.2 246.9 110.2 266.1C73.3 285.3 36.6 318.4 0 351.5L0 0Z" fill="#bee4e9"/>
            <path d="M175.8 0C174.5 23.8 173.2 47.6 162.4 67.3C151.6 87 131.2 102.6 111.7 111.7C92.2 120.8 73.6 123.4 55.1 133C36.6 142.6 18.3 159.2 0 175.8L0 0Z" fill="#77c9d4"/>
          </g>
        </svg>

        <div className='flex h-5/6'>
          <div className="m-auto z-20 justify-between w-full">
            <div className='z-50 justify-center'>
              <h1 className={styles.h1} data-testid="main_heading">
                Carbon Calculators
              </h1>
              <div className="container-md">
                <ListOfCalculators
                    categories={categories}
                    categoriesCount={categoriesCount}
                    types={types}
                    inputs={[inputs]}
                    userId={userId}
                    session={session}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// This gets called at build time
export async function getServerSideProps(context) {
  let categories = [];
  let categoriesCount = [];
  let inputs = [];
  let typeId = [];
  let categoryId = [];
  const session = await getSession(context);
  let userId = null;
  let typesRes = null;
  if (session) {
    userId = session.user.id;
    typesRes = await getCalculatorTypesForUser(userId);
  } else {
    typesRes = await getPublicCalculatorTypes();
  }

  // Adds all Calculator types in a list
  const types = typesRes.data;

  // Adds the IDs of calculators in a list
  types.map((type) => {
    typeId.push(type.id);
  });

  const data = [session]
  let calculatorCategories;

  if (session) {
    // Add Calculator Categories into categories for every id of calculators
    for (let i = 0; i < typeId.length; i++) {
      const res = await getCalculatorCategories(typeId[i], data);
      calculatorCategories = res.data;
      if (userId != null) {
        const temp = [];
        for (let j = 0; j < calculatorCategories.length; j++) {
          temp.push(
              (await getUserCategoryProgress(userId, calculatorCategories[j].id))
                  .data.count
          );
        }
        categoriesCount.push(temp);
      }
      categories.push(calculatorCategories);
    }

    // // Add Calculator Inputs for each calculator type
    // for (let i = 0; i < typeId.length; i++) {
    //   for (let b = 0; b < categories[i].length; b++) {
    //     categoryId = categories[i][b].id;
    //     const res = await getCalculatorInputs(typeId[i], categoryId, data);
    //     inputs.push(res.data);
    //   }
    // }
  } else {
    for (let i = 0; i < typeId.length; i++) {
      const res = await getPublicCalculatorCategories(typeId[i]);
      calculatorCategories = res.data;
      if (userId != null) {
        const temp = [];
        for (let j = 0; j < calculatorCategories.length; j++) {
          temp.push(
              (await getUserCategoryProgress(userId, calculatorCategories[j].id))
                  .data.count
          );
        }
        categoriesCount.push(temp);
      }
      categories.push(calculatorCategories);
    }
  }


  // Pass post data to the page via props
  return { props: { types, categories, categoriesCount, session} };
}
