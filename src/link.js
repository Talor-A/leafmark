import React from "react";

const hashCode = s => {
  var hash = 0;
  for (var i = 0; i < s.length; i++) {
    var character = s.charCodeAt(i);
    hash = (hash << 5) - hash + character;
    hash = hash & hash; // Convert to 32bit integer
  }
  return hash;
};

const hashToHsl = h => `hsl(${h % 360}, 75%, 75%)`;


const Link = ({ link, onRefresh }) => (
  <div
    className="shelf-item"
    style={{ backgroundColor: hashToHsl(hashCode(link.url)) }}
  >
    <details style={{ overflow: "hidden", maxHeight: "100%" }}>
      <summary>
        <a href={link.url}>{link.title}</a>
      </summary>
      {link.updatedAt && <p>{link.updatedAt.toDateString()}</p>}
      <button onClick={() => onRefresh(link)}>Refresh</button>
      {link.data.image && <img src={link.data.image} width="100%" />}
      <p>{link.data.description}</p>
      <code dangerouslySetInnerHTML={{ __html: link.data.text }}></code>
    </details>
  </div>
);

export default Link;
