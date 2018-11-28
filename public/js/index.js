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
  saveExample: function(example) {
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "api/examples",      //creates this api/examples route
      data: JSON.stringify(example)
    });
  },
  getExamples: function() {
    return $.ajax({
      url: "api/examples",
      type: "GET"
    });
  },
  deleteExample: function(id) {
    return $.ajax({
      url: "api/examples/" + id,
      type: "DELETE"
    });
  }
};

// refreshExamples gets new examples from the db and repopulates the list
var refreshExamples = function() {
  API.getExamples().then(function(data) {
    var $examples = data.map(function(example) {
      var $a = $("<a>")   //link of specific example
        .text(example.tool)  //uses title
        .attr("href", "/example/" + example.id);  //link address with id 

      var $li = $("<li>") //list of examples
        .attr({
          class: "list-group-item",
          "data-id": example.id
        })
        .append($a);

      var $button = $("<button>")
        .addClass("btn btn-danger float-right delete")
        .text("ｘ");

      $li.append($button);

      return $li;
    });

    $exampleList.empty();   //empty out when done
    $exampleList.append($examples); //append emptied list to reset var
  });
};

// handleFormSubmit is called whenever we submit a new example
// Save the new example to the db and refresh the list
var handleFormSubmit = function(event) {
  event.preventDefault();

  var example = {
    tool: $exampleText.val().trim(),   //add title to variable
    category: $exampleCategory.val().trim(),
    description: $exampleDescription.val().trim(),
    price: $examplePrice.val().trim(),
    quantity: $exampleQuantity.val().trim(),
    owner: $exampleOwner.val().trim()
  };

  if (!(example.tool && example.description && example.category && example.price && example.quantity && example.owner)) {
    alert("You must enter an example tool, description and category!");
    return;
  }

  API.saveExample(example).then(function() {
    refreshExamples();
  });

  $exampleText.val("");     //empties
  $exampleDescription.val("");
  $exampleCategory.val("");

  $examplePrice.val("");
  $exampleQuantity.val("");
  $exampleOwner.val("");
};

// handleDeleteBtnClick is called when an example's delete button is clicked
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
