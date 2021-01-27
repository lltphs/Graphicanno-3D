import { API_URL, User } from './auth-header';

const mapStorageURL = (url: string): string => {
  let originURL = API_URL + url;

  while (originURL[originURL.length - 1] === '/') {
    originURL = originURL.slice(-1);
  }

  const userJson = localStorage.getItem('user');
  if (userJson === null) {
    return originURL;
  }
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const user: User = JSON.parse(userJson);
  if (user && user.access) {
    return `${originURL}/?token=${user.access}`;
  }
  return originURL;
};

// const loadImageFromServer = async (url: string): Promise<string> => {
//   try {
//     const response = await axiosInstance.get(`${API_URL}${url}`, {
//       headers: authHeader(),
//       responseType: 'arraybuffer',
//     });

//     console.log(response);

//     return Buffer.from(response.data, 'binary').toString('base64');
//   } catch (error) {
//     console.log(`Can't fetch meta data: ${error}`);
//     throw error;
//   }
// };

// eslint-disable-next-line import/prefer-default-export
export { mapStorageURL };
