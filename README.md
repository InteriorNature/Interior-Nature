# Interior-Nature
React E-Commerce Demo

This demo uses free heroku hosting, so please allow a possible half minute for the demo to spin up. For demo purposes, access cart and order functionality and a little of admin functionality by signing up with a fake user account. Also, use credit card processor stripe's fake purchase numbers to access order functions of the site. 

This is my adapted version of a server-side rendering site developed while taking the Advanced React course by Wes Bos. The skills this course gave me:
1) a deeper understanding of render props in the context of managing data, including composing a single render prop from a collection of nested queries and data transformations (render prop mess)
2) using Apollo/GraphQL to store and manage state rather than Context API, Redux, and excess variables
3) using jwt token to carry and pass encoded user info throughout application for authentication and permissions
4) manipulate a cache directly - timing issues and good cases for refetching queries, creating optimistic responses, and what are good cases for cache invalidation
5) the greater ease of SSR for rendering, routing and tooling (using Nextjs)
6) how designing with higher-order components and stateless functions helps clarify the provider-consumer relationships AND 3 cheers for Apollo which made a seamless interface to all of the data
7) using Downshift to customize managing state, user interactions and accessability in a dropdown component
8) while I had used debouncing for scrolls before, this was a first using it in a search with a dbase query
9) styled-components helps me invest my energy in React, rather than in Vue
