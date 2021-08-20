import { Fragment, useState } from "react";
import { gql } from "apollo-boost";
import { Query } from "react-apollo";
import Button from "@material-ui/core/Button";
import FeedItem from "./FeedItem";
import Spinner from "../components/UI/Spinner";
import { Container, Grid } from "@material-ui/core";
import { PostAdd } from "@material-ui/icons";

function Feed({ history }) {
  // console.log(history.location.state?.createPost)
  const [currentPage, setCurrentPage] = useState(1);
  const FETCH_POSTS_QUERY = gql`
    query {
      posts(page: ${currentPage}) {
        posts {
          _id
          title
          creator
          createdAt
          updatedAt
        }
        totalPosts
      }
    }
  `;

  return (
    <Container>
      <h1 className="mb-1 mt-2">Posts</h1>

      <Query query={FETCH_POSTS_QUERY}>
        {({ loading, error, data }) => {
          if (loading) return <Spinner />;
          if (error) console.log(error);
          console.log(data.posts?.posts);
          return data.posts.posts.length === 0 ? (
            <Fragment>
              <h1>No Posts To Display</h1>
              <div className='mb-1'>
                <Button
                  variant="contained"
                  color="secondary"
                  size="medium"
                  onClick={() => history.push(`/create`)}
                >
                  Create Post <PostAdd />
                </Button>
              </div>
            </Fragment>
          ) : (
            <Fragment>
              <div>
                <Button
                  variant="contained"
                  style={{ marginBottom: '1rem' }}
                  color="primary"
                  size="medium"
                  onClick={() => history.push(`/create`)}
                >
                  Create Post <PostAdd />
                </Button>
              </div>
              <Grid container spacing='4' justifyContent="space-around">
                {/* {history.location.state?.createPost && <Grid item sm={12} xs={12} md={6}>
                  <FeedItem post={history.location.state.createPost} history={history} />
                </Grid>} */}
                {data &&
                  data.posts.posts.map((post) => (
                    <Grid key={post._id} item sm={12} xs={12} md={6}>
                      <FeedItem post={post} history={history} />
                    </Grid>
                  ))}
              </Grid>
            </Fragment>
          );
        }}
        {/* Pagination stuff here */}
      </Query>
    </Container>
  );
}

export default Feed;
