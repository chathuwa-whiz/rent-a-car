import Card from "../model/Card.js";
import User from "../model/User.js";

// ADD CARD
export const addCard = async (req, res) => {
    try {
        const { userId, cardNumber, cvv, expiryDate, cardholderName, cardType } = req.body;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const card = new Card({
            userId,
            cardNumber,
            cvv,
            expiryDate,
            cardholderName,
            cardType
        });

        await card.save();

        res.status(201).json(card);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// GET ALL CARDS
export const getAllCards = async (req, res) => {
    try {
        const cards = await Card.find();
        res.status(200).json(cards);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// GET ALL CARDS BY USER ID
export const getCardsByUserId = async (req, res) => {
    try {
        const userId = req.params.userId;
        // console.log(userId);
        
        
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const cards = await Card.find({ userId });

        res.status(200).json(cards);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// GET CARD BY ID
export const getCardById = async (req, res) => {
    try {
        const { id } = req.params;
        const user = req.user;
        
        const card = await Card.findById(id);
        console.log(id);
        
        console.log(user);
        

        if (!card) {
            return res.status(404).json({ message: "Card not found" });
        }

        //Menna methna case eka thiyenw

        // if (card.userId.toString() !== userId) {
        //     return res.status(403).json({ message: "You don't have permission to access this card" });
        // }

        res.status(200).json(card);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// UPDATE CARD
export const updateCard = async (req, res) => {
    try {
        const { id } = req.params;
        const { userId } = req.user;
        const { cardNumber, cvv, expiryDate, cardholderName, cardType } = req.body;

        const card = await Card.findById(id);

        if (!card) {
            return res.status(404).json({ message: "Card not found" });
        }

        //Menna methna case eka thiyenw

        // if (card.userId !== userId) {
        //     return res.status(403).json({ message: "You don't have permission to update this card" });
        // }

        if (cardNumber) card.cardNumber = cardNumber;
        if (cvv) card.cvv = cvv;
        if (expiryDate) card.expiryDate = expiryDate;
        if (cardholderName) card.cardholderName = cardholderName;
        if (cardType) card.cardType = cardType;

        await card.save();

        res.status(200).json(card);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// DELETE CARD
export const deleteCard = async (req, res) => {
    try {
        const { id } = req.params;
        const { userId } = req.user;

        const card = await Card.findById(id);

        if (!card) {
            return res.status(404).json({ message: "Card not found" });
        }

        //Menna methna case eka thiyenw

        // if (card.userId.toString() !== userId) {
        //     return res.status(403).json({ message: "You don't have permission to delete this card" });
        // }

        await card.deleteOne();

        res.status(200).json({ message: "Card deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};