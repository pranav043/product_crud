var table = document.getElementById('mytable')
var input = document.getElementById('myinput')

function filterTable() {
  let filter = input.value.toUpperCase()
  rows = table.getElementsByTagName('TR')
  let flag = false

  for (let row of rows) {
    let cells = row.getElementsByTagName('TD')
    for (let cell of cells) {
      if (cell.textContent.toUpperCase().indexOf(filter) > -1) {
        flag = true
        break
      }
    }

    if (flag) {
      row.style.display = ''
    } else {
      row.style.display = 'none'
    }

    flag = false
  }
}

input.addEventListener('keyup', function (event) {
  filterTable()
})
