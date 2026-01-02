import React, { useState } from 'react';
import { X } from 'lucide-react';
import Button from '../ui/Button';
import Input from '../ui/Input';
import MarkdownViewer from './MarkdownViewer';

interface NoteFormProps {
    initialData?: {
        title: string;
        description: string;
        markdownContent?: string;
        courseId?: string;
        fileType: string;
        category?: string;
        tags?: string[];
    };
    courses?: Array<{ _id: string; title: string }>;
    onSubmit: (noteData: any) => void;
    onCancel: () => void;
    isLoading?: boolean;
    isFullPage?: boolean; // New prop to control layout
}

const NoteForm: React.FC<NoteFormProps> = ({
    initialData,
    courses = [],
    onSubmit,
    onCancel,
    isLoading = false,
    isFullPage = false,
}) => {
    const [formData, setFormData] = useState({
        title: initialData?.title || '',
        description: initialData?.description || '',
        markdownContent: initialData?.markdownContent || '',
        courseId: initialData?.courseId || '',
        fileType: initialData?.fileType || 'markdown',
        category: initialData?.category || '',
        tags: initialData?.tags || [],
    });

    const [tagInput, setTagInput] = useState('');
    const [isPreview, setIsPreview] = useState(false);

    const handleChange = (field: string, value: any) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const handleAddTag = () => {
        if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
            setFormData((prev) => ({
                ...prev,
                tags: [...prev.tags, tagInput.trim()],
            }));
            setTagInput('');
        }
    };

    const handleRemoveTag = (tag: string) => {
        setFormData((prev) => ({
            ...prev,
            tags: prev.tags.filter((t) => t !== tag),
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className={isFullPage ? "px-6 py-4" : "max-h-[70vh] overflow-y-auto px-6 py-4"}>
                <div className="space-y-4">
                    {/* Title */}
                    <Input
                        label="Note Title"
                        type="text"
                        value={formData.title}
                        onChange={(e) => handleChange('title', e.target.value)}
                        required
                        placeholder="Enter note title"
                    />

                    {/* Description */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Description
                        </label>
                        <textarea
                            value={formData.description}
                            onChange={(e) => handleChange('description', e.target.value)}
                            rows={2}
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-primary-500"
                            placeholder="Brief description of the note"
                            required
                        />
                    </div>

                    {/* Course Selection */}
                    {courses.length > 0 && (
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Course
                            </label>
                            <select
                                value={formData.courseId}
                                onChange={(e) => handleChange('courseId', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-primary-500"
                                required
                            >
                                <option value="">Select a course</option>
                                {courses.map((course) => (
                                    <option key={course._id} value={course._id}>
                                        {course.title}
                                    </option>
                                ))}
                            </select>
                        </div>
                    )}

                    {/* Category */}
                    <Input
                        label="Category (Optional)"
                        type="text"
                        value={formData.category}
                        onChange={(e) => handleChange('category', e.target.value)}
                        placeholder="e.g., Study Guide, Summary, Lecture Notes"
                    />

                    {/* Tags */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Tags (Optional)
                        </label>
                        <div className="flex gap-2 mb-2">
                            <input
                                type="text"
                                value={tagInput}
                                onChange={(e) => setTagInput(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTag())}
                                className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-primary-500"
                                placeholder="Add tag and press Enter"
                            />
                            <Button type="button" variant="outline" size="sm" onClick={handleAddTag}>
                                Add
                            </Button>
                        </div>
                        {formData.tags.length > 0 && (
                            <div className="flex flex-wrap gap-2">
                                {formData.tags.map((tag) => (
                                    <span
                                        key={tag}
                                        className="inline-flex items-center gap-1 px-3 py-1 bg-primary-100 dark:bg-primary-900 text-primary-800 dark:text-primary-200 rounded-full text-sm"
                                    >
                                        {tag}
                                        <button type="button" onClick={() => handleRemoveTag(tag)}>
                                            <X className="w-3 h-3" />
                                        </button>
                                    </span>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Markdown Content */}
                    <div>
                        <div className="flex items-center justify-between mb-2">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                Content (Markdown)
                            </label>
                            <button
                                type="button"
                                onClick={() => setIsPreview(!isPreview)}
                                className="text-sm text-primary-600 hover:underline"
                            >
                                {isPreview ? 'Edit' : 'Preview'}
                            </button>
                        </div>
                        {isPreview ? (
                            <div className="min-h-[200px] max-h-[300px] overflow-y-auto p-4 border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-900">
                                <MarkdownViewer content={formData.markdownContent} />
                            </div>
                        ) : (
                            <textarea
                                value={formData.markdownContent}
                                onChange={(e) => handleChange('markdownContent', e.target.value)}
                                rows={10}
                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-primary-500 font-mono text-sm"
                                placeholder="# Your Note Title

Write your content here using markdown...

**Bold text** and *italic text*

- List item 1
- List item 2

```
Code block
```"
                            />
                        )}
                    </div>
                </div>
            </div>

            {/* Actions - Fixed at bottom */}
            <div className="flex justify-end gap-3 px-6 py-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
                <Button type="button" variant="outline" onClick={onCancel} disabled={isLoading}>
                    Cancel
                </Button>
                <Button type="submit" variant="primary" disabled={isLoading}>
                    {isLoading ? 'Saving...' : initialData ? 'Update Note' : 'Create Note'}
                </Button>
            </div>
        </form>
    );
};

export default NoteForm;
