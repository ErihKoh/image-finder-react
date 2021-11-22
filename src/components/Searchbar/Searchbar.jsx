import React, { Component } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PropTypes from "prop-types";
import s from "./Searchbar.module.css";

class Searchbar extends Component {
  state = { imageQuery: "" };

  static propTypes = {
    imageQuery: PropTypes.string,
  };
  handleNameChange = (event) => {
    this.setState({ imageQuery: event.currentTarget.value.toLowerCase() });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    if (this.state.imageQuery.trim() === "") {
      toast.error("Введите запрос.");
      return;
    }

    this.props.onSubmit(this.state.imageQuery);
    this.setState({ imageQuery: "" });
  };

  render() {
    return (
      <header className={s.Searchbar}>
        <form className={s.SearchForm} onSubmit={this.handleSubmit}>
          <input
            className={s.SearchFormInput}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            name="imageQuery"
            value={this.state.imageQuery}
            onChange={this.handleNameChange}
          />
          <button type="submit" className={s.SearchFormButton}>
            <span className={s.SearchFormButtonLabel}>Search</span>
          </button>
        </form>
      </header>
    );
  }
}

export default Searchbar;
