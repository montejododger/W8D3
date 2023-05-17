/*Timing is Everything
Use setInterval to build a small clock in your terminal. It should display the current time every second. However, you can only query the system time once. Your clock must store that time, increment it, and display it in HH:MM:SS (use 24hr format).

Make a Clock class. Calling new Date() will give us an object that represents the current system time. Because you can only do this once, do it in your Clock constructor. Don't bother keeping this Date object around because you won't need it anymore. Just store the hours, minutes, and seconds. Look at the Date docs for help here.

You'll also need to schedule a Clock.prototype._tick callback that updates the time and calls the printTime method. Don't worry about padding zeroes in the format. Just focus on the basic logic and functionality.
*/

class Clock {
  constructor() {  
    // 1. Create a Date object.
    // we only need to create this object once to get the time
        const date = new Date()
    // 2. Store the hours, minutes, and seconds.
    // mkae sure to assign then to "this"
        this.hours = date.getHours();
        this.minutes = date.getMinutes();
        this.seconds = date.getSeconds();
    // 3. Call printTime.
        this.printTime();
    // 4. Schedule the tick at 1 second intervals.
        setInterval(this._tick.bind(this), 1000)

  }

  // this is a method
  printTime() {
    // Format the time in HH:MM:SS
    // Use console.log to print it.
    console.log(`${this.hours}:${this.minutes}:${this.seconds}`);
  }

  // this is a prototype
  _tick() {
    // 1. Increment the time by one second.
    // 2. Call printTime.
    this.seconds++
    if (this.seconds === 60) {
        this.seconds = 0;
        this.minutes++;
        if(this.minutes === 60) {
            this.minutes = 0;
            this.hours = (this.hours + 1) % 24;
        }
    }
    this.printTime();
  }
}

// const clock = new Clock();
/////////////////////////////////////////////////////////////////////////////////////////
/*
addNumbers
Let's write a function that will read several numbers, one after another, and sum up the total. After each number, let's print out the partial sums along the way, and pass the total sum to a callback when done.

First off, use readline.createInterface to create a global variable, reader. Use process.stdin/process.stdout like I do in my examples. Make sure to only use one instance of a reader and only close it once.
*/


/*
Next, write a function, addNumbers(sum, numsLeft, completionCallback):

If numsLeft > 0, then:
Prompt the user for a number (use reader).
Pass a callback that:
Uses parseInt to parse the input.
Increment the sum and console.log it.
Recursively calls addNumbers again, passing in:
the increased sum,
the decreased numsLeft,
and the same completionCallback.
If numsLeft === 0, call completionCallback(sum) so that the total sum can be used.

*/
//To test, try out:

// const readline = require("readline");
// const reader = readline.createInterface({
//     input: process.stdin,
//     output: process.stdout
// });

// .question(prompt, callback)

function addNumbers(sum, numsleft, completionCallback) {
    if (numsleft > 0) {
        const response = reader.question('Input a number: ', function(input) {
        const newNum = parseInt(input);
        sum += newNum;
        addNumbers(sum, numsleft-1, completionCallback);
        console.log(sum);
        });
    } else {
        reader.close();
        completionCallback(sum);
        }
    };

    function completionCallback(totalSum) {
        console.log(`Total Sum: ${totalSum}`);
    }


// addNumbers(0, 3, sum => console.log(`Total Sum: ${sum}`));
// This should prompt for three numbers, printing out the partial sums and then the final, total sum.

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/*
myBind
Write your own myBind(context) method. Add it to Function.prototype. You'll want to:

Return an arrow function.
The arrow function captures this and context.
In the anonymous function, call Function.prototype.apply on this, passing the context.
Assume the method you're binding doesn't take any arguments; we'll see tomorrow how to use the rest and spread operators to fix this.

How would you test your "bind" method out? 

Bind
bind is a function we invoke on a function
Pass in desired context (and sometimes arguments we'll bind)
bind returns a new function with the context permanently bound
Unlike call/apply, DOES NOT immediately invoke the function
This bound function will always have the context set, so we can invoke it function-style without a problem!
NOTE: Bind is not a way to invoke a function! It's not invoked until later!

Try out this example code:
*/

// save the value of the current function (this)
// return a new annon function 
// the new anonymous function should return the value of of the orginal (this) value applied to the context

Function.prototype.myBind = function(context) {
    // this is only to save the value of the original (this)
    const value = this;

    // non - arrow
    // creates an anonymous function that will return the orginal functions value
    return function() {
        value.call(context);
    };
};

class Lamp {
  constructor() {
    this.name = "a lamp";
  }
}

const turnOn = function() {
  console.log("Turning on " + this.name);
};

const lamp = new Lamp();

// turnOn(); // should not work the way we want it to

const boundTurnOn = turnOn.bind(lamp);
const myBoundTurnOn = turnOn.myBind(lamp);

// boundTurnOn(); // should say "Turning on a lamp"
// myBoundTurnOn(); // should say "Turning on a lamp"

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/*
absurdBubbleSort
In this exercise, we write a method called absurdBubbleSort(arr, sortCompletionCallback). Instead of using the traditional >, we'll prompt the user to perform each comparison for us.

First, write a method askIfGreaterThan(el1, el2, callback) which prompts the user to compare two elements. The user can type in "yes" or "no": if the user indicates that el1 > el2, askIfGreaterThan should call callback with true. Else, it should call callback with false.

You'll want to set up a global reader variable (use readline.createInterface). askIfGreaterThan should use the question method.

Test it out. Make sure you can ask for input and that the input passes to the callback correctly.

Next, write a method innerBubbleSortLoop(arr, i, madeAnySwaps, outerBubbleSortLoop). This recursive function should:

If i < arr.length - 1, it should call askIfGreaterThan, asking the user to compare arr[i] and arr[i + 1].
For a callback to askIfGreaterThan, pass in an anonymous helper function. This should:
Take in a single argument: isGreaterThan; askIfGreaterThan will pass either true or false as this argument.
Perform a swap of elements in the array if necessary.
Call innerBubbleSortLoop again, this time for i + 1. It should pass madeAnySwaps. Update madeAnySwaps if you did swap.
Call outerBubbleSortLoop if i == (arr.length - 1). It should receive madeAnySwaps as an argument.
This method should now perform a single pass of bubble sort. Test out innerBubbleSortLoop, passing in dummy variables. For example, instead of actually writing the outerBubbleSortLoop method, pass in a dummy method that console.logs "In outer bubble sort".

This idea (testing methods on their own by passing in dummy arguments) is crucial to understand larger chunks of code that you write. Don't be embarrassed to test out methods after you've only written one line of them. It's very bad software practice to write many lines of code before testing anything, especially if you're a junior developer.

Lastly, write a method absurdBubbleSort(arr, sortCompletionCallback). Define a function outerBubbleSortLoop inside of absurdBubbleSort. It should:

If madeAnySwaps == true, call innerBubbleSortLoop. It should pass in arr, an index of 0, and false to indicate that no swaps have been made. For a callback to innerBubbleSortLoop, pass outerBubbleSortLoop itself.
If madeAnySwaps == false, sorting is done! call sortCompletionCallback, passing in arr, which is now sorted!
To kick things off, absurdBubbleSort should call outerBubbleSortLoop(true). This will call the first inner loop to be run.

Here's a code skeleton:
*/
// Write this first.
// Prompt user to tell us whether el1 > el2; pass true back to the
// callback if true; else false.


const readline = require("readline");
const { setInterval } = require("timers/promises");

const reader = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function askIfGreaterThan(el1, el2, callback) {
    reader.question(`Is ${el1} greater than ${el2}? Enter true or false: `, function(input) {
      const response = input.trim();
      if (response === 'true') {
        callback(true);
      } else {
        callback(false);
      }
      reader.close();
    });
  }

  function comparison(result) {
      console.log('result:', result);
    }
    
// askIfGreaterThan(2,1, comparison)

// Once you're done testing askIfGreaterThan with dummy arguments, write this.

function innerBubbleSortLoop(arr, i, madeAnySwaps, outerBubbleSortLoop) {
  // Do an "async loop":
  if (i < arr.length - 1) {
    askIfGreaterThan(arr[i], arr[i + 1], function(isGreaterThan) {
      if (isGreaterThan) {
        [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
        madeAnySwaps = true; 
      }
      innerBubbleSortLoop(arr, i + 1, i, madeAnySwaps, outerBubbleSortLoop); 
    });
  } else {
    outerBubbleSortLoop(madeAnySwaps);
      }
    }

    innerBubbleSortLoop([2,1,3,5], 0, false)

  // 1. If (i == arr.length - 1), call outerBubbleSortLoop, letting it know whether any swap was made.

  // 2. Else, use `askIfGreaterThan` to compare `arr[i]` and `arr[i +
  //    1]`. Swap if necessary. Call `innerBubbleSortLoop` again to
  //    continue the inner loop. You'll want to increment i for the
  //    next call, and possibly switch madeAnySwaps if you did swap.

// Once you're done testing innerBubbleSortLoop, write outerBubbleSortLoop.


// Once you're done testing outerBubbleSortLoop, write absurdBubbleSort.

function absurdBubbleSort(arr, sortCompletionCallback) {
  function outerBubbleSortLoop(madeAnySwaps) {
    // Begin an inner loop if you made any swaps. Otherwise, call
    // `sortCompletionCallback`.
  }

  // Kick the first outer loop off, starting `madeAnySwaps` as true.
}

// absurdBubbleSort([3, 2, 1], function(arr) {
//   console.log("Sorted array: " + JSON.stringify(arr));
//   reader.close();
// });

////////////////////////////////////////////////////////////////////////////////////////////
/*
myThrottle and myDebounce
myThrottle
Suppose we want to limit how frequently a function can be called. A throttle function allows us to specify a minimum time interval that must pass between invocations. This can be especially useful if the function does something computationally expensive. It is also sometimes used for games to limit how often a player can trigger some event.

Write your own myThrottle(interval) function on the Function.prototype. myThrottle should take an interval as an argument and return a "throttled" version of the original function that can only be invoked every interval milliseconds. In order to accomplish this, declare a variable, tooSoon, outside of the scope of the returned function. Your returned function should close over the tooSoon variable and:

do nothing if tooSoon is true
if tooSoon is false:
set tooSoon to true
use setTimeout to set tooSoon back to false after interval milliseconds
invoke the original function with the original arguments.
Once you think you have it working, try the following example code:
*/

// class Neuron {
//   fire() {
//     console.log("Firing!");
//   }
// }

// const neuron = new Neuron();
// When we create a new Neuron,
// we can call #fire as frequently as we want

// The following code will try to #fire the neuron every 10ms. Try it in the console:
// const interval = setInterval(() => {
//   neuron.fire();
// }, 10);

// You can use clearInterval to stop the firing:
// clearInterval(interval);

// Using Function#myThrottle, we should be able to throttle
// the #fire function of our neuron so that it can only fire
// once every 500ms:

// neuron.fire = neuron.fire.myThrottle(500);

// const interval = setInterval(() => {
//   neuron.fire();
// }, 10);

// This time, if our Function#myThrottle worked correctly,
// the Neuron#fire function should only be able to execute
// every 500ms, even though we're still trying to invoke it
// every 10ms!

// If we want this behavior for ALL neurons, we can do the same logic in the constructor:

// class Neuron {
//   constructor() {
//     this.fire = this.fire.myThrottle(500);
//   }

//   fire() {
//     console.log("Firing!");
//   }
// }

//////////////////////////////////////////////////////////////////////////////////////////////////////
/*
myDebounce
Like myThrottle, a debounce function is another way of restricting function invocations. In a debounced function, the specified interval represents how much time must pass without the debounced function being invoked before the original function is invoked automatically. Essentially, each time the debounced function is invoked, it resets a countdown (setTimeout). If the countdown completes before the debounced function is invoked again, it will invoke the original function. To better understand debounced functions, consider the following example:

We have a SearchBar class that stores a query string. Every time the user calls SearchBar#type with a letter, the new letter is added to the query, and the search function is invoked to "search" for the query:

class SearchBar {
  constructor() {
    this.query = "";

    this.type = this.type.bind(this);
    this.search = this.search.bind(this);
  }

  type(letter) {
    this.query += letter;
    this.search();
  }

  search() {
    console.log(`searching for ${this.query}`);
  }
}
Below, we create a new SearchBar, and write a function that will "type" all of the characters in the string "hello world". Test out the following code:

const searchBar = new SearchBar();

const queryForHelloWorld = () => {
  searchBar.type("h");
  searchBar.type("e");
  searchBar.type("l");
  searchBar.type("l");
  searchBar.type("o");
  searchBar.type(" ");
  searchBar.type("w");
  searchBar.type("o");
  searchBar.type("r");
  searchBar.type("l");
  searchBar.type("d");
};

queryForHelloWorld();
When we run the queryForHelloWorld function, we "type" each character in the string "hello world", and execute a new search every time a new character is added. This is a good way to show "live" results to our users (they don't have to press enter or click a button), but executing a search every time can be incredibly inefficient. A much better solution would be to execute a search whenever we think the user has stopped (or paused) typing. A common way to achieve this functionality is by making a debounced version of our function:

Function#myDebounce accepts an interval as an argument and returns a "debounced" function
when the debounced function is invoked, it sets a timeout that will invoke the original function after interval milliseconds have elapsed
if the debounced function is invoked early, it resets the timeout

Write your own myDebounce function on the Function.prototype. It should take an interval as an argument and return a "debounced" version of the original function. Using Function#myDebounce, we should be able to make SearchBar#search only execute once it hasn't been executed for at least 500ms:

// Assign searchBar.search to the returned debounced version
searchBar.search = searchBar.search.myDebounce(500);

Try running the queryForHelloWorld function again. This time, you should only see the search for the last query. This is because every subsequent call to the debounced search function resets the timeout - only the last call will end up being invoked. In effect, we've prevented any wasteful searches by only searching once the user stops "typing" for at least 500ms!

*/