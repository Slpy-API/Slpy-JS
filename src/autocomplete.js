//Copyright 2023, Slpy, all rights reserved.
//Check out https://github.com/Spy-API/Slpy-JS and https://www.slpy.com/legal for licensing and terms

export function addAutocomplete(targetInput, autoOptions, onInputChange) {
    if (typeof targetInput === "string") {
        var inputField = document.getElementById(targetInput);
    } else if (
        targetInput &&
        (targetInput.nodeName.toLowerCase() === "input" ||
            targetInput.nodeName.toLowerCase() === "textarea")
    ) {
        var inputField = targetInput;
    } else {
        console.log("Target input for autocomplete is not a valid element or id");
    }
    var onInputChange = onInputChange === undefined ? "" : onInputChange;
    var autoCountry = "US";
    if (autoOptions["country"] !== undefined) {
        autoCountry = autoOptions["country"].toLowerCase();
    }
    var autoKey = "";
    if (autoOptions["apiKey"] !== undefined) {
        autoKey = autoOptions["apiKey"].toLowerCase();
    }
    var dropdownWidth = inputField.offsetWidth - 6 + "px";
    if (autoOptions["width"] !== undefined) {
        dropdownWidth = autoOptions["width"];
    }
    var offsetLeft = 3;
    if (autoOptions["offsetLeft"] !== undefined) {
        offsetLeft = autoOptions["offsetLeft"];
    }
    var offsetTop = 3;
    if (autoOptions["offsetTop"] !== undefined) {
        offsetTop = autoOptions["offsetTop"];
    }
    var autoCompleteType = "all";
    if (autoOptions["autocompleteType"] !== undefined) {
        autoCompleteType = autoOptions["autocompleteType"].toLowerCase();
    }
    var autoFilter = "";
    if (autoOptions["filter"] !== undefined) {
        autoFilter = "&filter=" + autoOptions["filter"].toLowerCase();
    }
    var resultsLimit = 10;
    if (autoOptions["limit"] !== undefined) {
        autoOptions["limit"] = parseInt(autoOptions["limit"]);
        if (autoOptions["limit"] < 10 && autoOptions["limit"] > 0) {
            resultsLimit = autoOptions["limit"];
        } else {
            console.log("Autocomplete limit is outside of 1-10 range.");
        }
    }
    var debounceTime = 175;
    if (autoOptions["debounceTime"] !== undefined) {
        autoOptions["debounceTime"] = parseInt(autoOptions["debounceTime"]);
        if (autoOptions["debounceTime"] < 1000 && autoOptions["debounceTime"] > 0) {
            debounceTime = autoOptions["debounceTime"];
        } else {
            console.log("Autocomplete debounceTime is outside of 1-1000 range.");
        }
    }
    var listContainer = document.createElement("div");
    listContainer.className = "apiautodropdown-content";
    listContainer.id = "apiautodropdownContent " + inputField.id;
    var insertId = inputField;
    if (typeof autoOptions["insertId"] !== "undefined") {
        var insertId = document.getElementById(autoOptions["insertId"]);
        insertId.appendChild(listContainer);
    } else {
        document.body.appendChild(listContainer);
    }
    function updateListContainerPosition(event) {
        var containerPosition = inputField.parentNode.getBoundingClientRect();
        var inputFieldRectStart = inputField.getBoundingClientRect();
        if (typeof autoOptions["insertId"] !== "undefined") {
            var inputFieldRect = {
                left: inputFieldRectStart.left - containerPosition.left,
                top: inputFieldRectStart.top - containerPosition.top,
                height: inputFieldRectStart.height
            };
        } else {
            var inputFieldRect = inputField.getBoundingClientRect();
        }
        var viewportHeight = window.visualViewport
            ? window.visualViewport.height
            : window.innerHeight;
        if (!event || event.type === "resize") {
            // Set the listContainer's position and dimensions
            listContainer.style.position = "absolute";
            listContainer.style.left =
                inputFieldRect.left + offsetLeft + window.pageXOffset + "px";
            listContainer.style.top =
                inputFieldRect.top +
                inputFieldRect.height +
                window.pageYOffset +
                offsetTop +
                "px";
            listContainer.style.width = dropdownWidth;
        }
        if (!event || event.type === "scroll") {
            var maxHeight = Math.max(
                165,
                viewportHeight -
                inputFieldRectStart.top -
                inputFieldRect.height -
                offsetTop -
                5
            );
            listContainer.style.maxHeight = maxHeight + "px";
        }
    }
    function scrollIfNeeded(element) {
        var rect = element.getBoundingClientRect();
        var windowHeight =
            window.innerHeight || document.documentElement.clientHeight;
        var scrollAmount;
        if (rect.bottom > windowHeight) {
            var elementHeight = rect.height;
            var visibleHeight = windowHeight - rect.top;
            var scrollToHeight = elementHeight < 165 ? elementHeight : 165;
            if (visibleHeight < scrollToHeight) {
                scrollAmount = scrollToHeight - visibleHeight;
                window.scrollBy(0, scrollAmount);
            }
        }
    }
    var lastSelect = 0;
    var lastSearch = "";
    function getClosest(elem, selector) {
        for (; elem && elem !== document; elem = elem.parentNode) {
            if (
                elem.matches ? elem.matches(selector) : elem.msMatchesSelector(selector)
            ) {
                return elem;
            }
        }
        return null;
    }
    function addEvent(element, event, handler, useCapture) {
        if (element.addEventListener) {
            element.addEventListener(event, handler, useCapture);
        } else if (element.attachEvent) {
            element.attachEvent("on" + event, handler);
        }
    }
    function removeEvent(element, eventType, eventHandler, useCapture) {
        if (element.removeEventListener) {
            // Modern browsers
            element.removeEventListener(eventType, eventHandler, useCapture);
        } else if (element.detachEvent) {
            // Internet Explorer 8 and older
            element.detachEvent("on" + eventType, eventHandler);
        }
    }
    addEvent(
        inputField,
        "keydown",
        function (e) {
            lastSelect = 0;
            if (e.keyCode === 40 || e.keyCode == 9) {
                e.preventDefault();
                listContainer.getElementsByClassName("apiautodropdown-item")[0].focus();
            } else if (e.keyCode == 13) {
                listContainer.classList.remove("apiautodropdown-content-show");
                removeEvent(window, "resize", updateListContainerPosition, false);
                removeEvent(window, "scroll", updateListContainerPosition, false);
            }
        },
        false
    );
    addEvent(
        listContainer,
        "keydown",
        function (e) {
            if (e.keyCode === 40 || e.keyCode == 9) {
                e.preventDefault();
                if (
                    typeof listContainer.getElementsByClassName("apiautodropdown-item")[
                    lastSelect + 1
                    ] !== "undefined"
                ) {
                    lastSelect++;
                    listContainer
                        .getElementsByClassName("apiautodropdown-item")
                    [lastSelect].focus();
                }
            }
            if (e.keyCode === 38) {
                e.preventDefault();
                if (lastSelect > 0) {
                    lastSelect--;
                } else {
                    setTimeout(function () {
                        inputField.focus();
                    }, 10);
                }
                listContainer
                    .getElementsByClassName("apiautodropdown-item")
                [lastSelect].focus();
            }
        },
        false
    );
    function createCORSRequest(method, url) {
        var xhr = new XMLHttpRequest();

        // Check if the XMLHttpRequest object has the withCredentials property
        // (not present in older versions of IE)
        if ("withCredentials" in xhr) {
            xhr.open(method, url, true);
        }
        // Check if XDomainRequest is available (IE9)
        else if (typeof XDomainRequest != "undefined") {
            xhr = new XDomainRequest();
            xhr.open(method, url);
        }
        else {
            // CORS not supported
            xhr = null;
        }
        return xhr;
    }
    var currentRequest = null;
    function makeRequest(url, callback) {
        if (currentRequest) {
            currentRequest.abort();
        }
        var xhr = createCORSRequest("POST", url);
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    var obj = JSON.parse(xhr.responseText);
                    callback(obj);
                }
                currentRequest = null;
            }
        };
        currentRequest = xhr;
        xhr.send();
    }
    var resultsObj = {};
    function updateGlobalObj(obj) {
        resultsObj = obj;
    }
    function handleInput(e) {
        if (e.keyCode === 13) {
            if (listContainer.classList.contains("apiautodropdown-content-show")) {
                listContainer.classList.remove("apiautodropdown-content-show");
            }
            return;
        }
        if (e.keyCode === 9) {
            return;
        }
        var query = inputField.value.toLowerCase();
        if (query.length > 1) {
            if (query !== lastSearch + " " && query !== lastSearch) {
                var processDropdown = function processDropdown(obj) {
                    if (Object.keys(obj).length > 0) {
                        var hasResults = false;
                        if (
                            typeof obj[0] !== "undefined" &&
                            typeof obj[0].focus !== "undefined"
                        ) {
                            hasResults = true;
                            listContainer.innerHTML = "";
                        }
                        Object.keys(obj).forEach(function (key) {
                            if (
                                typeof obj[key] !== "undefined" &&
                                typeof obj[key].focus !== "undefined" &&
                                key < resultsLimit
                            ) {
                                var ele = document.createElement("button");
                                ele.className = "apiautodropdown-item";
                                ele.type = "button";
                                var objIcon =
                                    '<svg xmlns="http://www.w3.org/2000/svg" class="apiautodropdown-icon" width="17px" height="13px" viewBox="0 0 448 512"><!-- Font Awesome Pro 5.15.4 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) -->';
                                switch (obj[key].quality) {
                                    case 6:
                                        objIcon =
                                            objIcon +
                                            '<path d="M436 480h-20V24c0-13.255-10.745-24-24-24H56C42.745 0 32 10.745 32 24v456H12c-6.627 0-12 5.373-12 12v20h448v-20c0-6.627-5.373-12-12-12zM128 76c0-6.627 5.373-12 12-12h40c6.627 0 12 5.373 12 12v40c0 6.627-5.373 12-12 12h-40c-6.627 0-12-5.373-12-12V76zm0 96c0-6.627 5.373-12 12-12h40c6.627 0 12 5.373 12 12v40c0 6.627-5.373 12-12 12h-40c-6.627 0-12-5.373-12-12v-40zm52 148h-40c-6.627 0-12-5.373-12-12v-40c0-6.627 5.373-12 12-12h40c6.627 0 12 5.373 12 12v40c0 6.627-5.373 12-12 12zm76 160h-64v-84c0-6.627 5.373-12 12-12h40c6.627 0 12 5.373 12 12v84zm64-172c0 6.627-5.373 12-12 12h-40c-6.627 0-12-5.373-12-12v-40c0-6.627 5.373-12 12-12h40c6.627 0 12 5.373 12 12v40zm0-96c0 6.627-5.373 12-12 12h-40c-6.627 0-12-5.373-12-12v-40c0-6.627 5.373-12 12-12h40c6.627 0 12 5.373 12 12v40zm0-96c0 6.627-5.373 12-12 12h-40c-6.627 0-12-5.373-12-12V76c0-6.627 5.373-12 12-12h40c6.627 0 12 5.373 12 12v40z"/></svg>';
                                        break;
                                    case 5:
                                        objIcon =
                                            objIcon +
                                            '<path d="M502.3 190.8c3.9-3.1 9.7-.2 9.7 4.7V400c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V195.6c0-5 5.7-7.8 9.7-4.7 22.4 17.4 52.1 39.5 154.1 113.6 21.1 15.4 56.7 47.8 92.2 47.6 35.7.3 72-32.8 92.3-47.6 102-74.1 131.6-96.3 154-113.7zM256 320c23.2.4 56.6-29.2 73.4-41.4 132.7-96.3 142.8-104.7 173.4-128.7 5.8-4.5 9.2-11.5 9.2-18.9v-19c0-26.5-21.5-48-48-48H48C21.5 64 0 85.5 0 112v19c0 7.4 3.4 14.3 9.2 18.9 30.6 23.9 40.7 32.4 173.4 128.7 16.8 12.2 50.2 41.8 73.4 41.4z"/></svg>';
                                        break;
                                    case 4:
                                        objIcon =
                                            objIcon +
                                            '<path d="M616 192H480V24c0-13.26-10.74-24-24-24H312c-13.26 0-24 10.74-24 24v72h-64V16c0-8.84-7.16-16-16-16h-16c-8.84 0-16 7.16-16 16v80h-64V16c0-8.84-7.16-16-16-16H80c-8.84 0-16 7.16-16 16v80H24c-13.26 0-24 10.74-24 24v360c0 17.67 14.33 32 32 32h576c17.67 0 32-14.33 32-32V216c0-13.26-10.75-24-24-24zM128 404c0 6.63-5.37 12-12 12H76c-6.63 0-12-5.37-12-12v-40c0-6.63 5.37-12 12-12h40c6.63 0 12 5.37 12 12v40zm0-96c0 6.63-5.37 12-12 12H76c-6.63 0-12-5.37-12-12v-40c0-6.63 5.37-12 12-12h40c6.63 0 12 5.37 12 12v40zm0-96c0 6.63-5.37 12-12 12H76c-6.63 0-12-5.37-12-12v-40c0-6.63 5.37-12 12-12h40c6.63 0 12 5.37 12 12v40zm128 192c0 6.63-5.37 12-12 12h-40c-6.63 0-12-5.37-12-12v-40c0-6.63 5.37-12 12-12h40c6.63 0 12 5.37 12 12v40zm0-96c0 6.63-5.37 12-12 12h-40c-6.63 0-12-5.37-12-12v-40c0-6.63 5.37-12 12-12h40c6.63 0 12 5.37 12 12v40zm0-96c0 6.63-5.37 12-12 12h-40c-6.63 0-12-5.37-12-12v-40c0-6.63 5.37-12 12-12h40c6.63 0 12 5.37 12 12v40zm160 96c0 6.63-5.37 12-12 12h-40c-6.63 0-12-5.37-12-12v-40c0-6.63 5.37-12 12-12h40c6.63 0 12 5.37 12 12v40zm0-96c0 6.63-5.37 12-12 12h-40c-6.63 0-12-5.37-12-12v-40c0-6.63 5.37-12 12-12h40c6.63 0 12 5.37 12 12v40zm0-96c0 6.63-5.37 12-12 12h-40c-6.63 0-12-5.37-12-12V76c0-6.63 5.37-12 12-12h40c6.63 0 12 5.37 12 12v40zm160 288c0 6.63-5.37 12-12 12h-40c-6.63 0-12-5.37-12-12v-40c0-6.63 5.37-12 12-12h40c6.63 0 12 5.37 12 12v40zm0-96c0 6.63-5.37 12-12 12h-40c-6.63 0-12-5.37-12-12v-40c0-6.63 5.37-12 12-12h40c6.63 0 12 5.37 12 12v40z"/></svg>';
                                        break;
                                    case 3:
                                        objIcon =
                                            objIcon +
                                            '<path d="M256 336h-.02c0-16.18 1.34-8.73-85.05-181.51-17.65-35.29-68.19-35.36-85.87 0C-2.06 328.75.02 320.33.02 336H0c0 44.18 57.31 80 128 80s128-35.82 128-80zM128 176l72 144H56l72-144zm511.98 160c0-16.18 1.34-8.73-85.05-181.51-17.65-35.29-68.19-35.36-85.87 0-87.12 174.26-85.04 165.84-85.04 181.51H384c0 44.18 57.31 80 128 80s128-35.82 128-80h-.02zM440 320l72-144 72 144H440zm88 128H352V153.25c23.51-10.29 41.16-31.48 46.39-57.25H528c8.84 0 16-7.16 16-16V48c0-8.84-7.16-16-16-16H383.64C369.04 12.68 346.09 0 320 0s-49.04 12.68-63.64 32H112c-8.84 0-16 7.16-16 16v32c0 8.84 7.16 16 16 16h129.61c5.23 25.76 22.87 46.96 46.39 57.25V448H112c-8.84 0-16 7.16-16 16v32c0 8.84 7.16 16 16 16h416c8.84 0 16-7.16 16-16v-32c0-8.84-7.16-16-16-16z"/></svg>';
                                        break;
                                    case 2:
                                        objIcon =
                                            objIcon +
                                            '<path d="M496 128v16a8 8 0 0 1-8 8h-24v12c0 6.627-5.373 12-12 12H60c-6.627 0-12-5.373-12-12v-12H24a8 8 0 0 1-8-8v-16a8 8 0 0 1 4.941-7.392l232-88a7.996 7.996 0 0 1 6.118 0l232 88A8 8 0 0 1 496 128zm-24 304H40c-13.255 0-24 10.745-24 24v16a8 8 0 0 0 8 8h464a8 8 0 0 0 8-8v-16c0-13.255-10.745-24-24-24zM96 192v192H60c-6.627 0-12 5.373-12 12v20h416v-20c0-6.627-5.373-12-12-12h-36V192h-64v192h-64V192h-64v192h-64V192H96z"/></svg>';
                                        break;
                                    case 1:
                                        objIcon =
                                            objIcon +
                                            '<path d="M248 8C111.03 8 0 119.03 0 256s111.03 248 248 248 248-111.03 248-248S384.97 8 248 8zm82.29 357.6c-3.9 3.88-7.99 7.95-11.31 11.28-2.99 3-5.1 6.7-6.17 10.71-1.51 5.66-2.73 11.38-4.77 16.87l-17.39 46.85c-13.76 3-28 4.69-42.65 4.69v-27.38c1.69-12.62-7.64-36.26-22.63-51.25-6-6-9.37-14.14-9.37-22.63v-32.01c0-11.64-6.27-22.34-16.46-27.97-14.37-7.95-34.81-19.06-48.81-26.11-11.48-5.78-22.1-13.14-31.65-21.75l-.8-.72a114.792 114.792 0 0 1-18.06-20.74c-9.38-13.77-24.66-36.42-34.59-51.14 20.47-45.5 57.36-82.04 103.2-101.89l24.01 12.01C203.48 89.74 216 82.01 216 70.11v-11.3c7.99-1.29 16.12-2.11 24.39-2.42l28.3 28.3c6.25 6.25 6.25 16.38 0 22.63L264 112l-10.34 10.34c-3.12 3.12-3.12 8.19 0 11.31l4.69 4.69c3.12 3.12 3.12 8.19 0 11.31l-8 8a8.008 8.008 0 0 1-5.66 2.34h-8.99c-2.08 0-4.08.81-5.58 2.27l-9.92 9.65a8.008 8.008 0 0 0-1.58 9.31l15.59 31.19c2.66 5.32-1.21 11.58-7.15 11.58h-5.64c-1.93 0-3.79-.7-5.24-1.96l-9.28-8.06a16.017 16.017 0 0 0-15.55-3.1l-31.17 10.39a11.95 11.95 0 0 0-8.17 11.34c0 4.53 2.56 8.66 6.61 10.69l11.08 5.54c9.41 4.71 19.79 7.16 30.31 7.16s22.59 27.29 32 32h66.75c8.49 0 16.62 3.37 22.63 9.37l13.69 13.69a30.503 30.503 0 0 1 8.93 21.57 46.536 46.536 0 0 1-13.72 32.98zM417 274.25c-5.79-1.45-10.84-5-14.15-9.97l-17.98-26.97a23.97 23.97 0 0 1 0-26.62l19.59-29.38c2.32-3.47 5.5-6.29 9.24-8.15l12.98-6.49C440.2 193.59 448 223.87 448 256c0 8.67-.74 17.16-1.82 25.54L417 274.25z"/></svg>';
                                        break;
                                    default:
                                        objIcon =
                                            objIcon +
                                            '<path d="M280.37 148.26L96 300.11V464a16 16 0 0 0 16 16l112.06-.29a16 16 0 0 0 15.92-16V368a16 16 0 0 1 16-16h64a16 16 0 0 1 16 16v95.64a16 16 0 0 0 16 16.05L464 480a16 16 0 0 0 16-16V300L295.67 148.26a12.19 12.19 0 0 0-15.3 0zM571.6 251.47L488 182.56V44.05a12 12 0 0 0-12-12h-56a12 12 0 0 0-12 12v72.61L318.47 43a48 48 0 0 0-61 0L4.34 251.47a12 12 0 0 0-1.6 16.9l25.5 31A12 12 0 0 0 45.15 301l235.22-193.74a12.19 12.19 0 0 1 15.3 0L530.9 301a12 12 0 0 0 16.9-1.6l25.5-31a12 12 0 0 0-1.7-16.93z"/></svg>';
                                        break;
                                }
                                if (obj[key].focus.indexOf(",") > -1) {
                                    ele.innerHTML =
                                        objIcon +
                                        '<div class="apiautodropdown-text">' +
                                        obj[key].focus.replace(
                                            ",",
                                            '<span class="apiautodropdown-muted">,'
                                        ) +
                                        "</span></div>";
                                } else {
                                    ele.innerHTML =
                                        objIcon +
                                        '<div class="apiautodropdown-text">' +
                                        obj[key].focus +
                                        "</div>";
                                }
                                ele.setAttribute("autocompleteID", key);
                                listContainer.appendChild(ele);
                            }
                        });
                        if (hasResults) {
                            var poweredByLabel = document.createElement("div");
                            listContainer.appendChild(poweredByLabel);
                            poweredByLabel.innerHTML =
                                '<a href="https://www.slpy.com" style="color:#888f94; text-decoration:none;">powered by <span style="color:#5e849f;font-size:13px">Slpy</a>';
                            poweredByLabel.setAttribute(
                                "style",
                                "line-height:13px; font-size: 12px; padding:2px 10px 0px 0px; margin: 0px; text-align:right"
                            );
                            if (
                                !listContainer.classList.contains(
                                    "apiautodropdown-content-show"
                                )
                            ) {
                                listContainer.classList.add("apiautodropdown-content-show");
                                updateListContainerPosition();
                                addEvent(window, "resize", updateListContainerPosition, false);
                                addEvent(window, "scroll", updateListContainerPosition, false);
                                scrollIfNeeded(listContainer);
                            }
                        }
                    } else {
                        if (
                            listContainer.classList.contains("apiautodropdown-content-show")
                        ) {
                            listContainer.classList.remove("apiautodropdown-content-show");
                            removeEvent(window, "resize", updateListContainerPosition, false);
                            removeEvent(window, "scroll", updateListContainerPosition, false);
                        }
                    }
                };
                lastSearch = query;
                lastSelect = 0;
                if (autoCompleteType == "all") {
                    makeRequest(
                        "https://api.slpy.com/v1/search?autocomplete=admin" +
                        autoFilter +
                        "&country=" +
                        autoCountry +
                        "&key=" +
                        autoKey +
                        "&search=" +
                        query,
                        function (obj) {
                            if (Object.keys(obj).length < resultsLimit) {
                                makeRequest(
                                    "https://api.slpy.com/v1/search?autocomplete=address&country=" +
                                    autoCountry +
                                    "&key=" +
                                    autoKey +
                                    "&search=" +
                                    query,
                                    function (response) {
                                        if (
                                            typeof obj[0] === "undefined" ||
                                            typeof obj[0].focus === "undefined" ||
                                            obj[0].focus === ""
                                        ) {
                                            obj = response;
                                        } else {
                                            if (
                                                typeof response[0].focus !== "undefined" &&
                                                response[0].focus !== ""
                                            ) {
                                                var obj1Length = Object.keys(obj).filter(function (
                                                    key
                                                ) {
                                                    return (
                                                        !isNaN(parseInt(key, resultsLimit)) &&
                                                        key === String(parseInt(key, resultsLimit))
                                                    );
                                                }).length;
                                                for (var key in response) {
                                                    if (
                                                        Object.prototype.hasOwnProperty.call(response, key)
                                                    ) {
                                                        var newKey =
                                                            parseInt(key, resultsLimit) + obj1Length;
                                                        if (newKey < resultsLimit) {
                                                            obj[newKey] = response[key];
                                                        } else {
                                                            break;
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                        processDropdown(obj);
                                        updateGlobalObj(obj);
                                    }
                                );
                            } else {
                                processDropdown(obj);
                                updateGlobalObj(obj);
                            }
                        }
                    );
                } else {
                    var url;
                    if (autoCompleteType == "admin") {
                        url =
                            "https://api.slpy.com/v1/search?autocomplete=admin" +
                            autoFilter +
                            "&country=" +
                            autoCountry +
                            "&key=" +
                            autoKey +
                            "&search=" +
                            query;
                    } else {
                        url =
                            "https://api.slpy.com/v1/search?autocomplete=address&country=" +
                            autoCountry +
                            "&key=" +
                            autoKey +
                            "&search=" +
                            query;
                    }
                    makeRequest(url, function (obj) {
                        processDropdown(obj);
                        updateGlobalObj(obj);
                    });
                }
            }
        } else {
            if (listContainer.classList.contains("apiautodropdown-content-show")) {
                listContainer.classList.remove("apiautodropdown-content-show");
                removeEvent(window, "resize", updateListContainerPosition, false);
                removeEvent(window, "scroll", updateListContainerPosition, false);
            }
        }
    }
    function debounce(func, timeout) {
        if (timeout === undefined) {
            timeout = 175;
        }
        var timer;
        return function () {
            clearTimeout(timer);
            var args = Array.prototype.slice.call(arguments);
            timer = setTimeout(
                function () {
                    func.apply(this, args);
                }.bind(this),
                timeout
            );
        };
    }
    var debouncedInput = debounce(handleInput, debounceTime);
    addEvent(inputField, "input", debouncedInput, false);
    var dragging = false;
    addEvent(
        listContainer,
        "touchstart",
        function (event) {
            if (
                event.currentTarget.getAttribute("id") ==
                "apiautodropdownContent " + inputField.id
            ) {
                dragging = false;
            }
        },
        false
    );
    addEvent(
        listContainer,
        "touchmove",
        function (event) {
            if (
                event.currentTarget.getAttribute("id") ==
                "apiautodropdownContent " + inputField.id
            ) {
                dragging = true;
            }
        },
        false
    );
    function handleClickOutside(event) {
        if (!listContainer.contains(event.target) && event.target !== inputField) {
            listContainer.classList.remove("apiautodropdown-content-show");
            removeEvent(window, "resize", updateListContainerPosition, false);
            removeEvent(window, "scroll", updateListContainerPosition, false);
        }
    }
    addEvent(document, "click", handleClickOutside, true);
    addEvent(document, "touchend", handleClickOutside, true);
    function handlerDropdownItemClick(targetInput, listContainer) {
        return function (event) {
            var dropdownItem = getClosest(event.target, ".apiautodropdown-item");
            if (dropdownItem) {
                if (dragging) {
                    return;
                }
                if (document.activeElement !== dropdownItem) {
                    dropdownItem.focus();
                }
                var txt = dropdownItem.textContent.trim();
                lastSearch = txt.toLowerCase();
                targetInput.value = txt;
                listContainer.classList.remove("apiautodropdown-content-show");
                removeEvent(window, "resize", updateListContainerPosition, false);
                removeEvent(window, "scroll", updateListContainerPosition, false);
                var selectedObj = dropdownItem.getAttribute("autocompleteID");

                //do extra stuff
                if (typeof onInputChange === "function") {
                    onInputChange(inputField, resultsObj[selectedObj]);
                }
            } else if (event.target.getAttribute("id") != targetInput.id) {
                listContainer.classList.remove("apiautodropdown-content-show");
                removeEvent(window, "resize", updateListContainerPosition, false);
                removeEvent(window, "scroll", updateListContainerPosition, false);
            }
        };
    }
    var handleDropdownItemClick = handlerDropdownItemClick(
        inputField,
        listContainer
    );
    addEvent(listContainer, "click", handleDropdownItemClick, true);
    addEvent(listContainer, "touchend", handleDropdownItemClick, true);
    function updateAutocomplete(newOptions) {
        if (newOptions["country"] !== undefined) {
            autoCountry = newOptions["country"].toLowerCase();
        }
        if (newOptions["autocomplete"] !== undefined) {
            autoCompleteType = newOptions["autocomplete"].toLowerCase();
        }
        if (newOptions["filter"] !== undefined) {
            autoFilter = "&filter=" + newOptions["filter"].toLowerCase();
        }
        removeEvent(inputField, "input", debouncedInput, false);
        addEvent(inputField, "input", debouncedInput, false);
    }
    return {
        updateAutocomplete: updateAutocomplete
    };
}