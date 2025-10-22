let modal, table, shape;
window.onload = function(event){
    modal = document.getElementById("myModal");
    table = document.getElementById("csvTable");
    shape = document.getElementById("shape");

    let close_button = document.getElementById("close");
    let hrefs = document.querySelectorAll(".hrefs")
    for(let source of hrefs){
        source.onclick = function(){
            file = this.innerHTML;
            fetch_data(file);
        }
    }
    close_button.onclick = function() {
        modal.style.display = "none";
    }
    // modal.onclick = function(){
    //     modal.style.display = "none";
    // }
}

async function fetch_data(file){
    let info = await fetch(file);
    let text = await info.text();

    let parsed = Papa.parse(text, {
      header: true,
      skipEmptyLines: true
    });

    let data = parsed.data;
    let limitedData = data.slice(0, 5); // Limit to first 5 rows

    if (limitedData.length === 0) {
      table.innerHTML = "<tr><td>No data found</td></tr>";
      return;
    }else{
      table.innerHTML = "";
    }

    // Create table headers
    let headers = Object.keys(limitedData[0]);
    let thead = document.createElement('thead');
    let headRow = document.createElement('tr');
    for(let header of headers){
      let th = document.createElement('th');
      th.textContent = header;
      headRow.appendChild(th);
    };
    thead.appendChild(headRow);
    table.appendChild(thead);

    // Create table rows
    let tbody = document.createElement('tbody');
    for(let row of limitedData){
      let tr = document.createElement('tr');
      headers.forEach(header => {
        let td = document.createElement('td');
        td.textContent = row[header];
        tr.appendChild(td);
      });
      tbody.appendChild(tr);
    };
    table.appendChild(tbody);
    shape.innerHTML = `(${data.length}, ${headers.length})`;
  
    modal.style.display = "block";
};