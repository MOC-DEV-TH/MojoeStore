import {apiService} from '@services';
import {showMessageErrorRoot} from '@slices';
import {isUndefined} from '@utils';
import {useCallback, useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import {ICategoryDataType} from 'src/features/productPicker/Type';

export const useCategorySearch = ({url, onSearchKey}: any) => {
  const dispatch = useDispatch();
  const [category, setCategory] = useState<{
    isLoading: boolean;
    isSearching: boolean;
    data: ICategoryDataType[];
    searchedData: ICategoryDataType[];
    respond?: any;
  }>({
    isLoading: false,
    isSearching: false,
    data: [],
    respond: {},
    searchedData: [],
  });

  const displayData = category.isSearching
    ? category.searchedData
    : category.data;

  const fetch = useCallback(async () => {
    try {
      setCategory({...category, isLoading: true});
      const response = await apiService.get(url);
      if (!isUndefined(response.data)) {
        setCategory({
          ...category,
          data: response.data,
          isLoading: false,
          respond: response,
        });
        return;
      }
      throw response;
    } catch (error: any) {
      setCategory({...category, isLoading: false});
      dispatch(
        showMessageErrorRoot({
          message: error?.message || error,
        }),
      );
    }
  }, []);

  useEffect(() => {
    fetch();
  }, []);

  const onSearch = (searchText: string) => {
    console.log('searchText', searchText);
    const lowerCaseKeyword = searchText?.toLowerCase();
    const isSearching = searchText?.length > 0;
    const result = category.data.filter((item: any) =>
      item?.[onSearchKey]?.toLowerCase().includes(lowerCaseKeyword),
    );
    setCategory(prev => ({
      ...prev,
      searchedData: result || [],
      isSearching,
    }));
  };

  return {
    isLoading: category.isLoading,
    isSearching: category.isSearching,
    data: displayData,
    respond: category.respond,
    searchedData: category.searchedData,
    onSearch,
    fetch,
  };
};
