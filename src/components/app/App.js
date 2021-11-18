import "./App.css";
import Header from "../Header";
import VisibleTodoList from "../VisibleTodoList";
import VisibilityFilter from "../VisibilityFilter";
import { filterTypes } from "../../redux/actionTypes";

function App({ match }) {
  return (
    <div className="App">
      <Header />
      <VisibleTodoList filter={match.params.filter || filterTypes.All} />
      <VisibilityFilter />
    </div>
  );
}

export default App;
