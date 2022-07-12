import {Fragment, useEffect, useState} from "react";
import styles from "../../styles/Calculator.module.css";
import { Nav } from "react-bootstrap";
import CarbonCalculator from "./CarbonCalculator";
import {
    getCalculatorCategories,
    getCalculatorInputs,
    getPublicCalculatorInputs
} from "../../services/CalculatorService";
import {useSession} from "next-auth/react";

const ListOfCalculators = (props) => {
    const [value, setValue] = useState(0);
    const types = props.types;
    let inputs = [];
    const categories = props.categories;
    const categoriesCount = props.categoriesCount;
    const userId = props.userId;
    const {data: session} = useSession();


    getInputs()


    async function getInputs() {
        console.log(categories[value].length)
        if (session) {
            // Add inputs for a specific calculator type
            for (let i = 0; i < categories[value].length; i++) {
                const data = [props.session]
                console.log("HERE: " + i)
                console.log(value)
                console.log(data)
                const res = await getCalculatorInputs(types[value].id, categories[value][i].id, data)
                console.log(res.data)
                inputs.splice(i, 0, res.data);
            }

        } else {
            // Add inputs for a specific calculator type
            categories[value].map(async (category, i) => {
                    const res = await getPublicCalculatorInputs(types[value].id, category.id)
                    inputs.splice(i, 0, res.data);
                }
            )
        }
    }

  return (
      <Fragment>
        <div className={styles.containerMargin5}>
          <div className={styles.main}>
            <Nav
                className={styles.nav}
                onSelect={(e) => {
                  setValue(e);
                }}
                fill
                variant="tabs"
                defaultActiveKey={value}
            >
              {props.types.map((name, i) => (
                  <Nav.Item>
                    <Nav.Link
                        data-testid={types[i].name}
                        className={styles.navItems}
                        eventKey={i}
                    >
                      {types[i].name}
                    </Nav.Link>
                  </Nav.Item>
              ))}
            </Nav>
          </div>
        </div>
        <CarbonCalculator
            value={value}
            data={props}
            type={types[value]}
            category={categories[value]}
            categoriesCount={categoriesCount[value]}
            input={inputs}
            results={0}
            userId={userId}
        />
      </Fragment>
  );
};

export default ListOfCalculators;
