import React, { useEffect, useState, useCallback } from "react";
import { CONFIG } from "../config/config";
import { PdfViewer } from "react-pdf-selection";
import { Modal } from "antd";
import {
  approveDocument,
  getSingleDocument,
  rejectDocument,
} from "../api/documentApi";
import { getCookie } from "../utils/handleCookies";
import { getFileId } from "../utils/username";
import { useSelector } from "react-redux";

const RequestCol = ({ name, title, file_id, isPendingTab }) => {
  const [selection, setSelection] = useState();
  const [areaSelectionActive, setAreaSelectionActive] = useState(true);
  const [isShowPdfActive, setIsShowPdfActive] = useState(false);
  const [isFileInfoActive, setFileInfoActive] = useState(false);
  const [url, setURL] = useState("");
  const [file, setFile] = useState({});
  const userStore = useSelector((state) => state.userStore);
  const getFile = async () => {
    setFileInfoActive(false);
    setIsShowPdfActive(true);
  };

  const handleFileInfo = () => {
    setFileInfoActive(true);
  };

  const setAndLogSelection = (highlightTip) => {
    if (highlightTip != null) {
      console.log(highlightTip);
      setSelection(highlightTip);
    }
  };

  const handleCancel = () => {
    setIsShowPdfActive(false);
    setFileInfoActive(false);
  };

  const handleOk = async () => {
    var coordinates = selection.position.normalized.boundingRect;
    console.log(coordinates, selection.position.pageNumber);
    await approveDocument(
      getCookie("token"),
      file_id,
      coordinates.top,
      coordinates.left,
      coordinates.bottom,
      coordinates.right,
      selection.position.pageNumber
    )
      .then((res) => {
        res = JSON.parse(res);
      })
      .catch((err) => {
        // alert("Error in uploading document", err);
      });
    alert("Approved the request.");
    setIsShowPdfActive(false);
  };

  const handleReject = () => {
    rejectDocument(getCookie("token"), file_id)
      .then((res) => {
        console.log(res);
        alert("Rejected the request.");
      })
      .catch((err) => {
        console.log(err);
        alert("Rejected the request.");
      });
    setIsShowPdfActive(false);
  };

  useEffect(() => {
    getSingleDocument(getCookie("token"), file_id).then((res) => {
      console.log(res);
      console.log(res.file_path);
      setFile(res);
      setURL(
        `${CONFIG.severURL}/api/secure/document/${getFileId(res.file_path)}`
      );
    });
  }, [file_id]);

  return (
    <div>
      <button
        className="w-full bg-[#1d88e30d] flex justify-between items-center p-6 font-[Poppins] text-[#666666] h-10 my-4"
        onClick={handleFileInfo}
      >
        <div>{name}</div>
        <div>{title}</div>
        <div className="text-[#1D88E3]">View Request &#8594;</div>
      </button>
      <Modal
        title={name}
        style={{ height: "100vh" }}
        visible={isFileInfoActive}
        width="80%"
        className="font-[Poppins] text-xl font-semibold overflow-auto"
        footer={null}
        onCancel={handleCancel}
      >
        <div>File Description: {file.description}</div>
        {file.pending_approvals ? (
          file.pending_approvals.length ? (
            <div>
              Pending Approvals:{" "}
              {file.pending_approvals.map((prof, idx) => {
                return <div key={idx}>{prof.name} </div>;
              })}
            </div>
          ) : null
        ) : null}
        {file.rejected_approvals ? (
          file.rejected_approvals.length ? (
            <div>
              Rejected By:{" "}
              {file.rejected_approvals.map((prof, idx) => {
                return <div key={idx}>{prof.name} </div>;
              })}
            </div>
          ) : null
        ) : null}
        {file.signed_users ? (
          file.signed_users.length ? (
            <div>
              Approved by:{" "}
              {file.signed_users.map((prof, idx) => {
                return <div key={idx}>{prof.name} </div>;
              })}
            </div>
          ) : null
        ) : null}
        {userStore.isProf && file.owner ? (
          <div>Requested by: {file.owner.name}</div>
        ) : null}
        <div className="flex justify-end items-center font-[Poppins] mt-8">
          {userStore.isProf && isPendingTab ? (
            <button
              className="bg-[#1D88E3] text-white p-2 border rounded"
              onClick={getFile}
            >
              View File
            </button>
          ) : (
            <a
              href={url}
              download
              className="bg-[#1D88E3] text-white p-2 border rounded"
              target="_blank"
            >
              Download File
            </a>
          )}
        </div>
      </Modal>
      <Modal
        title="Select area of Signature and click Submit"
        visible={isShowPdfActive}
        width="80%"
        className="font-[Poppins] text-xl font-semibold"
        footer={null}
        centered
        onCancel={handleCancel}
      >
        <div className="overflow-auto"
                style={{ maxHeight: "70vh" }}
        >
          <PdfViewer
            url={url}
            enableAreaSelection={useCallback(
              () => areaSelectionActive,
              [areaSelectionActive]
            )}
            onAreaSelection={setAndLogSelection}
          ></PdfViewer>
        </div>
        <div className="flex justify-end items-center font-[Poppins] mt-8">
          <button className="text-[#1D88E3] mr-4 p-2" onClick={handleReject}>
            Reject
          </button>
          <button
            className="bg-[#1D88E3] text-white p-2 border rounded"
            onClick={handleOk}
          >
            Approve
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default RequestCol;
