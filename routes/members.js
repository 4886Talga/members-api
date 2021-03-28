const express = require('express');
const { 
    getMembers,
    getMember,
    createMember,
    uppdateMember,
    deleteMember
} =require('../controllers/members');

const router = express.Router();

router
    .route('/')
    .get(getMembers)
    .post(createMember);

router
    .route('/:id')
    .get(getMember)
    .put(uppdateMember)
    .delete(deleteMember);


module.exports = router;