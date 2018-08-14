import PropTypes from 'prop-types';

const propTypes = {
  divClassName: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default {
  propTypes,
};
