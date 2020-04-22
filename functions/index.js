const functions = require('firebase-functions')
const unfluff = require('unfluff')
const fetch = require('cross-fetch')
const Vibrant = require('node-vibrant')

// const agent = new http.Agent({keepAlive: true});

const arrToHsl = (arr) => [
  Math.floor(arr[0] * 360), 
  Math.round(arr[1] * 100) / 100, 
  Math.round(arr[2] * 100) / 100,
]
const paletteToJson = (palette) => {
  const myPalette = {}
  Object.keys(palette).forEach(key => {

    const swatch = palette[key];

    const mySwatch = {
      hsl: arrToHsl(swatch.getHsl()),
      hex: swatch.getHex(),
      titleColor: swatch.getTitleTextColor(),
      textColor: swatch.getBodyTextColor(),
      population: swatch.getPopulation(),
    }

    myPalette[key] = mySwatch;
  })
  return myPalette
}
exports.unroll = functions.https.onCall(async (data, context) => {
  const { url } = data;
  // const {uid} = context.auth;
  const content = await extractContent(url);

  if (content.image) {
    try {

      const palette = await Vibrant.from(content.image).getPalette()


      content.palette = paletteToJson(palette);

    } catch (e) {
      console.error('failed getting palette', e)
    }
  }

  return content;
})

const extractContent = async (url) => {
  const res = await fetch(url);
  const data = unfluff(await res.text())

  return data;
}
