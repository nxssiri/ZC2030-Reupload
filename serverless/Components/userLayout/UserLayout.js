import "bootstrap/dist/css/bootstrap.min.css";
import UserHeader from "./UserHeader";

const UserLayout = ({ children }) => {
  return (
    <div className="content">
      <UserHeader />

      <div>{children}</div>
    </div>
  );
};

export default UserLayout;
