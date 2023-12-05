export default function getStudentIdsSum(students) {
  if (students instanceof Array) {
    return students.reduce((prevstudent, curstudent) => prevstudent.id
    || prevstudent + curstudent.id, 0);
  }
  return 0;
}
