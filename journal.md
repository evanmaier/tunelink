# TuneLink Dev Journal

## First Entry
10/16/2024

I thought it would be a good idea to start a dev journal for this project for two reasons. Firstly, if I need to recall the problems I faced and (hopefully) solved in the future, there will be a paper trail to help me. Secondly, and most importantly, I can document all the mistakes I make to laugh at in the future. This project is already a few months old, so there are many decisions and mistakes to retroactively document. Let's start with the technology choices:

### Framework
I chose Sveltekit with Typescript and Node.js for my front end and back end because I used them to build my portfolio website, and some experience is better than none. I have been pretty happy with Sveltekit, especially when combining reactive components with a real time database. Node on the backend is fine, and thats all I'm goint to say about that...

### Database
I chose Firebase for the same reason I chose Sveltekit. I had used it once before on my portfolio project, and it has a good free tier. Given the requirements of this project, a relational database would be a better choice. I have often found myself hacking together links between collections using extra document fields and sub-collections. On the other hand, Firebase has a good developer ecosystem and integration with other services like Algolia, which I use for search.

### UI Libraries
I chose TailwindCSS and DaisyUI because I had used them before and they are the standard choice for Sveltekit projects. I don't really enjoy UI design (shocking), and would rather spend my time building the buisiness logic, so going with something more cookie-cutter like bootstrap could have been a better choice. However, If this app takes off Tailwind allows a more custom UI design. Another benefit of using Tailwind is it forced me to learn Tailwind.