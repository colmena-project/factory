import { LoginForm } from "../../components/general/LoginForm";
import { useContext } from "react";
import { Context as UserContext } from "../../context/userContext";

const Login = () => {
  const { setAccount } = useContext(UserContext);

  return (
    <>
      <LoginForm setAccount={setAccount} />
    </>
  );
};

export default Login;
