import { CONFIG } from "../config/config";
import $ from "jquery";

const verifyDocument = async (document) => {
  var formData = new FormData();
  formData.append("document", document, "document.pdf");
  var settings = {
    url: `${CONFIG.severURL}/api/verify`,
    method: "POST",
    timeout: 0,
    processData: false,
    mimeType: "multipart/form-data",
    contentType: false,
    data: formData,
  };
  return $.ajax(settings).done((res) => {
    console.log(res);
    return res.responseJSON;
  });
};

export { verifyDocument };
