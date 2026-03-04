import {hideLoadingRoot, init, showLoadingRoot} from '@slices';
import {isUndefined} from '@utils';
import {useEffect, useRef, useState} from 'react';
import {useDispatch} from 'react-redux';

type useInfiniteProps = {
  classify: string;
  url: string;
  pageStart: number;
  pageSize: number;
  param?: {};
  config?: {};
  canLoadMore: any;
  transformData?: any;
  hideDefaultLoading?: boolean;
};

interface IuseInfiniteState {
  isLoading: boolean;
  isRefreshing: boolean;
  response: any;
  data: any[];
  fetchPage: number;
  keepCondition: {};
}

export const useInfinite = ({
  classify,
  url,
  param = {},
  pageStart,
  pageSize,
  canLoadMore,
  config,
  transformData,
  hideDefaultLoading,
}: useInfiniteProps) => {
  const dispatch = useDispatch();
  const hasMoreIdentifierRef = useRef();

  const createInitialState = (
    isRefresh: boolean = false,
  ): IuseInfiniteState => ({
    isLoading: false,
    isRefreshing: isRefresh,
    response: {},
    data: [],
    fetchPage: pageStart,
    keepCondition: {},
  });

  const [dataInfo, setDataInfo] = useState<IuseInfiniteState>(
    createInitialState(),
  );

  useEffect(() => {
    if (!isUndefined(canLoadMore)) {
      const isCanLoadMore = canLoadMore(dataInfo.response);
      hasMoreIdentifierRef.current = isCanLoadMore;
    }
  }, [canLoadMore]);

  const fetchData: any = (conditionParam: {}, reset = false) => {
    const {fetchPage, keepCondition} = dataInfo;
    const condition = conditionParam ?? keepCondition;
    !hideDefaultLoading
      ? dispatch(showLoadingRoot())
      : setDataInfo(prev => ({...prev, isLoading: true}));

    dispatch(
      init({
        url: url,
        config: config,
        params: {
          current: reset ? pageStart : fetchPage,
          pageSize: pageSize,
          ...param,
          ...condition,
        },
        onSuccess: (res: any) => {
          let resData = res[classify];
          if (transformData) {
            resData = transformData(resData);
          }
          setDataInfo(prev => ({
            ...prev,
            isLoading: false,
            isRefreshing: false,
            response: res,
            data: reset ? [...resData] : [...prev.data, ...resData],
            fetchPage: reset ? pageStart + 1 : prev.fetchPage + 1,
            keepCondition: conditionParam ?? keepCondition,
          }));
          dispatch(hideLoadingRoot());
        },
        onError: (res: any) => {
          setDataInfo(prev => ({
            ...prev,
            isLoading: false,
            isRefreshing: false,
          }));
          dispatch(hideLoadingRoot());
        },
      }),
    );
  };

  useEffect(() => {
    if (dataInfo.isRefreshing) {
      fetchData();
    }
  }, [dataInfo.isRefreshing]);

  const fetchNextPage = () => {
    if (hasMoreIdentifierRef.current !== true) return;
    fetchData();
  };

  const onRefresh = () => {
    setDataInfo(createInitialState(true));
  };

  return {
    data: dataInfo.data,
    response: dataInfo.response,
    isLoading: dataInfo.isLoading,
    isRefreshing: dataInfo.isRefreshing,
    fetchData,
    fetchNextPage,
    onRefresh,
  };
};
