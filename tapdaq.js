/*
<button onclick="app.showBanner();">showBanner</button>
<button onclick="app.showVideo();">showVideo</button>
<button onclick="app.showRewardedVideo();">showRewardedVideo</button>
<button onclick="app.destroyBanner();">destroyBanner</button>
*/

const config = {
    android: {
      appId: "614f26fe08fe6c2d735d6e69", // edit
      clientKey: "626dbf08-5bc2-4785-92d1-c3d9b000dc7b", //edit
    },
    banner: {
      placementTag: "default", // edit
      bannerSize: "Standard", // edit
      bannerPosition: "bottom", //edit
    },
    video: {
      placementTag: "default", // edit
    },
    reward: {
      placementTag: "default", // edit
    },
  };
  
  var app = {
    initialize: function () {
      document.addEventListener(
        "deviceready",
        this.onDeviceReady.bind(this),
        false
      );
    },
  
    /**
     * onDeviceReady
     */
    onDeviceReady: function () {
      /**
       * vConsole
       */
      var vConsole = new window.VConsole();
  
      /**
       * Tapdaq init
       */
      const Tapdaq = cordova.require("cordova-plugin-tapdaq.Tapdaq");
      var opts = {
        didInitialise: function () {
          console.log("cb: didInitialise");
          Tapdaq.networkStatuses(function (value) {
            console.log("Network Statuses: " + JSON.stringify(value));
          });
          app.loadBanner();
          app.loadVideo();
          app.loadRewardedVideo();
        },
        didFailToInitialise: function (error) {
          console.log("cb: didFailToInitialise: " + JSON.stringify(error));
        },
      };
      Tapdaq.init(config, opts);
    },
    loadAd: function (type) {
      const Tapdaq = cordova.require("cordova-plugin-tapdaq.Tapdaq");
      const loadOpts = {
        didLoad: function (response) {
          console.log("didLoad: " + JSON.stringify(response));
        },
        didFailToLoad: function (error, response) {
          console.log(
            "didFailToLoad: error: " +
              JSON.stringify(error) +
              ", response: " +
              JSON.stringify(response)
          );
        },
      };
      const bannerOpts = {
        didLoad: function (response) {
          console.log("didLoad: " + JSON.stringify(response));
          app.showBanner();
        },
        didFailToLoad: function (error, response) {
          console.log(
            "didFailToLoad: error: " +
              JSON.stringify(error) +
              ", response: " +
              JSON.stringify(response)
          );
        },
        didRefresh: function (response) {
          console.log("didRefresh: " + JSON.stringify(response));
        },
        didFailToRefresh: function (error, response) {
          console.log(
            "didFailToRefresh: error: " +
              JSON.stringify(error) +
              ", response: " +
              JSON.stringify(response)
          );
        },
        didClick: function (response) {
          console.log("didClick: " + JSON.stringify(response));
        },
      };
      switch (type) {
        case "banner":
          Tapdaq.loadBanner(
            config.banner.placementTag,
            config.banner.bannerSize,
            bannerOpts
          );
          break;
        case "video":
          Tapdaq.loadVideo(config.video.placementTag, loadOpts);
          break;
        case "reward":
          Tapdaq.loadRewardedVideo(config.reward.placementTag, loadOpts);
          break;
        default:
          console.log("loadAd type none of banner, video, reward");
          break;
      }
    },
    showAd: function (type) {
      const Tapdaq = cordova.require("cordova-plugin-tapdaq.Tapdaq");
      const showOpts = {
        willDisplay: function (response) {
          console.log("willDisplay: " + JSON.stringify(response));
        },
        didDisplay: function (response) {
          console.log("didDisplay: " + JSON.stringify(response));
        },
        didFailToDisplay: function (error, response) {
          console.log(
            "didFailToDisplay: error: " +
              JSON.stringify(error) +
              ", response: " +
              JSON.stringify(response)
          );
        },
        didClose: function (response) {
          console.log("didClose: " + JSON.stringify(response));
        },
        didClick: function (response) {
          console.log("didClick: " + JSON.stringify(response));
        },
        didValidateReward: function (response) {
          console.log("didValidateReward: " + JSON.stringify(response));
        },
      };
      switch (type) {
        case "banner":
          Tapdaq.showBanner(
            config.banner.placementTag,
            config.banner.bannerPosition
          );
          break;
        case "video":
          Tapdaq.showVideo(config.video.placementTag, showOpts);
          break;
        case "reward":
          Tapdaq.showRewardedVideo(config.reward.placementTag, showOpts);
          break;
        default:
          console.log("showAd type none of banner, video, reward");
          break;
      }
    },
    loadBanner: function () {
      app.loadAd("banner");
    },
    loadVideo: function () {
      app.loadAd("video");
    },
    loadRewardedVideo: function () {
      app.loadAd("reward");
    },
    showBanner: function () {
      app.showAd("banner");
    },
    showVideo: function () {
      app.showAd("video");
      app.loadAd("video");
    },
    showRewardedVideo: function () {
      app.showAd("reward");
      app.loadAd("reward");
    },
    destroyBanner: function () {
      const Tapdaq = cordova.require("cordova-plugin-tapdaq.Tapdaq");
      Tapdaq.hideBanner(config.video.placementTag);
      Tapdaq.destroyBanner(config.video.placementTag);
      app.loadAd("banner");
    },
  };
  app.initialize();
  