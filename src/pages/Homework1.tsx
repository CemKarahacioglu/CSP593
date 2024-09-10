import React from "react";
import "./Homework1.css";

import LottieAnimation from "../components/LottieAnimation";
import kittyAnimation from "../assets/AnimKittyA.json";

const Homework1: React.FC = () => {
  return (
    <main className="homework1-container">
      <h1>Everything You Didn't Need to Know</h1>
      <h2>The Story of Four Kitties</h2>
      <hr />
      <h3>Once upon time...</h3>
      <p>
        there was a cute Orange cat named Earl...Lorem ipsum dolor sit amet,
        consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
        et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
        exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
        dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
        proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
      </p>
      <hr />
      <h2>Get to Know the Cats</h2>
      <h3>For Years Harry Has Been Saying:</h3>
      <blockquote>
        Tuna is the best. Stop giving me that kibble crap. Lorem ipsum dolor sit
        amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
        labore et dolore magna aliqua. Vulputate dignissim suspendisse in est
        ante in nibh mauris. Lectus nulla at volutpat diam ut venenatis tellus
        in. Arcu bibendum at varius vel pharetra vel turpis nunc eget. Sit amet
        commodo nulla facilisi nullam vehicula ipsum a. Vitae justo eget magna
        fermentum iaculis eu non diam. Sem et tortor consequat id porta nibh
        venenatis. Semper eget duis at tellus at urna condimentum.
      </blockquote>
      <h3>Jerry's Loves from highest to lowest</h3>
      <ol>
        <li>Sleeping</li>
        <li>Eating</li>
        <li>Pooping</li>
      </ol>
      <h3>Gigi's Favorite Toys</h3>
      <ul>
        <li>Plastic Bags</li>
        <li>homework</li>
        <li>notebooks</li>
      </ul>
      <h3>What Earl Does on His Days Off</h3>
      <dl>
        <dt>Stalking</dt>
        <dd>
          This involves following the other cats around and causing fights
        </dd>
        <dt>Running</dt>
        <dd>Exercise is extremely important for us cats</dd>
        <dt>Laying Around</dt>
        <dd>A cat needs and deserves some time to do nothing</dd>
      </dl>
      <hr />
      {/* Footer Section */}
      <footer className="footer-section">
        <div className="kitty-animation">
          <LottieAnimation
            width="150px"
            height="150px"
            animationData={kittyAnimation}
          />
        </div>

        <h4>&copy; Cats and Co.</h4>

        {/* Lottie Animation Component */}
      </footer>
    </main>
  );
};

export default Homework1;
