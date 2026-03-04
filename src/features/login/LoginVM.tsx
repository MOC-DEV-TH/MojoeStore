import {attemptLogin} from '@slices';
import {useDispatch} from 'react-redux';
const LoginVM = () => {
  const dispatch = useDispatch();

  const login = (email: string, password: any) => {
    const data = {email, password};
    dispatch(attemptLogin(data));
  };

  return {
    login,
  };
};

export {LoginVM};
