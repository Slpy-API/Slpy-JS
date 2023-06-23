//Copyright 2023, Slpy, all rights reserved.
//Check out https://github.com/Spy-API/Slpy-JS and https://www.slpy.com/legal for licensing and terms
import { addAutocomplete } from "./autocomplete.js";

export function addressAutocomplete(targetInput, autoOptions) {
    if (typeof targetInput === "string") {
      var formTarget = document.getElementById(targetInput);
    } else if (
      targetInput &&
      (target.nodeName.toLowerCase() === "form" ||
        targetInput.nodeName.toLowerCase() === "textarea")
    ) {
      var formTarget = targetInput;
    } else {
      console.log(
        "Target form for address autocomplete is not a valid Form element or id."
      );
    }
    autoOptions["autocompleteType"] = "address";
    if (formTarget.tagName.toLowerCase() === "form") {
      var inputFields = formTarget.querySelectorAll(
        "input[autocomplete], textarea[autocomplete]"
      );
      var formParts = {};
      for (var i = 0; i < inputFields.length; i++) {
        var autoCompleteAttr = inputFields[i].getAttribute("autocomplete");
        if (autoCompleteAttr) {
          var autoSection = "0";
          if (typeof autoCompleteAttr.split(" ")[1] !== "undefined") {
            var lastSpaceIndex = autoCompleteAttr.lastIndexOf(" ");
            autoSection = autoCompleteAttr.slice(0, lastSpaceIndex);
            autoCompleteAttr = autoCompleteAttr.slice(lastSpaceIndex + 1);
            if (typeof formParts[autoSection] === "undefined") {
              formParts[autoSection] = {};
            }
          }
          switch (autoCompleteAttr) {
            case "street-address":
              formParts[autoSection]["street-line"] = inputFields[i];
              break;
            case "address-line1":
              formParts[autoSection]["street-line"] = inputFields[i];
              break;
            case "address-level1":
              formParts[autoSection]["address-level1"] = inputFields[i];
              break;
            case "address-level2":
              formParts[autoSection]["address-level2"] = inputFields[i];
              break;
            case "address-level3":
              formParts[autoSection]["address-level3"] = inputFields[i];
              break;
            case "address-level4":
              formParts[autoSection]["address-level4"] = inputFields[i];
              break;
            case "postal-code":
              formParts[autoSection]["postal-code"] = inputFields[i];
              break;
            case "country":
              formParts[autoSection]["country"] = inputFields[i];
              break;
            case "country-name":
              formParts[autoSection]["country-name"] = inputFields[i];
              break;
            default:
              break;
          }
        }
      }
      var returnUpdates = [];
      for (var autoSectionKey in formParts) {
        if (formParts.hasOwnProperty(autoSectionKey)) {
          if (typeof formParts[autoSectionKey]["street-line"] !== "undefined") {
            if (
              typeof formParts[autoSectionKey]["street-line"].id == "undefined" ||
              formParts[autoSectionKey]["street-line"].id == ""
            ) {
              formParts[autoSectionKey]["street-line"].id =
                "StAuto-" + autoSectionKey;
            }
            (function (autoSectionKey, formParts) {
              var formfill = function formfill(returnInput, selectedItem) {
                returnInput.value = selectedItem["street"];
                for (var autoSectionEle in formParts[autoSectionKey]) {
                  switch (autoSectionEle) {
                    case "address-level1":
                      formParts[autoSectionKey]["address-level1"].value =
                        selectedItem["region"];
                      break;
                    case "address-level2":
                      formParts[autoSectionKey]["address-level2"].value =
                        selectedItem["city"];
                      break;
                    case "postal-code":
                      formParts[autoSectionKey]["postal-code"].value =
                        selectedItem["postcode"];
                      break;
                    case "country":
                      formParts[autoSectionKey]["country"].value =
                        selectedItem["country"];
                      break;
                    case "country-code":
                      formParts[autoSectionKey]["country-code"].value =
                        selectedItem["country-code"];
                      break;
                    default:
                      break;
                  }
                }
              };
              var returnUpdate = addAutocomplete(
                formParts[autoSectionKey]["street-line"].id,
                autoOptions,
                formfill
              );
              if (typeof returnUpdate.updateAutocomplete !== "undefined") {
                returnUpdates.push(returnUpdate);
              }
            })(autoSectionKey, formParts);
          } else {
            console.log(
              "API: An input with autocomplete attribute 'street-address' or 'address-line1' was not found."
            );
          }
        }
      }
      return returnUpdates;
    }
  }