//Decalre static variable for system setttings
const _data = {};

const SystemSettings = (function () {
    var instance;
    function GetInstance() {
        if (!instance) {
            $.ajax({
                type: "get",
                url: global.appPath + "/Home/GetSystemSettings",
                data: '',
                dataType: "json",
                contentType: "application/json; charset=utf-8",
                async: false,
                success: function (response) {

                    // this case handle error from action filter
                    if (response.AuthenticateMsg !== null && response.AuthenticateMsg === "SessionExpired") {
                        MainPageRedirct();
                    }

                    else if (response === "Error") {
                        $.alert({
                            title: _Alert, content: _UnexpectedError, theme: 'hololightAlert'
                        });
                    }
                    else if (response === "CodeExists") {
                        $.alert({
                            title: _Alert, content: _CodeExistsError, theme: 'hololightAlert'
                        });
                    }
                    else {

                        instance = response;

                    }
                }
            });
        }
        return instance;
    }

    return {
        getSettings: function () {
            return GetInstance();
        },
        IsSublocationAllowed: function () {
            return GetInstance().ALLOW_SUBLOCATIONS == 1 ? true : false;
        },
        KgDefUnit: function () {
            return GetInstance().DEF_KG_UNIT_CODE;
        },
        GramDefUnit: function () {
            return GetInstance().DEF_GRAM_UNIT_CODE;
        },
        IsGrnOnPoImporterMode: function () {
            return GetInstance().IMPORT_PO_ITEMS_POPUP;
        },
        IsCustDiscAffectSalesPrice: function () {
            return GetInstance().CUST_DISC_AFFECT_SALES_PRICE;
        },
        IsCustDiscUsesBaseUnit: function () {
            return GetInstance().CUST_DISC_USES_BASE_UNIT;
        },
        IsRoundMoneyAllowed: function () {
            return GetInstance().ALLOW_MONEY_ROUND;
        },
        IsEnableViewCostRuleForSupplierType: function () {
            return GetInstance().ENABLE_VIEW_UNITCOST_ROLE_FOR_SUPP_TYPE;
        }
    };
})();
//This global object will be used by all screens for global variables
window.global = {
    canViewCost: false,
    appPath: "",
    lang: "",
    dir: "",
    align: "",
    userId: "",
    userTypeId: "",
    userFullName: "",
    userLocationId: 0,
    userLocationTypeId: 0,
    autoCompleteText: '',
    TBStatusNone: 0,
    TBStatusSaved: 1,
    TBStatusPosted: 2,
    TBStatusCanceled: 3,
    TBStatusClosed: 4,
    TBStatusActive: 4,
    TBStatusNotActive: 5,
    isFirstLoad: true,
    payTypeCheck: 2,
    payTypeCash: 1
    , PartialAutoComplete: 1,
    PartialDialog: 2,
    PartialByEnter: 3,
    PayTypeCashCheck: 4
    , Payment: '2',
    Receive: '1',
    payable: '1',
    Receivable: '0',
    Posted: 3
    , New: 1,
    Cancelled: 2,
    StockLocation: 101,
    MarketLocation: 102,
    AllSuppliers: '1'
};


window.TransactionType = {
    Purchase: 1,
    Inventory: 2
}
window.StkAdjReason = {
    MinPlus: 1,
    Exact: 2

}

window.ItemStatus = {
    OnInit: '-1',
    Active: '1',
    InActive: '0',
    Hold: '2'
}

window.TransactionTypes = {
    GRN: 50101,
    SuppReturn: 50103
}
window.PartialMode = {
    ExactCode: 1,
    BestMatch: 2
}

window.PartialModeStatus = {
    Activated: "Activated",
    NotTerminated: "NotTerminated",
    NotPreActivated: "NotPreActivated"
}
window.search = {
    MeasurementUnit: 11,
    ItemMaster: 12,
    ItemCategory: 13,
    ItemMasterMain: 14,
    Supplier: 21,
    SupplierAutoCom: 22,
    Location: 30,
    SubLocation: 31,
    PriceLists: 40,
    Memo: 41,
    SupplierInvoice: 23,
    SupplierPayment: 24,
    Supplier2: 51,
    CreditSettelment: 25,
    Accounts: 26,
    Check: 27,
    DebitSettelment: 28,
    PO: 42,
    GRN: 32,
    Issue: 33,
    Transfer: 52,
    ReceiveItems: 53,
    ItemMasterSupplier: 54,
    StockAdjust: 34,
    Stocktaking: 35,
    SupplierReturn: 36,
    CopySupplierItem: 55,
    GRNPO: 56,
    MemoItem: 43,
    ItemMasterNotTerminated: 57,
    ItemMasterNotPreActive: 58,
    POREQ: 59,
    REQ: 60,
    ActiveSupplier: 61,
    ItemMasterActivated: 64,
    InventoryPO: 63,
    CountryOfOrigin: 66,
    AllSupplierWithAccounts: 80,
    IssueDamage: 82
    //SystemCompany: 1,
    //CashFund: 2,
    //Bank: 3,
    //AdditionalCenter: 4,
    //AccountTypes: 5,
    //PaymentVoucher: 6,
    //ReceiveVoucher: 7,
    //CostCenter: 8,
    //ChartOfAccount: 9
    //, SubChartOfAccount: 10,
    ////UserPermission: 11,
    //JournalVoucher: 12,
    //DepositCheque :13

};

window.TransactionsNames =
{
    GRN: 'GRN',
    ISSUE: 'ISSUE',
    TRANSFER: 'TRANSFER',
    RECEIVE: 'RECEIVE'

}

window.accountSearchMode = {
    AllSubAccounts: 1,
    Receivable: 1001,
    Payable: 2001
};

window.AccountDetailsMode =
{
    CollectionRep: 3
}

window.GRNTypes = {
    PODirect: 1,
    NOPODirect: 7,
    POStock: 8
}
//Set shared variables that will be used with overall project

$(document).ajaxStop(function () {
    //console.debug("ajaxStop");
    Unblock();
});

$(document).ajaxSend(function () {
    //console.debug("ajaxStart");
    block();
});

$(window).bind('keydown', function (event) {


    if (event.ctrlKey || event.metaKey) {
        switch (String.fromCharCode(event.which).toLowerCase()) {
            case 's':
                if (typeof SaveHeader !== 'undefined' && $.isFunction(SaveHeader)) {
                    if (CanDoAction('Save')) {
                        SaveHeader();
                        event.preventDefault();
                    }
                };
                break;
            case 'p':
                if (typeof PrintHeader !== 'undefined' && $.isFunction(PrintHeader)) {
                    if (CanDoAction('Print')) {
                        PrintHeader();
                        event.preventDefault();
                    }
                };
                break;
            case 'h':
                if (typeof NewHeader !== 'undefined' && $.isFunction(NewHeader)) {
                    if (CanDoAction('New')) {
                        NewHeader();
                        event.preventDefault();
                    }
                };
                break;
            case 'f':
                if (typeof SearchHeader !== 'undefined' && $.isFunction(SearchHeader)) {
                    if (CanDoAction('Search')) {
                        SearchHeader();
                        event.preventDefault();
                    }
                };
                break;
        }
        switch (event.which) {
            case 35: //end
                if (typeof Navigate !== 'undefined' && $.isFunction(Navigate)) {
                    if (CanDoAction('Last')) {
                        Navigate('L', 0);
                        event.preventDefault();
                    }
                };
                break;
            case 36: // home
                if (typeof Navigate !== 'undefined' && $.isFunction(Navigate)) {
                    if (CanDoAction('First')) {
                        Navigate('F', 0);
                        event.preventDefault();
                    }
                };
                break;
            case 37: //left
                if (typeof Navigate !== 'undefined' && $.isFunction(Navigate)) {
                    if (CanDoAction('Prev')) {
                        Navigate((global.lang == 1) ? 'P' : 'N', 0);
                        event.preventDefault();
                    }
                };
                break;

            case 39: // right
                if (typeof Navigate !== 'undefined' && $.isFunction(Navigate)) {
                    if (CanDoAction('Prev')) {
                        Navigate((global.lang == 2) ? 'P' : 'N', 0);
                        event.preventDefault();
                    }
                };
                break;
        }

    }
});

//$(document).on("select2:close", function (e) {

//$(document).on(".select2:keydown", function (e) {
//$(document).on('keydown', '.select2-drop-mask', function (ev) {
//	//$('.select2-drop-mask').on("keydown", function (e) {
//	if (typeof HandleScreenKeyPress !== 'undefined' && $.isFunction(HandleScreenKeyPress)) {
//		HandleScreenKeyPress(e.target.id);
//	}
//	return false;
//});


$(document).ready(function () {



    //Unblock screen
    //$.unblockUI();

    //Set global Identifiers
    if (document.getElementById("identity-path") !== null) {
        global.appPath = document.getElementById("identity-path").value;
    }

    if (document.getElementById("identity-language") !== null) {
        global.lang = document.getElementById("identity-language").value;
    }

    if (document.getElementById("identity-userId") !== null) {
        global.userId = document.getElementById("identity-userId").value;
    }
    if (document.getElementById("identity-userTypeId") !== null) {
        global.userTypeId = document.getElementById("identity-userTypeId").value;
    }

    if (document.getElementById("identity-userFullName") !== null) {
        global.userFullName = document.getElementById("identity-userFullName").value;
    }

    if (document.getElementById("identity-userLocationId") !== null) {
        global.userLocationId = document.getElementById("identity-userLocationId").value;
    }

    if (document.getElementById("identity-userLocationTypeId") !== null) {
        global.userLocationTypeId = document.getElementById("identity-userLocationTypeId").value;
    }

    if (global.lang === "1") {
        global.dir = "ltr";
        global.align = "left";
    }
    else if (global.lang === "2") {
        global.dir = "rtl";
        global.align = "right";
    }


    //#region Global setting 
    $body = $("body");
    // Global setting for ajax request
    $.ajaxSetup({
        failure: function (response) {
            $.alert({ title: _Alert, content: _UnexpectedError, theme: 'hololightAlert' });
        },
        error: function (response) {

            $.confirm({
                content: _UnexpectedError,
                confirm: function () {

                    $.confirm({
                        title: '',
                        content: response.responseText.replace("NewLine", '<br/>'),
                        confirmButton: false,
                        cancelButton: false,
                        animation: 'scale',
                        keyboardEnabled: true,
                        backgroundDismiss: true,
                        icon: '',
                        columnClass: 'ConfirmAlert'
                    });
                    //new Call After Error

                },
                confirmButton: _ShowDetails,
                cancelButton: _close
            });

        }
        , beforeSend: function () {
            block();
            $body.addClass("loading");
        },
        complete: function (response) {
            Unblock();
            $body.removeClass("loading");

            //debugger;
            //if (response.responseJSON.AuthenticateMsg != null) {

            //    debugger;
            //    if (response.responseJSON.AuthenticateMsg === "SessionExpired") {
            //        MainPageRedirct();
            //    }
            //}
        }
    });

    // Global setting for Jqgrid
    

    // Global Setting for Alerts
   

   

    //#endregion

    //GetSystemSettings();

    //Input masks
    //Prcnt mask
    $(".prcntMask").inputmask("decimal", { digits: 3, min: 0, max: 100, rightAlign: false, allowMinus: false });

    $(".prcntMask").focus(function (e) {
        var that = this;
        setTimeout(function () { $(that).select(); }, 10);
        return false;
    });

    $(".prcntMask2").inputmask("decimal", { digits: 3, min: 0, max: 1000, rightAlign: false, allowMinus: false });

    $(".prcntMask2").focus(function (e) {
        var that = this;
        setTimeout(function () { $(that).select(); }, 10);
        return false;
    });
    //Decimal
    $(".decimalMask").inputmask("decimal", { digits: 3, rightAlign: false, allowMinus: false });

    $(".decimalMask").focus(function (e) {
        var that = this;
        setTimeout(function () { $(that).select(); }, 10);
        return false;
    });


    $(".decimalMaskMins").inputmask("decimal", { digits: 3, rightAlign: false, allowMinus: true });

    $(".decimalMaskMins").focus(function (e) {
        var that = this;
        setTimeout(function () { $(that).select(); }, 10);
        return false;
    });
    $(".decimal4Mask").inputmask("decimal", { digits: 4, rightAlign: false, allowMinus: false });

    $(".decimal4Mask").focus(function (e) {
        var that = this;
        setTimeout(function () { $(that).select(); }, 10);
        return false;
    });
    //int
    $(".intMask").inputmask("decimal", { digits: 0, rightAlign: false, allowMinus: false });
    $(".intMask").focus(function (e) {
        var that = this;
        setTimeout(function () { $(that).select(); }, 10);
        return false;
    });



    //#region Notification and task scrol bar

    $("#ulTaskData").mCustomScrollbar({
        setHeight: 300,
        theme: "rounded-dots-dark",
        scrollInertia: 100
    });


    $("#ulNotification").mCustomScrollbar({
        setHeight: 300,
        theme: "rounded-dots-dark",
        scrollInertia: 100

    });


    $("#divModule").mCustomScrollbar({
        setHeight: 400,
        theme: "rounded-dots-dark",
        scrollInertia: 100

    });

    $(".ANotification").mCustomScrollbar({
        setHeight: 100,
        theme: "rounded-dots-dark",
        scrollInertia: 100

    });


    //#endregion

    // check the notification as readed
    $(".chkNotification").change(function () {

        var internalId = $(this).val();

        $.ajax({
            type: "get",
            url: global.appPath + "/Shared/MarkNotification?userNotificationInternalId=" + internalId,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (response) {

                // this case handle error from action filter
                if (response.AuthenticateMsg != null) {
                    if (response.AuthenticateMsg === "SessionExpired") {
                        MainPageRedirct();
                    }
                }
                else if (response === "Error") {
                    $.alert({ title: _Alert, content: _UnexpectedError, theme: 'hololightAlert' });
                }


                else {

                    $("#liNotification" + internalId + "").hide();

                    $("#SpanNotificationTitleCount").text(response);
                    $("#SpanNotificationCount").text(response);
                }

            }
        });
    });

    FillUserLocations();


    $("#DefaultButton").click(function () {

        var selectedLocation = $("#ddlUserSideLocation").val();
        if (selectedLocation === "0") {
            $.alert({
                title: _Alert, content: _PleaseSelectLocation, theme: 'hololightAlert'

            });

            return false;
        }

        $.ajax({
            type: "get",
            url: global.appPath + "/Home/SetUserProfileLocation?locationId=" + selectedLocation,

            dataType: "json",
            contentType: "application/json; charset=utf-8",
            success: function (response) {

                // this case handle error from action filter
                if (response.AuthenticateMsg != null) {
                    if (response.AuthenticateMsg === "SessionExpired") {
                        MainPageRedirct();
                    }
                }
                else if (response === "Error") {
                    $.alert({ title: _Alert, content: _UnexpectedError, theme: 'hololightAlert' });
                }

                else if (response === "Success") {
                    if ($(".location:not(:disabled)").length > 0)
                        $(".location:not(:disabled)").select2('val', selectedLocation);
                    //$('select.location:not(:disabled)').select2('val', selectedLocation);
                    global.userLocationId = document.getElementById("identity-userLocationId").value = selectedLocation;
                    $.alert({
                        title: _Alert, content: _SavedSuccessfully, theme: 'hololightAlert'

                    });
                }

                return false;
            }

        });
    });

    //check user rights
    CheckUserRights();


    GetUserLocation();



});
function CheckUserRights() {
    $.ajax({
        type: "get",
        url: global.appPath + "/Home/GetUserRights",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {
            // this case handle error from action filter
            if (response.AuthenticateMsg != null) {
                if (response.AuthenticateMsg === "SessionExpired") {
                    MainPageRedirct();
                }
            }
            else if (response === "Error") {
                $.alert({ title: _Alert, content: _UnexpectedError, theme: 'hololightAlert' });
            }


            else {
                // Check Supplier Type (if not overseas supplier view cost controls other wise hide it)
                if (typeof GetSupplierData !== 'undefined' && $.isFunction(GetSupplierData)) {
                    var supplierId = GetSupplierData() | 0;

                    $.ajax({
                        type: "get",
                        url: global.appPath + "/Supplier/Suppliers/FetchSupplierRecord?status=&sequence=0&id=" + supplierId,
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        success: function (supplierResponse) {
                            // this case handle error from action filter
                            if (supplierResponse.AuthenticateMsg != null) {
                                if (supplierResponse.AuthenticateMsg === "SessionExpired") {
                                    MainPageRedirct();
                                }
                            }
                            else if (supplierResponse === "Error") {
                                $.alert({ title: _Alert, content: _UnexpectedError, theme: 'hololightAlert' });
                            }
                            else {
                                var IsEnableViewCostRuleForSupplierType = SystemSettings.IsEnableViewCostRuleForSupplierType()
                                if ((response.CanViewUnitCost == 0 && supplierResponse.SUPP_TYPE_ID == IsEnableViewCostRuleForSupplierType) || (response.CanViewUnitCost == 0 && IsEnableViewCostRuleForSupplierType == undefined)) {
                                    $(".ApplyUserRight_UnitCost").hide();
                                    global.canViewCost = false;
                                    if (typeof HideGridCostCols !== 'undefined' && $.isFunction(HideGridCostCols))
                                        HideGridCostCols();
                                }
                                else {
                                    $(".ApplyUserRight_UnitCost").show();
                                    global.canViewCost = true;
                                    if (typeof ShowGridCostCols !== 'undefined' && $.isFunction(ShowGridCostCols))
                                        ShowGridCostCols();

                                }
                            }
                        }
                    });
                }
                else {
                    if (response.CanViewUnitCost == 0) {
                        $(".ApplyUserRight_UnitCost").hide();
                        global.canViewCost = false;
                        if (typeof HideGridCostCols !== 'undefined' && $.isFunction(HideGridCostCols))
                            HideGridCostCols();
                    }
                    else {
                        $(".ApplyUserRight_UnitCost").show();
                        global.canViewCost = true;
                        if (typeof ShowGridCostCols !== 'undefined' && $.isFunction(ShowGridCostCols))
                            ShowGridCostCols();
                    }
                }
            }

        }
    });
}

function GetUserLocation() {
    var locationId = $("#identity-userLocationId").val();
    $("#ddlUserSideLocation").val(locationId).change();
}

//#region Global functions

//For session timeout rediret to main page


function MainPageRedirct() {
    var logOutUrl = $("#identity-LogOutLink").val();
    window.location = logOutUrl;
}

function FillUserLocations() {

    var data = [];
    $('#ddlUserSideLocation').html("");
    $.ajax({
        type: "get",
        url: global.appPath + "/Locations/Location/FillUserLocation",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: false,

        success: function (response) {

            if (response.AuthenticateMsg != null) {
                if (response.AuthenticateMsg === "SessionExpired") {
                    MainPageRedirct();
                }
            }
            else if (response === "Error") {
                $.alert({ title: _Alert, content: _UnexpectedError, theme: 'hololightAlert' });
            } else {


                // bind Period Sub
                $("#ddlUserSideLocation").html("");

                $.each(response, function (index, value) {


                    $("#ddlUserSideLocation").append($("<option></option>").attr("value", value.Id).text(value.Name));

                });

                // Focus
            }
        }
    });
}
//Block screen main function
function Unblock() {
    $.unblockUI();
}

//Block screen main function
function block() {
    $.blockUI({
        message: '',
        css: { cursor: 'default', border: '0px solid #FFFFFF', backgroundColor: '#FFFFFF' },
        overlayCSS: { backgroundColor: '#FFFFFF', opacity: 0.0 }
    });
}

function EncryptString(variable) {

    debugger;
    // encrypt parameters
    $.ajax({
        url: global.appPath + '/Report/EncryptParamsReport',
        type: 'POST',
        async: false,
        data: 'paramsJson=' + variable,
        success: function (result) {


            debugger;
            if (result === "Error") {
                $.alert({ title: _Alert, content: _UnexpectedError, theme: 'hololightAlert' });
                variable = '';
            }
            else {
                variable = result;
            }
        }
    });
    return variable;
}

//function ScreenByEnter() {
//	var inputs = $("select,input,textarea,select2");

//	$(inputs).keypress(function (e) {
//		if (e.keyCode === 13) {

//			if (inputs[inputs.index(this) + 1] !== null) {
//				inputs[inputs.index(this) + 1].focus();

//			}
//			return false;
//		}
//	});
//}

function DeserializeData(response, ExceptionsFields, formId) {

    if (formId == undefined)
        formId = "";
    $.map(response, function (value, key) {
        var str = value;
        if (typeof value == "string")
            if (value.includes("Date("))
                value = jsonToDate(value);
        var input = $(formId + ' [name=' + key + ']');
        var inputType = input.attr('type');

        if (input !== null) {

            if ($.inArray(key, ExceptionsFields) === -1) {

                if (input.hasClass("NewDropDown")) {

                    //  $('[name=' + key + ']').val(value).trigger();

                    $(formId + ' [name=' + key + ']').select2("val", value);
                }
                else if (inputType === "checkbox") {
                    $(formId + ' [name=' + key + ']').prop('checked', (value === 0) ? false : true);
                }
                else if (inputType === "label" || inputType === "span") {
                    $(formId + ' [name=' + key + ']').text(value);
                }
                else {
                    $(formId + ' [name=' + key + ']').val(value);
                }
            }
        }
    });

}
// used to serialize all controls to array then convert it to json string
$.fn.serializeObject = function (ExceptionsFields) {
    var o = {};
    var a = this.serializeArray();
    $.each(a, function () {
        if ($.inArray(this.id, ExceptionsFields) === -1) {
            //if (this.id != "lblId") {
            if (o[this.name] !== undefined) {
                if (!o[this.name].push) {
                    //o[this.name] = [o[this.name]];
                }
                else
                    o[this.name].push(MapValue(this.value) || '');
            } else {
                o[this.name] = MapValue(this.value) || '';
            }
        }
    });
    return o;
    function MapValue(val) {
        if (val == "on")
            return 1;
        if (val == "off")
            return 0;
        return val;
    }
};
$.fn.serializeObjectName = function (ExceptionsFields) {
    var o = {};
    var a = this.serializeArray();
    $.each(a, function () {
        var x = $.inArray(this.id, ExceptionsFields);
        if ($.inArray(this.name, ExceptionsFields) === -1) {
            //if (this.id != "lblId") {
            if (o[this.name] !== undefined) {
                if (!o[this.name].push) {
                    //o[this.name] = [o[this.name]];
                }
                else
                    o[this.name].push(MapValue(this.value) || '');
            } else {
                o[this.name] = MapValue(this.value) || '';
            }
        }
    });
    return o;
    function MapValue(val) {
        if (val == "on")
            return 1;
        if (val == "off")
            return 0;
        return val;
    }
};
$.fn.serializeFromArray = function (object, ExceptionsFields) {
    var o = object;
    var a = this.serializeArray();
    $.each(a, function () {
        if ($.inArray(this.id, ExceptionsFields) === -1) {
            //if (this.id != "lblId") {
            if (o[this.name] !== undefined) {
                if (!o[this.name].push) {
                    //o[this.name] = [o[this.name]];
                }
                else
                    o[this.name].push(MapValue(this.value) || '');
            } else {
                o[this.name] = MapValue(this.value) || '';
            }
        }
    });
    return o;
    function MapValue(val) {
        if (val == "on")
            return 1;
        if (val == "off")
            return 0;
        return val;
    }
};

function jsonToDate(param) {
    var date = new Date(parseInt(param.substr(6)));
    var options = {
        weekday: "long", year: "numeric", month: "short",
        day: "numeric", hour: "2-digit", minute: "2-digit"
    };
    return date.toISOString();
}
function DeserializeDataWithPrefix(response, prefix, ExceptionsFields) {

    $.map(response, function (value, key) {


        var input = $('[name=' + prefix + key + ']');
        var inputType = input.attr('type');

        if (input !== null) {

            if ($.inArray(key, ExceptionsFields) === -1) {

                if (input.hasClass("NewDropDown")) {

                    //  $('[name=' + key + ']').val(value).trigger();

                    $('[name=' + prefix + key + ']').select2("val", value);
                }
                else if (inputType === "checkbox") {
                    $('[name=' + prefix + key + ']').prop('checked', (value === 0) ? false : true);
                } else {
                    $('[name=' + prefix + key + ']').val(value);
                }
            }
        }
    });

}

function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

function DisplayAttachment(filePath, imageType, imageName) {

    if (filePath === '' || filePath === null) {
        // set image to default
        $("#" + imageName).attr("src", global.appPath + "/Content/images/" + "Untitled-" + ((global.lang === 1) ? "en" : "ar") + ".jpg" + "?timestamp=" + new Date().getTime());

    } else {
        $.ajax({
            url: global.appPath + '/Lookup/Asset/DisplayAttachment/',
            type: 'Post',
            async: false,
            dataType: 'json',
            data: 'filePath=' + filePath + '&ImageType=' + imageType,
            success: function (response) {

                // this case handle error from action filter
                if (response.AuthenticateMsg !== null) {
                    if (response.AuthenticateMsg === "SessionExpired") {
                        MainPageRedirct();
                    }
                }
                else if (response === "Error") {
                    $.alert({ title: _Alert, content: _UnexpectedError, theme: 'hololightAlert' });
                } else {
                    // add date to image path to prevent cashing image in browser
                    $("#" + imageName).attr("src", response.FilePath + "?timestamp=" + new Date().getTime());
                }
            }
        });
    }

}

function DisplayReport(rptParam, rptPath) {

    // Encrypt paramters
    var encryptedWhere = EncryptString(JSON.stringify(rptParam));
    // Open Report
    window.open(global.appPath + "/ASPX/ReportViewer.aspx?rptPath=" + rptPath + "&params=" + encryptedWhere);
}

function FormatAutoCompletPartialView(code, lvl1, lvl2, lvl3, lvl4, lvl5, lvl6) {

    var output = '';

    if (lvl6 !== '') {
        output += lvl6;
    }

    if (lvl5 !== '') {
        output += (output === '') ? output : ' --> ';
        output += lvl5;
    }
    if (lvl4 !== '') {
        output += (output === '') ? output : ' --> ';
        output += lvl4;
    }
    if (lvl3 !== '') {
        output += (output === '') ? output : ' --> ';
        output += lvl3;
    }
    if (lvl2 !== '') {
        output += (output === '') ? output : ' --> ';
        output += lvl2;
    }
    if (lvl1 !== '') {
        output += (output === '') ? output : ' --> ';
        output += lvl1;
    }

    return ('(' + code + ') ' + output);
}
//#endregion


//Funcation To Get Query String Value By It's Name
function GetQueryStringParams(sParam) {
    var sPageURL = window.location.search.substring(1);
    var sURLVariables = sPageURL.split('&');
    for (var i = 0; i < sURLVariables.length; i++) {
        var sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] === sParam) {
            return sParameterName[1];
        }
    }
}

//#region Jquery controls functions

// create date picker
function createDatePicker(controlName) {
    $("#" + controlName).datepicker({
        changeMonth: true,
        changeYear: true,
        onSelect: function () {
            $(this).change();
            $(this).removeClass("validation");
            $(this).removeAttr("title");
            $(this).tooltip();
        }
    });
    $("#" + controlName).datepicker("option", "dateFormat", "dd/mm/yy")
        .mask("99/99/9999");
}

function createDatePickerByClass(className) {

    var txtfields = $("." + className);

    for (var i = 0; i < txtfields.length; i++) {
        var inputId = $("#" + txtfields[i].id);
        $("#" + txtfields[i].id).datepicker({
            changeMonth: true,
            changeYear: true,
            //onClose: function () {
            //	if (typeof HandleScreenKeyPress !== 'undefined' && $.isFunction(HandleScreenKeyPress)) {
            //		HandleScreenKeyPress(this.id);
            //	}
            //	return false;
            //}
            //showOn: "button",
            //buttonImage: global.appPath + "/Content/images/CalendarIcon.png",
            //buttonImageOnly: true,
            //buttonText: "Select date",
            //onSelect: function () {
            //    $(this).change();
            //    $(this).removeClass("validation");
            //    $(this).removeAttr("title");
            //    $(this).tooltip();
            //}
        });
        $("#" + txtfields[i].id).datepicker("option", "dateFormat", "dd/mm/yy");
        $("#" + txtfields[i].id).mask("99/99/9999");
        //$("#" + txtfields[i].id).inputmask("datetime", {
        //	mask: "y-1-2",
        //	placeholder: "yyyy-mm-dd",
        //	leapday: "-02-29",
        //	separator: "-",
        //	alias: "yyyy/mm/dd"
        //});
    }
}

// create numeric textbox which  allow fractions
function createDecimalTxt(controlName) {
    $("#" + controlName).numeric({
        negative: false
    });
}

function createDecimalTxtByClass(controlName) {
    $("." + controlName).numeric({
        negative: false
    });
}

// create int textbox which does not allow fractions
function createIntTxt(controlName) {
    $("#" + controlName).numeric({
        decimal: false,
        negative: false
    });
}

function createIntTxtByClass(controlName) {
    $("." + controlName).numeric({
        decimal: false,
        negative: false
    });
}



function ApplyIntMask(inputId, digits, max) {
    $(inputId).inputmask("decimal", { digits: digits, min: 0, max: max, rightAlign: false });

    $(inputId).focus(function (e) {
        setTimeout(function () { $(this).select(); }, 10);
        return false;
    });
}
function ApplyPercentageMask(inputId) {
    $(inputId).inputmask("decimal", { digits: 2, min: 0, max: 100, rightAlign: false });

    $(inputId).focus(function (e) {
        setTimeout(function () { $(this).select(); }, 10);
        return false;
    });
}

function ApplyDecimalMask(inputId, digitsCount) {
    $(inputId).inputmask("decimal", {
        digits: digitsCount, rightAlign: false
    });

    $(inputId).focus(function (e) {
        setTimeout(function () { $(this).select(); }, 10);
        return false;
    });
}
function InputDecimalOnly(controlName) {
    $('#' + controlName + '').keypress(function (event) {

        if (event.which === 8 || event.keyCode === 37 || event.keyCode === 39 || event.keyCode === 46)
            return true;

        else if ((event.which !== 46 || $(this).val().indexOf('.') !== -1) && (event.which < 48 || event.which > 57))
            event.preventDefault();
    });
}

function InputDecimalOnlyByClass(className) {
    $('.' + className + '').keypress(function (event) {

        if (event.which === 8 || event.keyCode === 37 || event.keyCode === 39 || event.keyCode === 46)
            return true;

        else if ((event.which !== 46 || $(this).val().indexOf('.') !== -1) && (event.which < 48 || event.which > 57))
            event.preventDefault();
    });
}

function InputIntOnly(controlName) {
    $('#' + controlName + '').on("keypress keyup blur", function (event) {
        $(this).val($(this).val().replace(/[^\d].+/, ""));
        if ((event.which < 48 || event.which > 57)) {
            event.preventDefault();
        }
    });

}

function createDialog(dlgName, dlgHeight, dlgWidth) {
    $("#" + dlgName).dialog({
        autoOpen: false,
        height: dlgHeight,
        width: dlgWidth,
        modal: true,
        draggable: false,
        resizable: true,
        closeOnEscape: false,
        close: function (event, ui) {


            //if (typeof CloseGeneralSrchDialg !== 'undefined' && $.isFunction(CloseGeneralSrchDialg)) {
            //    CloseGeneralSrchDialg();
            //}
        }
    });
}

//#endregion

//#region Autocomplete

//***********************************Auto complete plugin, begin of scope*********************************************************

/*
* jQuery UI Multicolumn Autocomplete Widget Plugin 1.0
* Copyright (c) 2012 Mark Harmon
*
* Depends:
*   - jQuery UI Autocomplete widget
*
* Dual licensed under the MIT and GPL licenses:
*   http://www.opensource.org/licenses/mit-license.php
*   http://www.gnu.org/licenses/gpl.html
*/
$.widget('custom.mcautocomplete', $.ui.autocomplete, {
    _renderMenu: function (ul, items) {
        var self = this,
            thead;

        if (this.options.showHeader) {
            var table = $('<div  style="width:99%;margin:0 5px;text-align:' + global.align + ';background-color: #D2D8DD;"></div>');
            $.each(this.options.columns, function (index, item) {

                table.append('<span style="padding:0 8px;border-width:0 0 0 1px;border-style: solid;border-color:#adc2e8;float:' + global.align + ';width:' + item.width + ';visibility:' + item.visible + ';">' + item.name + '</span>');
            });
            table.append('<div style="clear: both;"></div>');
            ul.append(table);
        }
        $.each(items, function (index, item) {
            self._renderItem(ul, item);
        });
    },
    _renderItem: function (ul, item) {
        var t = '',
            result = '';

        $.each(this.options.columns, function (index, column) {

            var value = item[column.valueField ? column.valueField : index];
            t += '<span style=";text-align:' + global.align + ';padding:0 4px;margin:0;border-width:0 0 0 1px;border-style: solid;border-color:#adc2e8;float:' + global.align + ';width:' + column.width + ';visibility:' + column.visible + ';">' + (value === '' ? '.' : value) + '</span>';
        });

        result = $('<li></li>').data('item.autocomplete', item).append('<a class="mcacAnchor" style="padding:0 5px;border-top-width:1px;border-top-style: solid;border-top-color:#adc2e8;">' + t + '<div style="clear: both;"></div></a>').appendTo(ul);
        return result;
    }
});

function handleKeydown_AutoComplete(event) {

    if (event.keyCode === 27) {
        $("#" + event.currentTarget.id).val(global.autoCompleteText);
    }
}

//***********************************Auto complete plugin, end of scope*********************************************************

//#endregion



function RoundMoney(price) {


    var IsRoundMoneyAllowed = SystemSettings.IsRoundMoneyAllowed();
    if (IsRoundMoneyAllowed == 0)
        return price;
    return (Math.ceil((price / .005).toFixed(4)) * .005).toFixed(4);
}




function RoundMoneyEnforce(price) {
    return (Math.ceil((price / .005).toFixed(4)) * .005).toFixed(4);
}
