import CalculatorTypes from "../../Components/admin/calculators/CalculatorTypes";
import { getCalculatorTypes } from "../../services/CalculatorService";
import { useRouter } from "next/router";
import {getSession} from "next-auth/react";

export default function showCalculators(props) {
  const types = props.types;

  return <CalculatorTypes types={types} />;
}

export async function getServerSideProps(context) {

  const session = await getSession(context)
  const data = [session]
  const typesRes = await getCalculatorTypes(data)
  ;

  const types = typesRes.data;
  return {
    props: { types } };
}
