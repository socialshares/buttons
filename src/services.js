import objectAssign from 'object-assign'

function encodeParams (params) {
  let newParams = objectAssign({}, params)

  Object.keys(params).forEach(key => {
    newParams[key] = encodeURIComponent(newParams[key])
  })

  return newParams
}

export const twitter = {
  action: 'Tweet',
  makeUrl: (params) => {
    let {url, text, via} = encodeParams(params)
    let viaParam = params.via ? `&via=${via}` : ''
    return `https://twitter.com/share?url=${url}&text=${text}${viaParam}`
  },
}

export const facebook = {
  action: 'Share',
  makeUrl: (params) => {
    let {url} = encodeParams(params)
    return `https://www.facebook.com/sharer/sharer.php?u=${url}`
  },
}

export const googleplus = {
  action: 'Share',
  makeUrl: (params) => {
    let {url} = encodeParams(params)
    return `https://plus.google.com/share?url=${url}`
  },
}

export const reddit = {
  action: 'Share',
  makeUrl: (params) => {
    let {url} = encodeParams(params)
    return `https://www.reddit.com/submit?url=${url}`
  },
}

export const tumblr = {
  action: 'Post',
  makeUrl: (params) => {
    let {url} = encodeParams(params)
    return `https://www.tumblr.com/share/link?url=${url}`
  },
}

export const linkedin = {
  action: 'Share',
  makeUrl: (params) => {
    let {url} = encodeParams(params)
    return `https://www.linkedin.com/shareArticle?mini=true&url=${url}`
  },
}

export const pinterest = {
  action: 'Pin it',
  makeUrl: (params) => {
    let {url} = encodeParams(params)
    return `https://www.pinterest.com/pin/create/button/?url=${url}`
  },
}

export const slack = {
  action: 'Slack it',
  makeUrl: (params) => {
    let {url} = encodeParams(params)
    return `http://slackbutton.herokuapp.com/post/new/?url=${url}`
  },
}

export const vk = {
  action: 'Share',
  makeUrl: (params) => {
    let {url, title, text} = encodeParams(params)
    return `http://vk.com/share.php?url=${url}&title=${title}&description=${text}`
  },
}

export const email = {
  action: 'Email',
  makeUrl: (params) => {
    let {url, title, text} = encodeParams(params)
    return `mailto:?subject=${title}&body=${text}%0${url}`
  },
}

export const more = {
  action: 'More',
  makeUrl: (params) => {
    let {url, title, text} = encodeParams(params)
    return `https://socialshar.es/share.html?url=${url}&title=${title}&text=${text}`
  },
}
