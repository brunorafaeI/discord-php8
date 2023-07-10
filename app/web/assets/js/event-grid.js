// Grid Options are properties passed to the grid
const gridOptions = {

  // each entry here represents one column
  columnDefs: [
    { field: "id" },
    { field: "title" },
    { field: "price" },
    { field: "description" },
    { field: "category" },
    { field: "image" },
  ],

  // default col def properties get applied to all columns
  defaultColDef: {
    flex: 1,
    sortable: true, 
    filter: true,
    floatingFilter: true,
    resizable: true,
    editable: true
  },

  rowSelection: 'multiple', // allow rows to be selected
  animateRows: false, // have rows animate to new positions when sorted
  pagination: true,
  
  // example event handler
  onCellClicked: params => {
    console.log('cell was clicked', params)
  },
  
  // example event handler pinned
  onColumnPinned: event => {
    console.log(event)
  }
};

// new grid instance, passing in the hosting DIV and Grid Options
new agGrid.Grid(document.getElementById("event-grid"), gridOptions);

fetch('https://fakestoreapi.com/products')
  .then(data => data.json())
  .then(data => gridOptions.api.setRowData(data))

function onPinAthlete() {
  gridOptions.columnApi.applyColumnState({
    state: [{ colId: 'athlete', pinned: 'left' }],
  });
}

function onUnpinAthlete() {
  gridOptions.columnApi.applyColumnState({
    state: [{ colId: 'athlete', pinned: null }],
  });
}