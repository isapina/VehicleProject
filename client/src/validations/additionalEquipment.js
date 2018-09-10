import _ from 'lodash';
import Validator from 'validator';

export const validateAdditionalEquipment = (data) => {
  let errors = {};

  data.name = !_.isEmpty(data.name) ? data.name : '';

  if (Validator.isEmpty(data.name)) {
    errors.name = "Name field is required";
  }

  return {
    errors,
    isValid: _.isEmpty(errors)
  }
}