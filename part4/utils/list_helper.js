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

module.exports = {dummy, totalLikes, favoBlog}