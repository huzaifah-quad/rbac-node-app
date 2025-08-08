const BaseResponseHelper = require('./BaseResponseHelper');

const Success = (data) =>
  BaseResponseHelper({
    statusCode: '00',
    code: 200,
    data,
  });

const Created = (data) =>
  BaseResponseHelper({
    statusCode: '00',
    code: 201,
    data,
  });

const Accepted = (data) =>
  BaseResponseHelper({
    statusCode: '00',
    code: 202,
    data,
  });

const NotFound = (statusCode = '11', attr = '') =>
  BaseResponseHelper({
    statusCode,
    code: 422,
    errorMessage: `${attr} Not Found`,
  });

const Unauthorize = () =>
  BaseResponseHelper({
    statusCode: '99',
    code: 401,
    errorMessage: 'Unauthorize',
  });

const Forbidden = () =>
  BaseResponseHelper({
    statusCode: '99',
    code: 403,
    errorMessage: 'Forbidden',
  });

const BadRequest = (msg = '') =>
  BaseResponseHelper({
    statusCode: '99',
    code: 400,
    errorMessage: msg || 'Bad Request',
  });


const BadRequestCSV = (msg = '', csv) =>
  BaseResponseHelper({
    statusCode: '99',
    code: 400,
    errorMessage: msg || 'Bad Request',
    csv
  });

const InternalServerError = (errorMessage = '') =>
  BaseResponseHelper({
    statusCode: '99',
    code: 500,
    errorMessage,
  });


const SendFile = (filepath) =>
  BaseResponseHelper({
    code: 200,
    filepath,
  });


const UnprocessableEntity = (validatorAttr, errors) =>
  BaseResponseHelper({
    statusCode: validatorAttr.code,
    code: 422,
    errorMessage: validatorAttr.message,
    errors,
  });

module.exports = {
  Success,
  Created,
  Accepted,
  NotFound,
  Unauthorize,
  Forbidden,
  BadRequest,
  InternalServerError,
  SendFile,
  UnprocessableEntity,
  BadRequestCSV
};
