<template>
  <div class="flex improvements" style="height: 100vh; flex-direction: row;" v-if="improvements && loadingImprovements">
    <v-icon animation="spin" style="color: white; margin-right: 12px" name="fa-spinner" scale="2" />
    <p style="color: white; font-size: 24px;"> Loading results...</p>
  </div>
  <div v-else-if="improvements" class="flex improvements" style="padding: 5%; height: 100vh; width: 100vw; flex-direction: column;">
    <h1 class="header"> <v-icon scale="2" name="fa-hands-wash" /> Estimation improved! </h1>
    <p class="subheader mg-8">{{ receiptScan.origin_co2_impact }}kg to {{ receiptScan.updated_co2_impact }}kg (<span style="color: green">{{ Math.round((receiptScan.updated_co2_impact - receiptScan.origin_co2_impact) / receiptScan.origin_co2_impact * 100)}}%</span>)</p>
    <p class="details"> {{ receiptScan.details }} </p>
    <button class="mg-8 pd-8" @click="back"> Back to emissions </button>
  </div>
  <div v-else>
  <div v-show="streaming" class="video">
    <video @canplay="onCanPlay" ref="video" id="video"></video>
    <button @click="takepicture" id="startbutton"><v-icon scale="2" name="fa-camera"/></button>
  </div>
  <div v-show="!streaming">
    <canvas ref="canvas" v-show="false" id="canvas"> </canvas>
    <div class="output">
      <img ref="photo" id="photo" alt="The screen capture will appear in this box." />
    </div>
    <div class="flex bottom">
      <button class="mg-8" style="height: 40px; width: 60px" @click="confirm"> Confirm </button>
      <button class="mg-8" style="height: 40px; width: 60px" @click="clearPhoto"> Try again </button>
    </div>
  </div>
</div>
</template>

<script setup lang="ts">
import { addReceipt } from "@/helpers/backend";
import router from "@/router";
import { useTokenStore } from "@/stores/tokenManager";
import { ref, onMounted} from "vue";

let video = ref<InstanceType<typeof HTMLVideoElement>>();
let canvas = ref<InstanceType<typeof HTMLCanvasElement>>();
let photo = ref<InstanceType<typeof HTMLImageElement>>();
  let receiptScan = ref({
    details: "",  origin_co2_impact: 0,
    updated_co2_impact: 0
  });
let streaming = ref(false);
let improvements = ref(false);
let loadingImprovements = ref(false);

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

async function back(){
  useTokenStore().emissionId = "";
  improvements.value = false;
  streaming.value = false;
  receiptScan.value = {details: "", origin_co2_impact: 0, updated_co2_impact: 0};

  event?.preventDefault();
  router.push('/emissions');
}

async function confirm(){
  const store = useTokenStore();
  const { emissionId } = store;
  improvements.value = true;
  loadingImprovements.value = true;

  const { ReceiptScan } = await addReceipt(emissionId);
  
  receiptScan.value = ReceiptScan;
  loadingImprovements.value = false;
}

async function clearPhoto(){
  // clear photo
  if (canvas.value && photo.value){
      const context = canvas.value.getContext("2d");
      if (context){
        context.fillStyle = "#AAA";
        context.fillRect(0, 0, canvas.value.width, canvas.value.height);
      }

      const data = canvas.value.toDataURL("image/png");
      photo.value.setAttribute("src", data);
      streaming.value = true;
    }
}

</script>

<style>

.pd-8 {
  padding: 8px;
}

.details {
  color: black;
  background: rgba(255, 255, 255, 0.446);
  padding: 16px;
  border-radius: 10px;
}

.bottom {
  bottom: 80px;
}

.improvements {
  background-image: url("../assets/background.jpg");
  background-size: cover;
  height: 100vh;
}

.subheader {
  color: black;
  padding: 8px;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.48);
}

.mg-8 {
  margin: 8px;
}

.video {
 display: flex;
 justify-content: center;
 align-items: center;
}

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

.flex {
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
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
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  z-index: 1000;
  bottom: 80px;
  height: 60px;
  width: 60px;
  border-radius: 50px;
  border: grey solid;
}
</style>
