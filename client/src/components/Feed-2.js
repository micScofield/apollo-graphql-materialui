import { Fragment, useState, useEffect } from "react";
import { gql } from "apollo-boost";
import { Query, useQuery } from "react-apollo";
import Button from "@material-ui/core/Button";
import FeedItem from "./FeedItem";
import Spinner from "../components/UI/Spinner";
import { Container, Grid } from "@material-ui/core";
import { PostAdd } from "@material-ui/icons";

function Feed({ history }) {
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

  const { loading, data, refetch } = useQuery(FETCH_POSTS_QUERY, {
      variables: { page: currentPage },
    })

    useEffect(() => {refetch()}, [])
  if (loading) return <Spinner />

  if (data) return data.posts.posts.length === 0 ? (
      <Container>
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
      </Container>
    ) : (
      <Container>
          <h1 className="mb-1 mt-2">Posts</h1>
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
          {data &&
            data.posts.posts.map((post) => (
              <Grid key={post._id} item sm={12} xs={12} md={6}>
                <FeedItem post={post} history={history} />
              </Grid>
            ))}
        </Grid>
      </Container>
  );
}

export default Feed;
