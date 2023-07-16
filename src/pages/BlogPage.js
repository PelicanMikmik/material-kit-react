import { Helmet } from 'react-helmet-async';
// @mui
import { Grid, Container, Stack, Typography } from '@mui/material';
// components
import { BlogPostCard } from '../sections/@dashboard/blog';
// mock
import POSTS from '../_mock/blog';

// ----------------------------------------------------------------------


// ----------------------------------------------------------------------

export default function BlogPage() {
  return (
    <>
      <Helmet>
        <title>Starling:Blog</title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Blog
          </Typography>
        </Stack>

        <Grid container spacing={3}>
            <BlogPostCard key={1} post={POSTS[0]} index={1} />
        </Grid>
      </Container>
    </>
  );
}
