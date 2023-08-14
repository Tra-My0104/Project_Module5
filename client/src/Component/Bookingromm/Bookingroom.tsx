import "./Bookingroom.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { Button, notification } from "antd";

const Bookingroom = () => {
  const getSearch = localStorage.getItem("search");
  const resultSearch = getSearch ? JSON.parse(getSearch) : null;
  const getUser = localStorage.getItem("user");
  const userInfor = getUser ? JSON.parse(getUser) : null;
  const [api, contextHolder] = notification.useNotification();

  const [inforBooking, setInforBooking] = useState<InforBooking[]>([]);

  interface InforBooking {
    booking_room_check_in_date: string;
    hotels_location: string;
    booking_room_booking_room_id: number;
    booking_room_check_out_date: string;
    booking_room_number_night: string;
    booking_room_total_price: number;
    UserId: number;
    users: any;
    rooms: any;
    hotels: any;
    rooms_rooms_id: number;
    hotels_nameRoom: string;
    rooms_name_room: string;
    UserName: string;
    rooms_status_room: number;
    result: any;
  }

  const loadInfror = async () => {
    try {
      const response = await axios.get(
        `http://localhost:4000/booking-room/UserId/${userInfor?.UserId}`
      );
      console.log(response);
      setInforBooking(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadInfror();
  }, []);

  const handleDelete = async (id: number, room_id: number) => {
    try {
      let text = "Bạn sẽ không được hoàn tiền có chắc muốn hủy phòng không";
      if (window.confirm(text)) {
        await axios.delete(`http://localhost:4000/booking-room/${id}`);
        await axios.patch(`http://localhost:4000/rooms/${room_id}`);
        loadInfror();

        const key = `delete_${id}`;
        api.open({
          message: "Hủy phòng thành công",
          description: "Bạn đã hủy phòng thành công.",
          key,
          duration: 3, // Thời gian hiển thị thông báo (số giây)
        });
      } else {
        text = "You canceled!";
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete_2 = async (id: number) => {
    try {
      await axios.delete(`http://localhost:4000/booking-room/${id}`);
      notification.success({
        message: "Thành công",
        description: "Xóa phòng thành công",
      });
      loadInfror();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="container-rooms-booking">
        <h1 style={{ textAlign: "center" }}>Thông tin đặt phòng của tôi</h1>
        <table className="tableBooking">
          <thead>
            <tr>
              <th>STT</th>
              <th>Tên khách sạn</th>
              <th>Số phòng</th>
              <th>Địa chỉ khách sạn</th>
              <th>Ngày đặt phòng</th>
              <th>Ngày trả phòng</th>
              <th>Số đêm</th>
              <th>Giá tiền</th>
              <th>Số người </th>
              <th>Hủy lịch </th>
            </tr>
          </thead>
          <tbody>
            {inforBooking?.map((infor, index) =>
              Number(infor.rooms_status_room) === 3 ? (
                <tr key={infor.booking_room_booking_room_id}>
                  <td>{index + 1}</td>
                  <td>{infor.hotels_nameRoom}</td>
                  <td>{infor.rooms_name_room}</td>
                  <td>{infor.hotels_location}</td>
                  <td>{infor.booking_room_check_in_date}</td>
                  <td>{infor.booking_room_check_out_date}</td>
                  <td>{infor.booking_room_number_night} đêm</td>
                  <td>{infor.booking_room_total_price.toLocaleString()} VND</td>
                  <td>{resultSearch.person}</td>
                  <td>
                    {infor.rooms_status_room === 0 ? (
                      <>
                        <div style={{ display: "flex", alignItems: "center" }}>
                          <div
                            style={{
                              fontWeight: "500",
                              color: "red",
                              width: "213px",
                            }}
                          >
                            Phòng đã bị hủy bởi admin
                          </div>
                          <Button
                            className="btnroom btn-danger centered-button"
                            onClick={() =>
                              handleDelete_2(infor.booking_room_booking_room_id)
                            }
                          >
                            <i
                              className="fa-regular fa-trash-can"
                              style={{ color: "white" }}
                            ></i>
                          </Button>
                        </div>
                      </>
                    ) : (
                      <>
                        <Button
                          className="btnroom btn-danger centered-button"
                          onClick={() =>
                            handleDelete(
                              infor.booking_room_booking_room_id,
                              infor.rooms_rooms_id
                            )
                          }
                        >
                          Hủy phòng
                        </Button>
                      </>
                    )}
                    {contextHolder}
                  </td>
                </tr>
              ) : null
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Bookingroom;
