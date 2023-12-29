import mongoose from "mongoose";

const chatHistorySchema = new mongoose.Schema(
  {
    owner: { type: String, required: true },
    chats: [
      {
        with: { type: String, required: true },
        history: [
          {
            id: { type: String, required: true },
            text: { type: String, required: true },
          },
        ],
      },
    ],
    count: String,
  },
  { timestamps: true }
);

export const ChatHistory = mongoose.model("ChatHistory", chatHistorySchema);
