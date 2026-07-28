let studentDetails = JSON.parse(localStorage.getItem('studentDetails')) || [];
console.log(studentDetails);



renderStudentsList();
function renderStudentsList(listToRender = studentDetails) {
    let studentListCardHTML = '';
listToRender.forEach(function (student, index) {
    let newHTML = `
        <div class="student-card bg-surface-container-lowest rounded-xl shadow-sm overflow-hidden flex items-center p-3 border-l-4 border-secondary relative">
        <div class="w-14 h-14 rounded-full overflow-hidden flex-shrink-0 bg-surface-container-high">
        <img class="w-full h-full object-cover" data-alt="Close-up portrait of Alex Thompson, a male high school student with a confident smile. He is wearing a clean, professional school uniform. The lighting is bright and cheerful, set against a softly blurred library background that uses the school's signature forest green and indigo palette." src="https://lh3.googleusercontent.com/aida-public/AB6AXuBc5w210788tO4ZQZcOlMMDojhRvC_PoXNLceQAY6ymJOcZUkCGLANNU47RgR-Oa0vhPsfASmJ-mlc1doMQMEiAQZ15EbWMZJPdlNp206QV3L5ugadaGu-oqKNtCeFAOx82lpY1m3aKIffAw9agOwp9cL1A0FeYNs1qpDegIkpdDvWr1y1-i7cMB32uNYTUb0uvmK_rbMBdxU8awINQ1GFzLeFhIdhQXFe3A0mJxza15FsVWc6ILgx3xLADAl0Hb3xeISHrvQGrYdM">
        </div>
        <div class="ml-4 flex-grow">
        <h3 class="font-body-lg text-body-lg font-bold text-on-surface">${student.name}</h3>
        <div class="flex gap-3 mt-0.5">
        <span class="font-label-caps text-label-caps text-on-surface-variant">Roll No: ${student.roll}</span>
        <span class="font-label-caps text-label-caps text-secondary font-bold uppercase tracking-wider">ID: ${student.id}</span>
        </div>
        </div>
        <div class="flex items-center gap-1">
                <!-- Edit Button -->
                <button onclick="editStudent(${index}, '${student.id}');"
                        title="Edit Student" 
                        class="p-2 text-on-surface-variant hover:text-primary hover:bg-primary-container/20 rounded-full transition-colors active:scale-95">
                    <span class="material-symbols-outlined text-[20px]">edit</span>
                </button>

                <!-- Delete Button -->
                <button onclick="deleteStudent('${student.id}')" 
                        title="Delete Student" 
                        class="p-2 text-on-surface-variant hover:text-error hover:bg-error-container/20 rounded-full transition-colors active:scale-95">
                    <span class="material-symbols-outlined text-[20px]">delete</span>
                </button>
            </div>
        
        </div>
        `
    studentListCardHTML += newHTML;

    
});

document.querySelector('.js-student-list').innerHTML = studentListCardHTML;
document.querySelector('.js-total-students').innerHTML = listToRender.length;
}


function filterStudentsByClass(selectedClass) {
    let filteredList = [];

    
        if (selectedClass === 'all') {
            filteredList = studentDetails;
        }else {
            filteredList = studentDetails.filter(function(student) {
                return student.class === selectedClass;
            });
        }        
    
    renderStudentsList(filteredList);
}

function editStudent(index, studentId) {
    window.location.href = `students-enroll.html?id=${studentId}`;
}
console.log(window)



function deleteStudent(studentId) {
    studentDetails = studentDetails.filter(function(student) {
        return student.id != studentId;
    });

    renderStudentsList(studentDetails);
}


if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then((reg) => console.log('Service Worker Registered!', reg))
      .catch((err) => console.log('Service Worker Registration Failed:', err));
  });
}