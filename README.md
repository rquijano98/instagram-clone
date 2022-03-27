## Instagram Clone

### Description:

This application uses HTML, CSS, JavaScript, and two APIs (Random User Generator <https://randomuser.me/> and Lorem Picsum <https://picsum.photos/> ) to generate a unique fake Instagram feed every time the page is reloaded. The application was created as a way to practice implementation of CSS and JavaScript fundamentals and techniques. The highlights of this application are listed in the last half of this README. NOTE: On the actual Instagram website, several of the components that I have recreated on this clone can be clicked to bring the user to another page; because I only created one page, any time the user of this clone application clicks on one of those components that usually leads to another page on normal Instagram, they simply will be brought to the top of the page.

**_Disclaimer_**: _This is in no way intended to be a replacement for the actual Instagram application; this clone application was created solely to practice CSS and JavaScript fundamentals by trying to recreate the layout of Instagram simply by looking at an Instagram feed._

### How to Run the Application

#### Getting Started

<ins>**NOTE**</ins>: These instructions assume the user has Node.js and Node package manager (npm) installed already.

1. Download or clone the "instagram-clone" repository from GitHub.
2. Open a terminal and navigate to newly created directory, which should just be called "instagram-clone."
3. From this directory, type "npm i" and hit enter in order to install the necessary dependencies for running the application.
4. After dependencies have been installed, type "npm start" and hit enter in order to run the application.
5. Open http://localhost:1234 where the application is running (please read "Known issue" note below).

   <ins>**\*Known issue (icons not loading):**</ins> Parcel is used to bundle this application; the bundle is present in the newly created dist folder. There is a known issue with Parcel where sometimes, it will remove the attribute type = "module" from a script tag.
   If, when you opened the application after npm start, you DO NOT see 6 icons to the right of the search bar in the header, this issue has likely occurred. To fix it and make it so that the icons are visible, navigate to the dist folder and open index.html. Right before the closing `</head>` tag, there should be the following script tag:
   `<script defer=" " src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.esm.js"></script>`

   After defer="", type the following: type="module". Now, reload the page or open http://localhost:1234 again, and the icons should now appear.

#### Changing Settings

This application was designed so that the user has some control over what is included in the generated feed. The user has control by changing certain settings in config.js (located at instagram-clone/js/config.js). Note that every time a change is made in config.js, as long as the localhost is still running the application, Parcel will automatically rebundle, meaning the page will automatically reload and implement whatever change was made.

##### Things That Can Be Changed in config.js

- **Personal user information:** You can change your own username and name by changing the variables YOUR_PERSONAL_USERNAME and YOUR_PERSONAL_NAME. Note that you cannot change the profile picture from the config.js file (it will be me by default!). In order to change the profile picture, navigate to the directory called "static" in the instagram-clone directory. Put whatever you want to be your profile picture in this directory and name it "profile-picture.jpg".

- **API URLs:** These should not be changed by users on this application.

- **Maximum number of pictures per post:** The maximum number of pictures on one post is controlled by MAX_PICS_PER_POST. IF the user sets this at, say, 5, this means that all of the posts that get generated can contain anywhere from 1 to 5 pictures in them.

- **The number of words that a comment can have before part of it gets hidden by "... more"**: This is controlled by WORDS_PER_COMMENT.

- **The number that gets displayed in the part of each post that says "View all <#> comments"**: The lowest this number could be is set by MINIMUM_ADDITIONAL_COMMENTS_PER_POST and the highest this could be is MAXIMUM_ADDITIONAL_COMMENTS_PER_POST. Say you set the minimum to 10 and the maximum to 20. That would mean that the number of additional fictional comments that are made on each post can be any number from 10 to 20 (clicking "View all <#> comments" will just bring you to the top of the page in this application; there are not actual additional comments to be shown).

- **The maximum number of likes that can be on a post**: This is set by MAXIMUM_ADDITIONAL_LIKES_PER_POST. If this is set at, say, 500, that means each post will have a random number of likes anywhere from 1 to 500.

- **The total number of pictures that will be in the feed (important)**: This is set by TOTAL_NUMBER_OF_PICTURES. This, along with MAX_PICS_PER_POST indirectly determines how many posts there will be in the feed. If you want there to be very many posts, set TOTAL_NUMBER_OF_PICTURES to something high (no higher than 93 however) and set MAX_PICS_PER_POST to something relatively low (probably less than 5). If you were to set TOTAL_NUMBER_OF_PICTURES to 90 and MAX_PICS_PER_POST to 3, this would mean that enough posts with 1-3 pictures would have to be created to accommodate a total of 90 pictures. NOTE: The number of users that are in the stories bar and suggestion section also are affected by the total number of posts in the feed. The more posts you have in the feed, the more users you will have in the stories bar and the suggestion section.

- **The timestamps on each post**: This is affected by TIME_AMPLIFIER. To be very concise, the higher this number is, the larger your time values will be for your timestamps. Recommended to see the comment in the actual config.js file to better understand this.

### Highlights:

Every highlight is listed out below by section below. This list is very long to read (tl;dr), so I will list out the three most noteworthy ones here and put in brackets where they came from in the list.

- [Number 3 from **Suggestion Section**] Every user card can be closed by pressing the X button in the top right. A CSS transition is used to render the smooth closing animation that happens when a user card is closed.
- [Number 3 from **Posts**] If a post has more than one picture, swiping (scrolling without clicking on arrows) IS supported. If user tries to only "partially swipe" and leave part of two different images in frame at the same time, the image with more content in frame will automatically get scrolled to.
- [Number 10 from **Posts**] When you type into the "Add a comment" section, the container will expand with your text. This will happen as long as what you type does not exceed 5 lines. Once it exceeds 5 lines, then a scroll bar shows up to allow you to scroll through what you have typed.

Every highlight by section will now be listed below.

#### Header (component that contains Instagram written logo, search bar, and navigation icons)

1. The header bar is sticky; it shows at the top of the viewport no matter how much you scroll down in the viewport.

2. <ins>**Responsive Highlight:**</ins> As user shrinks the viewport width down to 722px, only the white spice that is in the header bar gets reduced (logo, search bar, and navigation icons remain the same size, just like on actual Instagram). Between 722px and 675px (when there is no more white space to be removed), the search bar shrinks smoothly; smaller than 675px, the search bar disappears.

#### Story Bar (rectangle at the top of the feed that contains several different users whose pictures are outlined in orange/red)

1. The users in the story bar were pulled from model.js, where an object of random users created by the Random User GeneratorAPI exists.

2. When a user profile is clicked in this story bar, the profile is "deactivated", meaning it is sent to the end of the list, the username is changed to gray, and the outline color is changed to gray. This matches the way Instagram handles story clicks (on actual Instagram, the user will be directed to the clicked profile's 24 hr story, but that does not happen in my application).
   NOTE: Notice that in the posts below the story bar, the users initially have a orange/red outline in the exact same way they do in the story bar. Whenever a user profile is clicked EITHER in the story bar OR in the profile picture that shows on their post, their profile picture gets deactivated (orange/red border removed) in BOTH locations.

3. The arrows on the story-bar can be clicked to scroll the stories some (you can also scroll by swiping); when scrolled all the way to the left, the left arrow is hidden, and when scrolled all the way to the right, the right arrow is hidden.

4. When there are only few stories to display (the amount of stories in the story bar is affected by settings in the config.js file as explained in the "Changing Settings" section above), the arrows disappear so you cannot scroll.

5. <ins>**Responsive Highlight:**</ins> Size of the story bar changes with the size of the viewport once you decrease the viewport width to below 675px.

#### Aside (component that is off to the right if the viewport is >1065px)

1. The users in the aside were pulled from model.js, where an object of random users created by the Random User Generator exists.

2. The aside is sticky; it shows at the right of the viewport no matter how much you scroll.

3. If you click follow next to one of the users, the button turns into a "requested" button, and if you clicked the requested button, it turns back into a follow button; this imitates the same behavior this button has on Instagram.

4. <ins>**Responsive Highlight:**</ins> The aside disappears when the viewport is shrunk below 1065px.

#### Posts (main component of this application; these are the large boxes underneath the story bar that contain pictures and comments)

1. Every post has one or more pictures (the amount of pictures in a particular post is explained more in the "Changing settings" section above) that were pulled from model.js where an object of random pictures created by the Lorem Picsum API exists.

2. If a post has more than one picture: When on the left-most picture, there is a right arrow that can be clicked to scroll to the next picture. When on the right-most picture, there is a left arrow that can be clicked to scroll to the previous picture. When on any of the middle pictures, both a right arrow and a left arrow are present.

3. If a post has more than one picture: Swiping (scrolling without clicking on arrows) IS supported. If user tries to only "partially swipe" and leave part of two different images in frame at the same time, the image with more content in frame will automatically get scrolled to.

4. If a post has more than one picture: Dots will be rendered beneath the pictures, and one dot will correspond with one picture. If a certain picture is currently in frame, its associated dot will turn a blue color. For example, if the fourth picture is in frame, the fourth dot will be blue and all other dots will be gray.

5. If a post has only one picture: No arrows are rendered, no scrolling is possible, and no dots are rendered.

6. You can click on the heart button to like a post. This results in a short animation where the heart turns red and "beats" once. The number of likes on the post also goes up. If you click on a heart that is already red, it reverts to how it looked originally, and the number of likes decreases back to what it was.

7. Random number generation is used to determine how many profile pictures will appear next to the number of likes for each post. The number of profile pictures can be anywhere from 0 to 3. This simulates the fact that when someone you follow on Instagram likes a post in your feed, their profile picture shows up next to the number of likes. If only one profile picture is present, the username associated with that profile picture shows up after the words "Liked by;" if more than one profile picture is present, the username associated with the leftmost profile picture is displayed after the words "Liked by".

8. A description by the user that made a particular post is written out beneath the pictures. This description is unique for each post and is generated using the lorem-ipsum JavaScript module. If the description exceeds a certain character limit (the character limit is determined in config.js), part of the comment is hidden. To show the rest of this comment, click on the "... more".

9. You can write comments on any post. To post a comment, you type into the "Add a comment" section and then hit enter or click "Post". The comment will be under the username that is written in the config.js file (the default is r_quijano). The comment has the same character limit as the description explained in #8 above.

10. When you type into the "Add a comment" section, the container will expand with your text. This will happens as long as what you type does not exceed 5 lines. Once it exceeds 5 lines, then a scroll bar shows up to allow you to scroll through what you have typed.

11. Each post has a timestamp associated with it (examples: 30 minutes ago, 6 hours ago, 12 hours ago, etc.). This is when the post was supposedly made (fictional, of course). The way these fictional times were calculated was by finding the amount of milliseconds that passed between any particular post rendering and the _**first**_ post rendering and multiplying this number by 6; whatever this product is is supposedly how many hours have passed. For example, if, after rendering the first post, it took the application 2 milliseconds to render the second post, then the timestamp for the second post will be 2 X 6 = 12. So, that post will say "12 HOURS AGO". The only timestamp that was not calculated this way was the timestamp for post 1; this timestamp is simply created by random number generation.

12. The timestamps explained above in #11 can be shown in minutes, hours, or days. Once the 7 day mark is exceeded, the Intl.DateTimeFormat object is used to give a month and a day. For example, if this application is run on March 22nd, and a timestamp calculation (explained above in #11) results in a timestamp of 10 days, instead of displaying "10 DAYS AGO" on a post, it will display "MARCH 12TH".

13. <ins>**Responsive Highlights**</ins>:
    - a) Once the viewport is below 729px, the ability to add a comment goes away. This imitates the behavior of the actual Instagram website.
    - b) Once the viewport width goes below 675px, the size of the pictures in the post start to shrink along with the width of the viewport in order to maintain their aspect ratio.

#### Suggestion Section (The box directly under the first post that is titled "Suggestions For You")

1. The users in the suggestion section were pulled from model.js, where an object of random users created by the Random User GeneratorAPI exists.

2. Every "user card" that is in this section can have the follow button clicked, which changes it to show "Requested."

3. Every user card can be closed by pressing the X button in the top right. A CSS transition is used to render the smooth closing animation that happens when a user card is closed.

4. The arrows on the suggestion section can be clicked to scroll the suggestions some (you can also scroll by swiping); when scrolled all the way to the left, the left arrow is hidden, and when scrolled all the way to the right, the right arrow is hidden.

5. When there are only few suggestions to display(the amount of suggestions is affected by settings in the config.js file, which is discussed in the "Changing settings" section above), the arrows disappear and you cannot scroll with swiping.

6. <ins>**Responsive Highlight**</ins>: Once the viewport width goes below 675px, the suggestion section width changes with the width of the viewport.
