import React, { useEffect, useState } from "react";
import styles from "./maker.module.css";
import Header from "../header/header";
import Footer from "../footer/footer";
import { useNavigate } from "react-router-dom";
import Editor from "../editor/editor";
import Preview from "../preview/preview";

const Maker = ({ authService }) => {
  const [cards, setCards] = useState({
    1: {
      id: "1",
      name: "Ellie",
      company: "Samsung",
      theme: "dark",
      title: "Software Engineer",
      email: "ellie@gmail.com",
      message: "go for it",
      fileName: "ellie",
      fileURL: null,
    },
    2: {
      id: "2",
      name: "Ellie",
      company: "Samsung",
      theme: "light",
      title: "Software Engineer",
      email: "ellie@gmail.com",
      message: "go for it",
      fileName: "ellie",
      fileURL: null,
    },
    3: {
      id: "3",
      name: "Ellie",
      company: "Samsung",
      theme: "colorful",
      title: "Software Engineer",
      email: "ellie@gmail.com",
      message: "go for it",
      fileName: "ellie",
      fileURL: null,
    },
  });
  const navigate = useNavigate();
  const onLogout = () => {
    authService.logout();
  };

  useEffect(() => {
    authService.onAuthChange((user) => {
      if (!user) {
        navigate("/");
      }
    });
  });

  const createOrUpdateCard = (card) => {
    const updated = { ...cards };
    updated[card.id] = card;
    setCards(updated);
  };
  const deleteCard = (card) => {
    const updated = { ...cards };
    delete updated[card.id];
    setCards(updated);
  };
  return (
    <section className={styles.maker}>
      <Header onLogout={onLogout} />
      <div className={styles.container}>
        <Editor
          cards={cards}
          addCard={createOrUpdateCard}
          updateCard={createOrUpdateCard}
          deleteCard={deleteCard}
        />
        <Preview cards={cards} />
      </div>
      <Footer />
    </section>
  );
};

export default Maker;
