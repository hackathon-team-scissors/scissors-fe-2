<template>
  <div v-show="streaming" class="video">
    <video @canplay="onCanPlay" ref="video" id="video"></video>
    <button @click="takepicture" id="startbutton">Take photo</button>
  </div>
  <div v-show="!streaming">
    <canvas ref="canvas" v-show="false" id="canvas"> </canvas>
    <div class="output">
      <img ref="photo" id="photo" alt="The screen capture will appear in this box." />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted} from "vue";

let video = ref<InstanceType<typeof HTMLVideoElement>>();
let canvas = ref<InstanceType<typeof HTMLCanvasElement>>();
let photo = ref<InstanceType<typeof HTMLImageElement>>();
let streaming = ref(false);
const width = 320; // We will scale the photo width to this
let height = 320;

onMounted(() => {
  if (!video.value || !canvas.value || !photo.value){
    console.warn("Elements are not mounted properly!")
    return;
  }
  
  streaming.value = true;
  navigator.mediaDevices
    .getUserMedia({ video: { width: 720, height: 1280, facingMode: 'environment' }, audio: false })
    .then((stream) => {
      if (video?.value){
        video.value.srcObject = stream;
        video.value.play();
      }
    })
    .catch((err) => {
      console.error(`An error occurred: ${err}`);
    });

  // function clearphoto() {
  //   if (canvas.value && photo.value){
  //     const context = canvas.value.getContext("2d");
  //     if (context){
  //       context.fillStyle = "#AAA";
  //       context.fillRect(0, 0, canvas.value.width, canvas.value.height);
  //     }

  //     const data = canvas.value.toDataURL("image/png");
  //     photo.value.setAttribute("src", data);
  //   }
  // }
});

function onCanPlay(){
  if (!streaming.value && video.value && canvas.value) {
        height = video.value.videoHeight / (video.value.videoWidth / width);

        // Firefox currently has a bug where the height can't be read from
        // the video, so we will make assumptions if this happens.

        if (isNaN(height)) {
          height = width / (4 / 3);
        }

        video.value.setAttribute("width", `${width}`);
        video.value.setAttribute("height", `${height}`);
        canvas.value.setAttribute("width", `${width}`);
        canvas.value.setAttribute("height", `${height}`);
        streaming.value = true;
      }
    }

function takepicture() {
    event?.preventDefault();
    const context = canvas?.value?.getContext("2d");
    if (width && height && video.value && canvas.value && context && photo.value) {
      canvas.value.width = width;
      canvas.value.height = video.value.videoHeight / (video.value.videoWidth / width);
      context.drawImage(video.value, 0, 0, width, height);

      const data = canvas.value.toDataURL("image/png");
      photo.value.setAttribute("src", data);
      streaming.value = false;
    }
}

</script>

<style>
#video {
  /* border: 1px solid black;
  box-shadow: 2px 2px 3px black; */
  width: 100vw;
  height: 100vh;
}

.output {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100vw;
}

#photo {
  display: flex;
  border: 1px solid black;
  box-shadow: 2px 2px 3px black;
  width: 95%;
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
</style>
