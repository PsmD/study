import mongoose from "mongoose";

const diarySchema = new mongoose.Schema({
  title: String,
  issues: String,
  });

const Diary = mongoose.model("Diary", diarySchema);
export default Diary;