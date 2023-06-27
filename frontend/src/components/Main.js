import React from "react";
import avatarEdit from "../images/edit-avatar.svg";
import buttonAdd from "../images/add-button.svg";
import Card from "./Card";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Main(props) {
  const currentUser = React.useContext(CurrentUserContext);
  
  return (
    <main className="main">
      <section className="profile">
        <div className="profile__bio">
          <div className="profile__avatar">
            <img
              src={currentUser.avatar}
              alt="Автарка профиля"
              className="profile__photo"
            />
            <button
              className="profile__edit-avatar"
              onClick={props.onEditAvatar}
            >
              <img
                src={avatarEdit}
                alt="Редактировать профиль"
                className="profile__avatar-button"
              />
            </button>
          </div>

          <div className="profile__info">
            <h1 className="profile__name">{currentUser.name}</h1>
            <button
              type="button"
              className="profile__edit-button"
              onClick={props.onEditProfile}
            ></button>
            <p className="profile__description">{currentUser.about}</p>
          </div>
        </div>

        <button
          type="button"
          className="profile__add-button"
          onClick={props.onAddPlace}
        >
          <img src={buttonAdd} alt="Добавить фото" className="profile__add" />
        </button>
      </section>

      <section className="elements">
        { props.cards.toReversed().map((element) => (
          <Card
            card={element}
            onCardClick={props.onCardClick}
            key={element._id}
            onCardLike={props.onCardLike}
            onCardDelete={props.onCardDelete}
          />
        )) }
      </section>
    </main>
  );
}

export default Main;
