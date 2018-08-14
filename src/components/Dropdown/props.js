import PropTypes from 'prop-types';

const defaultProps = {
  placeholder: 'Type',
};


const propTypes = {
  divClassName: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  required: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default {
  propTypes,
  defaultProps,
};
