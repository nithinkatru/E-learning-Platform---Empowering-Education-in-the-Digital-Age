function CourseForm({ course, onSave, onChange, saving = false }) {
  return (
    <form onSubmit={onSave}>
      <h2>{course.id ? 'Edit' : 'Add'} Course</h2>
      <input
        type="text"
        name="title"
        placeholder="Course Title"
        value={course.title}
        onChange={onChange}
      />
      <input
        type="submit"
        disabled={saving}
        value={saving ? 'Saving...' : 'Save Course'}
      />
    </form>
  );
}

export default CourseForm;
