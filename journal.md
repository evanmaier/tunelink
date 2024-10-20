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

## Buisiness Plan

10/19/2024

When I first had the idea for a peer-to-peer music gear rental platform, I was traveling in Europe and looking for a guitar to use for a short time. The music store options were too expensive and inconvenient, so I ended up buying a cheap classical guitar off facebook marketplace which I ended up leaving behind when I flew home. I knew that many people have instruments sitting at home collecting dust that could be usefull to others. In practice, the biggest challenge with peer to peer rentals is establishing trust between the owner and the renter. What is preventing the renter from walking off with the instrument, and how should the owner be compensated for dammages? There are a few possible solutions to this problem which I have explored so far.

### Deposits

One solution is to take a deposit from the renter that is refunded upon the safe return of the instrument. This could be the entire item value up to a fixed amount, or some percentage of the item value. If there was a problem, the owner could report it and we would have to adjudicate the claim. This is a challenging proposition for a startup company with limited resources, and could be difficult to scale. It is reasonable to expect the owner to accept some risk, and creating a user rating system could mitigate this risk, but it is not a perfect solution. The benifit of this system is that it allows up to take payemnts in-app which is most convenient for the users and allows us to take a cut of each transaction.

### Marketplace

Another possible buisiness model is the marketplace approach. This would position TuneLink as a matchmaker between renters and owners/buisinesses that does not handle payments. The value add comes from creating a platform where users can easily find gear they want to rent in their area, and providing an online storefront for individual owners and buisinesses. In this model, TuneLink would offer a free tier for a individuals with a small number of listings, and charge a monthly fee to owners/buisiness that want to list more items. We could also charge for promotion on the home page and search priority.

### The Dilema

My goal with this project is to make music gear more accessible for everyone, and to find a use for all those guitars collecting dust in garages. For that reason, I want to make this work as a peer-to-peer platform. However, it would be a lot easier to build a buisiness to consumer platform marketed at local music stores that dont have a strong online presence. My hope is that we can combine both these models and become a successfull buisiness while still serving the local musician.