import CalculatorTypes from "../calculators/CalculatorTypes";
import { getCalculatorTypes } from "../../../services/CalculatorService";
import { useRouter } from "next/router";

export default function showCalculators(props) {
  const types = props.types;


  return <div className='pt-10 w-full'><CalculatorTypes types={types} /></div>;
}
