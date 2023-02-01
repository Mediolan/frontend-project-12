import React from 'react';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import { useSelector } from 'react-redux';
import ChannelsHeader from './ChannelsHeader';
// import { selectors } from '../../../store/slices/channelsSlice.js';

const ChannelsBox = () => {
  // const dispatch = useDispatch();

  const handleAddChannel = () => {

  };
  const { entities, currentChannelId } = useSelector((state) => state.channels);
  const channels = Object.values(entities);

  return (
    <>
      <ChannelsHeader />
      <ul className="nav flex-column nav-pills nav-fill px-2">
        {channels.map((channel) => (
          <li key={channel.id} className="nav-item w-100">
            {channel.removable
              ? (
                <Dropdown as={ButtonGroup} className="d-flex">
                  <Button
                    type="button"
                    key={channel.id}
                    className="w-100 rounded-0 text-start text-truncate"
                    variant={channel.id === currentChannelId ? 'secondary' : null}
                  >
                    <span className="me-1">#</span>
                    {channel.name}
                  </Button>
                  <Dropdown.Toggle split className="flex-grow-0" variant={channel.id === currentChannelId ? 'secondary' : null}>
                    <span className="visually-hidden">=</span>
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item>Action 1</Dropdown.Item>
                    <Dropdown.Item>Action 2</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              ) : (
                <Button
                  type="button"
                  variant={channel.id === currentChannelId ? 'secondary' : null}
                  key={channel.id}
                  className="w-100 rounded-0 text-start"
                  onClick
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
