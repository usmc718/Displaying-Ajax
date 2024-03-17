function getTickets(employeeid) {
    var xhr = new XMLHttpRequest();
    var url = 'https://jscript.rdm/tickets.xml'; // Assuming this is the URL to retrieve the XML file containing ticket information

    xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                var ticketsXML = xhr.responseXML;
                displayTicketTable(ticketsXML, employeeid);
            } else {
                console.error('Failed to retrieve tickets: ' + xhr.status);
            }
        }
    };

    xhr.open('GET', url, true);
    xhr.send();
}

function displayTicketTable(ticketsXML, employeeid) {
    // Assuming you have a table element with ID 'ticketTable' where you want to display the ticket information
    var table = document.getElementById('ticketTable');

    // Clear existing table content
    table.innerHTML = '';

    // Find tickets submitted by the specified employee
    var tickets = ticketsXML.getElementsByTagName('ticket');
    for (var i = 0; i < tickets.length; i++) {
        var ticket = tickets[i];
        var ticketEmployeeID = ticket.getElementsByTagName('employeeID')[0].textContent;

        if (ticketEmployeeID === employeeid) {
            var row = table.insertRow();
            var requestDate = ticket.getElementsByTagName('requestDate')[0].textContent;
            var firstName = ticket.getElementsByTagName('firstName')[0].textContent;
            var lastName = ticket.getElementsByTagName('lastName')[0].textContent;
            var problemDescription = ticket.getElementsByTagName('problemDescription')[0].textContent;
            var status = ticket.getElementsByTagName('status')[0].textContent;
            var response = ticket.getElementsByTagName('response')[0].textContent;

            // Insert data into table cells
            row.insertCell(0).innerHTML = requestDate;
            row.insertCell(1).innerHTML = employeeid;
            row.insertCell(2).innerHTML = firstName;
            row.insertCell(3).innerHTML = lastName;
            row.insertCell(4).innerHTML = problemDescription;
            row.insertCell(5).innerHTML = status;
            row.insertCell(6).innerHTML = response;
        }
    }
}

// Example usage:
getTickets('123456'); // Replace '123456' with the actual employee ID
