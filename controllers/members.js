const Member = require('../models/Member');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');

//@desc Get all members
//@route GET /api/v1/members
//@access Public
exports.getMembers = asyncHandler(async (req, res, next) => {
        let query;
        //Copy req.query
        const reqQuery = { ...req.query};

        // Fields to exclude
        const removeFields = ['select', 'sort', 'page', 'limit'];

        // Loop over removeFields and delete them from reqQuery
        removeFields.forEach(param => delete reqQuery[param]);

        // Create query string
        let queryStr = JSON.stringify(reqQuery);

        //Create operators ($gt, $gte,, etc)
        queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, match => `$${match}`);

        //Finding resource
        query = Member.find(JSON.parse(queryStr));

        //Select Fields
        if(req.query.select) {
            const fields = req.query.select.split(',').join(' ');//geting this format word word
            query = query.select(fields);
        }

        // Sort
        if(req.query.sort) {
            const sortBy = req.query.sort.split(',').join(' ');//geting this format: word word
            query = query.select(sortBy);
        } else {
            query = query.sort('-createdAt');
        }

        // Pagination
        const page = parseInt(req.query.page, 10) || 1;
        const limit = parseInt(req.query.limit, 10) || 8;
        const startIndex = (page-1) * limit;
        const endIndex = page * limit;
        const total = await Member.countDocuments();

        query = query.skip(startIndex).limit(limit);

        //Executing  query
        const members = await query;

        // Pagination resault
        const pagination = {};

        if(endIndex < total) {
            pagination.next = {
                page: page + 1,
                limit: limit
            }
        }

        if(startIndex > 0) {
            pagination.prev = {
                page: page - 1,
                limit: limit
            }
        }

        res.status(200).json({success: true, count: members.length, pagination: pagination, data: members });
 });

//@desc Get single member
//@route GET /api/v1/members/:id
//@access Public
exports.getMember = asyncHandler(async (req, res, next) => {
    
        const member = await Member.findById(req.params.id);

        if(!member) {
            return next(
                new ErrorResponse(`Member not found with ID of ${req.params.id}`, 404)
            );
        }

        res.status(200).json({success: true, data: member });
  
});

//@desc Create new member
//@route POST /api/v1/members
//@access Private
exports.createMember = asyncHandler(async (req, res, next) => {

        const member = await Member.create(req.body);

        res.status(201).json({
            success: true,
            data: member
        });    
});

//@desc Uppdate member
//@route PUT /api/v1/members:id
//@access Private
exports.uppdateMember = asyncHandler(async (req, res, next) => {
  
        const member = await Member.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
    
        if(!member) {
            return next(
                new ErrorResponse(`Member not found with ID of ${req.params.id}`, 404)
            );
        }
        res.status(200).json({success: true, data: member });
  
});


//@desc Delete member
//@route DELETE /api/v1/members/:id
//@access Private
exports.deleteMember = asyncHandler(async (req, res, next) => {
        const member = await Member.findByIdAndDelete(req.params.id);

        if(!member) {
            return next(
                new ErrorResponse(`Member not found with ID of ${req.params.id}`, 404)
            );
        }

        res.status(200).json({success: true, dat: {} });

});

