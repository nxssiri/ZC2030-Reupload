import { getSession, useSession } from "next-auth/react";
import { getLogsByUser } from "../../services/CalculatorService";
import styles from "../../styles/Calculator.module.css";
import { Table } from "react-bootstrap";

const background3 = "/calculator_background_3.jpg";

export default function Logs(props) {
  const { data: session } = useSession();
  const headers = ["Category", "Input Type", "Quantity Inputted", "Result"];
  const logs = props.logs;

  if (session) {
    return (
      <div
        className={styles.container}
        style={{ backgroundImage: `url(${background3})` }}
      >
        <h1 className={styles.h1} data-testid="main_heading">
          {session.user.name} Log Data
        </h1>
        <div className="container-md">
          <Table responsive variant="light">
            <thead>
              <tr>
                <th>#</th>
                {headers.map((header, index) => (
                  <th key={index}>{header}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {logs.map((log, index) => (
                <tr key={index}>
                  <td>{index}</td>
                  <td>{log.calculatorinput.calculatorcategory.name}</td>
                  <td>{log.calculatorinput.name}</td>
                  <td>{log.quantity}</td>
                  <td>{log.result}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
    );
  }
  return <h1>Fail</h1>;
}

// This gets called at build time
export async function getServerSideProps(context) {
  const session = await getSession(context);
  let userId = null;
  let logs = [];
  let data = [session]
  if (session) {
    userId = session.user.id;
    logs = await getLogsByUser(userId, data);
  }
  return { props: { logs: logs.data } };
}
