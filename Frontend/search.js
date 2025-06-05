async function fetchEmployees(name = '', mobile = '') {
    let url = `http://localhost:8000/api/employees?name=${name}&mobile=${mobile}`;
    const res = await fetch(url);
    const data = await res.json();
    renderTable(data);
}

function renderTable(data) {
    const tbody = document.querySelector("#employeeTable tbody");
    tbody.innerHTML = '';
    data.forEach(emp => {
        const row = `<tr>
        <td>${emp.first_name}</td>
        <td>${emp.last_name}</td>
        <td>${emp.mobile}</td>
        <td>${emp.email}</td>
        <td>${emp.gender === 'Male' ? '👨' : '👩'}</td>
        <td>${emp.dob}</td>
        <td>${emp.country}</td>
        <td>${emp.city}</td>
        <td>
          <button onclick="editEmployee('${emp._id}')" class="btn-green">Edit</button>
          <button onclick="deleteEmployee('${emp._id}')" class="btn-red">Delete</button>
        </td>
      </tr>`;
        tbody.innerHTML += row;
    });
}

function searchEmployees() {
    const name = document.getElementById("searchName").value;
    const mobile = document.getElementById("searchMobile").value;
    fetchEmployees(name, mobile);

}

function clearFilters() {
    document.getElementById("searchName").value = '';
    document.getElementById("searchMobile").value = '';
    fetchEmployees();
}

function editEmployee(id) {
    location.href = `register.html?id=${id}`;
}

function deleteEmployee(id) {
    fetch(`http://localhost:8000/api/employees/${id}`, {
        method: 'DELETE'
    }).then(() => fetchEmployees());
}

window.onload = () => fetchEmployees();