import { getDatabase, ref, set, remove, onValue } from "firebase/database";
import { firebaseApp } from "./firebase";

class CardRepository {
    constructor() {
        this.db = getDatabase(firebaseApp);
    }

    syncCard(userId, onUpdate) {
        const ref = ref(this.db, `${userId}/cards`);
        onValue(ref, (snapshot) => {}, { onlyOnce: true });
    }

    saveCard(userId, card) {
        set(ref(this.db, `${userId}/cards/${card.id}`), card);
    }
    removeCard(userId, card) {
        remove(ref(this.db, `${userId}/cards/${card.id}`));
    }
}

export default CardRepository;
