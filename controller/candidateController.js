import Candidate from "../model/candidates.model.js";

export const getCandidates = async (req, res) => {
    const candidates = await Candidate.find();
    res.json(candidates);
};

export const addCandidates = async (req,res) => {
    const {name,party} = req.body;
    const newCandidate = new Candidate({name,party});
    await newCandidate.save();
    res.json(newCandidate);
};