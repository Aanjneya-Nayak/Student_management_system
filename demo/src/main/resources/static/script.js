const API_URL = "http://localhost:8081/students";

/* ------------------------------
   1. Load students when page opens
--------------------------------*/
window.onload = fetchStudents;

function fetchStudents() {
    fetch(API_URL)
        .then(res => res.json())
        .then(data => {
            const table = document.getElementById("studentTable");
            table.innerHTML = "";

            data.forEach(s => {
                table.innerHTML += `
                    <tr>
                        <td>${s.id}</td>
                        <td>${s.name}</td>
                        <td>${s.course}</td>
                        <td>
                            <button onclick="editStudent(${s.id}, '${s.name}', '${s.course}')">
                                Edit
                            </button>
                            <button onclick="deleteStudent(${s.id})">
                                Delete
                            </button>
                        </td>
                    </tr>
                `;
            });
        });
}

/* ------------------------------
   2. Add OR Update student
--------------------------------*/
document.getElementById("studentForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const id = document.getElementById("studentId").value;

    const student = {
        name: document.getElementById("name").value,
        course: document.getElementById("course").value
    };

    // IF id exists → UPDATE
    if (id) {
        fetch(`${API_URL}/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(student)
        }).then(() => {
            resetForm();
            fetchStudents();
        });
    }
    // ELSE → ADD
    else {
        fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(student)
        }).then(() => {
            resetForm();
            fetchStudents();
        });
    }
});

/* ------------------------------
   3. Fill form for UPDATE
--------------------------------*/
function editStudent(id, name, course) {
    document.getElementById("studentId").value = id;
    document.getElementById("name").value = name;
    document.getElementById("course").value = course;
}

/* ------------------------------
   4. Delete student
--------------------------------*/
function deleteStudent(id) {
    fetch(`${API_URL}/${id}`, {
        method: "DELETE"
    }).then(() => fetchStudents());
}

/* ------------------------------
   5. Reset form
--------------------------------*/
function resetForm() {
    document.getElementById("studentId").value = "";
    document.getElementById("name").value = "";
    document.getElementById("course").value = "";
}
function searchStudent() {
    const keyword = document.getElementById("searchInput").value;

    if (keyword.trim() === "") {
        fetchStudents();
        return;
    }

    fetch(`${API_URL}/search?name=${keyword}`)
        .then(res => res.json())
        .then(data => {
            const table = document.getElementById("studentTable");
            table.innerHTML = "";

            data.forEach(s => {
                table.innerHTML += `
                    <tr>
                        <td>${s.id}</td>
                        <td>${s.name}</td>
                        <td>${s.course}</td>
                        <td>
                            <button onclick="editStudent(${s.id}, '${s.name}', '${s.course}')">Edit</button>
                            <button onclick="deleteStudent(${s.id})">Delete</button>
                        </td>
                    </tr>
                `;
            });
        });
}
