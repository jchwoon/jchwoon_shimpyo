import './App.css';
import './fonts.css';
import { useSetRecoilState } from 'recoil';
import { Outlet } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { REGENERATION_REFRESH_API_PATH } from './constants/api/userApi';
import { accessTokenAtom } from './recoil/userAtoms';
import useHttpRequest from './hooks/useHttpRequest';
import useLogout from './hooks/useLogout';
import Loading from './components/shared/Loading';

interface ResultData {
  accessToken: string;
}

function App() {
  const { logoutHandler } = useLogout();
  const setAccessToken = useSetRecoilState(accessTokenAtom);
  const [isCheckLoginState, setIsCheckLoginState] = useState(false);
  const { responseData, sendRequest, isLoading } = useHttpRequest<ResultData>();

  const sendRefreshToken = async () => {
    await sendRequest({ url: `${REGENERATION_REFRESH_API_PATH}`, withcredential: true });
  };

  useEffect(() => {
    sendRefreshToken();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setIsCheckLoginState(true);
    if (!responseData) return;
    if (responseData.isSuccess) {
      setAccessToken(responseData.result.accessToken);
    } else {
      logoutHandler();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [responseData]);

  if (isLoading || !isCheckLoginState) {
    return <Loading />;
  }

  return <Outlet />;
}

export default App;
