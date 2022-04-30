import { CONFIG } from "../config/config";
import $ from "jquery";

const registerProf = async (email, password, name, signature) => {
  var formData = new FormData();
  formData.append("email", email);
  formData.append("password", password);
  formData.append("name", name);
  formData.append("signature", signature, "signature");
  formData.append("isProf", "true");
  var settings = {
    url: `${CONFIG.severURL}/api/users`,
    method: "POST",
    timeout: 0,
    processData: false,
    mimeType: "multipart/form-data",
    contentType: false,
    data: formData,
  };
  return $.ajax(settings).done((res) => {
    return JSON.parse(res);
  });
};

const registerStudent = (email, password, name) => {
  return $.ajax({
    method: "POST",
    url: `${CONFIG.severURL}/api/users`,
    data: {
      email: email,
      password: password,
      name: name,
      isProf: "false",
      signature: null,
    },
    dataType: "json",
  }).done((res) => {
    console.log(res);
    return res.responseJSON;
  });
};

const login = async (email, password) => {
  return $.ajax({
    method: "POST",
    url: `${CONFIG.severURL}/api/login`,
    data: { email: email, password: password },
    dataType: "json",
  }).done((res) => {
    console.log(res);
    return res;
  });
};

const getUser = async (token) => {
  return $.ajax({
    method: "GET",
    url: `${CONFIG.severURL}/api/secure/users`,
    beforeSend(xhr) {
      xhr.setRequestHeader("Authorization", `Bearer ${token}`);
    },
  }).done((res) => {
    return res;
  });
};

const getProfs = async (token) => {
  return $.ajax({
    method: "GET",
    url: `${CONFIG.severURL}/api/secure/profs`,
    beforeSend(xhr) {
      xhr.setRequestHeader("Authorization", `Bearer ${token}`);
    },
  }).done((res) => {
    return res;
  });
};

export { registerProf, registerStudent, login, getUser, getProfs };
