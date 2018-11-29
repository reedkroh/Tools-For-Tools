// Get references to page elements
var $toolInput = $("#tool-input");
var $descriptionInput = $("#tool-description");
var $categoryInput = $("#tool-category");
var $priceInput = $("#tool-price");
var $quantityInput = $("#tool-quantity");
var $ownerInput = $("#tool-owner");

var $submitBtn = $("#submit");
var $toolsList = $("#tools-list");


// The API object contains methods for each kind of request we'll make
var API = {
  saveExample: function(oneTool) {
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",             //POST places in database????
      url: "api/tools",      //Posts to this api/examples route
      data: JSON.stringify(oneTool)
    });
  },
  getExamples: function() {
    return $.ajax({
      url: "api/tools",    //GET all examples
      type: "GET"
    });
  },
  deleteExample: function(id) {
    return $.ajax({
      url: "api/tools/" + id,      //delete example with this id
      type: "DELETE"
    });
  }
};

// refreshExamples gets new examples from the db and repopulates the list
var refreshExamples = function() {
  API.getExamples().then(function(data) {
    var $allToolsDisplay = data.map(function(oneTool) { //allToolsDisplay is all the tools from the db
      var $a = $("<a>")   //link of specific example
        .text(oneTool.tool)  //uses title
        .attr("href", "/tool/" + oneTool.id);  //link address with id to html 

      var $li = $("<li>") //list of examples
        .attr({
          class: "list-group-item",
          "data-id": oneTool.id
        })
        .append($a);

      var $button = $("<button>")
        .addClass("btn btn-danger float-right delete")
        .text("ｘ");

      $li.append($button);

      return $li;
    });

    $toolsList.empty();   //empty out when done
    $toolsList.append($allToolsDisplay); //append emptied list to reset var
  });
};

// handleFormSubmit is called whenever we submit a new example
// Save the new example to the db and refresh the list
var handleFormSubmit = function(event) {
  event.preventDefault();

  var oneTool = {
    tool: $toolInput.val().trim(),   //add inputed tool to variable tool
    category: $categoryInput.val().trim(),
    description: $descriptionInput.val().trim(),
    price: $priceInput.val().trim(),
    quantity: $quantityInput.val().trim(),
    owner: $ownerInput.val().trim()
  };

  if (!(oneTool.tool && oneTool.description && oneTool.category && oneTool.price && oneTool.quantity && oneTool.owner)) {
    alert("You must enter an example tool, description and category!");
    return;
  }

  API.saveExample(oneTool).then(function() {
    refreshExamples();
  });

  $toolInput.val("");     //empties
  $descriptionInput.val("");
  $categoryInput.val("");

  $priceInput.val("");
  $quantityInput.val("");
  $ownerInput.val("");
};

// handleDeleteBtnClick is called when an oneTool's delete button is clicked
// Remove the example from the db and refresh the list
var handleDeleteBtnClick = function() {
  var idToDelete = $(this)
    .parent()
    .attr("data-id");

  API.deleteExample(idToDelete).then(function() {
    refreshExamples();
  });
};

// Add event listeners to the submit and delete buttons
$submitBtn.on("click", handleFormSubmit);
$toolsList.on("click", ".delete", handleDeleteBtnClick);      //.delete is in the class of the delete button
