export default function getListStudentIds(students) {
  if (students instanceof Array) {
    return students.map((e) => e.id);
  }
  return [];
}
