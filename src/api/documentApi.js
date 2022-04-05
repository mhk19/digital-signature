import { CONFIG } from "../config/config";
import $ from "jquery";

const getDocuments = (token) => {
  return $.ajax({
    method: "GET",
    url: `${CONFIG.severURL}/api/secure/documents/`,
    beforeSend(xhr) {
      xhr.setRequestHeader("Authorization", `Bearer ${token}`);
    },
  }).done((res) => {
    console.log(res);
    return res.responseJSON;
  });
};

const postDocument = async (token, description, name, document) => {
  var formData = new FormData();
  formData.append("description", description);
  formData.append("name", name);
  formData.append("document", document, "document");
  var settings = {
    url: `${CONFIG.severURL}/api/secure/documents`,
    method: "POST",
    timeout: 0,
    processData: false,
    mimeType: "multipart/form-data",
    contentType: false,
    data: formData,
    beforeSend(xhr) {
      xhr.setRequestHeader("Authorization", `Bearer ${token}`);
    },
  };
  return $.ajax(settings).done((res) => {
    console.log(res);
    return res.responseJSON;
  });
};

const requestSignature = async (token, doc_id, prof_id) => {
  return $.ajax({
    method: "POST",
    url: `${CONFIG.severURL}/api/secure/request-signature`,
    data: { id: doc_id, prof_id: prof_id },
    dataType: "json",
    beforeSend(xhr) {
      xhr.setRequestHeader("Authorization", `Bearer ${token}`);
    },
  }).done((res) => {
    console.log(res);
    return res.responseJSON;
  });
};

export { getDocuments, postDocument, requestSignature };
