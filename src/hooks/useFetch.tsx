import {apiService} from '@services';
import {showMessageErrorRoot} from '@slices';
import {isUndefined} from '@utils';
import {useState} from 'react';
import {useDispatch} from 'react-redux';

export const useFetch = ({url, params = {}, onSuccess}: any) => {
  const dispatch = useDispatch();
  const [info, setInfo] = useState<{
    isLoading: boolean;
    data: any[];
  }>({
    isLoading: false,
    data: [],
  });

  const fetch = async () => {
    try {
      setInfo({...info, isLoading: true});
      const response = await apiService.get(url, params);
      if (!isUndefined(response.data)) {
        setInfo(prev => ({...prev, data: response.data}));
        onSuccess && onSuccess(response.data, response);
        return;
      }
      throw response;
    } catch (error: any) {
      dispatch(
        showMessageErrorRoot({
          message: error?.message || error,
        }),
      );
    } finally {
      setInfo(prev => ({...prev, isLoading: false}));
    }
  };

  return {
    isLoading: info.isLoading,
    data: info.data,
    fetch,
  };
};
