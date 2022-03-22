const YOUR_PERSONAL_USERNAME = "r_quijano";
const YOUR_PERSONAL_NAME = "Riley Quijano";
export { YOUR_PERSONAL_USERNAME, YOUR_PERSONAL_NAME };

export const USER_API = "https://randomuser.me/api/";
export const PICTURE_API = "https://picsum.photos/v2/";

// Controls the maximum number of pictures that can be on a single post
export const MAX_PICS_PER_POST = 7;

// Number of words that can be in a comment before an ellipsis and a See More button appears (this should almost always be around 125)
export const WORDS_PER_COMMENT = 125;

// Sets the number that is in the part of each post that says "View all <some #> comments"; note that there are not actual comments that are revealed when the "View all comments" button is pressed; this is because, in actual Instagram, pressing this button takes you to a different URL, but in this Mock Version, clicking any button that normally takes you to a different URL simply takes you to the top of the page
export const MAXIMUM_ADDITIONAL_COMMENTS_PER_POST = 30;
export const MINIMUM_ADDITIONAL_COMMENTS_PER_POST = 0;

// Sets the number of likes that can be on one post
export const MAXIMUM_ADDITIONAL_LIKES_PER_POST = 500;

// This number is the amount of pictures on the entire page; in other words, it will be the number you get if you were to count all of the pictures for all of the posts; for best performance, the highest this should be set is 93 (see explanation in the getPics() function in model.js)
export const TOTAL_NUMBER_OF_PICTURES = 90;

// Each post that is created has its timestamp as the value of the "data-time" attribute. Within allPostsView.js, there is a method that calculates how many ms have passed between each post generation and the first post generation; the value of TIME_AMPLIFIER will be multiplied by each of these ms values; the result will represent how many hours ago a user posted their post (this is fictional of course). As an example, lets say you set TIME_AMPILFIER to 6; if 10 ms passed between the fourth post generation and the first post generation, then the fourth post was posted 10*6 = 60 hours ago.
export const TIME_AMPLIFIER = 6;
