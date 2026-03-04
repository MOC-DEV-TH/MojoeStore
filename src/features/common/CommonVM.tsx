import {
  getParentCategory,
  getParentCategoryIcon,
  getProductByCategory,
  getSubCategory,
  getSubCategoryByCategory,
} from '@slices';
import {useState} from 'react';
import {useDispatch} from 'react-redux';
import {IProductDataType} from '../productPicker/Type';
const CommonVM = () => {
  const dispatch = useDispatch();
  const [productListingInfo, setProductListingInfo] = useState<{
    isSearching: boolean;
    data: IProductDataType[];
    searchedData: IProductDataType[];
  }>({
    isSearching: false,
    data: [],
    searchedData: [],
  });

  const fetchParentCategory = () => {
    dispatch(getParentCategory());
  };

  const fetchParentCategoryIcon = () => {
    dispatch(getParentCategoryIcon());
  };

  const fetchSubCategory = () => {
    dispatch(getSubCategory());
  };

  const fetchSubCategoryByCategory = (categoryId: any) => {
    dispatch(
      getSubCategoryByCategory({
        categoryId,
      }),
    );
  };

  const fetchProductByCategory = (categoryId: any) => {
    dispatch(
      getProductByCategory({
        categoryId,
        onSuccess: (data: any[]) => {
          console.log('getProductByCategory data', data);
          setProductListingInfo({
            ...productListingInfo,
            data: data,
          });
        },
      }),
    );
  };

  return {
    fetchParentCategory,
    fetchSubCategory,
    fetchProductByCategory,
    fetchSubCategoryByCategory,
    fetchParentCategoryIcon,
    setProductListingInfo,
    productListingInfo,
  };
};

export {CommonVM};
