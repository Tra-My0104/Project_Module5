import Headeradmin from "../Header-admin/Headeradmin";
import Table from "react-bootstrap/Table";
import { Button, Modal } from "antd";
import "./AdminHotel.css";
import { useState } from "react";

function AdminHotel() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      <div className="container-adminHotel">
        <Headeradmin></Headeradmin>
        <div>
          
        </div>
      
      </div>
    </>
  );
}

export default AdminHotel;
