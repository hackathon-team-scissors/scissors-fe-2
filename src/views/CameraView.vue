<template>
  <div v-show="streaming" class="video">
    <video id="video"></video>
    <button id="startbutton">Take photo</button>
  </div>
  <div v-show="!streaming">
    <canvas v-show="false" id="canvas"> </canvas>
    <div class="output">
      <img id="photo" alt="The screen capture will appear in this box." />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

let streaming = ref(false);

(() => {
  const width = 320; // We will scale the photo width to this
  let height = 320;

  streaming.value = true;

  let video: unknown = null;
  let canvas: unknown = null;
  let photo: unknown = null;
  let startbutton: unknown = null;

  function showViewLiveResultButton() {
    if (window.self !== window.top) {
      // Ensure that if our document is in a frame, we get the user
      // to first open it in its own tab or window. Otherwise, it
      // won't be able to request permission for camera access.
      document.querySelector(".contentarea").remove();
      const button = document.createElement("button");
      button.textContent = "View live result of the example code above";
      document.body.append(button);
      button.addEventListener("click", () => window.open(location.href));
      return true;
    }
    return false;
  }

  function startup() {
    if (showViewLiveResultButton()) {
      return;
    }
    video = document.getElementById("video");
    canvas = document.getElementById("canvas");
    photo = document.getElementById("photo");
    startbutton = document.getElementById("startbutton");

    navigator.mediaDevices
      .getUserMedia({ video: true, audio: false })
      .then((stream) => {
        video.srcObject = stream;
        video.play();
      })
      .catch((err) => {
        console.error(`An error occurred: ${err}`);
      });

    video.addEventListener(
      "canplay",
      (ev) => {
        if (!streaming.value) {
          height = video.videoHeight / (video.videoWidth / width);

          // Firefox currently has a bug where the height can't be read from
          // the video, so we will make assumptions if this happens.

          if (isNaN(height)) {
            height = width / (4 / 3);
          }

          video.setAttribute("width", width);
          video.setAttribute("height", height);
          canvas.setAttribute("width", width);
          canvas.setAttribute("height", height);
          streaming.value = true;
        }
      },
      false
    );

    startbutton.addEventListener(
      "click",
      (ev) => {
        takepicture();
        ev.preventDefault();
      },
      false
    );

    clearphoto();
  }

  // Fill the photo with an indication that none has been
  // captured.

  function clearphoto() {
    const context = canvas.getContext("2d");
    context.fillStyle = "#AAA";
    context.fillRect(0, 0, canvas.width, canvas.height);

    const data = canvas.toDataURL("image/png");
    photo.setAttribute("src", data);
  }
  function takepicture() {
    const context = canvas.getContext("2d");
    if (width && height) {
      canvas.width = width;
      canvas.height = video.videoHeight / (video.videoWidth / width);
      context.drawImage(video, 0, 0, width, height);

      const data = canvas.toDataURL("image/png");
      photo.setAttribute("src", data);
      streaming.value = false;
      console.log("coming here");
    } else {
      clearphoto();
    }
  }

  // Set up our event listener to run the startup process
  // once loading is complete.
  window.addEventListener("load", startup, false);
})();
</script>

<style>
#video {
  /* border: 1px solid black;
  box-shadow: 2px 2px 3px black; */
  width: 100vw;
  height: 100vh;
}
#photo {
  border: 1px solid black;
  box-shadow: 2px 2px 3px black;
  width: 100vw;
  height: 100vh;
}

.camera {
  width: 100%;
  margin: 0;
  /* display: inline-block; */
}

#startbutton {
  display: block;
  position: relative;
  margin-left: auto;
  margin-right: auto;
  bottom: 32px;
  background-color: rgb(0 150 0 / 50%);
  border: 1px solid rgb(255 255 255 / 70%);
  box-shadow: 0px 0px 1px 2px rgb(0 0 0 / 20%);
  font-size: 14px;
  font-family: "Lucida Grande", "Arial", sans-serif;
  color: rgb(255 255 255 / 100%);
}

.contentarea {
  font-size: 16px;
  font-family: "Lucida Grande", "Arial", sans-serif;
  width: 760px;
}
</style>
