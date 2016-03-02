# jQuery Typeahead

The jQuery Typeahead plugin provides autocomplete preview on search inputs similar to google search with builtin options and deep customization.
It is a simple clientside library that will improve the user experience on your website search input!

The jQuery Typeahead plugin is released under the MIT License.

The complete documentation, demo and further instructions can be found at www.runningcoder.org

## Documentation

You can find the complete documentation on www.runningcoder.org/jquerytypeahead/documentation/

### Installation
Install with bower the latest Typeahead version

	$ bower install jquery-typeahead

----------
### Initialization

```javascript
$.typeahead({
	input: "#search", // Setting the input selector here
	order: "asc",
	source: {
		groupName: {
			url: [ ... ]
		}
	},
	callback: {
		onClickBefore: function () { ... }
	}
});
```

----------
### HTML Structure and CSS
The Typeahead plugin requires a specific HTML structure

```html
<form>
    <div class="typeahead-container">
        <div class="typeahead-field">

            <span class="typeahead-query">
                <input id="q"
                       name="q"
                       type="search"
                       autocomplete="off">
            </span>
            <span class="typeahead-button">
                <button type="submit">
                    <span class="typeahead-search-icon"></span>
                </button>
            </span>

        </div>
    </div>
</form>
```

----------
### Configuration
The user's configuration object will be merged with the default plugin configuration.

| **Option** | **Type** | **Description** |
|:----------:|:-----------------------:|:------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------:|
| input | {string} *\[optional\]* | The jQuery input selector is only required if the Typeahead was initialized without a jQuery object. In that case, if no input is found, the Typeahead is dropped. |
| minLength | {numeric} | **2** *(default)* <br> The number of characters typed inside the search input before searching for results. It is possible to set this option to 0 and combine it with `searchOnFocus: true` to display a set of results by default. |
| maxItem | {numeric} | **8** *(default)* <br> The maximum number of search results that will appear inside the list. Set 0 to display ALL search results. It is possible to combine `maxItem` with `maxItemPerGroup` to get different results. |
| dynamic<br>*(Advanced)* | {boolean} | **false** *(default)* <br> By default, the typeahead will only load once the source data. Although you can change this behavior and request the data to be re-loaded on every "input" event (similar to keypress).<br>* Note that you can modify the Ajax request to send the query with `{{query}}` modifier. |
| delay | {numeric} | **300** *(default)* <br> If `dynamic: true`, the delay (in milliseconds) will add a timer to prevent from sending a request on every key typed. Instead the request(s) will be sent once the delay expires. |
| order | {null\|string} | **null** *(default)* <br> Takes the default order in which the data was given. If `asc` or `desc` is set, they results will re-order based on display key. <br> **asc** or **desc** <br> Reorder the result ascending / descending |
| offset | {boolean} | **false** *(default)* <br> The position of the matched query can be anywhere inside the result string. <br> **true** <br> The query can only be match if the result string starts by the query characters.|
| hint | {boolean\|object} | **false** *(default)* <br> No hint is activated <br> **true or CSS object** <br> A suggestion text will appear if there is an item inside the result list that starts by the user query, also pressing the right arrow at the end of the search input text will autocomplete the query with the suggested hint and call `callback.onClickBefore` with the selected item. |
| accent | {boolean\|object} | **false** *(default)* <br> If enabled, the query and search results will ignore accents `ãàáäâẽèéëêìíïîõòóöôùúüûñç` and display every matches regardless of the punctuation. Ex: é = e, À = a, etc. <br> It is possible to set a custom accent object, by simply setting `from` and `to` keys <br> * Using this option on large data sets (10,000+ items) might impact your search performances. |
| highlight | {boolean\|string} | **true** *(default)* <br> The search result(s) will receive the `<strong>` HTML tag around the matched query. If set to `true`, only the display keys will be highlighted <br> **any** <br> If set to "any", any string within the template will be highlighted. |
| group | {boolean\|string\|array} | **false** *(default)* <br> **true** <br> The results will grouped by the group name specified inside source. <br> **string** <br>  the results will be grouped by the corresponding object key. <br> Ex: `group: "conference"` will group the hockey teams by "Western" and "Eastern" conferences in [hockey_v1](http://www.runningcoder.org/jquerytypeahead/demo/#form-hockey_v1) demo <br> **array** <br> [0]: Grouping key; [1]: Grouping display in the result list (custom header text) |
| groupOrder | {string\|array\|function} | **null** *(default)* <br> By default, the groups will be output in the same order as they are defined in source option. <br> **asc** or **desc** <br> Reorder the groups ascending / descending <br> **array** Set an Array to specify the group order to appear in the search result <br> **function** <br> Set a Function that returns an Array |
| maxItemPerGroup | {number} | **false** *(default)* <br> Set a maximum results per group if `group: true` is enabled. |
| dropdownFilter<br>*(Advanced)* | {boolean,string,array} | **false** *(default)* <br> **string** <br> A dropdown filter will be created between the search input and the search submit button using the `source.group` as indexes. The string value will appear at the end of the dropdown and will filter through all the sources. <br> **Array of objects** <br> The dropdownFilter will be built based on it. It is then possible to create filters based on item matching key:value. Use the "*" value to reset filtering, see [hockey_v1](http://www.runningcoder.org/jquerytypeahead/demo/#form-hockey_v1) demo |
| dynamicFilter<br>*(Advanced)* | {array} | **false** *(default)* <br> **array of objects** <br> If filters objects are defined, the Typeahead source data will be filtered based on the "selected" / "checked" checkboxes, radios and selects based on "OR" and "AND" filtering similar to database queries. <br> `selector` is the jquery selector to reach the unique input type "checkbox", "radio" or select tag <br> `key` the object key that will be filtered, you can use "dot" notation to reach deep object properties, but in that case extra processing will be performed. Ex `object.key.is.deep` <br> `\|` key prefix means "OR" filtering, the object key CAN match the value <br> `&` key prefix means "AND" filtering, the object key HAS to match the value <br> See [game_v3](http://www.runningcoder.org/jquerytypeahead/demo/#form-game_v3) demo |
| backdrop | {boolean\|object} | **false** *(default)* <br> **true** <br> html will be added to add a backdrop under the search input and results. <br> **object** <br> It is possible to override the css options by passing an object to this option. |
| backdropOnFocus | {boolean} | **false** *(default)* <br> **true** <br>  As soon as the Typeahead input is focused, the `backdrop` option will be displayed regardless. |
| cache<br>*(Recommended)* | {boolean,string} | **false** *(default)* <br> **true** or **localstorage** <br> The source data will be stored in localStorage. <br> **sessionStorage** <br> The source data will be stored in sessionStorage. <br> * This option can't be combined with `dynamic: true` |
| ttl | {numeric} | **3600000** (1 hour) *(default)* <br> * This is a `cache` configuration, it sets the storage time to live in milliseconds. |
| compression | {boolean} | **false** *(default)* <br> Enabling this option will compress the data inside Localstorage / SessionStorage. <br> Setting `compression: true` requires `cache: true` option to be enabled and `LZString` library.  |
| searchOnFocus | {boolean} | **false** *(default)* <br> If enabled, the typeahead will display results (if any) on input focus. You can combine this option with the input attribute "autofocus" to display results when the page is loaded. |
| resultContainer | {jquery selector\|false} | **null** *(default)* <br> If a jQuery string selector or jQuery object is specified, the typeahead results will appear in that container instead of the default one. <br> **false** The HTML result list will not be built. Use this option for filtering "already on page" HTML list elements with show / hide. |
| generateOnLoad | {boolean} | **null** *(default)* <br> If enabled, the source data will be generated (doing Ajax request and preparing to data to be searched) on page load instead of waiting for the input to be focused. <br> * This option does not work well with `dynamic: true` unless some other configuration is adjusted. |
| mustSelectItem | {boolean} | **false** *(default)* <br> If enabled, an item will HAVE TO be selected in order to submit the form. Use this option if you want to restrict searching to your data set only. |
| href | {string\|function} | **null** *(default)* <br> **string** <br> every result item will receive the string as href attribute replacing any `{{itemKey}}` by the item's value. It is possible to apply an extra operation of "slugify" on the value `{{url|slugify}}`. <br> * If this options is used, an "href" key will be added to every objects to be re-used inside the callbacks. <br> If a function is defined, the function will be given the item as the first param. It is then for you to build a returned string as the item's href. |
| display<br>*(Advanced)* | {array} | **["display"]** *(default)* <br> The key that will be searched for typeahead matching results inside source objects. It is possible to search through multiple keys by simply adding them inside the configuration array. |
| template | {string\|function} | **null** *(default)* <br> The template is a HTML string containing keys that will replaced by match results object keys. You MUST use `{{variable}}` delimiters for your string to be replaced. <br> You can also reach multi-level deep object properties using regular "." format, `{{variable.secordlevel.thirdlevel}}` <br> If you need to print the item values inside HTML data attributes, it is possible to use `{{variable\|raw}}`. That optional modifier will make sure to get the unmodified value. <br> **function(query, item)** <br> return a template string with ``{{variable}}`` keys |
| emptyTemplate | {string\|function} | **false** *(default)* <br> In case there are no results to be displayed, a row will be displayed containing this template. It is possible to display the query using `{{query}}` string. |
| correlativeTemplate | {boolean\|array} | **false** *(default)* <br> By default, search text matching is reserved to `display` keys. A searched text can't match multiple keys. <br> If the option is enabled with `true` or `array` of display keys, every item will receive an additional key called `compiled`. This key will then be searched first (using soften matching mechanism) for any matching results, then the `display` keys will be searched (using a "string perfect" matching mechanism). <br> If the option is set to `true`, the `template` option will be compiled into the "compiled" item key. The search mechanism will be soften to match any word, anywhere separated by spaces. <br> It is also possible to set an Array of display keys instead of the complete template |
| filter | {boolean\|function} | **true** *(default)* <br> **false** <br> Typeahead will skip any kind of filtering. This option is useful if you already filter the results in Backend. <br> **function** <br> every element will be filtered using this custom rule. `return undefined` to skip to next item, `return false` to attempt the matching function on the next displayKey, `return true` to add the item to the result list or `return item` object to modify the item and add it to the result list <br> **WARNING** `accent`, `correlativeTemplate`, `offset` and `matcher` will be skipped. |
| matcher | {function} | If set to function, every element will be filtered using this custom rule AFTER the regular Typeahead filters have been applied. Use the same return value as the `filter` option |
| source<br>*(Required)* | {object\|array} | **null** *(default)* <br> The source option corresponds to the data set(s) that Typeahead will look through to find matches for the user query string. <br> Inside the `source` option, you can have multiple lists of `group` data. A `group` can have the following keys: `ignore`, `url` and `data`. It can also override the following global typeahead configurations to **ONLY** apply this current `group`: `filter`, `matcher`, `href`, `template` and `display` |


### Callbacks

The callbacks are defined as below

``` javascript
$.typeahead({
    input: ".js-typeahead-input",
    source: [ ... ]
    callback: {
        onResult: function (node, query, result, resultCount, resultCountPerGroup) {
            console.log(node, query, result, resultCount, resultCountPerGroup);
        }
    }
});
```

| **Callback** | **Description** |
|:-----------------------:|:----------------------------------------------------------------------------------------------------:|
| onInit: function (node) | Will be executed on Typeahead initialization, before anything else. |
| onReady: function (node) | Triggers when the Typeahead initial preparation is completed. |
| onShowLayout: function (node, query) | Triggers when the Typeahead results layout is displayed. |
| onHideLayout: function (node, query) | Triggers when the Typeahead results layout is requested to hide. |
| onSearch: function (node, query) | Triggers every time a new search is executed in Typeahead. |
| onResult: function (node, query, result, resultCount, resultCountPerGroup) | Whenever the result changes, this callback will be triggered. |
| onLayoutBuiltBefore: function (node, query, result, resultHtmlList) | When the result HTML is build, modify it before it get showed. This callback should be used to modify the result DOM before it gets inserted into Typeahead. <br> * If you are using this callback, the resultHtmlList param needs to be returned at the end of your function. |
| onLayoutBuiltAfter: function (node, query, result) | Perform an action right after the result HTML gets inserted into Typeahead's DOM. |
| onNavigateBefore: function (node, query, event) | When a key is pressed to navigate the results. It is possible to disable the input text change when using up and down arrows when `event.preventInputChange = true` is set inside the callback |
| onNavigateAfter: function (node, lis, a, item, query, event) | Called at the end of Navigate (once the `.active` class and other operations are completed). |
| onMouseEnter: function (node, a, item, event) | Will be executed when a item is hovered inside the result list. |
| onMouseLeave: function (node, a, item, event) | Will be executed when a result item is hovered out. |
| onClick or onClickBefore: function (node, a, item, event) | Will be executed when a result item is clicked or the right arrow is pressed when an item is selected from the results list. This function will trigger before the regular behaviors. |
| onClickAfter: function (node, a, item, event) | Will be executed when a result item is clicked or the right arrow is pressed when an item is selected from the results list. This function will trigger after the regular behaviors. |
| onSendRequest: function (node, query) | Gets called when the Ajax request(s) are sent. Either on initial requests or on every dynamic requests. |
| onReceiveRequest: function (node, query) | Gets called when the Ajax request(s) are all received |
| onPopulateSource: function (node, data, group, path) | Gets called after the Ajax requests are all received and the data is populated inside Typeahead. This is the place where extra parsing or filtering should occure before the data gets available inside any Typeahead query. <br> For example, the Backend sends the "display" key separated by underscores "_" instead of spaces " ". <br> * The `data` parameter **HAS** to be returned after it's transformed. |
| onCacheSave: function (node, data, group, path) |  |
| onSubmit: function (node, form, item, event) | Override the native onSubmit function with your own. `return true` at the end of the callback if you want to submit the form, otherwise it will not be submitted. <br> * The item parameter is not always defined. An item object will be sent if the submit happens after an item from the list has been selected. |

## Demos

www.runningcoder.org/jquerytypeahead/demo/

## Version Notes

www.runningcoder.org/jquerytypeahead/version/

## Pull Requests

Please consider these points before creating a new pull request

- Pull request should be made from `develop` to `develop` branch so it can be tested properly and not be directly available to download on the `master`.
The `master` branch should be a copy of the latest released `tag` without any additional new code that has not been released
- Add a descriptive note along with the PR and examples
- Only submit the changed lines and not the whole file(s)
- Follow the same coding conversions