// Import danh mục cố định
import categories from "../../utils/categories"


// Khởi tạo state ban đầu
const initialState = {
  categories, // Dữ liệu cố định
};

// Action type
const GET_CATEGORIES = 'GET_CATEGORIES';

// Reducer
const categoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_CATEGORIES:
      return {
        ...state,
        categories: action.payload, // Cập nhật danh sách categories (nếu cần)
      };
    default:
      return state;
  }
};

// Action creator
export const getCategories = () => {
  return {
    type: GET_CATEGORIES,
    payload: categories, // Trả về dữ liệu cố định
  };
};

export default categoryReducer;

