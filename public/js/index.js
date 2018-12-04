// Get references to page elements


var $submitBtn = $("#submit");
var $toolsList = $("#tools-list");
var $singleTool = $("#rentItem");

//var $purchaseBtn = $("#purchase-button")    //reference to purchase button


// The API object contains methods for each kind of request we'll make
var API = {
  saveTool: function(oneTool) {
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",             
      url: "/api/tools",      //Posts to this api/tools route
      data: JSON.stringify(oneTool)
    });
  },
  getTools: function() {
    return $.ajax({
      url: "/api/tools",    //GET all tools
      type: "GET"
    });
  },
  deleteTool: function(id) {
    return $.ajax({
      url: "/api/tools/" + id,      //delete example with this id
      type: "DELETE"
    });
  }
  //,
  //updateTool: function() {
  //  return $.ajax({
  //    url: "api/tools", 
  //    type: "PUT"
  //  });
  //}
};

// refreshTools gets new tools from the db and repopulates the list
var refreshTools = function() {
  API.getTools().then(function(data) {
    var $allToolsDisplay = data.map(function(oneTool) { //allToolsDisplay is all the tools from the db
      var $a = $("<a>")   //link of specific example
        .text(oneTool.tool)  //uses title
        .attr("href", "/tool/" + oneTool.id);  //link address with id to html 

      var $li = $("<li>") //list of tools
        .attr({
          class: "list-group-item",
          "data-id": oneTool.id
        })
        .append($a);

      var $button = $("<button>") //delete button added to each item
        .addClass("btn btn-danger float-right delete")
        .text("ｘ")
      $li.append($button);

      return $li;
    });

    $toolsList.empty(); //empty out when done
    $toolsList.append($allToolsDisplay); //append emptied list to reset var
  });
};

// handleFormSubmit is called whenever we submit a new tool
// Save the new tool to the db and refresh the list
var handleFormSubmit = function(event) {
  event.preventDefault();
  var $toolInput = $("#tool-input");
  var $descriptionInput = $("#tool-description");
  var $categoryInput = $("#tool-category");
  var $priceInput = $("#tool-price");
  var $quantityInput = $("#tool-quantity");
  var $ownerInput = $("#tool-owner");

  var oneTool = {
    tool: $toolInput.val().trim(), //add inputed tool to variable tool
    category: $categoryInput.val().trim(),
    description: $descriptionInput.val().trim(),
    price: $priceInput.val().trim(),
    quantity: $quantityInput.val().trim(),
    owner: $ownerInput.val().trim()
  };

  if (!(oneTool.tool && oneTool.description && oneTool.category && oneTool.price && oneTool.quantity && oneTool.owner)) {
    alert("You must enter information in all fields!");
    return;
  }

  return API.saveTool(oneTool).then(function() {
    window.location.replace("/tools");
  });
};

// handleDeleteBtnClick is called when an oneTool's delete button is clicked
// Remove the tool from the db and refresh the list
var handleDeleteBtnClick = function() {
  var idToDelete = $(this) //this refers to button being clicked
    .parent()
    .attr("data-id");

  API.deleteTool(idToDelete).then(function() {
    refreshTools();
  });
};

var handleRentItemClick = function() {
  var idToDelete = $(this).data("id");
  // console.log(idToDelete)
  API.deleteTool(idToDelete).then(function() {
    alert("You have rented this tool!")
    window.location.replace("/tools");
    // refreshTools();
  });
};

// handlePurchaseBtnClick
//var handlePurchaseBtnClick = function() {
//  var idToUpdate = $(this)
//    .parent()
//    .attr("data-id");
//
//  API.updateTool(idToUpdate).then(function() {
//    refreshTools();
//  });
//};


// Add event listeners to the submit and delete buttons
$submitBtn.on("click", handleFormSubmit);
$toolsList.on("click", ".delete", handleDeleteBtnClick); //.delete is in the class of the delete button
$singleTool.on("click", handleRentItemClick);

//$purchaseBtn.on("click", "#purchase-btn", handlePurchaseBtnClick);