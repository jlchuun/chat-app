import Views from "./components/Views";
import "./vars.css";
import UserContext from "./components/AccountContext";

const App = () => {
  return (
    <div>
      <UserContext>
        <Views />
      </UserContext>
    </div>
  );
}

export default App;
