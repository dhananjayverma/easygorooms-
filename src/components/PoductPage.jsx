import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaEnvelope, FaGlobe } from "react-icons/fa";
import { AiOutlineHeart, AiTwotoneDelete, AiOutlineEdit } from "react-icons/ai";
import { AiOutlinePhone } from "react-icons/ai";
import "./productPage.css";

const ProductPage = () => {
  const [userData, setUserData] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then((response) =>
        setUserData(response.data.map((user) => ({ ...user, liked: false })))
      )
      .catch((error) => console.error(error));
  }, []);

  const handleLikes = (userId) => {
    setUserData((prevData) =>
      prevData.map((user) => {
        if (user.id === userId) {
          return { ...user, liked: !user.liked };
        }
        return user;
      })
    );
  };

  const userStyle = {
    textAlign: "left",
    width: "100%"
  };

  const handleDelete = (userId) => {
    setUserData((prevData) => prevData.filter((user) => user.id !== userId));
  };

  const handleOpenModal = (user) => {
    setSelectedUser(user);
  };

  const handleCloseModal = () => {
    setSelectedUser(null);
  };

  const handleInputChange = (event) => {
    const { id, value } = event.target;
    setSelectedUser((prevData) => ({ ...prevData, [id]: value }));
  };

  const handleUpdate = () => {
    setUserData((prevData) =>
      prevData.map((user) => {
        if (user.id === selectedUser.id) {
          return { ...user, ...selectedUser };
        }
        return user;
      })
    );
    setSelectedUser(null);
  };

  return (
    <div className="gridContainer">
      {userData.map((user) => (
        <div key={user.id} className="userContainer">
          <div className="userPicContainer">
            <img
              src={`https://avatars.dicebear.com/api/identicon/${user.username}.svg`}
              alt={user.username}
              className="avatar"
            />
          </div>
          <div className="userInfoContainer">
            <div className="userInfo" style={userStyle}>
              <h4 className="userName">{user.name}</h4>
              <div className="mail">
                <FaEnvelope className="icon" />
                <a href={`mailto:${user.email}`}>{user.email}</a>
              </div>
              <div className="phone">
                <AiOutlinePhone className="icon" />
                <a href={`tel:${user.phone}`}>{user.phone}</a>
              </div>
              <div className="website">
                <FaGlobe className="icon" />
                <a
                  href={`https://${user.website}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {user.website}
                </a>
              </div>
            </div>
            <div className="actionButtons">
              <div className="buttonRow">
                <div className="likeButtonContainer">
                  <button
                    onClick={() => handleLikes(user.id)}
                    className={`likeButton ${user.liked ? "liked" : ""}`}
                  >
                    <AiOutlineHeart
                      className={`heartIcon ${user.liked ? "redHeart" : " "}`}
                    />
                  </button>
                </div>
                <span className="sptag">|</span>
                <div className="moreButtonContainer">
                  <button
                    onClick={() => handleOpenModal(user)}
                    className="moreButton"
                  >
                    <AiOutlineEdit />
                  </button>
                </div>
                <span className="sptag">|</span>
                <div className="deleteButtonContainer">
                  <button
                    onClick={() => handleDelete(user.id)}
                    className="deleteButton"
                  >
                    <AiTwotoneDelete />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
      {selectedUser && (
        <Modal
          user={selectedUser}
          onInputChange={handleInputChange}
          onUpdate={handleUpdate}
          onCloseModal={handleCloseModal}
        />
      )}
    </div>
  );
};

const Modal = ({ user, onInputChange, onUpdate, onCloseModal }) => (
  <div className="modalOverlay">
    <div className="modalContainer">
      <h2 className="modalTitle">User Details</h2>
      <form className="formContainer">
        <div className="formGroup">
          <label htmlFor="name" className="labels">
            <span className="redSpan">*</span>Name :
          </label>
          <input
            type="text"
            id="name"
            value={user.name || ""}
            onChange={onInputChange}
          />
        </div>
        <div className="formGroup">
          <label htmlFor="email" className="labels">
            <span className="redSpan">*</span>Email :
          </label>
          <input
            type="email"
            id="email"
            value={user.email || ""}
            onChange={onInputChange}
          />
        </div>
        <div className="formGroup">
          <label htmlFor="phone" className="labels">
            <span className="redSpan">*</span>Phone :
          </label>
          <input
            type="text"
            id="phone"
            value={user.phone || ""}
            onChange={onInputChange}
          />
        </div>
        <div className="formGroup">
          <label htmlFor="website" className="labels">
            <span className="redSpan">*</span>Website :
          </label>
          <input
            type="text"
            id="website"
            value={user.website || ""}
            onChange={onInputChange}
          />
        </div>
      </form>
      <hr className="horizontalLine" />
      <div className="formButtons">
        <button onClick={onCloseModal} className="closeButton">
          Cancel
        </button>
        <button onClick={onUpdate} className="okButton">
          ok
        </button>
      </div>
    </div>
  </div>
);

export default ProductPage;
