import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { Spinner } from 'react-bootstrap';
import ChatBox from './components/ChatBox';
import ChannelsBox from './components/ChannelsBox';
import Modals from './components/Modals';
import { fetchAuthData } from '../../store/slices/loaderSlice';
import { useAuth } from '../../context';

const Chat = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { logOut } = useAuth();
  const { loadingStatus, error } = useSelector((state) => state.loader);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    dispatch(fetchAuthData(user.token));
  }, [dispatch, user]);

  useEffect(() => {
    if (loadingStatus === 'finish') setLoading(false);

    if (loadingStatus === 'failed') {
      if (error.status === 401) {
        logOut();
      }
      if (error === 'AxiosError') {
        toast.error(t('errors.network'));
        return;
      }
      toast.error(t('errors.unknown'));
    }
  }, [loadingStatus, logOut, t, dispatch, error]);

  return loading ? (
    <div className="h-100 d-flex justify-content-center align-items-center">
      <Spinner animation="border" role="status">
        <span className="visually-hidden">{t('loading')}</span>
      </Spinner>
    </div>
  ) : (
    <>
      <Modals />
      <div className="container h-100 my-4 overflow-hidden rounded shadow">
        <div className="row h-100 bg-white flex-md-row">
          <div className="col-4 col-md-2 border-end px-0 bg-light flex-column h-100 d-flex">
            <ChannelsBox />
          </div>
          <div className="col p-0 h-100">
            <ChatBox />
          </div>
        </div>
      </div>
    </>
  );
};

export default Chat;
