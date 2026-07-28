const form = document.getElementById('js-enrollment-form');
const urlParams = new URLSearchParams(window.location.search);
const editStudentId = urlParams.get('id');

form.addEventListener('submit', function(event) {
    event.preventDefault();

    const formData = new FormData(form);     
    const newStudent = Object.fromEntries(formData.entries());  //using this two lines we can convert INPUT VALUES from a any FORM's to a JS Object.

    let students = JSON.parse(localStorage.getItem('studentDetails')) || [];

    if (editStudentId) {                 
        const studentIndex = students.findIndex(function(student) {
            return student.id === editStudentId;       // findIndex() finding the index of student have id which is same to the student's id we want to edit.
        });
                                                       // if not get the index same to the clicked student, index shown as -1 in the variable STUDENTINDEX.
        if (studentIndex !== -1) {
            students[studentIndex] = {...students[studentIndex], ...newStudent};
        }
        window.location.href = 'students-list.html'; 
        
    } else {
            newStudent.status = 'Present';
            students.push(newStudent);
        }

        localStorage.setItem('studentDetails', JSON.stringify(students));
        console.log(newStudent);
        form.reset();
        
});





//For prefilling the inputs to EDIT
const studentDetails = JSON.parse(localStorage.getItem('studentDetails')) || [];

if (editStudentId) {
    const studentToEdit = studentDetails.find((student) => {
        return student.id === editStudentId;
        
    });

    if (studentToEdit) {
        Object.keys(studentToEdit).forEach((key) => {
            const inputElement = form.elements[key];

            if (inputElement) {
                if (inputElement.type === 'file') {
                    return;
                }
                inputElement.value = studentToEdit[key] || '';
            }
        });

        form.elements['name'].focus();
        form.elements['name'].select();
    }
}



if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then((reg) => console.log('Service Worker Registered!', reg))
      .catch((err) => console.log('Service Worker Registration Failed:', err));
  });
}