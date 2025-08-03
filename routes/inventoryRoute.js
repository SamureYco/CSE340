const express = require("express")
const router = new express.Router() 
const invController = require("../controllers/invController")
const utilities = require("../utilities/")


// Route to build inventory by classification view
router.get("/type/:classificationId", invController.buildByClassificationId);

// Route to build inventory detail view
router.get("/detail/:invId", invController.buildByInvId);
router.get("/", utilities.checkAdmin, invController.showManagementView);

router.get("/add-classification", utilities.checkAdmin, invController.showAddClassificationForm);
router.post("/add-classification", utilities.checkAdmin, invController.processAddClassification);

router.get("/add-inventory", utilities.checkAdmin, invController.showAddInventoryForm);
router.post("/add-inventory", utilities.checkAdmin, invController.processAddInventory);

// Route to get inventory items as JSON
router.get("/getInventory/:classification_id", utilities.handleErrors(invController.getInventoryJSON));

//Route to Edit Inventory Item
router.get("/edit/:inv_id",utilities.checkAdmin,  utilities.handleErrors(invController.buildEditInventoryView));

//Route to Update Inventory Item
router.post(
    "/update",
    utilities.checkAdmin,
    utilities.newInventoryRules(), 
    utilities.checkUpdateData, 
    utilities.handleErrors(invController.updateInventory)
);

//Route to get delete confirmation view
router.get("/delete/:inv_id",utilities.checkAdmin, utilities.handleErrors(invController.buildDeleteConfirmationView));

//Route to handle delete process
router.post("/delete",utilities.checkAdmin, utilities.handleErrors(invController.deleteInventoryItem));

module.exports = router;