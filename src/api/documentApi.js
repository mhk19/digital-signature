import { CONFIG } from "../config/config";
import $ from "jquery";

const getPendingDocumentsForProf = (token) => {
  return $.ajax({
    method: "GET",
    url: `${CONFIG.severURL}/api/secure/pending-approvals/`,
    beforeSend(xhr) {
      xhr.setRequestHeader("Authorization", `Bearer ${token}`);
    },
  }).done((res) => {
    console.log(res);
    return res.responseJSON;
  });
};

const getSignedDocumentsForProf = (token) => {
  return $.ajax({
    method: "GET",
    url: `${CONFIG.severURL}/api/secure/signed-documents/`,
    beforeSend(xhr) {
      xhr.setRequestHeader("Authorization", `Bearer ${token}`);
    },
  }).done((res) => {
    console.log(res);
    return res.responseJSON;
  });
};

const getRejectedDocumentsForProf = (token) => {
  return $.ajax({
    method: "GET",
    url: `${CONFIG.severURL}/api/secure/rejected-documents/`,
    beforeSend(xhr) {
      xhr.setRequestHeader("Authorization", `Bearer ${token}`);
    },
  }).done((res) => {
    console.log(res);
    return res.responseJSON;
  });
};

const getDocumentsForStudent = (token) => {
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
  formData.append("document", document, "document.pdf");
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

const requestSignature = async (token, doc_id, prof_ids) => {
  return $.ajax({
    method: "POST",
    url: `${CONFIG.severURL}/api/secure/request-signature`,
    data: { id: doc_id, prof_ids: prof_ids },
    dataType: "json",
    beforeSend(xhr) {
      xhr.setRequestHeader("Authorization", `Bearer ${token}`);
    },
  }).done((res) => {
    console.log(res);
    return res.responseJSON;
  });
};

const getSingleDocument = async (token, id) => {
  console.log(id);
  return $.ajax({
    method: "POST",
    url: `${CONFIG.severURL}/api/secure/document-single/`,
    data: {
      id: id,
    },
    dataType: "json",
    beforeSend(xhr) {
      xhr.setRequestHeader("Authorization", `Bearer ${token}`);
    },
  }).done((res) => {
    console.log(res);
    return res.responseJSON;
  });
};

const approveDocument = async (
  token,
  doc_id,
  top,
  left,
  bottom,
  right,
  page
) => {
  return $.ajax({
    method: "POST",
    url: `${CONFIG.severURL}/api/secure/decide`,
    data: {
      document_id: doc_id,
      decision: "approve",
      top: top,
      right: right,
      bottom: bottom,
      left: left,
      page: page - 1,
    },
    dataType: "json",
    beforeSend(xhr) {
      xhr.setRequestHeader("Authorization", `Bearer ${token}`);
    },
  }).done((res) => {
    console.log(res);
    return res.responseJSON;
  });
};

const rejectDocument = async (token, doc_id) => {
  return $.ajax({
    method: "POST",
    url: `${CONFIG.severURL}/api/secure/decide`,
    data: { document_id: doc_id, decision: "reject" },
    dataType: "json",
    beforeSend(xhr) {
      xhr.setRequestHeader("Authorization", `Bearer ${token}`);
    },
  }).done((res) => {
    console.log(res);
    return res.responseJSON;
  });
};

export {
  getPendingDocumentsForProf,
  getDocumentsForStudent,
  postDocument,
  requestSignature,
  getSingleDocument,
  approveDocument,
  getSignedDocumentsForProf,
  getRejectedDocumentsForProf,
  rejectDocument,
};
