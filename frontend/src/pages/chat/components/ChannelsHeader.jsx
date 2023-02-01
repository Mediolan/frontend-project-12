import React from 'react';
import { Button } from 'react-bootstrap';
import { PlusSquare } from 'react-bootstrap-icons';

const ChannelsHeader = (handleAddChannel) => (
  <div className="d-flex justify-content-between mb-2 ps-4 pe-2">
    <span>Каналы</span>
    <Button
      type="button"
      variant="group-vertical"
      className="p-0 text-primary"
      onClick={handleAddChannel}
    >
      <PlusSquare size={20} />
      <span className="visually-hidden">+</span>
    </Button>
  </div>
);

export default ChannelsHeader;
