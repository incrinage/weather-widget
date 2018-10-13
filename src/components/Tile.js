import React from 'react';
import PropTypes from 'prop-types';

function Tile(props) {
  return (
    <div className={`tile ${props.className}`}>
      {props.children}
    </div>
  );
}

Tile.propTypes = {
  className: PropTypes.string,
  children: PropTypes.any,
};

export default Tile;
