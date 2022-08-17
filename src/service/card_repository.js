import { getDatabase, ref, set, remove, onValue } from "firebase/database";

class CardRepository {
    constructor(firebaseApp) {
        this.db = getDatabase(firebaseApp);
    }

    syncCards(userId, onUpdate) {
        const syncRef = ref(this.db, `${userId}/cards`);
        onValue(
            syncRef,
            (snapshot) => {
                const value = snapshot.val();
                value && onUpdate(value);
            },
            { onlyOnce: true }
        );
    }

    saveCard(userId, card) {
        set(ref(this.db, `${userId}/cards/${card.id}`), card);
    }
    removeCard(userId, card) {
        remove(ref(this.db, `${userId}/cards/${card.id}`));
    }
}

export default CardRepository;
