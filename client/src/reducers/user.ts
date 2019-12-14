import { FIND_ALL_USER } from "../actions/user";

export const userReducer = (state: any, action: any) => {
  switch (action.type) {
    case FIND_ALL_USER.REQUEST:
      return {
        ...state,
        error: null,
        isLoading: true
      };
    case FIND_ALL_USER.SUCCESS:
      return {
        ...state,
        isLoading: false,
        users: action.users,
        numFound: action.users.length,
        error: null
      };
    case FIND_ALL_USER.FAIL:
      return {
        ...state,
        isLoading: false,
        error: "Une erreur est survenue lors de la récupération des utilisateurs clients"
      };
    default:
      return state;
  }
};
