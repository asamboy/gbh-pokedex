import PropTypes from 'prop-types';

const propTypes = {
  divClassName: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  min: PropTypes.string,
  required: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default {
  propTypes,
};
