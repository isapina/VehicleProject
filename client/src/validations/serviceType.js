import _ from 'lodash';
import Validator from 'validator';

export const validateServiceType = (data) => {
  let errors = {};

  const removeNonBoolean = _.omit(data, ['name', 'id', 'carServiceHistories', 'serviceIntervals']);
  const filtered = _.omitBy(removeNonBoolean, o => !o);

  data.name = !_.isEmpty(data.name) ? data.name : '';

  if (Validator.isEmpty(data.name)) {
    errors.name = "Service name field is required";
  }

  if (_.isEmpty(filtered) || filtered === {}) {
    errors.serviceCheckbox = "At least one service option need to be selected";
  }

  return {
    errors,
    isValid: _.isEmpty(errors)
  }
}