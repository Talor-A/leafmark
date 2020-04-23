import React from "react";

class NewLink extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: "" };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleSubmit(event) {
    this.props.handleSubmit(this.state.value);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit} className="new-link shelf-item">
        <label>
          linky-link:
          <input
            type="text"
            value={this.state.value}
            onChange={this.handleChange}
          />
        </label>
        <input type="submit" value="Submit" />
        <img className="arrow-doodle" src="https://firebasestorage.googleapis.com/v0/b/leafmark-771fa.appspot.com/o/doodles%2Fdoodle-126.png?alt=media"/>
      </form>
    );
  }
}

export default NewLink;
