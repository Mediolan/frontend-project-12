import React from 'react';
import { Button, ButtonGroup, Dropdown } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import ChannelsHeader from './ChannelsHeader';
import { openModal } from '../../../store/slices/modalSlice.js';
import { setCurrentChannelId } from '../../../store/slices/channelsSlice';
import { channelsSelectors } from '../../../store/selectors';

const ChannelsBox = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { currentChannelId } = useSelector((state) => state.channels);
  const channels = useSelector(channelsSelectors.selectAll);

  const handleChooseChannel = (channelId) => () => {
    dispatch(setCurrentChannelId(channelId));
  };
  const handleAddChannel = () => {
    dispatch(openModal({ activeModal: 'adding' }));
  };
  const handleRenameChannel = (channelId) => () => {
    dispatch(openModal({ activeModal: 'rename', channelId }));
  };
  const handleRemoveChannel = (channelId) => () => {
    dispatch(openModal({ activeModal: 'remove', channelId }));
  };

  return (
    <>
      <ChannelsHeader handleAddChannel={handleAddChannel} />
      <ul className="nav flex-column nav-pills nav-fill px-2">
        {channels.map((channel) => (
          <li key={channel.id} className="nav-item w-100">
            {channel.removable
              ? (
                <Dropdown as={ButtonGroup} className="d-flex">
                  <Button
                    type="button"
                    key={channel.id}
                    className="w-100 rounded-0 border-0 text-start text-truncate"
                    onClick={handleChooseChannel(channel.id)}
                    variant={channel.id === currentChannelId ? 'secondary' : null}
                  >
                    <span className="me-1">#</span>
                    {channel.name}
                  </Button>
                  <Dropdown.Toggle split className="flex-grow-0 border-0" variant={channel.id === currentChannelId ? 'secondary' : null}>
                    <span className="visually-hidden">{t('channels.menu')}</span>
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item onClick={handleRenameChannel(channel.id)}>{t('channels.rename')}</Dropdown.Item>
                    <Dropdown.Item onClick={handleRemoveChannel(channel.id)}>{t('channels.remove')}</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              ) : (
                <Button
                  type="button"
                  key={channel.id}
                  className="w-100 rounded-0 border-0 text-start"
                  onClick={handleChooseChannel(channel.id)}
                  variant={channel.id === currentChannelId ? 'secondary' : null}
                >
                  <span className="me-1">#</span>
                  {channel.name}
                </Button>
              )}
          </li>
        ))}
      </ul>
    </>
  );
};

export default ChannelsBox;
