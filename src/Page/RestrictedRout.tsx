import { Navigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";
interface IProps {
  component: React.ComponentType;
  redirectTo: string;
}
const RestrictedRout: React.FC<IProps> = ({
  component: Component,
  redirectTo,
}) => {
  const { user } = useAuth();

  return user ? <Component /> : <Navigate to={redirectTo} />;
};

export default RestrictedRout;
