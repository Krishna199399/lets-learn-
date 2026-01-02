import { Router, Request, Response } from 'express';
import { Note } from '../models/Note';
import { protect, authorize } from '../middleware/auth';
import { AppError } from '../middleware/error';

const router = Router();

// @route   GET /api/notes
// @desc    Get all notes (optionally by courseId)
// @access  Public
router.get('/', async (req: Request, res: Response, next) => {
    try {
        const { courseId } = req.query;
        const filter = courseId ? { courseId } : {};

        const notes = await Note.find(filter).populate('uploadedBy', 'name').sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: notes.length,
            data: notes,
        });
    } catch (error) {
        next(error);
    }
});

// @route   GET /api/notes/:id
// @desc    Get single note
// @access  Public
router.get('/:id', async (req: Request, res: Response, next) => {
    try {
        const note = await Note.findById(req.params.id).populate('uploadedBy', 'name');

        if (!note) {
            throw new AppError('Note not found', 404);
        }

        res.status(200).json({
            success: true,
            data: note,
        });
    } catch (error) {
        next(error);
    }
});

// @route   POST /api/notes
// @desc    Create a new note
// @access  Private (Admin/Teacher)
router.post('/', protect, authorize('admin', 'teacher'), async (req: any, res: Response, next) => {
    try {
        const noteData = {
            ...req.body,
            uploadedBy: req.user._id,
        };

        const note = await Note.create(noteData);

        res.status(201).json({
            success: true,
            data: note,
        });
    } catch (error) {
        next(error);
    }
});

// @route   DELETE /api/notes/:id
// @desc    Delete a note
// @access  Private (Admin/Teacher)
router.delete('/:id', protect, authorize('admin', 'teacher'), async (req: Request, res: Response, next) => {
    try {
        const note = await Note.findByIdAndDelete(req.params.id);

        if (!note) {
            throw new AppError('Note not found', 404);
        }

        res.status(200).json({
            success: true,
            message: 'Note deleted',
        });
    } catch (error) {
        next(error);
    }
});

export default router;
