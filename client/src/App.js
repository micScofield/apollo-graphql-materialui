import { Route, Switch, Redirect, withRouter } from "react-router-dom";

import FeedPage from "./pages/Feed/Feed";
import SinglePostPage from "./pages/Feed/SinglePost/SinglePost";
import "./App.css";

class App extends Component {
  render() {
    let routes = (
      <Switch>
        <Route path="/" exact component={FeedPage} />
        <Route path="/:postId" component={SinglePostPage} />
        <Redirect to="/" />
      </Switch>
    );

    return routes
  }
}

export default withRouter(App);
