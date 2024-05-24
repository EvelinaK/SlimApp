const sid = (state) => state.auth.sid;
const getToken = (state) => state.auth.accessToken;


const selectors = { sid, getToken };
export default selectors;
