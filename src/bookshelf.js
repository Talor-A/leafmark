import { collectionData } from "rxfire/firestore";
import firebase from "firebase";
import React from "react";
import { app } from "./firebase";
import NewLink from "./newlink";
import Link from "./link";

const unrollFunc = firebase.functions().httpsCallable("unroll");

const unroll = url =>
  unrollFunc({ url })
    .then(res => res.data)
    .then(data => ({
      url,
      updatedAt: Date.now(),
      title: data.title,
      data
    }));

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
    this.setState({ shelf });
    collectionData(shelf, "uid").subscribe(links => {
      links = links.map(link => {
 
        if (link.updatedAt) {
          try {
            link.updatedAt = new Date(link.updatedAt);
          } catch (e) {
            link.updatedAt = Date.now();
          }
          return link;
        }
      });

      this.setState({ links });
    });
  }

  unrollUrl(url) {
    const { shelf } = this.state;
    unroll(url).then(obj => {
      shelf.add(obj);
      console.log(obj);
    });
  }

  refresh(link) {
    const { shelf } = this.state;
    unroll(link.url).then(obj => shelf.doc(link.uid).update(obj));
  }

  render() {
    const { links } = this.state;
    return (
      <div className="shelf">
        {links.length ? (
          links.map(link => (
            <Link
              onRefresh={this.refresh.bind(this)}
              key={link.uid}
              link={link}
            />
          ))
        ) : (
          <p>no links yet! add one!</p>
        )}
        <NewLink handleSubmit={this.unrollUrl.bind(this)} />
      </div>
    );
  }
}

export default Bookshelf;
