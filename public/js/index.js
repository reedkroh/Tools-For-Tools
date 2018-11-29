// Get references to page elements
var $exampleText = $("#example-text");
var $exampleDescription = $("#example-description");
var $submitBtn = $("#submit");
var $exampleList = $("#example-list");

var $exampleCategory = $("#example-category");
var $examplePrice = $("#example-price");
var $exampleQuantity = $("#example-quantity");
var $exampleOwner = $("#example-owner");

// The API object contains methods for each kind of request we'll make
var API = {
  saveExample: function(oneTool) {
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",             //POST places in database????
      url: "api/examples",      //Posts to this api/examples route
      data: JSON.stringify(oneTool)
    });
  },
  getExamples: function() {
    return $.ajax({
      url: "api/examples",    //GET all examples
      type: "GET"
    });
  },
  deleteExample: function(id) {
    return $.ajax({
      url: "api/examples/" + id,      //delete example with this id
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
        .attr("href", "/example/" + oneTool.id);  //link address with id 

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

    $exampleList.empty();   //empty out when done
    $exampleList.append($allToolsDisplay); //append emptied list to reset var
  });
};

// handleFormSubmit is called whenever we submit a new example
// Save the new example to the db and refresh the list
var handleFormSubmit = function(event) {
  event.preventDefault();

  var oneTool = {
    tool: $exampleText.val().trim(),   //add inputed tool to variable tool
    category: $exampleCategory.val().trim(),
    description: $exampleDescription.val().trim(),
    price: $examplePrice.val().trim(),
    quantity: $exampleQuantity.val().trim(),
    owner: $exampleOwner.val().trim()
  };

  if (!(oneTool.tool && oneTool.description && oneTool.category && oneTool.price && oneTool.quantity && oneTool.owner)) {
    alert("You must enter an example tool, description and category!");
    return;
  }

  API.saveExample(oneTool).then(function() {
    refreshExamples();
  });

  $exampleText.val("");     //empties
  $exampleDescription.val("");
  $exampleCategory.val("");

  $examplePrice.val("");
  $exampleQuantity.val("");
  $exampleOwner.val("");
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
$exampleList.on("click", ".delete", handleDeleteBtnClick);
