# Examples

## Install

```
yarn add ChaerilM/jquery-typeahead
```

## Setup
``` html

<form>
    <div class="typeahead__container">
        <div class="typeahead__field">
            <div class="typeahead__query">
                <input class="js-typeahead" name="q" autocomplete="off">
            </div>
            <div class="typeahead__button">
                <button type="submit">
                    <span class="typeahead__search-icon"></span>
                </button>
            </div>
        </div>
    </div>
</form>

<script>

$('.js-typeahead').typeahead({
    order: "asc",
    source: {
        groupName: {
            // Array of Objects / Strings
            data: [ {...}, {...} ]
        }
    },
    callback: {
        onInit: function () { ... }
    }
});
</script>
```

## Config

``` javascript

/**
 * @private
 * Default options
 */
var _options = {
    input: null,                // *RECOMMENDED*, jQuery selector to reach Typeahead's input for initialization
    minLength: 2,               // Accepts 0 to search on focus, minimum character length to perform a search
    maxLength: false,           // False as "Infinity" will not put character length restriction for searching results
    maxItem: 8,                 // Accepts 0 / false as "Infinity" meaning all the results will be displayed
    dynamic: false,             // When true, Typeahead will get a new dataset from the source option on every key press
    delay: 300,                 // delay in ms when dynamic option is set to true
    order: null,                // "asc" or "desc" to sort results
    offset: false,              // Set to true to match items starting from their first character
    hint: false,                // Added support for excessive "space" characters
    accent: false,              // Will allow to type accent and give letter equivalent results, also can define a custom replacement object
    highlight: true,            // Added "any" to highlight any word in the template, by default true will only highlight display keys
    multiselect: null,          // Multiselect configuration object, see documentation for all options
    group: false,               // Improved feature, Boolean,string,object(key, template (string, function))
    groupOrder: null,           // New feature, order groups "asc", "desc", Array, Function
    maxItemPerGroup: null,      // Maximum number of result per Group
    dropdownFilter: false,      // Take group options string and create a dropdown filter
    dynamicFilter: null,        // Filter the typeahead results based on dynamic value, Ex: Players based on TeamID
    backdrop: false,            // Add a backdrop behind Typeahead results
    backdropOnFocus: false,     // Display the backdrop option as the Typeahead input is :focused
    cache: false,               // Improved option, true OR 'localStorage' OR 'sessionStorage'
    ttl: 3600000,               // Cache time to live in ms
    compression: false,         // Requires LZString library
    searchOnFocus: false,       // Display search results on input focus
    blurOnTab: true,            // Blur Typeahead when Tab key is pressed, if false Tab will go though search results
    resultContainer: null,      // List the results inside any container string or jQuery object
    generateOnLoad: null,       // Forces the source to be generated on page load even if the input is not focused!
    mustSelectItem: false,      // The submit function only gets called if an item is selected
    href: null,                 // String or Function to format the url for right-click & open in new tab on link results
    display: ["display"],       // Allows search in multiple item keys ["display1", "display2"]
    template: null,             // Display template of each of the result list
    templateValue: null,        // Set the input value template when an item is clicked
    groupTemplate: null,        // Set a custom template for the groups
    correlativeTemplate: false, // Compile display keys, enables multiple key search from the template string
    emptyTemplate: false,       // Display an empty template if no result
    cancelButton: true,         // If text is detected in the input, a cancel button will be available to reset the input (pressing ESC also cancels)
    loadingAnimation: true,     // Display a loading animation when typeahead is doing request / searching for results
    asyncResult: false,         // If set to true, the search results will be displayed as they are beging received from the requests / async data function
    filter: true,               // Set to false or function to bypass Typeahead filtering. WARNING: accent, correlativeTemplate, offset & matcher will not be interpreted
    matcher: null,              // Add an extra filtering function after the typeahead functions
    source: null,               // Source of data for Typeahead to filter
    callback: {
        onInit: null,               // When Typeahead is first initialized (happens only once)
        onReady: null,              // When the Typeahead initial preparation is completed
        onShowLayout: null,         // Called when the layout is shown
        onHideLayout: null,         // Called when the layout is hidden
        onSearch: null,             // When data is being fetched & analyzed to give search results
        onResult: null,             // When the result container is displayed
        onLayoutBuiltBefore: null,  // When the result HTML is build, modify it before it get showed
        onLayoutBuiltAfter: null,   // Modify the dom right after the results gets inserted in the result container
        onNavigateBefore: null,     // When a key is pressed to navigate the results, before the navigation happens
        onNavigateAfter: null,      // When a key is pressed to navigate the results
        onEnter: null,              // When an item in the result list is focused
        onLeave: null,              // When an item in the result list is blurred
        onClickBefore: null,        // Possibility to e.preventDefault() to prevent the Typeahead behaviors
        onClickAfter: null,         // Happens after the default clicked behaviors has been executed
        onDropdownFilter: null,     // When the dropdownFilter is changed, trigger this callback
        onSendRequest: null,        // Gets called when the Ajax request(s) are sent
        onReceiveRequest: null,     // Gets called when the Ajax request(s) are all received
        onPopulateSource: null,     // Perform operation on the source data before it gets in Typeahead data
        onCacheSave: null,          // Perform operation on the source data before it gets in Typeahead cache
        onSubmit: null,             // When Typeahead form is submitted
        onCancel: null              // Triggered if the typeahead had text inside and is cleared
    },
    selector: {
        container: "typeahead__container",
        result: "typeahead__result",
        list: "typeahead__list",
        group: "typeahead__group",
        item: "typeahead__item",
        empty: "typeahead__empty",
        display: "typeahead__display",
        query: "typeahead__query",
        filter: "typeahead__filter",
        filterButton: "typeahead__filter-button",
        dropdown: "typeahead__dropdown",
        dropdownItem: "typeahead__dropdown-item",
        labelContainer: "typeahead__label-container",
        label: "typeahead__label",
        button: "typeahead__button",
        backdrop: "typeahead__backdrop",
        hint: "typeahead__hint",
        cancelButton: "typeahead__cancel-button"
    },
    debug: false // Display debug information (RECOMMENDED for dev environment)
};

```
