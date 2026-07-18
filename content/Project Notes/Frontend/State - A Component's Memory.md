---
lastmod: 2026-07-17 17:26
date: 2026-07-17 15:59
---
Components often need to change what shows on the screen as a result of an interaction. clicking "next" on an image carousel should change what image is shown, "buy" puts something into a shopping cart, etc. Components need to remember things like the current input value, current image, shopping cars. in react, this component-specific memory is called *State*

In this example, handleClick has a local index variable that iterates whenever a user clicks the Next button. However, when clicking, it doesnt show anything new. There are two things that prevent that change from being visible:
1. Local variables don't exist between renders. when react renders this component again, it renders from scratch, not taking into account any changes to local variables
2. changes to local variables don't trigger renders. React doesn't realize that it needs to update and render the component again with new data.

So in order to have a component update with new data, two things need to happen:
1. Retain data between renders
2. trigger react to render the component with new data (re-rendering)

to do this we can use the useState Hook, it does two things:
1. A state variable to retain the data between renders
2. A state setter function to upgrade the variable and trigger React to render the component again

# Adding a state variable

to input a state variable, import it from react:
import { useState} from 'react';

then replace a line like 
let index = 0;
with 
const \[index, setIndex] = useState(0)

index is a state variable and setIndex is the setter function. the array returned by useState always has exactly two items

then, in handleClick, itd work like this:
function handleclick() {
	setIndex(index+1)
}

In React, useState, as well as any other function starting with "use", is called a **Hook**

**Hooks** are special functions that are only available while react is rendering. they let you hook into different react features

**Important info**:
Hooks can only be called at the top level of your components or your own Hooks. you can't call them inside conditions, loops, or other nested functions.

When you call useState, you are telling react that you want this component to remember something:

const \[index, setIndex] = useState(0);

in this case, you want React to remember index. the standard convention is to name this pair const \[something, setSomething]. You can name it anything, but that's the standard

The only argument to useState is the initial value of the state variable, which in this case, index's initial value is set to 0 with useState(0).

every time your component renders, useState gives you an array containing two values:
- the state variable (index) with the value you stored
- the state setter function (setIndex) which can update the state variable and trigger React to render the component again.

here's how it works:

const \[index, setIndex] = useState(0);

1. **the component renders in real time.** because 0 was passed to useState as the intial value for index, it will return \[0, setIndex]. React remembers 0 is the latest state value
2. **You update the state**. when a user clicks the button, it calls setIndex(index + 1). index is 0, so it's setindex(1). This tells react to remember index is now 1 and triggers another render.
3. **the component's second render**. React still uses useState(0), but because React remembers you set index to 1, it returns \[1, setIndex] instead
4. keeps going

You can have as many state variables of as many types as you like in one component. this component has two state variables:

import { useState } from 'react';
import { sculptureList } from './data.js';

export default function Gallery() {
  const [index, setIndex] = useState(0);
  const [showMore, setShowMore] = useState(false);

  function handleNextClick() {
    setIndex(index + 1);
  }

  function handleMoreClick() {
    setShowMore(!showMore);
  }

  let sculpture = sculptureList[index];
  return (
    <>
      <button onClick={handleNextClick}>
        Next
      </button>
      <h2>
        <i>{sculpture.name} </i>
        by {sculpture.artist}
      </h2>
      <h3>
        ({index + 1} of {sculptureList.length})
      </h3>
      <button onClick={handleMoreClick}>
        {showMore ? 'Hide' : 'Show'} details
      </button>
      {showMore && <p>{sculpture.description}</p>}
      <img
        src={sculpture.url}
        alt={sculpture.alt}
      />
    </>
  );
}

It's a good idea to have multiple state variables if their state is unrelated, like index and showMore in this example. but if there's a situation where you often change two state variables together, it might be easier to just combine them into one.

State is local to a component instance on the screen. in other words, if you render the same component twice, each copy will have it's own completely isolated state. changing things in one will not affect the other.

That's what makes state different to just a normal variable at the top of a module. State is not tied to a particular function call or place in the code, but local to the specific place on the screen. if you rendered two gallery components, their state is store separately. Also, states are fully private to the component declaring it, so any parent can't read or affect anything inside of them.

One note for later, when i get to actually connecting the back to the frontend:
- when you use useState, typescript usually infers the type from the initial value, so useState(0), it infers the type is a number, useState(false) is boolean, useState("") is a string. so the only time i'd need to annotate explicitly is when the initial value doesn't tell the whole story, like a state that starts as null and will later hold something else. in this case, i'd write useState,=<Transaction\[]>(\[]) or something similar, telling typescript that this will hold an array of transactions.

[doc link:] (https://react.dev/learn/state-a-components-memory)