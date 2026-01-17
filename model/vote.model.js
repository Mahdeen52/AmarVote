import mongoose from "mongoose";

const voteSchema = mongoose.Schema({
    candidateId: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"Candidate",
        requiredL: true,
    },
    voterId: {
        type: String,
        required: true,
    },

}, {timestamps: true});

 const Vote = mongoose.model("Vote",voteSchema);
export default Vote;