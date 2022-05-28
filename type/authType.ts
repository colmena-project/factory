export type AuthType = {
  isAuth: boolean;
  // eslint-disable-next-line no-unused-vars
  setIsAuth: (name: boolean) => void;
};

export type AuthLoginType = {
  loading: boolean;
  error: boolean;
  menssageError: string;
};
