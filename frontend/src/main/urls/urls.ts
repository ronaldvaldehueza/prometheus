const BASE_URL: string =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:5000'
    : 'https://nodejs.worldcloud9.com/proma';


export default BASE_URL