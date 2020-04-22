import { collectionData } from "rxfire/firestore";
import React from "react";
import { app } from "./firebase";
import DragDrop from './drag-drop';

class Bookshelf extends React.Component {
  constructor() {
    super();
    this.state = { links: [] };
  }
  componentDidMount() {
    const { user } = this.props;
    const users = app.firestore().collection("user");
    const me = users.doc(user.uid);
    const shelf = me.collection("shelf");
    // this.setState({shelf});
    collectionData(shelf).subscribe(links => this.setState({ links }));
  }
  handleDrop(e) {
    console.info(e);
  }
  render() {
    return (
      <>
        {this.state.links.length ? (
          this.state.links.map(link => (
            <div key={link.url}>
              <a href={link.url}>{link.title}</a>
            </div>
          ))
        ) : (
          <p>no links yet! add one!</p>
        )}
        <DragDrop/>
      </>
    );
  }
}

export default Bookshelf;
