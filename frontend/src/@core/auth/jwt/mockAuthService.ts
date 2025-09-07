import avatar1 from '@src/assets/images/avatars/1-small.png';

interface Ability {
  action: string;
  subject: string;
}

interface User {
  id: number;
  fullName: string;
  username: string;
  password?: string;
  avatar: string;
  email: string;
  role: string;
  ability: Ability[];
  extras: {
    eCommerceCartItemsCount: number;
  };
}

const simulateJwtToken = (userId: number): string => `simulatedToken.${userId}.signature`;

const simulateVerifyJwtToken = (token: string): { id: number } => {
  const [, userId] = token.split('.');
  return { id: parseInt(userId, 10) };
};

const data: { users: User[] } = {
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
  ]
};

export const simulateLogin = ({ email, password }: { email: string, password?: string }): Promise<any> => {
  const { users } = data;
  const user = users.find(u => u.email === email && u.password === password);

  if (user) {
    const accessToken = simulateJwtToken(user.id);
    const refreshToken = simulateJwtToken(user.id);

    const userData = { ...user };
    delete userData.password;

    return Promise.resolve({
      config: {},
      data: {
        userData,
        accessToken,
        refreshToken
      },
      headers: {},
      request: { responseURL: '/jwt/login' },
      status: 200
    });
  } else {
    return Promise.reject(new Error('Email or Password is Invalid'));
  }
};
