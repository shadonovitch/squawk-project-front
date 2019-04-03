export const FETCH_PROFILE_BEGIN = 'FETCH_PROFILE_BEGIN';
export const FETCH_PROFILE_SUCCESS = 'FETCH_PROFILE_SUCCESS';
export const FETCH_PROFILE_FAILURE = 'FETCH_PROFILE_FAILURE';

export const FETCH_SOURCES_BEGIN = 'FETCH_SOURCES_BEGIN';
export const FETCH_SOURCES_SUCCESS = 'FETCH_SOURCES_SUCCESS';
export const FETCH_SOURCES_FAILURE = 'FETCH_SOURCES_FAILURE';

export const fetchProfileBegin = () => ({
  type: FETCH_PROFILE_BEGIN,
});

export const fetchProfileSuccess = profile => ({
  type: FETCH_PROFILE_SUCCESS,
  payload: { profile },
});

export const fetchProfileFailure = error => ({
  type: FETCH_PROFILE_FAILURE,
  payload: { error },
});


export const fetchSourcesBegin = () => ({
  type: FETCH_SOURCES_BEGIN,
});

export const fetchSourcesSuccess = sources => ({
  type: FETCH_SOURCES_SUCCESS,
  payload: { sources },
});

export const fetchSourcesFailure = error => ({
  type: FETCH_SOURCES_FAILURE,
  payload: { error },
});

export function fetchProfile(token) {
  return (dispatch) => {
    dispatch(fetchProfileBegin());
    fetch('https://squawkapi.chaz.pro/profile', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then((responseJson) => {
        const { username, email } = responseJson;
        const profile = { username, email };
        dispatch(fetchProfileSuccess(profile));
      }).catch(error => dispatch(fetchProfileFailure(error)));
  };
}

export function fetchSources(token) {
  return (dispatch) => {
    dispatch(fetchSourcesBegin());
    fetch('https://squawkapi.chaz.pro/sources', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
      },
    }).then(response => response.json())
      .then((responseJson) => {
        dispatch(fetchSourcesSuccess(responseJson.sources));
      }).catch(error => dispatch(fetchSourcesFailure(error)));
  };
}
