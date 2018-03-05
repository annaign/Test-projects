import React from 'react';
import PropTypes from 'prop-types';

export default function Button(props) {
  const { children, onClick } = props;

  return <button onClick={onClick}>{children}</button>;
}

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
  children: PropTypes.string,
};

Button.defaultProps = {
  children: '',
};
