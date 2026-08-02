---
lastmod: 2026-08-01 10:58
date: 2026-07-17 18:17
---
Effects let you specify side effects that are caused by rendering itself, rathre than by a particular event. For example, sending a message in the chat is an event because it is directly caused by the user clicking a specific button. however, setting up a server connection is an Effect because it should happen no matter which interaction caused the component to appear.
Effects run at the end of a commit after the screen updates. This is where it's a good time to synchronize the react components with some external system, like a network or a third-party library.

# How to write an Effect
1. **Declare an Effect.** by default, an effect will run after every commit
2. **specify the effect dependencies.** Most effects should only re-run when needed rather than after every render. For example, a fade-in animation should only trigger when a component appears. Connecting and disconnecting to a chat room should only happen when the component appears and disappears, or when the chat room changes. You control this by specifying dependencies
3. **Add cleanup if needed.** Some effects need to specify how to stop, or clean up whatever they were doing. for example, "connect" needs "disconnect", "fetch" needs either "cancel" or "ignore". you do this by returning a cleanup function

# Step 1: Declare an Effect

- to declare an Effect, import the useEffect Hook from React:
	- import { useEffect } from 'React';

then, call it at the top level of your component and put some code inside the Effect:

function MyComponent() {  

useEffect(() => {  

// Code here will run after *every* render  

});  

return <div />;  

}

every time the component renders, React will update the screen and then run the code inside useEffect. Essentially, useEffect delays a piece of code from running until that render is reflected on screen. 

Example:
consider a <VideoPlayer> component. we should be able to control whether it's playing or paused by passing an isPlaying prop to it:
<VideoPlayer isPlaying={isPlaying} />;

then the VideoPlayer component renders the built-in browser <video> tag:

function VideoPlayer({ src, isPlaying }) {  

// TODO: do something with isPlaying  

return <video src={src} />;  

}

However, the <video> prop doesn't have a isPlaying prop. the only way to control it right now is to manually call the play() and pause() methods on the DOM element. you need to synchronize the value of isPlaying prop, which tells whether the video whouls be currently playing, with calls like play() and pause()

function VideoPlayer({ src, isPlaying }) {
  const ref = useRef(null);

  if (isPlaying) {
    ref.current.play();  // Calling these while rendering isn't allowed.
  } else {
    ref.current.pause(); // Also, this crashes.
  }

  return <video ref={ref} src={src} loop playsInline />;
}

This is wrong, you can't call play() or pause() during rendering, since it tries to do something with the DOM node during rendering. In react, rendering should be a pure calculation of jsx and should not contain side effects like modigying the dom. Also, at the beginning, the video DOM doesn't even exist yet, so it cant call play() or pause() on something that doesnt exist. The solution is to wrap the side effect with useEffect to move it out of the rendering calculation:

import { useEffect, useRef } from 'react';  

  

function VideoPlayer({ src, isPlaying }) {  

const ref = useRef(null);  

  

useEffect(() => {  

if (isPlaying) {  

ref.current.play();  

} else {  

ref.current.pause();  

}  

});  

  

return <video ref={ref} src={src} loop playsInline />;  

}

By wrapping the DOM update in an Effect, you let react update the screen first, then the effect runs. 
So now, when videoplayer component renders (either the first time or a re-render), a few things happen. First, react will update the screen, ensuring the <video> tag is in the dom with the right props. then react runs the effect. finally, the effect will call play() or pause() depending on the value of isPlaying. Essentially, this allows the button to be dynamic, and change depending on if you want to play or pause a video.

**Important** 
By default, Effects run after every render, so code like this:
const [count, setCount] = useState(0);  

useEffect(() => {  

setCount(count + 1);  

});
will produce an infinite loop. Effects run as a result of rendering, seting state triggers rendering. setting state immediately in an effect is like plugging an outlet into itself. the effect runs, it sets the state, which causes a rerender, and it loops. 
Effects should usually synchronize your components with an external system. if there's no external system, and you only want to adjust some state based on another state, you might not need an effect.

# Step 2: Specify the Effect dependencies

By default, Effects run after every render, which usually is not what you want.
- Sometimes it's slow. Synchronizing with an external system is not instant, so it's a good idea to skip unless it's absolutely necessary. For example, you wouldn't want to reconnect to a chat server on every keystroke.
- Sometimes it's wrong. for example, you wouldn't want to trigger a component fade-in animation on every keystroke. The animation should only play once when the component appears for the first time.

You can tell react to skip unecessarily re-running the effect by specifying an array of dependencies as the second argument to the useEffect call. 

example: 
useEffect(() => {
    if (isPlaying) {
      console.log('Calling video.play()');
      ref.current.play();
    } else {
      console.log('Calling video.pause()');
      ref.current.pause();
    }
  }, []); // This causes an error

It causes an error because useEffect depends on an isPlaying prop to decide what todo, but this dependency is not explicitly declared. to fix this issue, add isPlaying to the dependency array:

useEffect(() => {  

if (isPlaying) { // It's used here...  

// ...  

} else {  

// ...  

}  

}, [isPlaying]); // ...so it must be declared here!

now that the dependency is declared by specifying isPlaying as the dependency array, it tells react that it should skip rerunning the effect if isPlaying is the same as it was during the previous render.

The dependency array can contain multiple dependencies. React will only skip re-running the effect if all of the dependencies you specify have exactly the same values as they had during the previous render.

**Important info** the behaviors without a dependency array and with an empty [] dependency array are different:

useEffect(() => {  

// This runs after every render  

});  

  

useEffect(() => {  

// This runs only on mount (when the component appears)  

}, []);  

  

useEffect(() => {  

// This runs on mount *and also* if either a or b have changed since the last render  

}, [a, b]);

# Step 3: Add cleanup if needed

here's another example. say you're writing a chatroom component that needs to connect to the chat server when it appears. you are given a createConnecion() API that returns and object with connect() and disconnect () methods. how do you keep the component connected while it is displayed to the user?

take this code:
import { useEffect } from 'react';
import { createConnection } from './chat.js';

export default function ChatRoom() {
  useEffect(() => {
    const connection = createConnection();
    connection.connect();
  }, []);
  return <h1>Welcome to the chat!</h1>;
}
You can see that we used an empty dependency array so that the effect only happens when the component "mounts", aka appears on the screen for the first time.

However, when you run the code, in the console log you'll see two connecting logs instead of one. The reason why is that react unmounts every component once immediately after its initial dismount. This is to help notice a certain bug: the code doesnt close the connection when the component unmounts.

To fix this, return a cleanup function from your effect:

useEffect(() => {  

const connection = createConnection();  

connection.connect();  

return () => {  

connection.disconnect();  

};  

}, []);

React will call the cleanup function each time before the effect runs again, and one final time when the component unmounts (gets removed). 

import { useState, useEffect } from 'react';
import { createConnection } from './chat.js';

export default function ChatRoom() {
  useEffect(() => {
    const connection = createConnection();
    connection.connect();
    return () => connection.disconnect();
  }, []);
  return <h1>Welcome to the chat!</h1>;
}


Now in the console log, you'd see 3 logs, a connecting, a disconnected, and then a connecting. by remounting the component, react verifies that navigating away and back would not break the code. 