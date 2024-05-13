const _ = require('lodash');

const dummy = (array) => {
    return 1
  }

const totalLikes = (array) => {
    const reducer = (sum, item) => {
        return sum + item.likes
    }

    return array.length === 0
    ? 0
    : array.reduce(reducer,0)
 }

const favoBlog = (blogs) => {
   if (blogs.length === 0) {
     return null;  
   }
 
   let indexMaxLikes = 0;  
 
   for (let i = 1; i < blogs.length; i++) {
     if (blogs[i].likes > blogs[indexMaxLikes].likes) {
       indexMaxLikes = i;  
     }
   }
 
   return {
     title: blogs[indexMaxLikes].title,
     author: blogs[indexMaxLikes].author,
     likes: blogs[indexMaxLikes].likes
   };
 };  

const mostBlogs = (blogs) => {
  const count = _.countBy(blogs, 'author')
  const maxAuthor = _.maxBy(_.keys(count), (author) => count[author])
  
  return {
      author: maxAuthor,
      blogs: count[maxAuthor]
  }
}

const mostLikes = (blogs) => {
    const likesByAuthor = _.mapValues(_.groupBy(blogs, 'author'), (blogs) => {
        return _.sumBy(blogs, 'likes')
    })

    const maxAuthor = _.maxBy(_.keys(likesByAuthor), (author) => likesByAuthor[author])

    return {
        author: maxAuthor,
        likes: likesByAuthor[maxAuthor]
    }
}

module.exports = {dummy, totalLikes, favoBlog, mostBlogs, mostLikes}