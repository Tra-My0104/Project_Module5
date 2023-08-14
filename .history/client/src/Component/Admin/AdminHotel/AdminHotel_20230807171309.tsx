import Headeradmin from "../Header-admin/Headeradmin";
import Table from "react-bootstrap/Table";
import { Button, Modal } from "antd";
import "./AdminHotel.css";
import { useState , useEffect } from "react";
import { notification } from "antd";
import axios from "axios";

// Assuming that the CreateHotelDto type looks like this
interface Hotel{
  imgRoom : string,
  nameRoom : string,
  price : number,
  location :string,
  availability : string
}


function AdminHotel() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const showEditModal = () => {
    setIsEditModalOpen(true);
  };


  const handleEditOk = () => {
    setIsEditModalOpen(false);
    // Xử lý logic khi nhấn nút OK trong modal chỉnh sửa sản phẩm
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleEditCancel = () => {
    setIsEditModalOpen(false);
  };
  const [allHotel , setAllHotel] = useState<Hotel[]>([])
  const [imgHotel , setImgHotel] = useState<string>("");
  const [nameHotel , setNameHotel] = useState<string>("");
  const [priceHotel , setPriceHotel] = useState<number>();
  const [location , setLocation] = useState<string>("");
  const [availability , setAvailability] = useState<string>("")

  const loadHotel = async() => {
    try {
      const response = await axios.get("http://localhost:4000/hotels")
      console.log(response.data.hotels)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    loadHotel()
  }, [])

const newHotel = {
  imgRoom : imgHotel,
  nameRoom : nameHotel,
  price : priceHotel,
  location : location,
  availability : availability  
}

  const handleOk = async () => {
    try {
      if (nameHotel === "" || priceHotel === 0 || location === "" || availability === "") {
        notification.error({
          message: "Thất bại",
          description: "Bạn chưa điền đủ thông tin",
        });
        return;
      }

      const postHotel = await axios.post(`http://localhost:4000/hotels`, newHotel);
      console.log(postHotel);
  
      setNameHotel("");
      setLocation("");
      setAvailability("");
      setPriceHotel(0);
      setIsModalOpen(false);
    } catch (error) {
      console.log(error);
    }
  };



  return (
    <>
      <div className="container-adminHotel">
        <Headeradmin></Headeradmin>
        <div className="ant-modal-wrap">
          <Button type="primary" onClick={showModal}>
            Thêm hotel
          </Button>
          <Modal
            title="Quản lý hotel"
            visible={isModalOpen}
            onOk={() => handleOk()}
            onCancel={handleCancel}
            okButtonProps={{ onClick: handleOk }}
          >
            <div className="form-hotel">
              <input className="form-control" type="file" value={imgHotel} onChange={(e) => setImgHotel(e.target.value)}/>
              <br />
              <button className="uploadImg">Upload ảnh</button>
              <br />
              <label>Tên</label> <br />
              <input className="form-control" type="text" value={nameHotel} onChange={(e) => setNameHotel(e.target.value)}/>
              <br />
              <label>Giá</label> <br />
              <input className="form-control" type="number" value={priceHotel} onChange={(e) => setPriceHotel(parseFloat(e.target.value))}/>
              <br />
              <label>Địa điểm</label> <br />
             <div className="selectOption">
                <select
                  className="form-select"
                  aria-label="Default select example"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                >
                  <option value="Optional">Lựa chọn</option>
                  <option value="Nha Trang">Nha Trang</option>
                  <option value="Đà Nẵng">Đà Nẵng</option>
                  <option value="Bangkok">Bangkok</option>
                  <option value="Singapore">Singapore</option>
                </select>
              </div>
              <br />
              <label>Trạng thái</label>
              <div className="selectOption">
                <select
                  className="form-select"
                  aria-label="Default select example"
                  value={availability}
                  onChange={(e) => setAvailability(e.target.value)}
                >
                  <option value="Optional">Lựa chọn</option>
                  <option value="Trống">Trống</option>
                </select>
              </div>
            </div>
          </Modal>
        </div>
        <Table className="table">
          <thead>
            <tr className="tr_header">
              <th>STT</th>
              <th>Ảnh Hotel</th>
              <th>Tên Hotel</th>
              <th>Giá</th>
              <th>Địa điểm</th>
              <th>Trạng thái</th>
              <th colSpan={2}>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {allHotel?.map((hotel,index) => (
            <tr>
              <td>1</td>
              <td><img src={hotel.imgRoom} style={{width : "70px" , height : "70px"}}/></td>
              <td>{hotel.nameRoom}</td>
              <td>{hotel.price}</td>
              <td>Địa điểm</td>
              <td>Trạng thái</td>
              <td>
                <Button type="primary" ghost onClick={showEditModal}>
                  <i
                    className="fa-solid fa-pen-nib"
                    style={{ color: "#1f93ff" }}
                  ></i>
                </Button>
                <Modal
                  title="Chỉnh sửa hotel"
                  visible={isEditModalOpen}
                  onOk={handleEditOk}
                  onCancel={handleEditCancel}
                >
                  <div className="form-hotel">
                    <input className="form-control" type="file" />
                    <br />
                    <button className="uploadImg">Upload ảnh</button>
                    <br />
                    <label>Tên</label> <br />
                    <input className="form-control" type="text" />
                    <br />
                    <label>Giá</label> <br />
                    <input className="form-control" type="number" />
                    <br />
                    <label>Địa điểm</label> <br />
                    <input className="form-control" type="string" />
                    <br />
                    <label>Trạng thái</label>
                    <div className="selectOption">
                      <select
                        className="form-select"
                        aria-label="Default select example"
                      >
                        <option value="Optional">Lựa chọn</option>
                        <option value="Dây chuyền">Trống</option>
                      </select>
                    </div>
                  </div>
                </Modal>
              </td>
              <td>
                <Button type="primary" danger ghost>
                  <i
                    className="fa-solid fa-trash"
                    style={{ color: "#ff0000" }}
                  ></i>
                </Button>
              </td>
            </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </>
  );
}

export default AdminHotel;
