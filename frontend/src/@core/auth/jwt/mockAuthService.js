import avatar1 from '@src/assets/images/avatars/1-small.png'

// Simulate generating a JWT token
const simulateJwtToken = (userId) => `simulatedToken.${userId}.signature`

// Simulate verifying a JWT token and extracting the payload
const simulateVerifyJwtToken = (token) => {
  const [, userId] = token.split('.')
  return { id: parseInt(userId, 10) }
}

const data = {
    users: [
      {
        id: 1,
        fullName: 'Gal Gadot',
        username: 'wonderwoman',
        password: 'admin',
        avatar: avatar1,
        email: 'developer@worldcloud9.com',
        role: 'admin',
        ability: [
          {
            action: 'manage',
            subject: 'all'
          }
        ],
        extras: {
          eCommerceCartItemsCount: 5
        }
      }
      // other mock users
    ]
  }

// Directly simulate the login process without Axios
export const simulateLogin = ({ email, password }) => {
  const { users } = data
  const user = users.find(u => u.email === email && u.password === password)

  if (user) {
    const accessToken = simulateJwtToken(user.id)
    const refreshToken = simulateJwtToken(user.id) // For simplicity, using the same simulated method

    const userData = { ...user }
    delete userData.password

    // Simulating a successful response
    return Promise.resolve({
        config: {},
        data: {
          userData,
          accessToken,
          refreshToken
        },
        headers: {},
        request: {responseURL: '/jwt/login' },
        status: 200
    })

  } else {
    // Simulating an error response
    return Promise.reject(new Error('Email or Password is Invalid'))
  }
}
