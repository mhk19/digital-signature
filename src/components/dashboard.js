import { Input, Menu, Select } from "antd";
import Modal from "antd/lib/modal/Modal";
import React, { useEffect, useRef, useState } from "react";
import RequestCol from "./request-col";
import upload_icon from "../assets/images/upload.svg";
import { getProfs, getUser } from "../api/authApi";
import { getCookie, removeCookie } from "../utils/handleCookies";
import { useNavigate } from "react-router-dom";
import { SetUserLoggedIn } from "../actions/userActions";
import { useDispatch, useSelector } from "react-redux";
import { getFirstLetter } from "../utils/username";
import {
  getPendingDocumentsForProf,
  getDocumentsForStudent,
  getSingleDocument,
  postDocument,
  requestSignature,
  getRejectedDocumentsForProf,
  getSignedDocumentsForProf,
} from "../api/documentApi";

const { Option } = Select;

const Dashboard = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [childrenProfs, setChildrenProfs] = useState([]);
  const [file, setFile] = useState();
  const [selectedProfs, setSelectedProfs] = useState([]);
  const [pendingDocuments, setPendingDocument] = useState([]);
  const [approvedDocument, setApprovedDocuments] = useState([]);
  const [rejectedDocument, setRejectedDocuments] = useState([]);
  const [docsToShow, setDocsToShow] = useState([]);
  const [isPendingTab, setPendingTab] = useState(true);
  const navigate = useNavigate();
  var dispatch = useDispatch();
  const userStore = useSelector((state) => state.userStore);

  const getFile = () => {
    var files = document.getElementById("files").files;
    if (files.length > 0) {
      setFile(files[0]);
    }
  };

  useEffect(async () => {
    var token = getCookie("token");
    var isProf;
    await getUser(token)
      .then((res) => {
        dispatch(
          SetUserLoggedIn({ name: res.name, id: res.id, isProf: res.isProf })
        );
        isProf = res.isProf;
      })
      .catch((err) => {
        console.log(err)
        navigate("/");
        return;
      });
    await getProfs(token)
      .then((res) => {
        setChildrenProfs([
          ...childrenProfs,
          ...res.map((r) => ({ id: r.id, name: r.name })),
        ]);
      })
      .catch((err) => {
        console.log("Error in fetching profs", err);
      });
    if (isProf) {
      await getPendingDocumentsForProf(token).then((res) => {
        var pendingDocumentsTemp = [];
        res.forEach(async (document) => {
          await getSingleDocument(token, document.id).then((res) => {
            pendingDocumentsTemp.push(res);
          });
          console.log(pendingDocumentsTemp);
          setPendingDocument([...pendingDocumentsTemp]);
          setDocsToShow([...pendingDocumentsTemp]);
        });
      });

      await getSignedDocumentsForProf(token).then((res) => {
        var signedDocumentsTemp = [];
        res.forEach(async (document) => {
          await getSingleDocument(token, document.id).then((res) => {
            signedDocumentsTemp.push(res);
          });
          console.log(signedDocumentsTemp);
          setApprovedDocuments([...signedDocumentsTemp]);
        });
      });

      await getRejectedDocumentsForProf(token).then((res) => {
        var rejectedDocumentsTemp = [];
        res.forEach(async (document) => {
          await getSingleDocument(token, document.id).then((res) => {
            rejectedDocumentsTemp.push(res);
          });
          console.log(rejectedDocumentsTemp);
          setRejectedDocuments([...rejectedDocumentsTemp]);
        });
      });
    } else {
      getDocumentsForStudent(getCookie("token")).then((res) => {
        setPendingDocument([
          ...res.filter(
            (document) => document.document_status === "PendingApproval"
          ),
        ]);
        setApprovedDocuments([
          ...res.filter((document) => document.document_status === "Approved"),
        ]);
        setRejectedDocuments([
          ...res.filter((document) => document.document_status === "Rejected"),
        ]);
        setDocsToShow([
          ...res.filter(
            (document) => document.document_status === "PendingApproval"
          ),
        ]);
      });
    }
  }, []);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = async () => {
    var name = document.getElementById("title").value;
    if (name === "") alert("Name can't be empty");
    var description = document.getElementById("desc").value;
    if (description === "") alert("Description can't be empty");
    if (selectedProfs.length === 0) alert("Select atleast 1 prof");
    if (!file) alert("Select a file");
    else {
      var doc_id = 0;
      await postDocument(getCookie("token"), description, name, file)
        .then((res) => {
          res = JSON.parse(res);
          doc_id = res.id;
        })
        .catch((err) => {
          alert("Error in uploading document", err);
        });
      requestSignature(getCookie("token"), doc_id, selectedProfs)
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          // alert("Error in requesting signature", err);
        });
      setIsModalVisible(false);
    }
  };

  const onChangeProfs = (value) => {
    setSelectedProfs([...value]);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleNavMenu = (key) => {
    switch (key.key) {
      case "1":
        setDocsToShow([...pendingDocuments]);
        setPendingTab(true);
        break;
      case "2":
        setDocsToShow([...approvedDocument]);
        setPendingTab(false);
        break;
      case "3":
        setDocsToShow([...rejectedDocument]);
        setPendingTab(false);
        break;
    }
  };

  const logout = () => {
    removeCookie("token");
    navigate("/");
  };
  if (!userStore.loggedIn) return null;
  return (
    <div className="h-screen overflow-hidden">
      <div className="flex flex-row font-[Poppins]">
        <div className="side-nav-outer h-screen w-1/4 border-r-2 border-[#1d88e33d] flex flex-col items-center">
          <div className="info w-max bg-[#1d88e30d] h-12 rounded flex justify-around items-center text-[#333333] mt-24 px-4 font-semibold">
            <div className="rounded-full bg-[#ffcf2d40] w-10 h-10 flex justify-center items-center mr-2">
              {getFirstLetter(userStore.name)}
            </div>
            <div>{userStore.name}</div>
          </div>
          <Menu
            className="side-nav active leading-loose text-[1.20rem] mt-24 flex flex-col w-full"
            defaultSelectedKeys={["1"]}
            mode="vertical"
            onClick={handleNavMenu}
          >
            <Menu.Item className="flex justify-center" key="1">
              Pending
            </Menu.Item>
            <Menu.Item className="flex justify-center" key="2">
              Approved
            </Menu.Item>
            <Menu.Item className="flex justify-center" key="3">
              Rejected
            </Menu.Item>
          </Menu>
        </div>
        <div className="w-3/4 p-10">
          <div className="w-full flex justify-end h-12 items-center">
            <div className="flex justify-center items-center bg-[#1d88e33d] border border-[#1D88E3] rounded-full text-[#1D88E3] w-10 h-10 font-semibold text-lg">
              {getFirstLetter(userStore.name)}
            </div>
            <button className="px-2 text-[#1D88E3] text-lg" onClick={logout}>
              Logout
            </button>
          </div>
          <div className="text-2xl font-extrabold h-16 flex items-center">
            Hi, Welcome back
          </div>
          <div className="flex px-4 w-1/2 justify-between text-lg">
            <span>Name</span>
            <span>Title</span>
          </div>
          <div className="w-full p-2 overflow-y-auto h-[34rem]">
            {docsToShow.length === 0 ? (
              <div className="flex justify-center items-center w-full h-full text-xl">
                No documents to display
              </div>
            ) : (
              docsToShow.map((document, index) => {
                return (
                  <RequestCol
                    name={document.name}
                    title={document.title}
                    key={index}
                    file_id={document.id}
                    file={document}
                    isPendingTab={isPendingTab}
                  />
                );
              })
            )}
          </div>
          {!userStore.isProf ? (
            <div className="h-12 flex items-center justify-end mt-4">
              <button
                className="h- bg-[#1D88E3] text-white p-2 rounded"
                onClick={showModal}
              >
                New Request +
              </button>
            </div>
          ) : null}
        </div>
      </div>
      <Modal
        className="font-[Poppins]"
        title="Create New Request"
        visible={isModalVisible}
        footer={null}
        onCancel={handleCancel}
      >
        <div className="flex flex-col justify-between font-[Poppins] overflow-auto">
          <label className="my-1">TITLE*</label>
          <Input id="title" placeholder="Enter title for your request" />
          <label className="my-1">PROFESSOR NAME*</label>
          <Select
            mode="multiple"
            placeholder="Select one or more professors"
            onChange={onChangeProfs}
          >
            {childrenProfs.map((prof, index) => {
              return (
                <Option value={prof.id} key={index}>
                  {prof.name}
                </Option>
              );
            })}
          </Select>
          <label className="my-1">DESCRIPTION*</label>
          <Input id="desc" placeholder="Enter description of your request" />
          <label className="my-1">UPLOAD YOUR DOCUMENT*</label>
          <label htmlFor="files">
            <div className="border border-dashed flex flex-col items-center w-full py-12 cursor-pointer">
              <img className="" src={upload_icon} alt="Upload" />
              Browse
            </div>
          </label>
          <input
            id="files"
            type="file"
            style={{ visibility: "hidden" }}
            onChange={getFile}
            accept=".pdf"
          />
          {file ? <div>{file.name}</div> : null}
        </div>
        <div className="flex justify-end items-center font-[Poppins] mt-8">
          <button className="text-[#1D88E3] mr-4 p-2" onClick={handleCancel}>
            Cancel
          </button>
          <button
            className="bg-[#1D88E3] text-white p-2 border rounded"
            onClick={handleOk}
          >
            Submit
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default Dashboard;
