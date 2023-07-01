import React, { Component } from 'react'
import { Container } from 'semantic-ui-react'
import MovieList from './MovieList'

class Home extends Component {
    state = {
        isLoading: false,
        movies: []
    }

    componentDidMount() {
        this.setState({ isLoading: true })
        try {
            this.setState({ movies: [], isLoading: false })
        } catch (error) {

        }
    }

    render() {
        const { isLoading, movies } = this.state
        return (
            isLoading ? <></> : (
                <Container>
                    <MovieList movies={movies} />
                </Container>
            )
        )
    }
}

export default Home