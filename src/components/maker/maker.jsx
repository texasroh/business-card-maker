import React, { useEffect, useState } from "react";
import styles from "./maker.module.css";
import Header from "../header/header";
import Footer from "../footer/footer";
import { useLocation, useNavigate } from "react-router-dom";
import Editor from "../editor/editor";
import Preview from "../preview/preview";

const Maker = ({ FileInput, authService, cardRepository }) => {
    const navigateState = useLocation().state;
    const [cards, setCards] = useState({});
    const [userId, setUserId] = useState(navigateState && navigateState.id);

    const navigate = useNavigate();
    const onLogout = () => {
        authService.logout();
    };

    useEffect(() => {
        if (!userId) {
            return;
        }
        cardRepository.syncCards(userId, (cards) => {
            setCards(cards);
        });
    }, [userId, cardRepository]);
    useEffect(() => {
        authService.onAuthChange((user) => {
            if (user) {
                setUserId(user.uid);
            } else {
                navigate("/");
            }
        });
    }, [userId, navigate, authService]);

    const createOrUpdateCard = (card) => {
        const updated = { ...cards };
        updated[card.id] = card;
        setCards(updated);
        cardRepository.saveCard(userId, card);
    };
    const deleteCard = (card) => {
        const updated = { ...cards };
        delete updated[card.id];
        setCards(updated);
        cardRepository.removeCard(userId, card);
    };
    return (
        <section className={styles.maker}>
            <Header onLogout={onLogout} />
            <div className={styles.container}>
                <Editor
                    FileInput={FileInput}
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
