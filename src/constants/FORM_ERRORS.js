
const FORM_ERRORS = {
    REQUIRED: {
        value: true,
        type: "required",
        message: "必填"
    },
    DATE_LENGTH: {
        type: "date_length",
        message: "格式不符",
    },
    EMAIL_PATTERN: {
        value: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, // eslint-disable-line
        type: "pattern",
        message: "請輸入正確的 email"
    },
    PHONE_PATTERN: {
        value: /^[0-9+-\s]+$/,
        type: "pattern",
        message: "格式不符",
    },
    ALL_NUMBERS_PATTERN: {
        value: /^[0-9]+$/,
        type: "pattern",
        message: "請輸入數字",
    },
};

export default FORM_ERRORS;
