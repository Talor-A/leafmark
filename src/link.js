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
const getMaxPopulationSwatch = (palette) => {
  let maxPop = 0;
  let maxSwatch;
  Object.values(palette).forEach(test => {
    if (test.population > maxPop) {
      maxPop = test.population;
      maxSwatch = test;
    }
  })
  return maxSwatch || Object.values(palette)[0]
}


const Link = ({ link, onRefresh }) => {
  let { title, url, data } = link;
  var hasTitle = !!title

  let backgroundColor = hashToHsl(hashCode(link.url))
  let color = '#000'
  if (link.data.palette) {
    const swatch = getMaxPopulationSwatch(link.data.palette);

    backgroundColor = swatch.hex;
    color = swatch.textColor;
  }
  return (
    <a target="_blank" and rel="noopener noreferrer" href={url} className="shelf-item" style={{ backgroundColor, color }}>
        {link.data.image && <img src={data.image} />}
        <div className="text-area">
          <a target="_blank" and rel="noopener noreferrer" href={url} className={hasTitle && "title"} style={{ color, wordWrap: "break-word" }}>{hasTitle ? title : url}</a>
          <p className="description">{data.description}</p>
          {link.updatedAt && <p>{link.updatedAt.toDateString()}</p>}
          <code dangerouslySetInnerHTML={{ __html: link.data.text }}></code>
        </div>
    </a>
  )
};

export default Link;
