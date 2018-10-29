import React, { Component } from "react";
import ReactDOM from "react-dom";
import { connect } from "react-redux";
import axios from "axios";
import { Link } from "react-router-dom";

import * as actions from "../../actions";

import "./index.css";

const API_KEY = "5b2f814559ec90adfd0e8c740aa0c2b8";
const GENRE_LIST = [
  {
    id: 28,
    name: "Action"
  },
  {
    id: 12,
    name: "Adventure"
  },
  {
    id: 16,
    name: "Animation"
  },
  {
    id: 35,
    name: "Comedy"
  },
  {
    id: 80,
    name: "Crime"
  },
  {
    id: 99,
    name: "Documentary"
  },
  {
    id: 18,
    name: "Drama"
  },
  {
    id: 10751,
    name: "Family"
  },
  {
    id: 14,
    name: "Fantasy"
  },
  {
    id: 36,
    name: "History"
  },
  {
    id: 27,
    name: "Horror"
  },
  {
    id: 10402,
    name: "Music"
  },
  {
    id: 9648,
    name: "Mystery"
  },
  {
    id: 10749,
    name: "Romance"
  },
  {
    id: 878,
    name: "Science Fiction"
  },
  {
    id: 10770,
    name: "TV Movie"
  },
  {
    id: 53,
    name: "Thriller"
  },
  {
    id: 10752,
    name: "War"
  },
  {
    id: 37,
    name: "Western"
  }
];

class MainPage extends Component {
  constructor() {
    super();

    this.state = {
      similar: [],
      genres: [],
      trailerKey: ""
    };
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    console.log(this.props);

    axios({
      method: "get",
      url: `https://api.themoviedb.org/3/movie/${
        this.props.selectedMovie.id
      }/videos?api_key=${API_KEY}`
    }).then(result =>
      this.setState({ trailerKey: result.data.results[0].key })
    );

    axios({
      method: "get",
      url: `https://api.themoviedb.org/3/movie/${
        this.props.selectedMovie.id
      }/similar?api_key=${API_KEY}`
    }).then(result =>
      this.setState({ similar: result.data.results.slice(0, 3) })
    );

    const genres = [];

    this.props.selectedMovie.genre_ids.map(id => {
      const index = GENRE_LIST.findIndex(item => item.id === id);

      genres.push(GENRE_LIST[index].name);
    });

    this.setState({ genres });
  }

  renderSimilarMovies() {
    return this.state.similar.map(item => (
      <img
        key={item.id}
        src={`http://image.tmdb.org/t/p/w342${item.poster_path}`}
      />
    ));
  }

  renderGenres() {
    return this.state.genres.map(genre => (
      <div>
        <div className="circle" style={{ backgroundColor: "#00E5FF" }}>
          <p className="text_shape">{genre}</p>
        </div>
        <br />
      </div>
    ));
  }

  renderTags(data) {
    return data.map(tag => (
      <button className="button buttonDefault">{tag}</button>
    ));
  }

  render() {
    const item = this.props.selectedMovie;
    return (
      <div>
        <Link to="/review">
          <button id="topBtn" title="Go to top" className="arrow">
            🌟
          </button>
        </Link>

        <div className="thor">
          <img
            id="backgroundimage"
            src={`http://image.tmdb.org/t/p/w1280${item.backdrop_path}`}
            border="0"
            alt=""
          />
          <div className="info">
            <button className="button buttonTitle">
              {item.original_title}
            </button>
          </div>
        </div>

        <div>
          <div className="list">
            <div className="films">
              <h2 className="tag"> Sumary </h2>
              <div className="summary">
                <p>{item.overview}</p>
              </div>
              <br />
              <h2 className="tag" style={{ paddingTop: 50 }}>
                Tags
              </h2>
              <div className="tagBlock">{this.renderGenres()}</div>
              <br />

              <h2 className="tag" style={{ paddingTop: 50 }}>
                Trailer
              </h2>
              <iframe
                className="video"
                width="1024"
                height="640"
                src={`https://www.youtube.com/embed/${this.state.trailerKey}`}
                frameBorder="0"
                allow="autoplay; encrypted-media"
                allowFullScreen
              />

              <br />

              <h2 className="tag" style={{ paddingTop: 50 }}>
                Similar
              </h2>

              <div className="movies">{this.renderSimilarMovies()}</div>
            </div>
          </div>
        </div>

        <footer>
          <div className="info1">
            <p>
              Lorem ipsum dolor sit Lorem ipsum dolor sit Lorem ipsum dolor sit
            </p>
          </div>
          <div className="info2">
            <p>
              Nam facilisis cursus placerat. Nullam augue ex, sollicitudin ut
              quam sit amet, sodales hendrerit justo. Maecenas non efficitur
              lacus. Cras pulvinar cursus augue eu dignissim. Maecenas porttitor
              magna quis ex lobortis lobortis. Vestibulum id turpis vitae nisl
              fermentum semper. Sed pulvinar maximus felis non porttito
            </p>
          </div>
          <a title="Go top" href="#search">
            <img src="../../images/review.png" id="btn-top" alt="" />
          </a>
          <div id="bookmark2" className="logos">
            <h2>Lorem ipsum dolor sit </h2>
            <a href="#">
              <img src={require("../../images/fb.png")} alt="" />
            </a>
            <a href="#">
              <img src={require("../../images/twiter.jpg")} alt="" />
            </a>
            <a href="#">
              <img src={require("../../images/insta.jpg")} alt="" />
            </a>
            <a href="#">
              <img src={require("../../images/pintrest.jpg")} alt="" />
            </a>
            <a href="#">
              <img src={require("../../images/youtube.png")} alt="" />
            </a>
            <a href="#">
              <img src={require("../../images/linkedin.png")} alt="" />
            </a>
          </div>
        </footer>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  selectedMovie: state.selectedMovie
});

export default connect(mapStateToProps, actions)(MainPage);
