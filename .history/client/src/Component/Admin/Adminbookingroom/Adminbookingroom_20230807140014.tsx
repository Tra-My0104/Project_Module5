import Headeradmin from "../Header-admin/Headeradmin";
import Table from "react-bootstrap/Table";
import "./Adminbookingroom.css";
import { Button, Modal } from "antd";
import { useState } from "react";


function Adminbookingroom() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);


  const showModal = () => {
    setIsModalOpen(true);
  };


  const handleOk = () => {
    setIsModalOpen(false);
  };
;

  const handleCancel = () => {
    setIsModalOpen(false);
  };


  return (
    <>
      
    </>
  );
}

export default Adminbookingroom;