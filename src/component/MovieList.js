import React from 'react'
import { Card, Header, Segment } from 'semantic-ui-react'

function MovieList({ movies }) {
  const movieList =[];

  return (
    movies.length > 0 ? (
      <Card.Group doubling centered>
        {movieList}
      </Card.Group >
    ) : (
        <Segment padded color='blue'>
          <Header textAlign='center' as='h4'>No movies</Header>
        </Segment>
      )
  )
}

export default MovieList