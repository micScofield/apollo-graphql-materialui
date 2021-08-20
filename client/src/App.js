import { Route, Switch, Redirect, withRouter } from "react-router-dom";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";

// import FeedPage from "./components/Feed";
import FeedPage from "./components/Feed-2";
import CreatePost from "./components/CreatePost";
import EditPost from "./components/EditPost";
import SinglePostPage from "./components/SinglePost";
import "./App.css";
import { Fragment } from "react";

const client = new ApolloClient({
  uri: "http://localhost:5000/api/graphql",
});

const App = () => {
  let routes = (
    <Switch>
      <Route path="/" exact component={FeedPage} />
      <Route path="/create" exact component={CreatePost} />
      <Route path="/edit/:postId" exact component={EditPost} />
      <Route path="/:postId" component={SinglePostPage} />
      <Redirect to="/" />
    </Switch>
  );
  return (
    <Fragment>
      <ApolloProvider client={client}>{routes}</ApolloProvider>
    </Fragment>
  );
};

export default withRouter(App);
