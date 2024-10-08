<img src="https://github.com/user-attachments/assets/0183479c-43eb-48cc-bc01-9401bd20fca7" alt="moviegenie" width="250" align="right">

# moviegenie 🎥
A simple app that interacts with the [TMDB API](https://developer.themoviedb.org/reference) to present you with a never ending list of movies to watch from. You can try it on android now by downloading the apk from the [releases page](https://github.com/vishalkrishnads/moviegenie/releases/tag/v0.1)! :tada:

> :warning: Government Of India has been known to block TMDB in the country. If for some reason, you don't see an active loading animation or any movies, please try connecting to a VPN and relaunching the app. If you're confused, [Proton VPN](https://protonvpn.com/) might be a good one to start with.

This is my submission for the [hiring challenge](https://buymeacoffee.notion.site/Hiring-challenge-React-Native-Developer-e69f432946c8466caf0f4b030b41074f) of [Buy me a coffee](https://buymeacoffee.com/) and not one of my projects. As such, this is simply a proof of concept & won't be maintained further.

## Table Of Contents

* [Design Choices](#design-choices)
   * [List screen](#list-screen)
   * [Details screen](#details-screen)
   * [Codebase](#codebase)
* [What works](#what-works)
   * [Required functionality](#required-functionality)
   * [Bonus tasks](#bonus-tasks)
* [Setup Guide](#setup-guide)
   * [Prerequisites](#prerequisites)
   * [Build From Source](#build-from-source)
   * [Installation Instructions](#installation-instructions)
* [Contributing](#contributing)

## Design Choices
This section details the design choices made for the app's UI and codebase. If you'd rather setup the app and see for yourself, feel free to skip to the [setup guide]().

### List screen
The list screen is the first one that greets the user when the app loads. For this, I decided to go with a grid like cards layout that would be responsive across various devices. For instance, a tablet could show more movies at once with this layout whereas a phone could show fewer ones but in a detailed manner. As the screen size increases, the number of movies shown at once will increase as well.

<table>
  <tr>
    <td>
      <img src="https://github.com/user-attachments/assets/68216d8f-0037-44d1-b583-0d676f7e13bb">
    </td>
    <td>
      <img src="https://github.com/user-attachments/assets/b159bf72-8eff-414e-9496-ea7565976922">
    </td>
  </tr>
  <tr>
    <td>
      <img src="https://github.com/user-attachments/assets/d460b9cd-30c1-4b78-bb79-29fd48c910c3">
    </td>
    <td>
      <img src="https://github.com/user-attachments/assets/019b4654-e447-4eea-b0c0-03ef0fb16712">
    </td>
  </tr>
</table>

*the list screen as seen in mobile (dark mode) & tablet (light mode)*

A search bar would be present at the top of this screen that navigates to a separate search screen for searching movies. In both of these screens, movies are shown as cards. Each card shows the movie's name, title, release date, rating, genres & popularity. Ratings are converted from a 10 point scale to a 5 point scale and shown in terms of 5 stars for easy grasp. The popularity is shown as a simple progress bar.

### Details screen
This screen is where you can read more about a specific movie. The design choices for this have been pretty straightforward. The design is made responsive based on the orientation only.

<table>
  <tr>
    <td>
      <img src="https://github.com/user-attachments/assets/1f68319b-37f7-4e7a-b1ef-d17a13e90960">
    </td>
    <td>
      <img src="https://github.com/user-attachments/assets/55f4ee62-10e6-4bea-a916-bee9f5e1224c">
    </td>
  </tr>
</table>

*the details screen in portrait & landscape. this is the same for tablets as well.*

There are two sections: the top one showing the backdrop image of the selected movie and the bottom section showing the details and description. In portrait mode, these sections are shown as is. In landscape orientation, the top section assumes the left half of the screen and the bottom section assumes the right half. This works well on larger screens so I didn't feel the need to over engineer it.

### Codebase
This codebase relies on a [react context](https://react.dev/reference/react/hooks#context-hooks)(not redux) to do all the networking and caching stuff. It's summarized below:
    * On launch, the context loads the list of genres from the [`/genre/movie/list`](https://developer.themoviedb.org/reference/genre-movie-list) endpoint and stores it in the state.
    * After this, it loads the movies. If the network request fails, it immediately redirects the user to the help screen asking them to use a VPN.
    * The movies are loaded based on a couple of filters, all based directly from the endpoints provided by the TMDB API (see the left navbar on [this](https://developer.themoviedb.org/reference/movie-now-playing-list) for all the various movie lists) and stores these in the state as well.
    * When the user clicks on a movie, the app navigates to the details screen to show the movie's details. This screen pulls the movie from the context's state using the id and displays it.
Overall, the code structure is pretty straightforward and easy to understand. All best practices have been followed and there isn't much complexity.

## What works?
Everything stated in the requirements work. The better question qould be, what doesn't? The loading indicator isn't consistent in the initial launch. It works when scrolling. The bug is being tracked with [this issue](https://github.com/vishalkrishnads/moviegenie/issues/5).

### Required functionality
In short,

* The app is compatible with both android & iOS. No libraries specific to any one OS have been used in the project. The UI design also takes into consideration the aesthetic requirements for both operating systems.
* All the functionality stated as the requirements work. In India, the app might need to be connected to a VPN for the API to function properly as it may be blocked.
* There are two screens as stated, and they are linked together using a react context. There is a cache for network requests built using [`@react-native-async-storage/async-storage`](https://github.com/react-native-async-storage/async-storage) to make the app feel less laggy.

Overall, the all the requirements have been satisfied.

### Bonus tasks
* A search screen has been made and is linked with the context. It works properly using the [`/search/movie`](https://developer.themoviedb.org/reference/search-movie) endpoint and serves a list of maching movies given a query.
* The movie list can be sorted based on 4 criteria: **upcoming**, **trending**, **now playing** & **top rated**. All of the data is pulled directly from the API.
* Unit tests for both screens exist now but haven't been verified yet. They're written with jest, which is the obvious choice for react native projects.
* Infinite scroll works for both the movie list and search screens. You can scroll to the bottom of the list to load more movies.

## Setup Guide
This section walks you through the process of setting up a development environment and launching this app on your machine. If you'd rather just try out this app, it'd be enough to download the APK from the [releases page](https://github.com/vishalkrishnads/moviegenie/releases/tag/v0.1). This guide covers the instructions for android. If you have a macOS device, it'd be enough to use the [Expo Go](https://expo.dev/client) app and scan the QR from the terminal.

### Prerequisites
1. NodeJS & NPM
    > Node.js® is a JavaScript runtime built on Chrome's V8 JavaScript engine.
    >Install [here](https://nodejs.org/en/).
2. Expo Toolkit
    > Expo is a managed workflow for React Native project that simplifies & pipelines the develpoment process.
    > Install by entering the command below
    > ```
    > $ npx expo
    >```
    > Optionally, login to your Expo account
    >```
    >$ npx expo login
    >```

3. Android Emulator (Optional)
    > Android Emaulator is a virutal device that can be used for development purposes. If your development machine is incapable or lacks powerful enough hardware, use your phone instead. Get Android Emulator by installing Android Studio [here](https://developer.android.com/studio/install).

4. A VPN (if you're in India)
    > The Govt. Of India has been known to block TMDB in the country. So, if you're in India, use a VPN like [Proton VPN](https://protonvpn.com/) to reroute your traffic through another country.

### Installation instructions
1. Make a new directory and change into it
   
    ```bash
    $ mkdir moviegenie && cd moviegenie
    ```
2. Initialize a new empty Git repository and pull this code

    ```bash
    $ git init
    $ git remote add origin https://github.com/vishalkrishnads/moviegenie.git
    $ git pull origin main
    ```

3. Create a `.env` file at the project root and put these contents in it
    
    ```env
    EXPO_PUBLIC_BASE_URL=https://api.themoviedb.org/3
    EXPO_PUBLIC_AUTH_KEY=<your_tmdb_auth_key>
    ```
   You can get your key by signing up on the [TMDB dev page](https://developer.themoviedb.org/) and visiting [this page](https://developer.themoviedb.org/reference/intro/authentication) in your browser.

4. Install all the dependencies

    ```
    $ npx expo install
    ```

5. Start the development server

    ```bash
    $ npx expo start
    ```
When the server starts, press `a` to start the app on your Android emulator, or scan he QR code via the [Expo Go](https://expo.dev/client) app to open your rendered code :beers:. This works for iOS as well.

## Contributing
Thanks for thinking about contributing to this project! But, this repository is not accepting contributions since it is the submission of a hiring challenge.
