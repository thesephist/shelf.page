# Feedback on Remake

Notes:

- Run on Fedora Linux with Node v12 and Yarn
    - Yarn seems to break some of the dependencies so I'm on `npm` now.

## What I did

- Ran `remake create...`
- Opened quick start guide, but I was following the tutorial so I closed it
- Logged into trello clone
- Saw that the tutorial made the trello, but I already have the trello, so I switched to skimming the tutorial and working on my own.
    - I looked over the Trello example to learn the basics, and started from scratch.

## Onboarding + setup

- Having to install something globally is not desirable for some, maybe just recommend `npx remake --`?
    - I ended up running `npx remake create shelf`.
    - The feedback/UX provided by `remake create` is pretty good, with progress updates in the CLI.
- Very strange that a starter app is quite complex. I expected a boilerplate that I could immediately start adding stuff to.
    - Maybe that boilerplate page could contain what they should do next.
    - Quick start tells me to sign up in my app before I move on but... this isn't my app? So that's kind of weird.
- I was looking for "so which file do I just start adding stuff to, that'll make the webpage change?" and this was not immediately obvious. I looked around a bit.
- Can I add `/username/thing` page by adding `/user/thing.hbs`? Or is it more complicated where the only pages in `/user` are special predetermined?
    - This was in docs but not in README.
- Once I started going, my first question was: here's my data schema, should I put it somewhere? What's the next step to seeing something on the screen?
    - Having that trello app was a big hindrance.
    - BIGGGG epiphany moment when I found `data/user-starting-data.json`. But weird that I have to pregenerate ID's for stuff? I guess the idea is copy from an existing user's data, but manual editing is sometimes nice.
    - I inferred how this works but I couldn't find docs on this `data/` directory stuff.
- A really helpful doc would be "here's everything in `app/` and what each thing does."
- Styles
    - I'm not a Sass person. I write standard CSS and SCSS sometimes if I need to.
    - I put a `.css` file in `assets/sass/` expecting it to compile, but it didn't get moved to `dist/`.
    - Look in docs but found nothing.
    - I ended up just linking `/scss/blocks.min.css` since it was being copied across. But not ideal experience imo.
    - Did the same with `main.sass` -> `main.css` and started fresh, and that felt good!

## Developer experience

- Weird that there's so many `_remake*` directories at the _top_ of my project, which I feel like is my turf. Maybe it can be hidden under a `.remake/` dir or something?
    - I feel like this should be in `node_modules/`? How does Next.js work?
- Should I be able to modify the `package.json`? I feel like I should, but it's named `remake-framework`, which is confusing.
- `.hbs` files didn't have editor highlighting so I had to update my editor configs... might be cool to consider by default.
- The directory structure thing is super obvious, super nice and easy to work with. The `app-index` seems a little inelegant but otherwise, really intuitive.
- The per-directory `README` is really nice, but hard to discover and navigate. I'd consolidate into one README at the top of the project?
- What's `flashErrors`?
- Documentation about `data-*`
    - This was honestly pretty tough to figure out from documentation.
    - I was thinking "I need this piece of data on the page to have this behavior. What collection of tags do I need?" and the documentation wasn't very helpful.
- Occasionally Remake would throw an error (Unhandled Promise Rejection) and it would hang the following requests for pages. Maybe just restart Remake in this case automatically or catch it earlier?
- **BUG**: If the user data isn't in the correct schema and causes a template error, sometimes (not sure if always, but could be) causes a completely indecipherable error and hangs pageload.
    - It seems like I got into this state because I accidentally misused a `data-o-type` directive and said `object` where I should have said `list`, or something like that, and it really broke the DB.
    - When I set a wrong data attribute like this, it's really hard to understand where my mental model doesn't align with what Remake sees, so debugging is a chore and gets frustrating very quickly. I just end up putting weird `data-l-` attributes in plausible places in DOM and testing things until it doesn't destroy the database.
    - Still not really sure where `data-o-type=`'s and `data-o-key`'s should go, even though I've gotten it so far with trial and error.

## Feature set

- G Suite login or something like that?
- Is there a hook/directive for removing something from a list without clicking on it? Click to remove seems unintuitive at times.
    - Can I add a hook before delete to confirm?
- Can I just add a "delete" button to a list item that's always there?
- Hot reload would be sick, but not essential.
- I'm using blocks.css. What's the best way to make the field buttons look like blocks.css buttons?
- Throttle if a bunch of items are added at once, instead of many network requests?
- Save indicator?
- Can I show computed values? Like, I want to show "X links shared" at the top of the page.
    - Probably a HBS thing.
- Is there... a good way to do continuous integration from GitHub? Not a must, but would be really nice.
- Is there a good way to make a property of an object editable without it being visible? Like, say, a link URL?
- How are schema changes handled in the deployed version? What have you done in the past?
- The objects created from my Remake app doesn't have id's.. and it's also sorted pretty arbitrarily. Are those related? Should I have ID's for everything?

## Linus's notes for writing

My initial data design:

```
User:
    - Bio
    - Website url
    - []Topic, sorted (e.g. "software", "community")
        - Name
        - Description
        - []Entry, sorted: label, url
```

- It's basically my JSON DB for polyx/etc but automatically done for you.
- Feels almost like my data and state management is all taken care of, and I'm just in charge of rendering the view.
    - Feels like the nice UX of React, thinking of view as a function of state, not thinking of state management.
- A really helpful thing to do right after determining the data schema seems to be to map it to a DOM structure where every JSON node has a place to anchor. This helps assign `data-` directives later.
- From when I first had the idea, I had an app I wouldn't be very hesitant to launch (sans marketing material) in 4 hours, and that was my first time touching this library. That's kind of cool. I anticipate the design / layout / core logic not to change much.

---

- Preview link feature -- if loaded with `?preview=1` or something pretend as if not logged in.
- Extra referrents in one way data binding
