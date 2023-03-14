import React, { useEffect } from 'react';
import Spinner from 'react-bootstrap/Spinner';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import ChatBox from './components/ChatBox';
import ChannelsBox from './components/ChannelsBox';
import Modals from './components/Modal';
import { useAuth } from '../../context';

const Chat = () => {
  const { t } = useTranslation();
  const { loadingStatus, error } = useSelector((state) => state.loader);
  const { logOut } = useAuth();

  useEffect(() => {
    if (loadingStatus === 'failed') {
      logOut();
      if (!error.isAxiosError) {
        toast.error(t('toast.unknownErr'));
      }
      toast.error(t('toast.networkErr'));
    }
  }, [loadingStatus, logOut, error, t]);

  return (loadingStatus === 'loading'
    ? (
      <div className="h-100 d-flex justify-content-center align-items-center">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">{t('loading')}</span>
        </Spinner>
      </div>
    )
    : (
      <>
        <Modals />
        <div className="container h-100 my-4 overflow-hidden rounded shadow">
          <div className="row h-100 bg-white flex-md-row">
            <div className="col-4 col-md-2 border-end pt-5 px-0 bg-light">
              <ChannelsBox />
            </div>
            <div className="col p-0 h-100">
              <ChatBox />
            </div>
          </div>
        </div>
      </>
    )
  );
};

export default Chat;
