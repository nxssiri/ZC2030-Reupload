import styles from "../../../../styles/Calculator.module.css";
import EditCalculatorOverview from "../../../../Components/admin/calculators/EditCalculatorOverview";
import {
  getCalculatorCategories,
  getCalculatorInputs,
  getCalculatorType,
  getCalculatorUsers,
} from "../../../../services/CalculatorService";
import {getSession} from "next-auth/react";

const background3 = "/calculator_background_3.jpg";

export default function editCalculator(props) {
  const categories = props.categories;
  const details = props.details;
  const users = props.users;
  const inputs = props.inputs;
  return (
    <div
      className={styles.container}
      style={{ backgroundImage: `url(${background3})` }}
    >
      <div className="container-md">
        <h1 style={{ paddingTop: "4%" }}>Edit Calculator</h1>
        <EditCalculatorOverview
          details={details}
          users={users}
          categories={categories}
          inputs={inputs}
        />
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context)
  const data = [session]
  const typeId = context.params.typeId;
  const [typeRes, categoriesRes, usersRes] = await Promise.all([
    getCalculatorType(typeId, data),
    getCalculatorCategories(typeId, data),
    getCalculatorUsers(typeId, data),
  ]);

  const calculatorDetails = typeRes.data;
  const calculatorCategories = categoriesRes.data;
  const users = usersRes.data;
  let categoryId = [];
  calculatorCategories.map((category) => {
    categoryId.push(category.id);
  });
  let inputs = [];

  // Add Calculator Inputs for the category
  for (let i = 0; i < categoryId.length; i++) {
    for (let b = 0; b < calculatorCategories.length; b++) {
      categoryId = calculatorCategories[b].id;
      const res = await getCalculatorInputs(typeId, categoryId, data);
      inputs.push(res.data);
    }
  }

  return {
    props: {
      categories: calculatorCategories,
      details: calculatorDetails,
      users: users,
      inputs: inputs,
    },
  };
}

