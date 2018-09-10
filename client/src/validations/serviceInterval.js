import _ from 'lodash';
import Validator from 'validator';

export const validateServiceInterval = (data) => {
  let errors = {};

  data.maximumMileage = !_.isEmpty(data.maximumMileage) ? data.maximumMileage : '';

  data.serviceTypeId = !_.isEmpty(data.serviceTypeId) ? data.serviceTypeId : '';

  data.vehicleModelId = !_.isEmpty(data.vehicleModelId) ? data.vehicleModelId : '';

  if (Validator.isEmpty(data.maximumMileage)) {
    errors.maximumMileage = "Maximum mileage field is required";
  }

  if (Validator.isEmpty(data.serviceTypeId)) {
    errors.serviceTypeId = "Service type is required";
  }

  if (Validator.isEmpty(data.vehicleModelId)) {
    errors.vehicleModelId = "Vehicle model is required";
  }

  return {
    errors,
    isValid: _.isEmpty(errors)
  }
}