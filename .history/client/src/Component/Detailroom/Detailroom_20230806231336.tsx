import { Select } from "antd";
import "./Detail.css";
import { Rate } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { notification } from "antd";
import axios from "axios";
import TextArea from "antd/es/input/TextArea";

interface Rating {
  rateting_id: number;
  comment: string;
  data: [];
  star: number;
  user: {
    username: string;
  };
}

const Detailroom = () => {
  const { id } = useParams();
  console.log('i====>,' ,id);
  
  const [detailRoom, setDetailRoom] = useState<DetailRoom | null>(null);
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const getSearch = localStorage.getItem("search");
  const resultSearch = getSearch ? JSON.parse(getSearch) : null;
  const getUser = localStorage.getItem("user");
  const userInfor = getUser ? JSON.parse(getUser) : null;

  useEffect(() => {
    setIsLoggedIn(userInfor !== null);
  }, []);

  interface DetailRoom {
    hotel_id: number;
    imgRoom: string;
    nameRoom: string;
    price: number;
    price_room: number;
    location: string;
    availability: string;
    direction: string;
    capacity: string;
    description: string;
    floor_area: string;
    amenities: string;
    status_room: number;
    img_rooms: string;
  }
  const [rooms, setRooms] = useState([]);
  const loadHotel = async () => {
    const response = await axios.get(
      `http://localhost:4000/rooms/detailroom/${id}`
    );
    setRooms(response.data.rooms);
    setDetailRoom(response?.data?.rooms[0]);
  };

  useEffect(() => {
    loadHotel();
  }, []);

  const handleBooking = (room_id: number) => {
    if (isLoggedIn) {
      navigate(`/bookinginformation/${room_id}`);
    } else {
      notification.error({
        message: "Thất bại",
        description: "Bạn chưa đăng nhập để đặt phòng",
      });
    }
  };

  const [comment, setComment] = useState<string>("");
  const [rate, setRate] = useState<number>(0);  

  
  
  const [rates , setRates] = useState<Rating[]>([]);
  const loadRate = async () => {
    try {
      let response = await axios.get<Rating[]>(`http://localhost:4000/rateting/${detailRoom?.hotel_id}`)
      if(response.data){
        setRates(response?.data)
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if(detailRoom){
      loadRate();
    }
  }, [detailRoom]);

  useEffect(() => {
    if (rates.length > 0) {
      rates.forEach((rating) => {
        console.log('data:', rating.data);
      });
    }
  }, [rates]);

  const rateting = {
    comment: comment,
    star: rate,
    hotel_id: detailRoom?.hotel_id,
    UserId: userInfor?.UserId,
  };

  const handleRate = async () => {
    if(!userInfor){
    notification.error({
      message: "Thất bại",
      description: "Bạn chưa đăng nhập để đánh giá",
    });
    return
  }
    if(rate === 0 || comment === ""){
      notification.error({
        message: "Thất bại",
        description: "Bạn chưa viết bình luận hoặc chọn sao",
      });
      return;
    }
    try {
      const response = await axios.post(
        `http://localhost:4000/rateting/`,
        rateting
      );
      if(response.status === 201){
        notification.success({
          message: "Thành công",
          description: "Đánh giá thành công",
        });
        return
      }
      setComment("")
    } catch (error) {
      console.log(error)
    }
  };




  return (
    <>
      <div className="containerHeader">
        <div>
          <label>Thành phố, địa điểm hoặc tên khách sạn:</label>
          <br />
          <Select
            style={{
              width: "100%",
              marginBottom: "10px",
              backgroundColor: "rgba(187, 187, 187, 0.598)",
            }}
            placeholder="Thành phố khách sạn điểm đến"
            value={resultSearch.location}
          >
            <option value="{resultSearch.location}">
              {resultSearch.location}
            </option>
          </Select>
        </div>
        <div>
          <label>Nhận phòng</label> <br />
          <input
            className="form-control"
            value={resultSearch.dateForm}
            style={{
              borderRadius: "5px",
              outline: "none",
              borderColor: "#d2cfcf",
              height: 32,
            }}
          />
        </div>

        <div>
          <div>
            <label>Số đêm</label>
            <br />
            <Select
              style={{
                width: 120,
                backgroundColor: " rgba(187, 187, 187, 0.598)",
              }}
              showSearch
              placeholder="1 đêm"
              optionFilterProp="children"
              value={resultSearch.numberNight}
            />
          </div>
        </div>

        <div>
          <label>Trả phòng</label>
          <p style={{ fontWeight: "bold", color: "white" }}>
            {resultSearch.checkoutDate}
          </p>
        </div>
        <div>
          <label>Số khách</label> <br />
          <Select className="selectRoom2" value={resultSearch.person}></Select>
        </div>
        <button
          style={{
            backgroundColor: "rgb(255 255 255)",
            color: "#45c1ff",
            borderRadius: "5px",
            height: "32px",
            border: " none",
            marginTop: "30px",
            width: "174px",
            fontWeight: "700",
          }}
        >
          <i
            className="fa-solid fa-magnifying-glass"
            style={{ color: "#45c1ff" }}
          ></i>
          Tìm khách sạn
        </button>
      </div>
      <div className="main">
        <div style={{ display: "flex", justifyContent: "space-around" }}>
          <div>
            <h1 style={{ fontWeight: "bold" }}>{detailRoom?.nameRoom}</h1>
            <p
              style={{
                color: "#137cff",
                backgroundColor: "rgb(235 242 245)",
                width: "68px",
                borderRadius: "20px",
                fontWeight: "500",
                height: "27px",
                paddingLeft: "16px",
              }}
            >
              hotel
            </p>
            <Rate allowHalf defaultValue={4} />
          </div>
          <div>
            <p style={{ color: "gray", fontWeight: "500", fontSize: "20px" }}>
              Giá phòng mỗi đêm từ
            </p>
            <p
              style={{
                color: "red",
                fontWeight: "500",
                fontSize: "25px",
              }}
            >
              {detailRoom?.price.toLocaleString()} VND
            </p>
            <button
              style={{
                backgroundColor: "rgb(255, 94, 31)",
                color: "white",
                borderRadius: "5px",
                height: "40px",
                border: "none",
                marginTop: "7px",
                width: "250px",
                fontSize: "large",
                fontWeight: 700,
              }}
            >
              Chọn phòng
            </button>
          </div>
        </div>
        <div className="imgDetail">
          <img
            src={detailRoom?.imgRoom}
            style={{
              borderRadius: "10px",
              marginLeft: "140px",
              height: 438,
              width: 705,
            }}
          />
          <div
            style={{
              display: "flex",
              gap: "20px",
              flexWrap: "wrap",
              marginLeft: "50px",
            }}
          >
            <img
              src="https://ik.imagekit.io/tvlk/apr-asset/dgXfoyh24ryQLRcGq00cIdKHRmotrWLNlvG-TxlcLxGkiDwaUSggleJNPRgIHCX6/hotel/asset/20015391-5eddec8a97fbafcbc318b43181a69e28.jpeg?_src=imagekit&tr=c-at_max,fo-auto,h-118,q-40,w-186"
              style={{ borderRadius: "5px" }}
            />
            <img
              src="https://ik.imagekit.io/tvlk/apr-asset/dgXfoyh24ryQLRcGq00cIdKHRmotrWLNlvG-TxlcLxGkiDwaUSggleJNPRgIHCX6/hotel/asset/20015391-4ab757b8f50b7671f5d1c9fdf35c615a.jpeg?_src=imagekit&tr=c-at_max,fo-auto,h-118,q-40,w-186"
              style={{ borderRadius: "5px" }}
            />
            <img
              src="https://ik.imagekit.io/tvlk/apr-asset/dgXfoyh24ryQLRcGq00cIdKHRmotrWLNlvG-TxlcLxGkiDwaUSggleJNPRgIHCX6/hotel/asset/20015391-9152bcb7ecf803a796cc90adf844ff39.jpeg?_src=imagekit&tr=c-at_max,fo-auto,h-118,q-40,w-186"
              style={{ borderRadius: "5px" }}
            />
            <img
              src="https://ik.imagekit.io/tvlk/apr-asset/dgXfoyh24ryQLRcGq00cIdKHRmotrWLNlvG-TxlcLxGkiDwaUSggleJNPRgIHCX6/hotel/asset/20015391-89c6b6cc365bbd2351e453b3f6f77b4d.jpeg?_src=imagekit&tr=c-at_max,fo-auto,h-118,q-40,w-186"
              style={{ borderRadius: "5px" }}
            />
            <img
              src="https://ik.imagekit.io/tvlk/apr-asset/dgXfoyh24ryQLRcGq00cIdKHRmotrWLNlvG-TxlcLxGkiDwaUSggleJNPRgIHCX6/hotel/asset/20015391-8b15695571c1bb7c842750110a55b48b.jpeg?_src=imagekit&tr=c-at_max,fo-auto,h-118,q-40,w-186"
              style={{ borderRadius: "5px", width: "404px", height: "135px" }}
            />
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            width: "90%",
            marginLeft: "138px",
          }}
        >
          <div>
            <h4>Mô tả</h4>
            <p style={{ width: "45%", fontWeight: "500", color: "#072c92" }}>
              {detailRoom?.description}
            </p>
          </div>
          <div className="inforRight">
            <p
              style={{
                color: "black",
                fontWeight: "500",
                fontSize: "17px",
              }}
            >
              Diện tích phòng : <span>{detailRoom?.floor_area} m2</span>
            </p>
            <p
              style={{
                color: "black",
                fontWeight: "500",
                fontSize: "17px",
              }}
            >
              Tiện nghi : <span>{detailRoom?.amenities}</span>
            </p>
            <p
              style={{
                color: "black",
                fontWeight: "500",
                fontSize: "17px",
              }}
            >
              Số người ở : <span>{resultSearch.person}/ phòng</span>
            </p>
          </div>
        </div>
        <h2
          style={{
            fontWeight: "bold",
            textAlign: "center",
            margin: "10px 5px 20px 10px",
          }}
        >
          Các phòng trong khách sạn
        </h2>
        {rooms?.map((room: any) => (
          <div className="containerItemRoom">
            <div>
              <img
                src={room.img_rooms}
                style={{
                  height: 240,
                  width: 300,
                  borderRadius: "10px",
                  marginTop: 15,
                }}
              />
            </div>
            <div className="itemInfor">
              <p>
                Diện tích phòng : <span>{room.floor_area} m2</span>
              </p>
              <p>
                Tiện nghi : <span>{room.amenities}</span>
              </p>
              <p>
                Hướng phòng : <span>{room.direction}</span>
              </p>
              <p>
                Số người : <span>{resultSearch.person}</span>
              </p>
              <p>
                Tình trạng phòng:{" "}
                <span>
                  {room.status_room === 0 ? <>Trống</> : <>Hết phòng</>}
                </span>
              </p>
              <p
                style={{
                  color: "red",
                  fontWeight: "500",
                  fontSize: "20px",
                }}
              >
                Price : {room.price_room.toLocaleString()} VND
              </p>
              {room.status_room === 1 ? (
                <>
                  <button className="btn btn-primary" disabled>
                    Đặt phòng
                  </button>
                </>
              ) : (
                <>
                  <button
                    className="btn btn-primary"
                    onClick={() => handleBooking(room.rooms_id)}
                  >
                    Đặt phòng
                  </button>
                </>
              )}
            </div>
          </div>
        ))}
        <h3 style={{ fontWeight: "500", textAlign: "center" }}>
          FeedBack từ khách hàng
        </h3>
        <div className="rating-form">
          <h4 style={{ marginLeft: "74px", fontWeight: "400" }}>
            Đánh giá khách sạn
          </h4>
          <Rate
            className="rate"
            value={rate}
            onChange={(value) => setRate(value)}
          />
          <br />
          <TextArea
            rows={4}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />{" "}
          <br />
          <button
            className="btn_feed_back"
            onClick={() =>
              handleRate()
            }
          >
            Gửi đánh giá
          </button>
        </div>
        <div className="containerFeedback">
          {rates?.map((rates :any) => (
          <div className="feedback">
            <div className="user-info">
              <div className="avatar">
                <img src="https://media.istockphoto.com/id/1300845620/vector/user-icon-flat-isolated-on-white-background-user-symbol-vector-illustration.jpg?s=612x612&w=0&k=20&c=yBeyba0hUkh14_jgv1OKqIH0CCSWU_4ckRkAoy2p73o=" />
              </div>
              <div className="user-name">{rates.user.username}</div>
              <div className="rating">
              {Array.from({ length: rates.star }).map((_, index) => (
                <span key={index} className="star">★</span>
              ))}
              </div>
            </div>
            <p>
              {rates.comment}
            </p>
          </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Detailroom;
