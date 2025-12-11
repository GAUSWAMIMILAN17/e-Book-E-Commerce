import express from "express"

import { addNewBook, deleteBook, getAllBook, singleBook, updateBook } from "../controller/book.controller.js";
import authenticateToken from "../middleware/authenticateToken.js";
import {isAdmin} from "../middleware/isAdmin.js"


const router = express.Router();


router.route("/addNewBook").post(authenticateToken, isAdmin ,addNewBook);
router.route("/getAllBooks").get(getAllBook)
router.route("/singleBook/:id").get(singleBook)
router.route("/deleteBook/:id").delete(authenticateToken, isAdmin, deleteBook)
router.route("/updateBook/:id").post(authenticateToken, isAdmin, updateBook)

export default router;