//@desc Get all members
//@route GET /api/v1/members
//@access Public
exports. getMembers = (req, res, next) => {
    res.status(200).json({success: true, message: 'Show all members' });
}

//@desc Get all members
//@route GET /api/v1/members/:id
//@access Public
exports. getMember = (req, res, next) => {
    res.status(200).json({success: true, message: `Show member ${req.params.id}`});
}

//@desc Get all members
//@route POST /api/v1/members
//@access Private
exports. createMember = (req, res, next) => {
    res.status(200).json({success: true, message: 'Create new members'});
}

//@desc Get all members
//@route PUT /api/v1/members:id
//@access Private
exports. uppdateMember = (req, res, next) => {
    res.status(200).json({success: true, message: `Uppdate member ${req.params.id}`});
}


//@desc Get all members
//@route DELETE /api/v1/members/:id
//@access Private
exports. deleteMember = (req, res, next) => {
    res.status(200).json({success: true, message: `Delete member ${req.params.id}`});
}

