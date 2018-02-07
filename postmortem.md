# Postmortem

## Directory Structure

This is a basic description of the directory structure used. It doesn't go into detail within each directory though

```
- /src
  - /actions (action creators)
  - /components (standalone components)
    - /[Component Name]
      - [Component Name].js (this is the component)
      - [Component Name].test.js (tests for the component)
      - index.js (exports the necessary pieces)
  - /containers (connected components)
    - /[Component Name]
      - [Component Name].js (this is the component)
      - [Component Name].test.js (tests for the component)
      - index.js (exports the necessary pieces)
  - /reducers
  - /store (Redux store setup)
```

## CSS(-in-JS) Library

Using [`emotion`](https://github.com/emotion-js/emotion) for CSS. It is one of the fastest css-in-js libraries. I feel like it
also makes it much easier to parse the code. They have a good ecosystem, including a theming option in a separate package
if that ever became an issue.

## Utility Library

Using [`lodash`](https://lodash.com/) because they optimize much of the es6 utilities while also allowing objects in similar
array only functions (e.g., `map`, `reduce`, etc.). I would add the babel plugin that makes it so only the files that are
necessary are included when building. I didn't do it here because I would have had to eject CRA.

## Data Normalization

I normalize the data that comes back from the API. I didn't use a library for it because the scope is small enough. But I try
to normalize data on the front end so that a connected component can ask for just the data that is necessary (and can put it
back together however is also necessary)

## Testing

I wrote basic tests for most files, but only a few for the components. I added the [`enzyme`](http://airbnb.io/enzyme/#) library
because it makes it easier to isolate specific components without having to worry about full rendering. This becomes most
apparent when dealing with composed views.

## Flow

I added [`flow`](https://flow.org/) types across the board. I've found that this helps cut down on bugs and makes for more
efficient work. Using [`flow-typed`](https://github.com/flowtype/flow-typed) to add package library definitions to the codebase.
You can run `yarn flow` to run a check manually.

## Functionality

I made the cards work like an accordion because it seems like this page would be used to get a summary of information rather than
something that one dives deep into. I would assume that there would be separate links that users could click to get additional
information.

If I were to have made it go to a new page, I probably would have added [`react-router`](https://reacttraining.com/react-router/)
to the mix. I did however make it so that the `Dashboard` component could be used like a route handler if this were built out
further. `App` would essentially work as a front controller for the various routes.

I would have created a `Loader` component instead of just using text when there is loading to help ease the user's expectation
about load.
