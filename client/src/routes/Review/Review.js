import React, { Component } from "react";
import { connect } from "react-redux";
import "./index.css";

import navBttn from "../../images/burger.png";

class Review extends Component {
  componentDidMount() {
    window.scrollTo(0, 0);
  }

  render() {
    const item = this.props.selectedMovie;

    return (
      <div>
        <h1 class="text">{item.title}</h1>

        <div class="cardContainer">
          <div class="card">
            <img
              class="poster"
              src={`http://image.tmdb.org/t/p/w342${item.poster_path}`}
            />
            <div class="cardContent">
              <h3> Rate</h3>
              <form>
                <fieldset class="rating">
                  <input type="radio" id="star5" name="rating" value="5" />
                  <label class="full" for="star5" title="Awesome - 5 stars" />
                  <input
                    type="radio"
                    id="star4half"
                    name="rating"
                    value="4and a half"
                  />
                  <label
                    class="half"
                    for="star4half"
                    title="Pretty good - 4.5 stars"
                  />
                  <input type="radio" id="star4" name="rating" value="4" />
                  <label
                    class="full"
                    for="star4"
                    title="Pretty good - 4 stars"
                  />
                  <input
                    type="radio"
                    id="star3half"
                    name="rating"
                    value="3and a half"
                  />
                  <label class="half" for="star3half" title="Meh - 3.5 stars" />
                  <input type="radio" id="star3" name="rating" value="3" />
                  <label class="full" for="star3" title="Meh - 3 stars" />
                  <input
                    type="radio"
                    id="star2half"
                    name="rating"
                    value="2and a half"
                  />
                  <label
                    class="half"
                    for="star2half"
                    title="Kinda bad - 2.5 stars"
                  />
                  <input type="radio" id="star2" name="rating" value="2" />
                  <label class="full" for="star2" title="Kinda bad - 2 stars" />
                  <input
                    type="radio"
                    id="star1half"
                    name="rating"
                    value="1and a half"
                  />
                  <label class="half" for="star1half" title="Meh - 1.5 stars" />
                  <input type="radio" id="star1" name="rating" value="1" />
                  <label
                    class="full"
                    for="star1"
                    title="Sucks big time - 1 star"
                  />
                  <input
                    type="radio"
                    id="starhalf"
                    name="rating"
                    value="half"
                  />
                  <label
                    class="half"
                    for="starhalf"
                    title="Sucks big time - 0.5 stars"
                  />
                </fieldset>
                <br />
                <br />
                <br />
                <h3> Review </h3>
                <textarea class="reviewBox" />
              </form>
              <button class="submitContainer">➤</button>
            </div>
          </div>
          <div class="card1">
            <div class="bord1">
              <form action="">
                <h3 class="labels first">Name</h3>
                <input
                  class="inp"
                  type="text"
                  id="fname"
                  name="firstname"
                  placeholder="Your name.."
                />
                <h3 class="labels">Email</h3>
                <input
                  class="inp"
                  type="email"
                  id="fname"
                  name="firstname"
                  placeholder="Your email.."
                />
                <h3 class="labels">Date of birth</h3>
                <input class="inp" type="date" name="bday" min="2000-01-17" />
              </form>
            </div>
          </div>
        </div>

        <footer>
          <div class="info1">
            <p>
              Lorem ipsum dolor sit Lorem ipsum dolor sit Lorem ipsum dolor sit
            </p>
          </div>
          <div class="info2">
            <p>
              Nam facilisis cursus placerat. Nullam augue ex, sollicitudin ut
              quam sit amet, sodales hendrerit justo. Maecenas non efficitur
              lacus. Cras pulvinar cursus augue eu dignissim. Maecenas porttitor
              magna quis ex lobortis lobortis. Vestibulum id turpis vitae nisl
              fermentum semper. Sed pulvinar maximus felis non porttito
            </p>
          </div>
          <div id="bookmark2" class="logos">
            <h2>Lorem ipsum dolor sit </h2>
            <a href="#">
              <img src={require("../../images/fb.png")} alt="" />
            </a>
            <a href="#">
              {" "}
              <img src={require("../../images/twiter.jpg")} alt="" />
            </a>
            <a href="#">
              <img src={require("../../images/insta.jpg")} alt="" />
            </a>
            <a href="#">
              <img src={require("../../images/pintrest.jpg")} alt="" />
            </a>
            <a href="#">
              {" "}
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

export default connect(mapStateToProps)(Review);
