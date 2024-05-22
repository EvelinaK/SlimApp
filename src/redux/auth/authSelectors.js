const sid = state => state.auth.sid;
const getToken = state => state.auth.accessToken;
//const getRefreshToken = state => state.auth.refreshToken;

const selectors = { sid, getToken };
export default selectors;
