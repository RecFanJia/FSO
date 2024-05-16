const jwt = require('jsonwebtoken');

// 示例 JWT token
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IlJlY0ZhbkppYSIsImlkIjoiNjY0NGI0NDBhN2IyZmZiMWFkZDAwMGVjIiwiaWF0IjoxNzE1NzkwMzQzfQ.4dkbk5nuMw3cJl0DsgGrvgJ7Z_47RUobHkgGciNwxpw';

// 解码 token
const decodedToken = jwt.decode(token);

// 显示解码后的内容
console.log('Decoded Token:', decodedToken);

// 提取和转换过期时间
if (decodedToken && decodedToken.exp) {
  const expTimestamp = decodedToken.exp;
  const expDate = new Date(expTimestamp * 1000); // 转换为毫秒

  console.log('Token expires at:', expDate);
} else {
  console.log('No expiration date found in token.');
}