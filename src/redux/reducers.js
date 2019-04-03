import {
  FETCH_PROFILE_BEGIN, FETCH_PROFILE_SUCCESS, FETCH_PROFILE_FAILURE,
  FETCH_SOURCES_BEGIN, FETCH_SOURCES_SUCCESS, FETCH_SOURCES_FAILURE,
} from './actions';

const initialState = {
  profile: {
    username: '',
    email: '',
  },
  sources: [],
  loading: false,
  token: '',
  error: null,
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_PROFILE_BEGIN:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_PROFILE_SUCCESS:
      return {
        ...state,
        profile: {
          handle: action.payload.profile.handle,
          email: action.payload.profile.email,
          pictureB64: action.payload.profile.pictureB64,
        },
        loading: false,
      };
    case FETCH_PROFILE_FAILURE:
      return {
        ...state,
        error: action.payload.error,
      };
    case FETCH_SOURCES_BEGIN:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_SOURCES_SUCCESS:
      return {
        ...state,
        loading: false,
        sources: action.payload.sources,
      };
    case FETCH_SOURCES_FAILURE:
      return {
        ...state,
        error: action.payload.error,
      };
    default:
      return state;
  }
}

export default rootReducer;
