const { JsonTreeSybolProvider } = require("./JsonTreeSymbolProvider.js");

var treeView = null;
var dataProvider = null;
var refreshTimer = null;

var activate = (exports.activate = function () {
  // Do work when the extension is activated
  dataProvider = new ToDoDataProvider(sortBy);

  // Create the TreeView
  treeView = new TreeView("todo", {
    dataProvider: dataProvider,
  });

  // TreeView implements the Disposable interface
  nova.subscriptions.add(treeView);
});

exports.deactivate = function () {
  // Clean up state before the extension is deactivated
  treeView = null;
  dataProvider = null;
  if (refreshTimer !== null) {
    clearInterval(refreshTimer);
  }
};

function reloadData() {
  if (treeView !== null) {
    dataProvider.loadData(sortBy);
    treeView.reload();
  }
}
