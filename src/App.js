import React, { Component } from "react";
import PropTypes from "prop-types";
import { ToastContainer } from "react-toastify";
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Searchbar from "./components/Searchbar";
import ImageGallery from "./components/ImageGallery";
import ButtonLoadMore from "./components/Button";
import Modal from "./components/Modal";
import imageApi from "./services/image-api";
import "./App.css";

class App extends Component {
  state = {
    images: [],
    currentPage: 1,
    imageQuery: "",
    largeImage: "",
    isLoading: false,
    error: null,
  };
  static propTypes = {
    imageQuery: PropTypes.string,
    images: PropTypes.array,
    currentPage: PropTypes.number,
    isLoading: PropTypes.bool,
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.imageQuery !== this.state.imageQuery) {
      this.fetchImage();
    }
  }

  toggleModal = () => {
    this.setState({
      largeImage: "",
    });
  };

  onClickImage = (e) => {
    e.preventDefault();
    if (e.target.nodeName === "IMG") {
      this.setState({ largeImage: e.target.dataset.image });
    }
  };

  handleFormSubmit = (imageQuery) => {
    this.setState({ imageQuery, currentPage: 1, images: [] });
  };

  fetchImage = () => {
    const { currentPage, imageQuery } = this.state;

    const options = {
      currentPage,
      imageQuery,
    };
    this.setState({ isLoading: true });
    imageApi
      .fetchImage(options)
      .then(({ hits }) =>
        this.setState((prevState) => ({
          images: [...prevState.images, ...hits],
          currentPage: prevState.currentPage + 1,
        }))
      )
      .then(() => {
        window.scrollTo({
          top: document.body.scrollHeight,
          behavior: "smooth",
        });
      })
      .catch((error) => this.setState({ error }))
      .finally(() => this.setState({ isLoading: false }));
  };

  render() {
    const { images, isLoading, largeImage } = this.state;
    return (
      <div className="App">
        <Searchbar onSubmit={this.handleFormSubmit} />
        <ImageGallery images={images} onClick={this.onClickImage} />
        <div className="spinner">
          {isLoading && (
            <Loader
              type="BallTriangle"
              color="#00BFFF"
              height={80}
              width={80}
            />
          )}
        </div>
        {images.length > 0 && <ButtonLoadMore onClick={this.fetchImage} />}
        {largeImage && (
          <Modal onClose={this.toggleModal}>
            <img src={this.state.largeImage} alt="modal" />
          </Modal>
        )}
        <ToastContainer autoClose={2000} />
      </div>
    );
  }
}

export default App;
