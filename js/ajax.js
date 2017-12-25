function ajax_get(url, callback) {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            console.log('responseText:' + xmlhttp.responseText);
            try {
                var data = JSON.parse(xmlhttp.responseText);

            } catch(err) {
                console.log(err.message + " in " + xmlhttp.responseText);
                return;
            }
            callback(data);
        }
    };

    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}

ajax_get('http://localhost:1111', function(data) {
    document.getElementById("text").innerHTML = data["text"];
       var html = "<table class=\"table table-striped\">";
           html += "<th>" + "Event" + "</th>"  +"<th>" + "ID" + "</th>" + "<th>" + "Position" + "</th>"
          + "<th>" + "First name" + "</th>" + "<th>" + "Last name" + "</th>"
          + "<th>" + "Gender" + "</th>" + "<th>" + "Birth Date" + "</th>"
          + "<th>" + "Login" + "</th>" + "<th>" + "Email" + "</th>"
          + "<th>" + "Avatar" + "</th>";
window.Employees = data;
    html += "<tr>" + getEmployeeRowsHtml(null).join("</tr><tr>") + "</tr>";
    html += "</table>";
// alert(JSON.stringify(data));
    document.getElementById("text").innerHTML = html;

});

function getEmployee(employeeId, event) {
  var trEl = event.target.parentNode.parentNode,
      table = trEl.parentNode;

  var employeeRowsTdHtml = getEmployeeRowsHtml(employeeId, '');
  for (var i = 0; i < employeeRowsTdHtml.length; i++) {
      var newTrEl = document.createElement('tr');
      newTrEl.innerHTML = employeeRowsTdHtml[i];
      table.insertBefore(newTrEl, trEl.nextSibling);
  }
}

function hasEmployees(employeeId){
  var employees = window.Employees;

  for (var i=0; i < employees.length; i++) {
    employee = employees[i];
    if(employee.bossid == employeeId) {
       return true;
    }
  }
  return false;
}

function getEmployeeRowsHtml(employeeId){
  var employees = window.Employees,
      employee = null,
      rows = [];

  for (var i=0; i < employees.length; i++) {
    employee = employees[i];
    if (employee.bossid == employeeId && !employee.isOpen) {
      employee.isOpen = true;
      rows.push("<td>" +
                      (hasEmployees(employee.id) ? "<span onclick = \"getEmployee(" + employees[i].id + ", event)\"> + </span>"
                       : '-') + "</td>" +
                "<td>" + employee.id + "</td>" +
                "<td>" + employee.bossid  + "</td>"+
                "<td>"  + employee.firstName  + "</td>"+
                "<td>" + employee.lastName + "</td>" +
                "<td>" + employee.gender  + "</td>" +
                "<td>" + employee.birthDate + "</td>" +
                "<td>" + employee.userName  + "</td>"+
                "<td>" + employee.email + "</td>" +
                "<td>" + employee.avatar + "</td>"
       );
    }
  }
  return rows;
}
