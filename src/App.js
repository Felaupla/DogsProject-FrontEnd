import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import Home from "./components/Home";
import DogCreate from "./components/DogCreate";
import Detail from "./components/Detail";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          {" "}
          {/* Switch hace que si yo intento ir a una ruta no existente (por ejemplo /home/asdasd), me va a
                     mandar a la ruta que más se le asemeje. En este caso, /home. No es obligatorio usarlo y puede
                     funcionar bien sin usarlo pero es buena práctica usarlo. */}
          <Route exact path="/" component={LandingPage} />
          <Route exact path="/home" component={Home} />
          <Route path="/dogs" component={DogCreate} />
          <Route path="/home/:id" component={Detail} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
