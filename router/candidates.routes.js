import express from "express";
import {getCandidates, addCandidates} from "../controller/candidateController.js";

const router = express.Router();


router.get("/",getCandidates);
router.post("/",addCandidates);

export default router;