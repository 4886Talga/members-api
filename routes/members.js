const express = require('express');
const { 
    getMembers,
    getMember,
    createMembers,
    uppdateMember,
    deleteMembers
} =require('../controllers/members');

const router = express.Router();

router
    .route('/')
    .get(getMembers)
    .post(createMembers)
    .delete(deleteMembers);

router
    .route('/:id')
    .get(getMember)
    .put(uppdateMember);
    

module.exports = router;