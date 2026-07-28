let students = JSON.parse(localStorage.getItem('studentDetails')) || [
    {id: "1",
     roll: "1",
     name: "Amir",
     image: "",
     status: "Present"
    },
    {id: "2",
     roll: "2",
     name: "Asim",
     image: "",
     status: "Present"
    },
    {id: "3",
     roll: "3",
     name: "Badusha",
     image: "",
     status: "Present"
    },
    {id: "4",
     roll: "4",
     name: "Abubacker",
     image: "",
     status: "Present"
    },
    ];


renderStudents(students);

console.log(students);


function renderStudents(students) {

    if (students === undefined || students === null || students.length === 0) {
        console.log('Students array is empty');
        return;
    }

    if (!(students instanceof Array)) {
        return;
    }
    let studentCardsHTML = '';
    for (let i = 0; i < students.length; i++) {
        const student = students[i];

        const isPresent = student.status === 'Present';
        const borderColor = isPresent ? 'border-primary' : 'border-error';
        const badgeBg = isPresent ? 'bg-primary-fixed text-on-primary-fixed-variant' : 'bg-error-container text-on-error-container';

        const presentBtnStyle = isPresent 
            ? 'bg-primary-container text-on-primary-container font-bold' 
            : 'bg-surface-container-high text-on-surface-variant hover:bg-primary-fixed/20';

        const absentBtnStyle = !isPresent 
            ? 'bg-error-container text-on-error-container font-bold' 
            : 'bg-surface-container-high text-on-surface-variant hover:bg-error-container/20';

        const cardHTML = `
            <div class="bg-surface-container-lowest p-md rounded-[24px] shadow-[0px_2px_8px_rgba(69,90,100,0.08)] flex flex-col gap-md border-l-4 ${borderColor} transition-transform hover:scale-[1.01]">
            <div class="flex items-center gap-md">
            <div class="w-14 h-14 rounded-full overflow-hidden bg-surface-container">
            <img class="w-full h-full object-cover" data-alt="A portrait of a teenage boy student with short dark hair, wearing a clean white school polo shirt. He is smiling slightly toward the camera against a soft, light-blue studio background. The lighting is bright and even, highlighting a clean and organized academic persona consistent with a modern student portal." src="https://lh3.googleusercontent.com/aida-public/AB6AXuCcQjn17JP-WSY24SlqJ7g0vh8hM_Mm3ogkCxJJTK4i3QuVNg5Bd4Z1bMtcQaI2tR4MJ5B24clvb9S8UQhJX5wphu5lW4u7ipdTcTnk7jdSGjHyHiCWBbi0xKcBXoFnTS0jfg3DAcuP3MB4xjVDTB-LKNOmTVs9OSycUKGdgA-6oDkJswaCvUrxN6qUl5RcqNPD99lzRBmwoN2KTBpH-c8RObRg116MDhHTGR7_mWv5cvlg0xd7eaEnFlo-66WhDJ5A7R7Xe22lys8">
            </div>
            <div class="flex-1">
            <h3 class="font-title-lg text-title-lg text-on-surface">${student.name}</h3>
            <p class="font-body-md text-body-md text-on-surface-variant">ID: ${student.id}</p><p class="font-body-md text-body-md text-on-surface-variant">Roll No: ${student.roll}</p>
            </div>
            <div class="flex flex-col items-end">
            <span class="bg-primary-fixed text-on-primary-fixed-variant px-sm py-xs rounded-full text-label-md font-label-md">${student.status}</span>
            </div>
            </div>
            <div class="flex gap-sm">
            <button onclick="toggleAttendance(${i}, 'Present');" 
            class="flex-1 py-sm px-md rounded-full ${presentBtnStyle} flex items-center justify-center gap-xs font-label-lg text-label-lg active:scale-95 transition-transform">
            <span class="material-symbols-outlined text-[18px]">check_circle</span>
                                    Present
                                </button>
            <button onclick="toggleAttendance(${i}, 'Absent');" class="flex-1 py-sm px-md rounded-full ${absentBtnStyle} flex items-center justify-center gap-xs font-label-lg text-label-lg hover:bg-error-container hover:text-on-error-container active:scale-95 transition-all">
            <span class="material-symbols-outlined text-[18px]">cancel</span>
                                    Absent
                                </button>
            </div>
            </div>
        `;
        studentCardsHTML += cardHTML;
    }
    document.querySelector('.js-student-card').innerHTML = studentCardsHTML;
    console.log(countAttendence(students));
    updateAttendenceUI(students)
    localStorage.setItem('studentDetails', JSON.stringify(students));
}

function toggleAttendance(index, newStatus) {
    students[index].status = newStatus;
    console.log(newStatus)
    renderStudents(students);
    console.log(students)
}


function countAttendence(studentsArray) {
    let presentCount = 0;
    let absentCount = 0;

    studentsArray.forEach((student) => {
        if (student.status === 'Present') {
            presentCount++;
        } else if (student.status === 'Absent') {
            absentCount++;
        }
    });
    return { present: presentCount, absent: absentCount, total: studentsArray.length };

}


function updateAttendenceUI(students) {
    const count = countAttendence(students);

    document.querySelector('.js-present-summary').innerHTML = count.present;
    document.querySelector('.js-absent-summary').innerHTML = count.absent;
    document.querySelector('.js-total-summary').innerHTML = count.total;
}


// To work Service worker in the browser
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then((reg) => console.log('Service Worker Registered!', reg))
      .catch((err) => console.log('Service Worker Registration Failed:', err));
  });
}