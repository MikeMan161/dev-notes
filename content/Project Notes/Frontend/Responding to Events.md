---
lastmod: 2026-07-17 17:18
date: 2026-07-17 13:20
---
To add an event handler, define a function and the npass it as a prop to the appropriate jsx tag
Here's an example of a button:

export default function Button() {
  return (
    <button>
      I don't do anything
    </button>
  );
}

You can make it show a message when a user clicks on it by:
1. Declare a function called handleClick inside the button component
2. implement the logic in that function (use alert to show message)
3. Add onClick={handleClick} to the <button> jsx

export default function Button() {
  function handleClick() {
    alert('You clicked me!');
  }

  return (
    <button onClick={handleClick}>
      Click me
    </button>
  );
}

You define handleClick and then pass it as a prop to <button>. handleClick is an event handler. Event hander functions:
- Are usually defined inside your components
- have names that start with handle, followed by the name of the event.

Alternatively, you can also define an event handler inline in the jsx:

<button onClick={function handleClick() {
	alert('You clicked me!');
}}>

or with an arrow function:

<button onClick={() => {
	alert('You Clicked me!');
}}>

# Important Distinction:

functions passed to event handlers must be passed, not called:

Correct:
<button onClick={handleClick}>
Incorrect:
<button onClick={handleClick()}>

When a function is passed, it will only call the function when the user clicks the button. When it's called, it fires the function immediately during rendering, without any clicks. This is because the javascript within JSX executes immediately.

This is also similar to inline code, you must wrap it in an anonymous function:

<button onClick={() => alert('...')}>

Since event handlers are declared in a component, they can use all of the component's props, like how this event handler can show an alert with each button's message prop:

function AlertButton({ message, children }) {
  return (
    <button onClick={() => alert(message)}>
      {children}
    </button>
  );
}

export default function Toolbar() {
  return (
    <div>
      <AlertButton message="Playing!">
        Play Movie
      </AlertButton>
      <AlertButton message="Uploading!">
        Upload Image
      </AlertButton>
    </div>
  );
}

Often you'll want the parent component to specify a child's event handler, like if youre using a button component, you'd want to execute a different function, like one plays a movie, the other uploads an image:

function Button({ onClick, children }) {
  return (
    <button onClick={onClick}>
      {children}
    </button>
  );
}

function PlayButton({ movieName }) {
  function handlePlayClick() {
    alert(`Playing ${movieName}!`);
  }

  return (
    <Button onClick={handlePlayClick}>
      Play "{movieName}"
    </Button>
  );
}

function UploadButton() {
  return (
    <Button onClick={() => alert('Uploading!')}>
      Upload Image
    </Button>
  );
}

export default function Toolbar() {
  return (
    <div>
      <PlayButton movieName="Kiki's Delivery Service" />
      <UploadButton />
    </div>
  );
}

- Playbutton passes handlePlayclick as the onClick prop to the button inside
- Uploadbutton passes () => alert('Uploading') as the onClick prop to the button inside

# Event propagation
Event Handlers will also catch events from any children your component might have. we say that an event "bubbles" or "propagates" up the tree. it starts from where the event happened, then goes up the tree. Essentially, you can chain events.

export default function Toolbar() {
  return (
    <div className="Toolbar" onClick={() => {
      alert('You clicked on the toolbar!');
    }}>
      <button onClick={() => alert('Playing!')}>
        Play Movie
      </button>
      <button onClick={() => alert('Uploading!')}>
        Upload Image
      </button>
    </div>
  );
}

When you click on the buttons, onClick will run first, doing the respective alert,then the parent's <div>'s onClick, so two messages will appear. if you just click on the toolbar, only the parent onClick will run. all events in React propagate except for onScroll

You can also stop propagation by using e.stopPropagation(). event handlers recieve an event object as their only object, usually called 'e', which stands for event. You can use this object to read information about the event. That object also let's you stop propagation, preventing an event from reaching parent components. 

function Button({ onClick, children }) {
  return (
    <button onClick={e => {
      e.stopPropagation();
      onClick();
    }}>
      {children}
    </button>
  );
}

export default function Toolbar() {
  return (
    <div className="Toolbar" onClick={() => {
      alert('You clicked on the toolbar!');
    }}>
      <Button onClick={() => alert('Playing!')}>
        Play Movie
      </Button>
      <Button onClick={() => alert('Uploading!')}>
        Upload Image
      </Button>
    </div>
  );
}

# Preventing default behavior

some browser elements have default behavior associated with them. for example, a <form> submit event, which happens when a button is clicked inside of it is clicked, will reload a page by default:

export default function Signup() {
  return (
    <form onSubmit={() => alert('Submitting!')}>
      <input />
      <button>Send</button>
    </form>
  );
}

To stop this, you can call e.preventDefault() on the event object to stop this from happening:

export default function Signup() {
  return (
    <form onSubmit={e => {
      e.preventDefault();
      alert('Submitting!');
    }}>
      <input />
      <button>Send</button>
    </form>
  );
}

so remember:
e.stopPropagation() stope event handlers attached to the tags above from firing
e.preventDefault() prevents the default browser behavior for the few events that have it

[doc link:] (https://react.dev/learn/responding-to-events)