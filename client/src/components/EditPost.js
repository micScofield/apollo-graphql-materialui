import { Fragment, useState, useRef, useEffect } from "react";

import { Container, Button } from "@material-ui/core";
import { ArrowBack, Edit, Home } from "@material-ui/icons";
import { gql } from "apollo-boost";
import { Query, useQuery } from "react-apollo";

import EditForm from "./EditForm";
import Spinner from "./UI/Spinner";

function EditPost({ history, match }) {
  const postId = match.params.postId;

  const FETCH_POST_QUERY = gql`
    query {
      post(id: "${postId}") {
        title
        content
        creator
      }
    }
  `;

  // const { loading, data, refetch } = useQuery(FETCH_POST_QUERY, {
  //   variables: { id: postId },
  // });

  // useEffect(() => {
  //   refetch();
  // }, []);

  // if (loading) return <Spinner />;

  // return (
  //   <Container>
  //     <div className="mt-2 mb-1">
  //       <Button
  //         variant="outlined"
  //         color="inherit"
  //         onClick={() => history.goBack()}
  //       >
  //         <ArrowBack /> Go Back
  //       </Button>
  //       <Button
  //         variant="outlined"
  //         color="inherit"
  //         onClick={() => history.push("/")}
  //       >
  //         Go Home <Home />
  //       </Button>
  //     </div>

  //     <h1>
  //       <Edit />
  //       Edit Post...
  //     </h1>

  //     {!data ? (
  //       <h1>Post Cannot be found</h1>
  //     ) : (
  //       <EditForm
  //         history={history}
  //         postId={postId}
  //         title={data.post.title}
  //         creator={data.post.creator}
  //         content={data.post.content}
  //       />
  //     )}
  //   </Container>
  // );
  // // refs
  // const titleRef = useRef();
  // const contentRef = useRef();
  // const creatorRef = useRef();

  return (
    <div>
      <Container>
        <div className="mt-2 mb-1">
          <Button
            variant="outlined"
            color="inherit"
            onClick={() => history.goBack()}
          >
            <ArrowBack /> Go Back
          </Button>
          <Button
            variant="outlined"
            color="inherit"
            onClick={() => history.push("/")}
          >
            Go Home <Home />
          </Button>
        </div>

        <h1>
          <Edit />
          Edit Post...
        </h1>

        <Query query={FETCH_POST_QUERY}>
          {({ loading, error, data }) => {
            if (loading) return <Spinner />;
            if (error) console.log(error);

            const { creator, content, title } = data.post;
            return !data ? (
              <h1>Post Cannot be found</h1>
            ) : (
              <EditForm
                history={history}
                postId={postId}
                title={title}
                creator={creator}
                content={content}
              />
            );
          }}
        </Query>
      </Container>
    </div>
  );
}

export default EditPost;
